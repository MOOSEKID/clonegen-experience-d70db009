
export interface UserProfile {
  id: string;
  full_name: string | null;
  username: string | null;
  contact_number: string | null;
  preferred_workout_time: string | null;
  gym_location: string | null;
  avatar_url: string | null;
  bio: string | null; // Bio is properly defined as nullable
  role: string;
  is_admin: boolean;
  is_staff: boolean;
  email?: string;
  created_at: string;
  updated_at: string;
  specialization?: string[]; // Optional field
}

export interface UserProfileUpdate extends Partial<UserProfile> {}
