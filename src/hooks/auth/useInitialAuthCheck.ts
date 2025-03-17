
import { supabase } from '@/integrations/supabase/client';
import type { AuthUser, UserRole, AccessLevel } from '@/types/auth.types';
import { authStorageService } from '@/services/authStorageService';
import { toast } from 'sonner';

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
        console.log('Current user found in initial check:', currentUser.email);
        
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
            
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([
                { 
                  id: currentUser.id,
                  full_name: currentUser.user_metadata?.full_name || currentUser.email || 'User',
                  role: 'member' as UserRole,
                  is_admin: currentUser.email === 'admin@example.com', // Set admin based on email
                  access_level: 'Basic' as AccessLevel,
                  status: 'Active'
                }
              ]);
              
            if (insertError) {
              console.error('Error creating default profile in initial check:', insertError);
              // Handle profile creation error - still set user as authenticated
              setUser({
                id: currentUser.id,
                email: currentUser.email || '',
                full_name: currentUser.user_metadata?.full_name || currentUser.email || '',
                role: 'member' as UserRole,
                is_admin: currentUser.email === 'admin@example.com',
                is_staff: false,
                status: 'Active',
                access_level: 'Basic' as AccessLevel,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              });
              
              setIsAdmin(currentUser.email === 'admin@example.com');
              setIsAuthenticated(true);
              
              authStorageService.setAuthData(
                true, 
                currentUser.email === 'admin@example.com', 
                currentUser.email || '', 
                currentUser.user_metadata?.full_name || currentUser.email || ''
              );
            } else {
              console.log('Default profile created successfully in initial check');
              
              // Get the newly created profile
              const { data: newProfile } = await supabase
                .from('profiles')
                .select('role, is_admin, full_name')
                .eq('id', currentUser.id)
                .single();
                
              if (newProfile) {
                const userRole = (newProfile.role || 'member') as UserRole;
                const userIsAdmin = newProfile.is_admin || false;
                
                console.log('User authenticated with new profile in initial check:', {
                  email: currentUser.email,
                  role: userRole,
                  isAdmin: userIsAdmin
                });
                
                setUser({
                  id: currentUser.id,
                  email: currentUser.email || '',
                  full_name: newProfile.full_name || currentUser.email || '',
                  role: userRole,
                  is_admin: userIsAdmin,
                  is_staff: false,
                  status: 'Active',
                  access_level: 'Basic' as AccessLevel,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                });
                
                setIsAdmin(userIsAdmin);
                setIsAuthenticated(true);
                
                authStorageService.setAuthData(
                  true, 
                  userIsAdmin, 
                  currentUser.email || '', 
                  currentUser.user_metadata?.full_name || newProfile.full_name || currentUser.email || ''
                );
              }
            }
          } else {
            // Other error fetching profile, but still set basic auth state
            console.warn('Error fetching profile, setting basic auth state');
            setUser({
              id: currentUser.id,
              email: currentUser.email || '',
              full_name: currentUser.user_metadata?.full_name || currentUser.email || '',
              role: 'member' as UserRole,
              is_admin: currentUser.email === 'admin@example.com',
              is_staff: false,
              status: 'Active',
              access_level: 'Basic' as AccessLevel,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
            
            setIsAdmin(currentUser.email === 'admin@example.com');
            setIsAuthenticated(true);
            
            authStorageService.setAuthData(
              true, 
              currentUser.email === 'admin@example.com', 
              currentUser.email || '', 
              currentUser.user_metadata?.full_name || currentUser.email || ''
            );
          }
        } else {
          // Profile exists
          const userRole = (profile?.role || 'member') as UserRole;
          const userIsAdmin = profile?.is_admin || false;
          
          console.log('User authenticated in initial check:', {
            email: currentUser.email,
            role: userRole,
            isAdmin: userIsAdmin
          });
          
          setUser({
            id: currentUser.id,
            email: currentUser.email || '',
            full_name: profile?.full_name || currentUser.email || '',
            role: userRole,
            is_admin: userIsAdmin,
            is_staff: false,
            status: 'Active',
            access_level: 'Basic' as AccessLevel,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
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
