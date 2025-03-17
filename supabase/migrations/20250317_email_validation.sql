-- Add email validation functions and constraints

-- Function to validate staff email format
CREATE OR REPLACE FUNCTION validate_staff_email(email TEXT, role user_role)
RETURNS BOOLEAN AS $$
BEGIN
  -- Admin email is reserved
  IF role = 'admin' THEN
    RETURN email = 'admin@uptowngym.rw';
  END IF;

  -- Staff emails must use @uptowngym.rw domain
  IF NOT email LIKE '%@uptowngym.rw' THEN
    RETURN FALSE;
  END IF;

  -- Get role prefix from email
  DECLARE
    prefix TEXT := split_part(split_part(email, '@', 1), '.', 1);
    second_part TEXT := split_part(split_part(email, '@', 1), '.', 2);
  BEGIN
    RETURN CASE role
      -- Management roles
      WHEN 'general_manager' THEN prefix = 'general' AND second_part = 'manager'
      WHEN 'operations_manager' THEN prefix = 'operations' AND second_part = 'manager'
      WHEN 'fitness_manager' THEN prefix = 'fitness' AND second_part = 'manager'
      
      -- Training roles
      WHEN 'head_trainer' THEN prefix = 'head' AND second_part = 'trainer'
      WHEN 'senior_trainer' THEN prefix = 'senior' AND second_part = 'trainer'
      WHEN 'trainer' THEN prefix = 'trainer'
      WHEN 'trainee_trainer' THEN prefix = 'trainee'
      
      -- Operations roles
      WHEN 'operations_supervisor' THEN prefix = 'supervisor'
      WHEN 'receptionist' THEN prefix = 'receptionist'
      WHEN 'membership_coordinator' THEN prefix = 'membership'
      WHEN 'nutritionist' THEN prefix = 'nutritionist'
      WHEN 'physiotherapist' THEN prefix = 'physio'
      
      -- Maintenance roles
      WHEN 'maintenance_supervisor' THEN prefix = 'maintenance' AND second_part = 'supervisor'
      WHEN 'maintenance_staff' THEN prefix = 'maintenance'
      WHEN 'cleaner' THEN prefix = 'cleaner'
      
      ELSE FALSE
    END;
  END;
END;
$$ LANGUAGE plpgsql;

-- Function to generate staff email
CREATE OR REPLACE FUNCTION generate_staff_email(role user_role, full_name TEXT)
RETURNS TEXT AS $$
DECLARE
  formatted_name TEXT;
  role_prefix TEXT;
BEGIN
  -- Return admin email for admin role
  IF role = 'admin' THEN
    RETURN 'admin@uptowngym.rw';
  END IF;

  -- Format name: lowercase, remove special chars, replace spaces with dots
  formatted_name := regexp_replace(
    lower(full_name),
    '[^a-z0-9\s]',
    '',
    'g'
  );
  formatted_name := regexp_replace(
    formatted_name,
    '\s+',
    '.',
    'g'
  );

  -- Get role prefix
  role_prefix := CASE role
    -- Management roles
    WHEN 'general_manager' THEN 'general.manager'
    WHEN 'operations_manager' THEN 'operations.manager'
    WHEN 'fitness_manager' THEN 'fitness.manager'
    
    -- Training roles
    WHEN 'head_trainer' THEN 'head.trainer'
    WHEN 'senior_trainer' THEN 'senior.trainer'
    WHEN 'trainer' THEN 'trainer'
    WHEN 'trainee_trainer' THEN 'trainee'
    
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
    
    ELSE role::TEXT
  END;

  RETURN role_prefix || '.' || formatted_name || '@uptowngym.rw';
END;
$$ LANGUAGE plpgsql;

-- Add constraint to validate email format
ALTER TABLE profiles
ADD CONSTRAINT valid_email_format
CHECK (
  is_staff = FALSE OR
  validate_staff_email(email, role::user_role)
);

-- Create trigger to auto-generate staff email if not provided
CREATE OR REPLACE FUNCTION auto_generate_staff_email()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_staff AND NEW.email IS NULL THEN
    NEW.email := generate_staff_email(NEW.role::user_role, NEW.full_name);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_generate_staff_email_trigger
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_staff_email();

-- Add RLS policy for email uniqueness
CREATE POLICY "Enforce unique staff emails"
ON profiles FOR ALL
TO authenticated
USING (
  NOT EXISTS (
    SELECT 1 FROM profiles p2
    WHERE p2.email = profiles.email
    AND p2.id != profiles.id
    AND p2.is_staff = true
  )
);
