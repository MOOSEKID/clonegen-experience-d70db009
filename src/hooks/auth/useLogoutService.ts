
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook that provides comprehensive logout functionality
 */
export const useLogoutService = () => {
  /**
   * Log out the current user and clean up all session data
   */
  const logout = async (): Promise<boolean> => {
    try {
      console.log("Beginning comprehensive Supabase logout process");
      
      // First clear all auth-related localStorage items
      const keysToRemove = [
        'isLoggedIn',
        'isAdmin',
        'userEmail',
        'userName',
        'sb-qrjwfiurwvcsyrcpewsj-auth-token',
        'supabase.auth.token',
        'uptownGym_auth_state',
        'uptownGym_profile'
      ];
      
      keysToRemove.forEach(key => {
        try {
          localStorage.removeItem(key);
        } catch (e) {
          console.error(`Error removing ${key} from localStorage:`, e);
        }
      });
      
      // Clear cookies
      document.cookie = "session_active=; path=/; max-age=0";
      document.cookie = "user_role=; path=/; max-age=0";
      
      // Then perform Supabase signOut
      const { error } = await supabase.auth.signOut({
        scope: 'global' // Sign out from all tabs/windows
      });
      
      if (error) {
        console.error('Logout error from Supabase:', error);
        toast.error(error.message || 'Logout failed');
        return false;
      }
      
      // Add a small delay to ensure Supabase has time to clear the session properly
      await new Promise(resolve => setTimeout(resolve, 200));
      
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
