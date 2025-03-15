
import { createContext, ReactNode } from 'react';
import { useAuthState } from '@/hooks/useAuthState';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType } from '@/types/auth.types';
import { toast } from 'sonner';
import { passwordManager, storageManager } from '@/utils/auth.utils';

// Create the auth context with default values
export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Get the authentication state using our custom hook
  const { 
    user, 
    isAdmin, 
    isLoading, 
    isAuthenticated,
    setUser,
    setIsAdmin, 
    setIsAuthenticated 
  } = useAuthState();

  /**
   * Login with email and password
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error);
        toast.error(error.message);
        return false;
      }
      
      if (data.user) {
        // Get user role from profiles table
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role, is_admin')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.error('Error fetching user profile:', profileError);
        }
        
        const userRole = profile?.role || 'member';
        const userIsAdmin = profile?.is_admin || false;
        
        // Update auth state
        setUser({
          ...data.user,
          email: data.user.email || '', // Ensure email is always provided
          role: userRole
        });
        setIsAdmin(userIsAdmin);
        setIsAuthenticated(true);
        
        // Store auth data in local storage and cookies
        storageManager.setAuthData(
          true, 
          userIsAdmin, 
          data.user.email || '', 
          data.user.user_metadata?.full_name || data.user.email || ''
        );
        
        toast.success('Login successful');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Unexpected login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
      return false;
    }
  };

  /**
   * Sign up a new user
   */
  const signUp = async (email: string, password: string, fullName: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      
      if (error) {
        console.error('Sign up error:', error);
        toast.error(error.message);
        return false;
      }
      
      if (data.user) {
        // Create a profile entry for the new user
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user.id,
              email: data.user.email,
              full_name: fullName,
              role: 'member',
              is_admin: false
            }
          ]);
          
        if (profileError) {
          console.error('Error creating user profile:', profileError);
          toast.error('Account created but profile setup failed');
        }
        
        toast.success('Sign up successful! Please check your email to confirm your account.');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Unexpected sign up error:', error);
      toast.error(error instanceof Error ? error.message : 'Sign up failed');
      return false;
    }
  };

  /**
   * Log out the current user
   */
  const logout = async (): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        toast.error(error.message);
        return false;
      }
      
      // Clear auth state
      setUser(null);
      setIsAdmin(false);
      setIsAuthenticated(false);
      
      // Clear local storage and cookies
      storageManager.setAuthData(false, false, '', '');
      
      toast.success('Logged out successfully');
      return true;
    } catch (error) {
      console.error('Unexpected logout error:', error);
      toast.error(error instanceof Error ? error.message : 'Logout failed');
      return false;
    }
  };

  /**
   * Request a password reset for the given email
   */
  const requestPasswordReset = async (email: string): Promise<boolean> => {
    return passwordManager.requestPasswordReset(email);
  };

  /**
   * Update the password for the currently logged in user
   */
  const updatePassword = async (newPassword: string): Promise<boolean> => {
    return passwordManager.updatePassword(newPassword);
  };

  const value: AuthContextType = {
    user,
    isAdmin,
    isLoading,
    isAuthenticated,
    login,
    signUp,
    logout,
    requestPasswordReset,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
