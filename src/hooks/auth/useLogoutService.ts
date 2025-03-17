
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook that provides logout functionality
 */
export const useLogoutService = () => {
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
      
      toast.success('Logged out successfully');
      return true;
    } catch (error) {
      console.error('Unexpected logout error:', error);
      toast.error(error instanceof Error ? error.message : 'Logout failed');
      return false;
    }
  };

  return { logout };
};
