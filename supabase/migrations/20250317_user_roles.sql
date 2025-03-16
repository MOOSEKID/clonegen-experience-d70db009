-- Create enum types for roles and statuses
CREATE TYPE user_role AS ENUM (
  'admin',
  'manager',
  'trainer',
  'staff',
  'corporate_client',
  'individual_client'
);

CREATE TYPE staff_type AS ENUM (
  'manager',
  'trainer',
  'other'
);

CREATE TYPE customer_type AS ENUM (
  'individual',
  'corporate'
);

CREATE TYPE membership_status AS ENUM (
  'active',
  'inactive',
  'pending'
);

-- Update profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'individual_client',
ADD COLUMN IF NOT EXISTS is_staff BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES companies(id),
ADD COLUMN IF NOT EXISTS position TEXT,
ADD COLUMN IF NOT EXISTS department TEXT,
ADD COLUMN IF NOT EXISTS staff_type staff_type,
ADD COLUMN IF NOT EXISTS specialization TEXT[],
ADD COLUMN IF NOT EXISTS customer_type customer_type,
ADD COLUMN IF NOT EXISTS membership_type TEXT,
ADD COLUMN IF NOT EXISTS membership_status membership_status DEFAULT 'pending';

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  industry TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create company_memberships table
CREATE TABLE IF NOT EXISTS company_memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  membership_type TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  status membership_status DEFAULT 'active',
  max_employees INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create staff_assignments table
CREATE TABLE IF NOT EXISTS staff_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_to_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  assignment_type TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
ON profiles FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND (profiles.is_admin = true OR profiles.role = 'admin')
  )
);

-- Staff can view their assigned clients and other staff
CREATE POLICY "Staff can view assigned profiles"
ON profiles FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_staff = true
  )
  OR
  EXISTS (
    SELECT 1 FROM staff_assignments
    WHERE staff_assignments.staff_id = auth.uid()
    AND staff_assignments.assigned_to_id = profiles.id
  )
);

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_memberships_updated_at
    BEFORE UPDATE ON company_memberships
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_assignments_updated_at
    BEFORE UPDATE ON staff_assignments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
