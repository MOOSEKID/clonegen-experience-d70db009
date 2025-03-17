
import { createContext, ReactNode, useState } from 'react';
import { AuthContextType } from './types';
import { useAuthState } from '@/hooks/useAuthState';
import { useSignUpService } from '@/hooks/auth/useSignUpService';
import { usePasswordService } from '@/hooks/auth/usePasswordService';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { 
    user, 
    isAdmin,
    isLoading, 
    isAuthenticated,
  } = useAuthState();
  
  const [profile, setProfile] = useState(null);
  const { signUp } = useSignUpService();
  const { requestPasswordReset, updatePassword } = usePasswordService();

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        toast.error(error.message);
        return false;
      }

      console.log('Login successful!', data.user);
      return true;
    } catch (error) {
      console.error('Unexpected login error:', error);
      toast.error(error instanceof Error ? error.message : 'An error occurred during login');
      return false;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error.message);
        toast.error(error.message);
        return;
      }
      
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Unexpected logout error:', error);
      toast.error(error instanceof Error ? error.message : 'An error occurred during logout');
    }
  };

  // Reset password
  const resetPassword = async (email: string): Promise<boolean> => {
    return requestPasswordReset(email);
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
