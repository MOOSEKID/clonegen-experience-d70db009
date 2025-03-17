
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { AuthUser, CompleteUserProfile, StaffCategory, AccessLevel, Department, StaffStatus } from '@/types/auth.types';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  staff_category: StaffCategory | null;
  role: string | null;
  is_admin: boolean;
  access_level: AccessLevel | null;
  department: Department | null;
  specializations: string[] | null;
  reporting_to: string | null;
  shift_preference: string | null;
  max_clients: number | null;
  certifications: string[] | null;
  primary_location: string | null;
  secondary_locations: string | null;
  working_hours: {
    start: string;
    end: string;
    days: string[];
  } | null;
  contact_email: string | null;
  contact_phone: string | null;
  emergency_contact: {
    name: string;
    phone: string;
    relationship: string;
  } | null;
  status: StaffStatus | null;
  created_at: string | null;
  updated_at: string | null;
  last_login: string | null;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Fetch profile data
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      if (data) {
        setProfile(data);
        setIsAdmin(data.is_admin || false);
      } else if (isAdmin) {
        // Create admin profile if it doesn't exist
        const adminProfile: Profile = {
          id: userId,
          email: 'admin@uptowngym.rw',
          full_name: 'System Admin',
          staff_category: 'management',
          role: 'admin',
          is_admin: true,
          access_level: 'full',
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
          department: 'management',
          specializations: null,
          reporting_to: null,
          shift_preference: null,
          max_clients: null,
          certifications: null,
          primary_location: null,
          secondary_locations: null,
          working_hours: null,
          contact_email: null,
          contact_phone: null,
          emergency_contact: null
        };

        const { error: insertError } = await supabase
          .from('profiles')
          .insert([adminProfile]);

        if (insertError) throw insertError;
        setProfile(adminProfile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load user profile');
    }
  };

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session?.user) {
          setIsAuthenticated(true);
          // Check if user is admin
          setIsAdmin(session.user.email === 'admin@uptowngym.rw');
          await fetchProfile(session.user.id);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        toast.error('Authentication check failed');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setIsAuthenticated(true);
        setIsAdmin(session.user.email === 'admin@uptowngym.rw');
        await fetchProfile(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        setIsAuthenticated(true);
        setIsAdmin(data.user.email === 'admin@uptowngym.rw');
        await fetchProfile(data.user.id);
        toast.success('Signed in successfully');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Failed to sign in');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        // Create customer profile
        const customerProfile: Profile = {
          id: data.user.id,
          email,
          full_name: fullName,
          staff_category: 'customer',
          role: 'customer',
          is_admin: false,
          access_level: 'limited',
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
          department: null,
          specializations: null,
          reporting_to: null,
          shift_preference: null,
          max_clients: null,
          certifications: null,
          primary_location: null,
          secondary_locations: null,
          working_hours: null,
          contact_email: null,
          contact_phone: null,
          emergency_contact: null
        };

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([customerProfile]);

        if (profileError) throw profileError;
        toast.success('Account created successfully');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Failed to create account');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setIsAuthenticated(false);
      setIsAdmin(false);
      setProfile(null);
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isAdmin,
      isLoading,
      profile,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
