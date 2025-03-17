
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { authStorageService } from '@/services/authStorageService';

// Re-export the storage manager for backward compatibility
export const storageManager = authStorageService;

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
