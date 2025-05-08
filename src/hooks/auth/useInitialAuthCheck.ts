
import { supabase } from '@/integrations/supabase/client';
import type { AuthUser } from '@/types/auth.types';
import { authStorageService } from '@/services/authStorageService';
import { toast } from 'sonner';

type InitialAuthCheckParams = {
  setUser: (user: AuthUser | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
};

/**
 * Hook that performs an optimized initial authentication check
 */
export const useInitialAuthCheck = () => {
  const checkAuth = async ({ setUser, setIsAdmin, setIsAuthenticated, setIsLoading }: InitialAuthCheckParams) => {
    try {
      setIsLoading(true);
      console.log('Performing initial auth check...');
      
      // Check localStorage first for instant UI feedback
      const cachedAuthState = localStorage.getItem('isLoggedIn') === 'true';
      const cachedAdminState = localStorage.getItem('isAdmin') === 'true';
      
      if (cachedAuthState) {
        // Apply cached state immediately for faster UI response
        setIsAuthenticated(true);
        if (cachedAdminState) {
          setIsAdmin(true);
        }
      }
      
      // Get current session from Supabase
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Error getting session:', sessionError);
        setIsLoading(false);
        return;
      }
      
      if (session) {
        const currentUser = session.user;
        console.log('Current user found:', currentUser.email);
        
        // Update user state immediately
        setUser({
          ...currentUser,
          email: currentUser.email || '',
          role: currentUser.user_metadata?.role || 'member'
        });
        
        setIsAuthenticated(true);
        
        // Fast path for known admin emails
        const isKnownAdminEmail = 
          currentUser.email === 'admin@example.com' || 
          currentUser.email === 'admin@uptowngym.rw';
          
        if (isKnownAdminEmail) {
          setIsAdmin(true);
          
          // Update storage with admin status
          authStorageService.setAuthData(
            true, 
            true, 
            currentUser.email || '', 
            currentUser.user_metadata?.full_name || currentUser.email || ''
          );
        }
        
        // Check profile in background to avoid blocking
        setTimeout(async () => {
          try {
            // Get user profile
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('role, is_admin, full_name')
              .eq('id', currentUser.id)
              .maybeSingle();
              
            if (error && error.code !== 'PGRST116') {
              console.error('Error fetching user profile:', error);
              setIsLoading(false);
              return;
            }
            
            // Update state based on profile
            const userIsAdmin = Boolean(profile?.is_admin) || isKnownAdminEmail;
            const userRole = userIsAdmin ? 'admin' : (profile?.role || 'member');
            
            setIsAdmin(userIsAdmin);
            
            // Update user object with role
            setUser({
              ...currentUser,
              email: currentUser.email || '',
              role: userRole
            });
            
            // Update storage
            authStorageService.setAuthData(
              true, 
              userIsAdmin, 
              currentUser.email || '', 
              currentUser.user_metadata?.full_name || profile?.full_name || currentUser.email || ''
            );
          } catch (err) {
            console.error('Background profile check error:', err);
          } finally {
            setIsLoading(false);
          }
        }, 0);
      } else {
        console.log('No active session found');
        setUser(null);
        setIsAdmin(false);
        setIsAuthenticated(false);
        
        authStorageService.setAuthData(false, false, '', '');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      toast.error('Authentication error. Please try logging in again.');
      
      setUser(null);
      setIsAdmin(false);
      setIsAuthenticated(false);
      authStorageService.setAuthData(false, false, '', '');
      setIsLoading(false);
    }
  };

  return { checkAuth };
};

export default useInitialAuthCheck;
