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
 * Hook that performs a reliable initial authentication check
 */
export const useInitialAuthCheck = () => {
  const checkAuth = async ({ setUser, setIsAdmin, setIsAuthenticated, setIsLoading }: InitialAuthCheckParams) => {
    try {
      setIsLoading(true);
      console.log('Performing initial auth check...');
      
      // Clear any potentially unreliable cached auth state
      const cachedAuthState = localStorage.getItem('isLoggedIn');
      const cachedAdminState = localStorage.getItem('isAdmin');
      
      console.log('Cached auth state:', { cachedAuthState, cachedAdminState });
      
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Error getting session:', sessionError);
        throw sessionError;
      }
      
      if (session) {
        const currentUser = session.user;
        console.log('Current user found in initial check:', currentUser.email);
        
        // Determine if this is an admin by email
        const isKnownAdminEmail = currentUser.email === 'admin@example.com' || currentUser.email === 'admin@uptowngym.rw';
        
        // Get user role from profiles table
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role, is_admin, full_name')
          .eq('id', currentUser.id)
          .single();
          
        if (error) {
          console.error('Error fetching user profile in initial check:', error);
          
          // Create a default profile if one doesn't exist
          if (error.code === 'PGRST116') {
            console.log('Profile not found in initial check, creating default profile...');
            
            // Use the email to determine admin status for consistency
            const userIsAdmin = isKnownAdminEmail;
            
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([
                { 
                  id: currentUser.id,
                  email: currentUser.email,
                  full_name: currentUser.user_metadata?.full_name || currentUser.email || 'User',
                  role: userIsAdmin ? 'admin' : 'member',
                  is_admin: userIsAdmin
                }
              ]);
              
            if (insertError) {
              console.error('Error creating default profile in initial check:', insertError);
              // Still set user as authenticated with admin status based on email
              setUser({
                ...currentUser,
                email: currentUser.email || '',
                role: userIsAdmin ? 'admin' : 'member'
              });
              
              setIsAdmin(userIsAdmin);
              setIsAuthenticated(true);
              
              authStorageService.setAuthData(
                true, 
                userIsAdmin, 
                currentUser.email || '', 
                currentUser.user_metadata?.full_name || currentUser.email || ''
              );
            } else {
              console.log('Default profile created successfully in initial check');
              
              setUser({
                ...currentUser,
                email: currentUser.email || '',
                role: userIsAdmin ? 'admin' : 'member'
              });
              
              setIsAdmin(userIsAdmin);
              setIsAuthenticated(true);
              
              authStorageService.setAuthData(
                true, 
                userIsAdmin, 
                currentUser.email || '', 
                currentUser.user_metadata?.full_name || currentUser.email || ''
              );
            }
          } else {
            // Other error fetching profile, but still set basic auth state
            console.warn('Error fetching profile, setting basic auth state based on email');
            
            setUser({
              ...currentUser,
              email: currentUser.email || '',
              role: isKnownAdminEmail ? 'admin' : 'member'
            });
            
            setIsAdmin(isKnownAdminEmail);
            setIsAuthenticated(true);
            
            authStorageService.setAuthData(
              true, 
              isKnownAdminEmail, 
              currentUser.email || '', 
              currentUser.user_metadata?.full_name || currentUser.email || ''
            );
          }
        } else {
          // Profile exists
          const userIsAdmin = Boolean(profile?.is_admin) || isKnownAdminEmail;
          const userRole = userIsAdmin ? 'admin' : (profile?.role || 'member');
          
          console.log('User authenticated in initial check:', {
            email: currentUser.email,
            role: userRole,
            isAdmin: userIsAdmin
          });
          
          setUser({
            ...currentUser,
            email: currentUser.email || '',
            role: userRole
          });
          
          setIsAdmin(userIsAdmin);
          setIsAuthenticated(true);
          
          authStorageService.setAuthData(
            true, 
            userIsAdmin, 
            currentUser.email || '', 
            currentUser.user_metadata?.full_name || profile?.full_name || currentUser.email || ''
          );
        }
      } else {
        console.log('No active session found in initial check');
        setUser(null);
        setIsAdmin(false);
        setIsAuthenticated(false);
        
        authStorageService.setAuthData(false, false, '', '');
      }
    } catch (error) {
      console.error('Error checking auth in initial check:', error);
      toast.error('Authentication error. Please try logging in again.');
      
      setUser(null);
      setIsAdmin(false);
      setIsAuthenticated(false);
      authStorageService.setAuthData(false, false, '', '');
    } finally {
      setIsLoading(false);
    }
  };

  return { checkAuth };
};

export default useInitialAuthCheck;
