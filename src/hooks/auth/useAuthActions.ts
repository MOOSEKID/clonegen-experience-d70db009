
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  signInWithEmailPassword, 
  signUpUser, 
  signOutUser, 
  sendPasswordResetEmail, 
  updateUserPassword
} from '@/services/auth/supabaseAuthService';
import { useState } from 'react';

export interface AuthActions {
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, userData: any) => Promise<boolean>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  updatePassword: (newPassword: string) => Promise<boolean>;
  isLoading: boolean;
}

export const useAuthActions = (): AuthActions => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { success, error } = await signInWithEmailPassword(email, password);
      
      if (!success && error) {
        toast.error(error.message || 'Failed to sign in');
      }
      
      return success;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: any): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { success, error } = await signUpUser(email, password, userData);
      
      if (!success && error) {
        toast.error(error.message || 'Failed to create account');
      }
      
      return success;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { success } = await signOutUser();
      
      if (success) {
        toast.success('Logged out successfully');
      } else {
        toast.error('Failed to log out');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { success, error } = await sendPasswordResetEmail(email);
      
      if (success) {
        toast.success('Password reset instructions sent to your email');
      } else if (error) {
        toast.error(error.message || 'Failed to send password reset email');
      }
      
      return success;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (newPassword: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { success, error } = await updateUserPassword(newPassword);
      
      if (success) {
        toast.success('Password updated successfully');
        navigate('/login');
      } else if (error) {
        toast.error(error.message || 'Failed to update password');
      }
      
      return success;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    isLoading
  };
};
