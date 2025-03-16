import { User } from '@supabase/supabase-js';

// User Roles
export type UserRole = 
  // Staff roles
  | 'admin'
  | 'manager'
  | 'trainer'
  | 'staff'
  // Customer roles
  | 'corporate_client'
  | 'individual_client';

// User Types
export interface AuthUser extends User {
  email: string;
  role: UserRole;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  is_admin: boolean;
  is_staff: boolean;
  company_id?: string;
  position?: string;
  department?: string;
  // Staff-specific fields
  staff_type?: 'manager' | 'trainer' | 'other';
  specialization?: string[];
  // Customer-specific fields
  customer_type?: 'individual' | 'corporate';
  membership_type?: string;
  membership_status?: 'active' | 'inactive' | 'pending';
}

export interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  isStaff: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<boolean>;
}
