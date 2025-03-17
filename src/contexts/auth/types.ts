
import { UserRole } from '@/types/auth.types';

// Define a simpler profile type that matches what we use in the app
export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  role: UserRole;
  is_admin: boolean;
  is_staff: boolean;
  staff_category: string | null;
  department: string | null;
  access_level: string;
  status: string;
  contact_number: string | null;
  preferred_workout_time: string | null;
  gym_location: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: string;
  email: string | undefined;
  full_name: string | null | undefined;
  role: UserRole;
  is_admin: boolean;
  app_metadata: any;
  aud: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  updatePassword: (password: string) => Promise<boolean>;
}
