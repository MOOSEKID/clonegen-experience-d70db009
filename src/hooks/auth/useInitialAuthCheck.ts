
import { supabase } from '@/lib/supabase';
import { Dispatch, SetStateAction } from 'react';
import { AuthUser } from '@/types/auth.types';

interface SetAuthStateProps {
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const useInitialAuthCheck = () => {
  const checkAuth = async ({ 
    setUser, 
    setIsAdmin, 
    setIsAuthenticated, 
    setIsLoading 
  }: SetAuthStateProps) => {
    try {
      setIsLoading(true);
      
      // Get current session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Session check error:', error);
        setIsLoading(false);
        return;
      }
      
      if (!session) {
        console.log('No active session found');
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }
      
      // Session exists, get profile data
      const { data: profileData } = await supabase
        .from('profiles')
        .select('is_admin, role, full_name')
        .eq('id', session.user.id)
        .single();
      
      // Check if admin based on email
      const isAdminUser = session.user.email === 'admin@uptowngym.rw' || 
                          session.user.email === 'admin@example.com';
      
      // Create user object
      const user: AuthUser = {
        id: session.user.id,
        email: session.user.email,
        full_name: profileData?.full_name || null,
        role: (profileData?.role as any) || 'individual_client',
        is_admin: isAdminUser || (profileData?.is_admin ?? false),
        app_metadata: session.user.app_metadata,
        aud: session.user.aud
      };
      
      setUser(user);
      setIsAdmin(user.is_admin);
      setIsAuthenticated(true);
      
    } catch (error) {
      console.error('Error in initial auth check:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return { checkAuth };
};

export default useInitialAuthCheck;
