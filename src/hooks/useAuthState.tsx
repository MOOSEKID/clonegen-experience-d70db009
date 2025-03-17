
import { useState, useEffect } from 'react';
import { AuthUser } from '@/types/auth.types';
import { supabase } from '@/integrations/supabase/client';

/**
 * A hook that provides the authentication state
 */
export const useAuthState = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Perform initial auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking auth:', error);
          setIsAuthenticated(false);
          setUser(null);
          return;
        }
        
        if (session?.user) {
          console.log('User is authenticated:', session.user.email);
          
          // Get profile from profiles table
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Error fetching profile:', profileError);
          }
          
          const isUserAdmin = profileData?.is_admin || false;
          
          // Create auth user object
          const authUser: AuthUser = {
            id: session.user.id,
            email: session.user.email,
            full_name: profileData?.full_name || session.user.email,
            role: profileData?.role || 'member',
            is_admin: isUserAdmin,
            app_metadata: session.user.app_metadata,
            aud: session.user.aud
          };
          
          setUser(authUser);
          setIsAdmin(isUserAdmin);
          setIsAuthenticated(true);
        } else {
          console.log('No active session found');
          setUser(null);
          setIsAdmin(false);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setUser(null);
        setIsAdmin(false);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' && session) {
          // Get profile from profiles table
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          const isUserAdmin = profileData?.is_admin || false;
          
          // Create auth user object
          const authUser: AuthUser = {
            id: session.user.id,
            email: session.user.email,
            full_name: profileData?.full_name || session.user.email,
            role: profileData?.role || 'member',
            is_admin: isUserAdmin,
            app_metadata: session.user.app_metadata,
            aud: session.user.aud
          };
          
          setUser(authUser);
          setIsAdmin(isUserAdmin);
          setIsAuthenticated(true);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAdmin(false);
          setIsAuthenticated(false);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    isAdmin,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAdmin,
    setIsAuthenticated
  };
};

export default useAuthState;
