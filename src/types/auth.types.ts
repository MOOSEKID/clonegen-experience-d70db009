
import { Session, User, UserAppMetadata } from '@supabase/supabase-js';

export type UserRole =
  | 'admin'
  | 'general_manager'
  | 'operations_manager'
  | 'fitness_manager'
  | 'head_trainer'
  | 'senior_trainer'
  | 'trainer'
  | 'trainee_trainer'
  | 'supervisor'
  | 'receptionist'
  | 'membership_coordinator'
  | 'nutritionist'
  | 'physiotherapist'
  | 'maintenance_supervisor'
  | 'maintenance_staff'
  | 'cleaner'
  | 'individual_client'
  | 'operations_supervisor'; // Added to match what's used in useTestUsers.ts

export type StaffCategory =
  | 'management'
  | 'training'
  | 'operations'
  | 'reception'
  | 'maintenance'
  | 'customer';

export type AccessLevel =
  | 'full'
  | 'high'
  | 'medium'
  | 'basic'
  | 'limited';

export type Department =
  | 'management'
  | 'training'
  | 'operations'
  | 'reception'
  | 'maintenance'
  | 'nutrition'
  | 'rehabilitation'
  | 'customer_service';

export type StaffStatus =
  | 'active'
  | 'inactive'
  | 'on_leave'
  | 'terminated';

// Auth user type that combines Supabase user and profile data
export interface AuthUser {
  id: string;
  email: string | undefined;
  full_name: string | null | undefined;
  role: UserRole;
  is_admin: boolean;
  is_staff?: boolean;
  app_metadata: UserAppMetadata;
  aud: string;
}

// Extended profile type to include optional user authentication info
export interface CompleteUserProfile {
  id: string;
  email: string;
  full_name: string | null;
  staff_category: StaffCategory | null;
  role: string;
  is_admin: boolean;
  is_staff: boolean;
  access_level: AccessLevel;
  department: Department | null;
  status: StaffStatus;
  // Any additional fields needed
}

// Auth state interface for context provider
export interface AuthState {
  session: Session | null;
  user: AuthUser | null;
  profile: CompleteUserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}
