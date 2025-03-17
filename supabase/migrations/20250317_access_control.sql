-- Add RLS policies for access control

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create access level validation function
CREATE OR REPLACE FUNCTION has_sufficient_access(required_level access_level, user_level access_level)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN CASE user_level
    WHEN 'full' THEN TRUE
    WHEN 'high' THEN required_level IN ('high', 'medium', 'basic', 'limited')
    WHEN 'medium' THEN required_level IN ('medium', 'basic', 'limited')
    WHEN 'basic' THEN required_level IN ('basic', 'limited')
    WHEN 'limited' THEN required_level = 'limited'
    ELSE FALSE
  END;
END;
$$ LANGUAGE plpgsql;

-- Create function to check if users are in same department
CREATE OR REPLACE FUNCTION is_same_department(user1_id UUID, user2_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user1_dept department_type;
  user2_dept department_type;
BEGIN
  SELECT department INTO user1_dept FROM profiles WHERE id = user1_id;
  SELECT department INTO user2_dept FROM profiles WHERE id = user2_id;
  RETURN user1_dept = user2_dept;
END;
$$ LANGUAGE plpgsql;

-- Create function to check if user is a supervisor of another user
CREATE OR REPLACE FUNCTION is_supervisor_of(supervisor_id UUID, user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = user_id
    AND reporting_to = supervisor_id
  );
END;
$$ LANGUAGE plpgsql;

-- Policy: Users can always view their own profile
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Policy: Full access users (admin, general manager) can view and modify all profiles
CREATE POLICY "Full access users can view all profiles"
ON profiles FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND access_level = 'full'
  )
);

-- Policy: Department heads can view and modify profiles in their department
CREATE POLICY "Department heads can view department profiles"
ON profiles FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND access_level = 'high'
    AND is_same_department(auth.uid(), profiles.id)
  )
);

-- Policy: Supervisors can view team profiles and direct reports
CREATE POLICY "Supervisors can view team profiles"
ON profiles FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND access_level = 'medium'
    AND (
      is_same_department(auth.uid(), profiles.id)
      OR is_supervisor_of(auth.uid(), profiles.id)
    )
  )
);

-- Policy: Staff can view department members and assigned clients
CREATE POLICY "Staff can view relevant profiles"
ON profiles FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND access_level = 'basic'
    AND is_same_department(auth.uid(), profiles.id)
  )
);

-- Create indexes for efficient access control
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_department ON profiles(department);
CREATE INDEX IF NOT EXISTS idx_profiles_staff_category ON profiles(staff_category);
CREATE INDEX IF NOT EXISTS idx_profiles_access_level ON profiles(access_level);
CREATE INDEX IF NOT EXISTS idx_profiles_reporting_to ON profiles(reporting_to);

-- Create function to update last_login timestamp
CREATE OR REPLACE FUNCTION update_last_login()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET last_login = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update last_login on session refresh
CREATE TRIGGER update_last_login_trigger
  AFTER UPDATE OF updated_at ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION update_last_login();
