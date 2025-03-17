
export interface UserProfile {
  id: string;
  full_name: string;
  username: string | null;
  contact_number: string | null;
  preferred_workout_time: string | null;
  gym_location: string | null;
  avatar_url: string | null;
  role: string;
  is_admin: boolean;
  email: string;
  created_at: string;
  updated_at: string;
  
  // Additional fields for better type compatibility
  bio?: string;
  phone?: string;
  hire_date?: string;
  profile_picture?: string;
  specialization?: string[];
  specializations?: string[];
  experience_level?: string;
  experience_years?: number;
  name?: string;
}
