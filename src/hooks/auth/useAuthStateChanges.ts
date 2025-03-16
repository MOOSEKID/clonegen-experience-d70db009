
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { AuthUser } from '@/types/auth.types';
import { authStorageService } from '@/services/authStorageService';

type AuthStateChangeCallbacks = {
  setUser: (user: AuthUser | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

/**
 * Hook that handles auth state changes from Supabase
 */
export const useAuthStateChanges = (callbacks: AuthStateChangeCallbacks) => {
  const { setUser, setIsAdmin, setIsAuthenticated } = callbacks;

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          if (session?.user) {
            // Get user role from profiles table
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('role, is_admin, full_name')
              .eq('id', session.user.id)
              .single();
              
            // Handle special case for admin@example.com
            let userRole = profile?.role || 'member';
            let userIsAdmin = profile?.is_admin || false;
            
            // Check if this is a known admin account
            if (session.user.email?.toLowerCase() === 'admin@example.com') {
              userRole = 'admin';
              userIsAdmin = true;
              
              // Update profile if needed
              if (!profile?.is_admin) {
                await supabase
                  .from('profiles')
                  .upsert([
                    { 
                      id: session.user.id,
                      full_name: profile?.full_name || 'Admin User',
                      role: 'admin',
                      is_admin: true
                    }
                  ]);
              }
            }
            
            setUser({
              ...session.user,
              email: session.user.email || '', // Ensure email is always provided
              role: userRole
            });
            
            setIsAdmin(userIsAdmin);
            setIsAuthenticated(true);
            
            authStorageService.setAuthData(
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
          
          authStorageService.setAuthData(false, false, '', '');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUser, setIsAdmin, setIsAuthenticated]);
};

export default useAuthStateChanges;
