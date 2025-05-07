
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
      console.log("Beginning Supabase logout process");
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error from Supabase:', error);
        toast.error(error.message || 'Logout failed');
        return false;
      }
      
      // Add a small delay to ensure Supabase has time to clear the session properly
      await new Promise(resolve => setTimeout(resolve, 150));
      
      console.log('Supabase logout completed successfully');
      return true;
    } catch (error) {
      console.error('Unexpected error during logout:', error);
      toast.error(error instanceof Error ? error.message : 'Logout failed');
      return false;
    }
  };

  return { logout };
};
