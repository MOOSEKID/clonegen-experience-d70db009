
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { AuthUser } from '@/types/auth.types';
import { storageManager } from '@/utils/auth.utils';

/**
 * A hook that provides the authentication state
 */
export const useAuthState = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const currentUser = session.user;
          console.log('Current user:', currentUser);
          
          // Get user role from profiles table
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role, is_admin')
            .eq('id', currentUser.id)
            .single();
            
          if (error) {
            console.error('Error fetching user profile:', error);
          }
          
          const userRole = profile?.role || 'member';
          const userIsAdmin = profile?.is_admin || false;
          
          setUser({
            ...currentUser,
            email: currentUser.email || '', // Ensure email is always provided
            role: userRole
          });
          
          setIsAdmin(userIsAdmin);
          setIsAuthenticated(true);
          
          storageManager.setAuthData(
            true, 
            userIsAdmin, 
            currentUser.email || '', 
            currentUser.user_metadata?.full_name || currentUser.email || ''
          );
        } else {
          setUser(null);
          setIsAdmin(false);
          setIsAuthenticated(false);
          
          storageManager.setAuthData(false, false, '', '');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setUser(null);
        setIsAdmin(false);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          if (session?.user) {
            // Get user role from profiles table
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('role, is_admin')
              .eq('id', session.user.id)
              .single();
              
            const userRole = profile?.role || 'member';
            const userIsAdmin = profile?.is_admin || false;
            
            setUser({
              ...session.user,
              email: session.user.email || '', // Ensure email is always provided
              role: userRole
            });
            
            setIsAdmin(userIsAdmin);
            setIsAuthenticated(true);
            
            storageManager.setAuthData(
              true, 
              userIsAdmin, 
              session.user.email || '', 
              session.user.user_metadata?.full_name || session.user.email || ''
            );
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAdmin(false);
          setIsAuthenticated(false);
          
          storageManager.setAuthData(false, false, '', '');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
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
