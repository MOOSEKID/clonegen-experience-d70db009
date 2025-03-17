-- Drop old enum types
DROP TYPE IF EXISTS staff_type;
DROP TYPE IF EXISTS customer_type;
DROP TYPE IF EXISTS membership_status;

-- Drop old columns
ALTER TABLE profiles
DROP COLUMN IF EXISTS staff_type,
DROP COLUMN IF EXISTS customer_type,
DROP COLUMN IF EXISTS membership_type,
DROP COLUMN IF EXISTS membership_status;

-- Update RLS policies to use new role structure
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Staff can view assigned profiles" ON profiles;

-- Admins and General Managers have full access
CREATE POLICY "Management can view all profiles"
ON profiles FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND (
      profiles.role IN ('admin', 'general_manager')
      OR profiles.access_level = 'full'
    )
  )
);

-- Department heads can view their department
CREATE POLICY "Department heads can view department profiles"
ON profiles FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid()
    AND p.access_level IN ('high', 'full')
    AND p.department = profiles.department
  )
);

-- Supervisors can view their team
CREATE POLICY "Supervisors can view team profiles"
ON profiles FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid()
    AND p.access_level IN ('medium', 'high', 'full')
    AND (
      -- Same department
      p.department = profiles.department
      OR
      -- Direct reports
      profiles.reporting_to = p.id
      OR
      -- Assigned clients/trainees
      EXISTS (
        SELECT 1 FROM staff_assignments
        WHERE staff_assignments.staff_id = p.id
        AND staff_assignments.assigned_to_id = profiles.id
      )
    )
  )
);

-- Staff can view assigned profiles and team members
CREATE POLICY "Staff can view relevant profiles"
ON profiles FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid()
    AND p.is_staff = true
    AND (
      -- Same department basic staff
      (p.access_level = 'basic' AND p.department = profiles.department)
      OR
      -- Assigned clients/trainees
      EXISTS (
        SELECT 1 FROM staff_assignments
        WHERE staff_assignments.staff_id = p.id
        AND staff_assignments.assigned_to_id = profiles.id
      )
    )
  )
);

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_department ON profiles(department);
CREATE INDEX IF NOT EXISTS idx_profiles_staff_category ON profiles(staff_category);
CREATE INDEX IF NOT EXISTS idx_profiles_access_level ON profiles(access_level);
CREATE INDEX IF NOT EXISTS idx_profiles_reporting_to ON profiles(reporting_to);
CREATE INDEX IF NOT EXISTS idx_staff_assignments_staff_id ON staff_assignments(staff_id);
CREATE INDEX IF NOT EXISTS idx_staff_assignments_assigned_to_id ON staff_assignments(assigned_to_id);

-- Update company memberships table
ALTER TABLE company_memberships
DROP COLUMN IF EXISTS status,
ADD COLUMN IF NOT EXISTS status staff_status DEFAULT 'active',
ADD COLUMN IF NOT EXISTS membership_level access_level DEFAULT 'basic';

-- Update staff assignments
ALTER TABLE staff_assignments
ADD COLUMN IF NOT EXISTS assignment_category staff_category,
ADD COLUMN IF NOT EXISTS access_granted access_level DEFAULT 'limited';

-- Create function to check access level hierarchy
CREATE OR REPLACE FUNCTION has_sufficient_access(
  required_level access_level,
  user_level access_level
) RETURNS boolean AS $$
BEGIN
  RETURN CASE
    WHEN user_level = 'full' THEN true
    WHEN user_level = 'high' AND required_level IN ('high', 'medium', 'basic', 'limited') THEN true
    WHEN user_level = 'medium' AND required_level IN ('medium', 'basic', 'limited') THEN true
    WHEN user_level = 'basic' AND required_level IN ('basic', 'limited') THEN true
    WHEN user_level = 'limited' AND required_level = 'limited' THEN true
    ELSE false
  END;
END;
$$ LANGUAGE plpgsql;
