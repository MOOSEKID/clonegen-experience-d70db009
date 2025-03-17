-- Drop existing tables and types to ensure clean slate
DROP TABLE IF EXISTS staff_schedules CASCADE;
DROP TABLE IF EXISTS staff_certifications CASCADE;
DROP TYPE IF EXISTS staff_category CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS trainer_specialization CASCADE;
DROP TYPE IF EXISTS department_type CASCADE;
DROP TYPE IF EXISTS access_level CASCADE;
DROP TYPE IF EXISTS staff_status CASCADE;

-- Create enum types
CREATE TYPE staff_category AS ENUM (
  'management',
  'training',
  'operations',
  'reception',
  'maintenance'
);

CREATE TYPE user_role AS ENUM (
  'admin',
  'general_manager',
  'operations_manager',
  'fitness_manager',
  'head_trainer',
  'senior_trainer',
  'trainer',
  'trainee_trainer',
  'operations_supervisor',
  'maintenance_supervisor',
  'receptionist',
  'membership_coordinator',
  'nutritionist',
  'physiotherapist',
  'maintenance_staff',
  'cleaner',
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

-- Update profiles table with new schema
ALTER TABLE profiles
DROP COLUMN IF EXISTS username,
DROP COLUMN IF EXISTS avatar_url,
DROP COLUMN IF EXISTS website,
DROP COLUMN IF EXISTS contact_number,
DROP COLUMN IF EXISTS gym_location,
DROP COLUMN IF EXISTS preferred_workout_time,
ADD COLUMN IF NOT EXISTS email TEXT NOT NULL,
ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'individual_client',
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_staff BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS staff_category staff_category,
ADD COLUMN IF NOT EXISTS department department_type,
ADD COLUMN IF NOT EXISTS access_level access_level DEFAULT 'limited',
ADD COLUMN IF NOT EXISTS status staff_status DEFAULT 'active',
ADD COLUMN IF NOT EXISTS specializations trainer_specialization[],
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

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_staff_category ON profiles(staff_category);
CREATE INDEX IF NOT EXISTS idx_profiles_department ON profiles(department);
CREATE INDEX IF NOT EXISTS idx_profiles_access_level ON profiles(access_level);
CREATE INDEX IF NOT EXISTS idx_profiles_reporting_to ON profiles(reporting_to);

-- Create default admin user if not exists
INSERT INTO profiles (
  id,
  email,
  full_name,
  role,
  is_admin,
  is_staff,
  staff_category,
  department,
  access_level,
  status,
  working_hours,
  primary_location,
  contact_email,
  created_at,
  updated_at
)
VALUES (
  'ae03b6c3-ab15-47d1-930e-4269d2d45a25',
  'admin@uptowngym.rw',
  'Admin User',
  'admin',
  TRUE,
  TRUE,
  'management',
  'management',
  'full',
  'active',
  '{"start": "09:00", "end": "17:00", "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}'::jsonb,
  'Main Gym',
  'admin@uptowngym.rw',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE
SET
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_staff = EXCLUDED.is_staff,
  staff_category = EXCLUDED.staff_category,
  department = EXCLUDED.department,
  access_level = EXCLUDED.access_level,
  status = EXCLUDED.status,
  working_hours = EXCLUDED.working_hours,
  primary_location = EXCLUDED.primary_location,
  contact_email = EXCLUDED.contact_email,
  updated_at = NOW();
