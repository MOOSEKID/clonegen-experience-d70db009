-- Create enum types
CREATE TYPE staff_category AS ENUM ('Management', 'Training', 'Operations', 'Reception', 'Maintenance');
CREATE TYPE user_role AS ENUM (
  'admin',
  'general_manager',
  'operations_manager',
  'fitness_manager',
  'head_trainer',
  'senior_trainer',
  'trainer',
  'trainee_trainer',
  'receptionist',
  'membership_coordinator',
  'nutritionist',
  'physiotherapist',
  'maintenance_supervisor',
  'maintenance_staff',
  'client'
);
CREATE TYPE trainer_specialization AS ENUM (
  'Strength Training',
  'Cardio Fitness',
  'Yoga',
  'Pilates',
  'CrossFit',
  'Nutrition',
  'Personal Training',
  'Group Fitness',
  'Sports Conditioning',
  'Rehabilitation'
);
CREATE TYPE department_type AS ENUM ('Management', 'Training', 'Operations', 'Reception', 'Maintenance');
CREATE TYPE access_level AS ENUM ('Full', 'High', 'Medium', 'Basic', 'Limited');
CREATE TYPE staff_status AS ENUM ('Active', 'Inactive', 'On Leave', 'Terminated');

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'client',
  is_admin BOOLEAN DEFAULT FALSE,
  is_staff BOOLEAN DEFAULT FALSE,
  staff_category staff_category,
  department department_type,
  specializations trainer_specialization[] DEFAULT '{}',
  access_level access_level NOT NULL DEFAULT 'Limited',
  reporting_to UUID REFERENCES profiles(id),
  shift_preference JSONB,
  max_clients INTEGER,
  certifications TEXT[] DEFAULT '{}',
  primary_location TEXT,
  secondary_locations TEXT[] DEFAULT '{}',
  working_hours JSONB,
  contact_phone TEXT,
  emergency_contact JSONB,
  status staff_status DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  CONSTRAINT valid_email_format CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create staff_schedules table
CREATE TABLE staff_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create staff_certifications table
CREATE TABLE staff_certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  certification_name TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE,
  verification_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create RLS Policies

-- Profiles policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Management can view all profiles"
  ON profiles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND access_level = 'Full'
  ));

CREATE POLICY "Department heads can view department profiles"
  ON profiles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles viewer
    WHERE viewer.id = auth.uid()
    AND viewer.access_level = 'High'
    AND viewer.department = profiles.department
  ));

-- Helper Functions

CREATE OR REPLACE FUNCTION get_default_access_level(role user_role)
RETURNS access_level AS $$
BEGIN
  RETURN CASE role
    WHEN 'admin' THEN 'Full'::access_level
    WHEN 'general_manager' THEN 'Full'::access_level
    WHEN 'operations_manager' THEN 'High'::access_level
    WHEN 'fitness_manager' THEN 'High'::access_level
    WHEN 'head_trainer' THEN 'High'::access_level
    WHEN 'senior_trainer' THEN 'Medium'::access_level
    WHEN 'trainer' THEN 'Basic'::access_level
    ELSE 'Limited'::access_level
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_staff_category(role user_role)
RETURNS staff_category AS $$
BEGIN
  RETURN CASE 
    WHEN role IN ('admin', 'general_manager', 'operations_manager') THEN 'Management'::staff_category
    WHEN role IN ('fitness_manager', 'head_trainer', 'senior_trainer', 'trainer', 'trainee_trainer') THEN 'Training'::staff_category
    WHEN role IN ('receptionist', 'membership_coordinator') THEN 'Reception'::staff_category
    WHEN role IN ('maintenance_supervisor', 'maintenance_staff') THEN 'Maintenance'::staff_category
    ELSE NULL
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for setting default values
CREATE OR REPLACE FUNCTION set_staff_defaults()
RETURNS TRIGGER AS $$
BEGIN
  NEW.access_level := get_default_access_level(NEW.role);
  NEW.staff_category := get_staff_category(NEW.role);
  NEW.is_staff := NEW.role != 'client';
  NEW.is_admin := NEW.role = 'admin';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER set_staff_defaults_trigger
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION set_staff_defaults();

-- Email validation function
CREATE OR REPLACE FUNCTION validate_staff_email()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_staff AND NEW.email NOT LIKE '%@uptowngym.rw' THEN
    RAISE EXCEPTION 'Staff email must use @uptowngym.rw domain';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
