
import { supabase } from '@/integrations/supabase/client';
import type { AuthUser } from '@/types/auth.types';
import { authStorageService } from '@/services/authStorageService';

type InitialAuthCheckParams = {
  setUser: (user: AuthUser | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
};

/**
 * Hook that performs the initial authentication check
 */
export const useInitialAuthCheck = () => {
  const checkAuth = async ({ setUser, setIsAdmin, setIsAuthenticated, setIsLoading }: InitialAuthCheckParams) => {
    try {
      setIsLoading(true);
      console.log('Performing initial auth check...');
      
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Error getting session:', sessionError);
        throw sessionError;
      }
      
      if (session) {
        const currentUser = session.user;
        console.log('Current user found:', currentUser.email);
        
        // Get user role from profiles table
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role, is_admin, full_name')
          .eq('id', currentUser.id)
          .single();
          
        if (error) {
          console.error('Error fetching user profile:', error);
          
          // Create a default profile if one doesn't exist
          if (error.code === 'PGRST116') {
            console.log('Profile not found, creating default profile...');
            
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([
                { 
                  id: currentUser.id,
                  full_name: currentUser.user_metadata?.full_name || 'User',
                  role: 'member',
                  is_admin: currentUser.email === 'admin@example.com' // Set admin based on email
                }
              ]);
              
            if (insertError) {
              console.error('Error creating default profile:', insertError);
            } else {
              console.log('Default profile created successfully');
            }
            
            // Get the newly created profile
            const { data: newProfile } = await supabase
              .from('profiles')
              .select('role, is_admin, full_name')
              .eq('id', currentUser.id)
              .single();
              
            if (newProfile) {
              const userRole = newProfile.role || 'member';
              const userIsAdmin = newProfile.is_admin || false;
              
              console.log('User authenticated with new profile:', {
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
                currentUser.user_metadata?.full_name || newProfile.full_name || currentUser.email || ''
              );
              
              setIsLoading(false);
              return;
            }
          }
        }
        
        const userRole = profile?.role || 'member';
        const userIsAdmin = profile?.is_admin || false;
        
        console.log('User authenticated:', {
          email: currentUser.email,
          role: userRole,
          isAdmin: userIsAdmin
        });
        
        setUser({
          ...currentUser,
          email: currentUser.email || '', // Ensure email is always provided
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
      } else {
        console.log('No active session found');
        setUser(null);
        setIsAdmin(false);
        setIsAuthenticated(false);
        
        authStorageService.setAuthData(false, false, '', '');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
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
