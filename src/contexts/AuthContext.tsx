
import { createContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Session, User } from '@supabase/supabase-js';
import useLoginService from '@/hooks/auth/useLoginService';
import useSignUpService from '@/hooks/auth/useSignUpService';
import useLogoutService from '@/hooks/auth/useLogoutService';
import usePasswordService from '@/hooks/auth/usePasswordService';
import { Profile } from '@/types/database.types';
import { AuthUser, UserProfile } from '@/types/auth.types';

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

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);

  const { loginWithPassword } = useLoginService();
  const { signUpWithPassword } = useSignUpService();
  const { logoutUser } = useLogoutService();
  const { resetPasswordForEmail, updateUserPassword } = usePasswordService();

  // Initial session check
  useEffect(() => {
    const getInitialSession = async () => {
      try {
        setIsLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          return;
        }
        
        if (session) {
          setSession(session);
          setUser({
            id: session.user.id,
            email: session.user.email || '',
          });
          
          // Fetch user profile
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profileError) {
            console.error('Error fetching profile:', profileError);
          } else if (profileData) {
            const userProfile: UserProfile = {
              id: profileData.id,
              email: profileData.email,
              full_name: profileData.full_name || '',
              username: profileData.username || '',
              avatar_url: profileData.avatar_url || '',
              role: profileData.role,
              is_admin: profileData.is_admin,
              is_staff: profileData.is_staff,
              staff_category: profileData.staff_category,
              department: profileData.department,
              access_level: profileData.access_level,
              status: profileData.status,
              contact_number: profileData.contact_number || '',
              preferred_workout_time: profileData.preferred_workout_time || '',
              gym_location: profileData.gym_location || '',
              created_at: profileData.created_at,
              updated_at: profileData.updated_at
            };
            
            setProfile(userProfile);
            setIsAdmin(profileData.is_admin || false);
          }
          
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Session initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getInitialSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession) {
          setUser({
            id: currentSession.user.id,
            email: currentSession.user.email || '',
          });
          
          // Fetch user profile
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentSession.user.id)
            .single();
          
          if (profileError) {
            console.error('Error fetching profile:', profileError);
          } else if (profileData) {
            const userProfile: UserProfile = {
              id: profileData.id,
              email: profileData.email,
              full_name: profileData.full_name || '',
              username: profileData.username || '',
              avatar_url: profileData.avatar_url || '',
              role: profileData.role,
              is_admin: profileData.is_admin,
              is_staff: profileData.is_staff,
              staff_category: profileData.staff_category,
              department: profileData.department,
              access_level: profileData.access_level,
              status: profileData.status,
              contact_number: profileData.contact_number || '',
              preferred_workout_time: profileData.preferred_workout_time || '',
              gym_location: profileData.gym_location || '',
              created_at: profileData.created_at,
              updated_at: profileData.updated_at
            };
            
            setProfile(userProfile);
            setIsAdmin(profileData.is_admin || false);
          }
          
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setProfile(null);
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await loginWithPassword(email, password);
      
      if (result.success) {
        setIsAuthenticated(true);
        toast.success('Logged in successfully');
        return true;
      } else {
        toast.error(result.error || 'Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      const result = await signUpWithPassword(email, password, name);
      
      if (result.success) {
        toast.success('Account created successfully! Please check your email to confirm your account.');
        return true;
      } else {
        toast.error(result.error || 'Signup failed');
        return false;
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Signup failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await logoutUser();
      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const result = await resetPasswordForEmail(email);
      
      if (result.success) {
        toast.success('Password reset email sent. Please check your inbox.');
        return true;
      } else {
        toast.error(result.error || 'Password reset failed');
        return false;
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Password reset failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (password: string) => {
    try {
      setIsLoading(true);
      const result = await updateUserPassword(password);
      
      if (result.success) {
        toast.success('Password updated successfully');
        return true;
      } else {
        toast.error(result.error || 'Password update failed');
        return false;
      }
    } catch (error) {
      console.error('Password update error:', error);
      toast.error('Password update failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    profile,
    isAuthenticated,
    isLoading,
    isAdmin,
    login,
    signUp,
    logout,
    resetPassword,
    updatePassword
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
