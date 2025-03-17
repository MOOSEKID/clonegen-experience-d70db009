
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook that provides password management functionality
 */
export const usePasswordService = () => {
  /**
   * Request a password reset for the given email
   */
  const requestPasswordReset = async (email: string): Promise<boolean> => {
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
  };
  
  /**
   * Updates the password for the currently logged in user
   */
  const updatePassword = async (newPassword: string): Promise<boolean> => {
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
  };

  return { requestPasswordReset, updatePassword };
};
