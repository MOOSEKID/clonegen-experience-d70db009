-- Create enum types
CREATE TYPE staff_category AS ENUM ('management', 'training', 'operations', 'reception', 'maintenance');
CREATE TYPE department_type AS ENUM ('management', 'training', 'reception', 'maintenance', 'nutrition', 'rehabilitation', 'operations');
CREATE TYPE access_level AS ENUM ('full', 'high', 'medium', 'basic', 'limited');
CREATE TYPE staff_status AS ENUM ('active', 'inactive', 'on_leave', 'terminated');

-- Add new columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS staff_category staff_category,
ADD COLUMN IF NOT EXISTS department department_type,
ADD COLUMN IF NOT EXISTS access_level access_level,
ADD COLUMN IF NOT EXISTS status staff_status DEFAULT 'active',
ADD COLUMN IF NOT EXISTS contact_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS contact_phone VARCHAR(50),
ADD COLUMN IF NOT EXISTS emergency_contact JSONB,
ADD COLUMN IF NOT EXISTS working_hours JSONB,
ADD COLUMN IF NOT EXISTS primary_location VARCHAR(255),
ADD COLUMN IF NOT EXISTS secondary_locations VARCHAR(255)[],
ADD COLUMN IF NOT EXISTS reporting_to UUID REFERENCES profiles(id),
ADD COLUMN IF NOT EXISTS shift_preference VARCHAR(50),
ADD COLUMN IF NOT EXISTS max_clients INTEGER,
ADD COLUMN IF NOT EXISTS certifications VARCHAR(255)[],
ADD COLUMN IF NOT EXISTS specializations VARCHAR(255)[],
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;

-- Update existing admin user
UPDATE profiles 
SET 
  staff_category = 'management',
  department = 'management',
  access_level = 'full',
  status = 'active',
  contact_email = 'admin@uptowngym.rw',
  working_hours = '{"start": "09:00", "end": "17:00", "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}'::jsonb,
  primary_location = 'Main Gym'
WHERE role = 'admin';

-- Create email validation function
CREATE OR REPLACE FUNCTION validate_staff_email()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_staff = true AND NOT (NEW.email LIKE '%@uptowngym.rw') THEN
    RAISE EXCEPTION 'Staff email must use @uptowngym.rw domain';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for email validation
DROP TRIGGER IF EXISTS validate_staff_email_trigger ON profiles;
CREATE TRIGGER validate_staff_email_trigger
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION validate_staff_email();
