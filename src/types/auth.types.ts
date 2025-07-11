
import { User } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email?: string; // Changed from required to optional to match Supabase User type
  role?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string; // Add avatar_url property to fix the TypeScript error
  };
  // Add any other properties from Supabase User that we need
  app_metadata?: any;
  confirmation_sent_at?: string;
  confirmed_at?: string;
  createdAt?: string;
  factors?: any[];
  identities?: any[];
  last_sign_in_at?: string;
  phone?: string;
  recovery_sent_at?: string;
  updatedAt?: string;
  aud?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, fullName: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  updatePassword: (newPassword: string) => Promise<boolean>;
}
