-- Create enum types for staff roles and categories
CREATE TYPE staff_category AS ENUM (
  'management',
  'training',
  'operations',
  'maintenance',
  'reception'
);

CREATE TYPE user_role AS ENUM (
  -- Management roles
  'admin',
  'general_manager',
  'operations_manager',
  'fitness_manager',
  
  -- Training roles
  'head_trainer',
  'senior_trainer',
  'trainer',
  'trainee_trainer',
  
  -- Operations roles
  'operations_supervisor',
  'receptionist',
  'membership_coordinator',
  'nutritionist',
  'physiotherapist',
  
  -- Maintenance roles
  'maintenance_supervisor',
  'maintenance_staff',
  'cleaner',
  
  -- Client roles
  'corporate_client',
  'individual_client'
);

CREATE TYPE trainer_specialization AS ENUM (
  'general_fitness',
  'strength_conditioning',
  'cardio',
  'yoga',
  'pilates',
  'crossfit',
  'martial_arts',
  'swimming',
  'rehabilitation',
  'nutrition'
);

CREATE TYPE department_type AS ENUM (
  'management',
  'training',
  'operations',
  'maintenance',
  'reception',
  'nutrition',
  'rehabilitation'
);

CREATE TYPE access_level AS ENUM (
  'full',
  'high',
  'medium',
  'basic',
  'limited'
);

CREATE TYPE staff_status AS ENUM (
  'active',
  'inactive',
  'on_leave',
  'terminated'
);

-- Update profiles table with new staff fields
ALTER TABLE profiles
DROP COLUMN IF EXISTS staff_type,
DROP COLUMN IF EXISTS specialization,
DROP COLUMN IF EXISTS customer_type,
DROP COLUMN IF EXISTS membership_type,
DROP COLUMN IF EXISTS membership_status,
ADD COLUMN IF NOT EXISTS staff_category staff_category,
ADD COLUMN IF NOT EXISTS department department_type,
ADD COLUMN IF NOT EXISTS specializations trainer_specialization[],
ADD COLUMN IF NOT EXISTS access_level access_level,
ADD COLUMN IF NOT EXISTS reporting_to UUID REFERENCES profiles(id),
ADD COLUMN IF NOT EXISTS shift_preference TEXT,
ADD COLUMN IF NOT EXISTS max_clients INTEGER,
ADD COLUMN IF NOT EXISTS certifications TEXT[],
ADD COLUMN IF NOT EXISTS primary_location TEXT,
ADD COLUMN IF NOT EXISTS secondary_locations TEXT[],
ADD COLUMN IF NOT EXISTS working_hours JSONB,
ADD COLUMN IF NOT EXISTS contact_email TEXT,
ADD COLUMN IF NOT EXISTS contact_phone TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact JSONB,
ADD COLUMN IF NOT EXISTS status staff_status DEFAULT 'active',
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;

-- Create staff schedules table
CREATE TABLE IF NOT EXISTS staff_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  day_of_week TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create staff certifications table
CREATE TABLE IF NOT EXISTS staff_certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  certification_name TEXT NOT NULL,
  issuing_body TEXT,
  issue_date DATE,
  expiry_date DATE,
  certification_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create default access levels for roles
CREATE OR REPLACE FUNCTION get_default_access_level(role user_role)
RETURNS access_level AS $$
BEGIN
  RETURN CASE
    WHEN role IN ('admin', 'general_manager') THEN 'full'::access_level
    WHEN role IN ('operations_manager', 'fitness_manager', 'head_trainer') THEN 'high'::access_level
    WHEN role IN ('senior_trainer', 'operations_supervisor', 'maintenance_supervisor') THEN 'medium'::access_level
    WHEN role IN ('trainer', 'receptionist', 'membership_coordinator', 'nutritionist', 'physiotherapist') THEN 'basic'::access_level
    ELSE 'limited'::access_level
  END;
END;
$$ LANGUAGE plpgsql;

-- Create function to get staff category from role
CREATE OR REPLACE FUNCTION get_staff_category(role user_role)
RETURNS staff_category AS $$
BEGIN
  RETURN CASE
    WHEN role IN ('admin', 'general_manager', 'operations_manager', 'fitness_manager') THEN 'management'::staff_category
    WHEN role IN ('head_trainer', 'senior_trainer', 'trainer', 'trainee_trainer') THEN 'training'::staff_category
    WHEN role IN ('operations_supervisor', 'receptionist', 'membership_coordinator', 'nutritionist', 'physiotherapist') THEN 'operations'::staff_category
    WHEN role IN ('maintenance_supervisor', 'maintenance_staff', 'cleaner') THEN 'maintenance'::staff_category
    ELSE NULL
  END;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to set default access level and staff category
CREATE OR REPLACE FUNCTION set_staff_defaults()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_staff THEN
    NEW.access_level := get_default_access_level(NEW.role::user_role);
    NEW.staff_category := get_staff_category(NEW.role::user_role);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_staff_defaults_trigger
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION set_staff_defaults();
