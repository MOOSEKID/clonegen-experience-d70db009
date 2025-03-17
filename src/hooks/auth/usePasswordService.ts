
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const usePasswordService = () => {
  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        console.error('Error resetting password:', error.message);
        toast.error('Failed to send password reset email');
        return false;
      }
      
      toast.success('Password reset email sent');
      return true;
    } catch (error) {
      console.error('Unexpected error in resetPassword:', error);
      toast.error('An unexpected error occurred');
      return false;
    }
  };

  const updatePassword = async (password: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });
      
      if (error) {
        console.error('Error updating password:', error.message);
        toast.error('Failed to update password');
        return false;
      }
      
      toast.success('Password updated successfully');
      return true;
    } catch (error) {
      console.error('Unexpected error in updatePassword:', error);
      toast.error('An unexpected error occurred');
      return false;
    }
  };

  return {
    resetPassword,
    updatePassword
  };
};
