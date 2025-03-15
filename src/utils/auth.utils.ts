
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

/**
 * Manages password reset functionality
 */
export const passwordManager = {
  /**
   * Requests a password reset for the given email
   */
  requestPasswordReset: async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        console.error('Password reset request error:', error);
        toast.error(error.message);
        return false;
      }
      
      toast.success('Password reset link has been sent to your email');
      return true;
    } catch (error) {
      console.error('Error in requestPasswordReset:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send password reset link');
      return false;
    }
  },
  
  /**
   * Updates the password for the currently logged in user
   */
  updatePassword: async (newPassword: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        console.error('Update password error:', error);
        toast.error(error.message);
        return false;
      }
      
      toast.success('Password updated successfully');
      return true;
    } catch (error) {
      console.error('Error in updatePassword:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update password');
      return false;
    }
  }
};

/**
 * Manages cookie and local storage
 */
export const storageManager = {
  /**
   * Stores authentication data in cookies and local storage
   */
  setAuthData: (isAuthenticated: boolean, isAdmin: boolean, email: string, fullName: string): void => {
    // Set local storage values
    if (isAuthenticated) {
      localStorage.setItem('isLoggedIn', 'true');
      
      if (isAdmin) {
        localStorage.setItem('isAdmin', 'true');
      } else {
        localStorage.removeItem('isAdmin');
      }
      
      localStorage.setItem('userEmail', email || '');
      localStorage.setItem('userName', fullName || email || '');
      
      // Set cookies
      document.cookie = "session_active=true; path=/; max-age=2592000"; // 30 days
      
      if (isAdmin) {
        document.cookie = "user_role=admin; path=/; max-age=2592000"; // 30 days
      } else {
        document.cookie = "user_role=member; path=/; max-age=2592000"; // 30 days
      }
    } else {
      // Clear local storage and cookies
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      
      document.cookie = "session_active=; path=/; max-age=0";
      document.cookie = "user_role=; path=/; max-age=0";
    }
  }
};
