
-- Create a function to sync missing trainer profiles
CREATE OR REPLACE FUNCTION public.sync_missing_trainer_profiles()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO trainer_profiles (
    id,
    staff_id,
    name,
    email,
    phone,
    status,
    experience_level,
    years_of_experience,
    specializations,
    bio,
    profilepicture
  )
  SELECT
    s.id,         -- Use staff.id as trainer_profiles.id
    s.id,
    s.full_name,
    s.email,
    s.phone,
    s.status,
    'Beginner',   -- default experience level
    0,            -- default years
    ARRAY['General Fitness'], -- default specialization
    '',
    'https://example.com/default-trainer.png'
  FROM staff s
  WHERE s.role = 'trainer'
    AND NOT EXISTS (
      SELECT 1
      FROM trainer_profiles tp
      WHERE tp.id = s.id
    );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.sync_missing_trainer_profiles() TO authenticated;
