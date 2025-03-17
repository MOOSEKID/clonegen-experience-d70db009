
import { useState } from 'react';
import { useLoginService } from '@/hooks/auth/useLoginService';
import { useSignUpService } from '@/hooks/auth/useSignUpService';
import { useLogoutService } from '@/hooks/auth/useLogoutService';
import { usePasswordService } from '@/hooks/auth/usePasswordService';
import { toast } from 'sonner';

export const useAuthActions = (setIsLoading: (value: boolean) => void) => {
  const { login: loginWithPassword } = useLoginService();
  const { signUp: signUpWithPassword } = useSignUpService();
  const { logout: logoutUser } = useLogoutService();
  const { resetPassword: requestPasswordReset, updatePassword: updateUserPassword } = usePasswordService();

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await loginWithPassword(email, password);
      
      if (result.success) {
        toast.success('Logged in successfully');
        return true;
      } else {
        toast.error(result.message || 'Login failed');
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
      
      if (result) {
        toast.success('Account created successfully! Please check your email to confirm your account.');
        return true;
      } else {
        toast.error('Signup failed');
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
      const result = await requestPasswordReset(email);
      
      if (result) {
        toast.success('Password reset email sent. Please check your inbox.');
        return true;
      } else {
        toast.error('Password reset failed');
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
      
      if (result) {
        toast.success('Password updated successfully');
        return true;
      } else {
        toast.error('Password update failed');
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

  return {
    login,
    signUp,
    logout,
    resetPassword,
    updatePassword
  };
};
