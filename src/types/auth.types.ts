
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
  | 'member'
  | 'client';

export type AccessLevel = 'Full' | 'High' | 'Medium' | 'Basic' | 'Limited';

export type StaffCategory = 'Management' | 'Training' | 'Operations' | 'Reception' | 'Maintenance';

export type StaffStatus = 'Active' | 'Inactive' | 'On Leave' | 'Terminated';

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  is_admin: boolean;
  is_staff: boolean;
  status: string;
  access_level: AccessLevel;
  created_at: string;
  updated_at: string;
  user_metadata?: Record<string, any>;
  avatar_url?: string | null;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, fullName: string) => Promise<boolean>;
  logout: () => Promise<void>;
}
