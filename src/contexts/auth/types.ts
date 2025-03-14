
import { User, Session } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any | null, data: any | null }>;
  signOut: () => Promise<void>;
  createAdminAccount: (email: string, password: string, name: string) => Promise<{ error: any | null, data: any | null }>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface UserData {
  name: string;
  username: string;
}
