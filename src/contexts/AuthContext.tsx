
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/userProfile.types';

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  resetPassword: async () => {}
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initial session check and auth state subscription
  useEffect(() => {
    // Check for active session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Get user profile information
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profile) {
            setUser({
              id: profile.id,
              email: session.user.email || '',
              full_name: profile.full_name || '',
              username: profile.username || '',
              avatar_url: profile.avatar_url || '',
              role: profile.role || 'individual_client',
              is_admin: profile.is_admin || false,
              bio: profile.bio || '',
              specializations: profile.specializations || [],
              phone: profile.phone || '',
              hire_date: profile.hire_date || '',
              profile_picture: profile.profile_picture || '',
              experience_level: profile.experience_level || '',
              experience_years: profile.experience_years || 0,
              created_at: profile.created_at || '',
              updated_at: profile.updated_at || ''
            });
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          // Get user profile information
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profile) {
            setUser({
              id: profile.id,
              email: session.user.email || '',
              full_name: profile.full_name || '',
              username: profile.username || '',
              avatar_url: profile.avatar_url || '',
              role: profile.role || 'individual_client',
              is_admin: profile.is_admin || false,
              bio: profile.bio || '',
              specializations: profile.specializations || [],
              phone: profile.phone || '',
              hire_date: profile.hire_date || '',
              profile_picture: profile.profile_picture || '',
              experience_level: profile.experience_level || '',
              experience_years: profile.experience_years || 0,
              created_at: profile.created_at || '',
              updated_at: profile.updated_at || ''
            });
          }
        } else {
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
