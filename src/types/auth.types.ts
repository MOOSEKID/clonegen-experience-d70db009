
import { User } from '@supabase/supabase-js';

export type StaffCategory = 'Management' | 'Training' | 'Operations' | 'Reception' | 'Maintenance';
export type UserRole = 
  | 'admin'
  | 'general_manager'
  | 'operations_manager'
  | 'fitness_manager'
  | 'head_trainer'
  | 'senior_trainer'
  | 'trainer'
  | 'trainee_trainer'
  | 'receptionist'
  | 'membership_coordinator'
  | 'nutritionist'
  | 'physiotherapist'
  | 'maintenance_supervisor'
  | 'maintenance_staff'
  | 'client'
  | 'member'; // Added 'member' to support existing code

export type TrainerSpecialization = 
  | 'Strength Training'
  | 'Cardio Fitness'
  | 'Yoga'
  | 'Pilates'
  | 'CrossFit'
  | 'Nutrition'
  | 'Personal Training'
  | 'Group Fitness'
  | 'Sports Conditioning'
  | 'Rehabilitation';

export type DepartmentType = 'Management' | 'Training' | 'Operations' | 'Reception' | 'Maintenance';
export type AccessLevel = 'Full' | 'High' | 'Medium' | 'Basic' | 'Limited';
export type StaffStatus = 'Active' | 'Inactive' | 'On Leave' | 'Terminated';

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  is_admin: boolean;
  is_staff: boolean;
  staff_category?: StaffCategory;
  department?: DepartmentType;
  specializations?: TrainerSpecialization[];
  access_level: AccessLevel;
  reporting_to?: string;
  shift_preference?: {
    preferred_days: string[];
    preferred_hours: {
      start: string;
      end: string;
    };
  };
  max_clients?: number;
  certifications?: string[];
  primary_location?: string;
  secondary_locations?: string[];
  working_hours?: {
    [key: string]: {
      start: string;
      end: string;
      is_available: boolean;
    };
  };
  contact_phone?: string;
  emergency_contact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  status: StaffStatus;
  created_at: string;
  updated_at: string;
  last_login?: string;
  user_metadata?: any; // Added for backward compatibility
  avatar_url?: string; // Added for profile pictures
  bio?: string; // Added for user bio
  app_metadata?: any; // Added for Supabase compatibility
}

export interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  isStaff: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, fullName: string, role?: UserRole) => Promise<boolean>;
  logout: () => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  updatePassword: (newPassword: string) => Promise<boolean>;
  updateProfile: (data: Partial<AuthUser>) => Promise<boolean>;
}
