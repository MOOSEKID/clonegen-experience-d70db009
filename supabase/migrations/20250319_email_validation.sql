-- Create function to validate email format
CREATE OR REPLACE FUNCTION validate_staff_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Only validate @uptowngym.rw emails
  IF NEW.email LIKE '%@uptowngym.rw' THEN
    -- Admin email validation
    IF NEW.email = 'admin@uptowngym.rw' AND NEW.role != 'admin' THEN
      RAISE EXCEPTION 'Invalid role for admin email';
    END IF;

    -- Staff email format validation
    IF NEW.is_staff AND NEW.email != 'admin@uptowngym.rw' THEN
      -- Extract username part
      DECLARE
        username text := split_part(NEW.email, '@', 1);
        role_prefix text;
      BEGIN
        -- Get expected role prefix
        role_prefix := CASE NEW.role
          -- Management roles
          WHEN 'general_manager' THEN 'general.manager'
          WHEN 'operations_manager' THEN 'operations.manager'
          WHEN 'fitness_manager' THEN 'fitness.manager'
          -- Training roles
          WHEN 'head_trainer' THEN 'head.trainer'
          WHEN 'senior_trainer' THEN 'senior.trainer'
          WHEN 'trainee_trainer' THEN 'trainee'
          WHEN 'trainer' THEN 'trainer'
          -- Operations roles
          WHEN 'operations_supervisor' THEN 'supervisor'
          WHEN 'receptionist' THEN 'receptionist'
          WHEN 'membership_coordinator' THEN 'membership'
          WHEN 'nutritionist' THEN 'nutritionist'
          WHEN 'physiotherapist' THEN 'physio'
          -- Maintenance roles
          WHEN 'maintenance_supervisor' THEN 'maintenance.supervisor'
          WHEN 'maintenance_staff' THEN 'maintenance'
          WHEN 'cleaner' THEN 'cleaner'
          ELSE NULL
        END;

        -- Validate email format
        IF role_prefix IS NOT NULL AND NOT username LIKE role_prefix || '%' THEN
          RAISE EXCEPTION 'Invalid email format for role. Expected format: %%.name@uptowngym.rw', role_prefix;
        END IF;
      END;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for email validation
DROP TRIGGER IF EXISTS validate_staff_email_trigger ON profiles;
CREATE TRIGGER validate_staff_email_trigger
  BEFORE INSERT OR UPDATE OF email, role ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION validate_staff_email();

-- Create function to generate staff email
CREATE OR REPLACE FUNCTION generate_staff_email(
  role user_role,
  full_name text
) RETURNS text AS $$
DECLARE
  role_prefix text;
  name_part text;
BEGIN
  -- Get role prefix
  role_prefix := CASE role
    -- Management roles
    WHEN 'general_manager' THEN 'general.manager'
    WHEN 'operations_manager' THEN 'operations.manager'
    WHEN 'fitness_manager' THEN 'fitness.manager'
    -- Training roles
    WHEN 'head_trainer' THEN 'head.trainer'
    WHEN 'senior_trainer' THEN 'senior.trainer'
    WHEN 'trainee_trainer' THEN 'trainee'
    WHEN 'trainer' THEN 'trainer'
    -- Operations roles
    WHEN 'operations_supervisor' THEN 'supervisor'
    WHEN 'receptionist' THEN 'receptionist'
    WHEN 'membership_coordinator' THEN 'membership'
    WHEN 'nutritionist' THEN 'nutritionist'
    WHEN 'physiotherapist' THEN 'physio'
    -- Maintenance roles
    WHEN 'maintenance_supervisor' THEN 'maintenance.supervisor'
    WHEN 'maintenance_staff' THEN 'maintenance'
    WHEN 'cleaner' THEN 'cleaner'
    ELSE NULL
  END;

  -- Handle admin case
  IF role = 'admin' THEN
    RETURN 'admin@uptowngym.rw';
  END IF;

  -- Generate name part (convert spaces to dots, remove special characters, lowercase)
  name_part := lower(regexp_replace(full_name, '[^a-zA-Z ]', '', 'g'));
  name_part := regexp_replace(name_part, '\s+', '.', 'g');

  -- Return formatted email
  RETURN format('%s.%s@uptowngym.rw', role_prefix, name_part);
END;
$$ LANGUAGE plpgsql;

-- Add email format check constraint
ALTER TABLE profiles
ADD CONSTRAINT valid_email_format
CHECK (
  (
    is_staff = false
    OR
    email LIKE '%@uptowngym.rw'
    OR
    role IN ('corporate_client', 'individual_client')
  )
);
