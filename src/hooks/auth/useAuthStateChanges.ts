
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
 * Uses non-blocking patterns to prevent deadlocks
 */
export const useAuthStateChanges = (callbacks: AuthStateChangeCallbacks) => {
  const { setUser, setIsAdmin, setIsAuthenticated } = callbacks;

  useEffect(() => {
    console.log('Setting up auth state change listener...');
    
    // Setup the auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event);
        
        // Immediate update for UI response
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          if (session?.user) {
            // Fast path updates - synchronous to update UI immediately
            setUser({
              ...session.user,
              email: session.user.email || '',
              role: session.user.user_metadata?.role || 'member'
            });
            setIsAuthenticated(true);
            
            // Known admin emails check - fast path
            const isKnownAdmin = 
              session.user.email === 'admin@example.com' || 
              session.user.email === 'admin@uptowngym.rw';
              
            if (isKnownAdmin) {
              setIsAdmin(true);
            }
            
            // Basic storage update for quick access
            authStorageService.setAuthData(
              true, 
              isKnownAdmin, 
              session.user.email || '', 
              session.user.user_metadata?.full_name || session.user.email || ''
            );
            
            // Check profile in background (non-blocking)
            setTimeout(async () => {
              try {
                const { data: profile, error } = await supabase
                  .from('profiles')
                  .select('role, is_admin')
                  .eq('id', session.user.id)
                  .maybeSingle();
                  
                if (error && error.code !== 'PGRST116') {
                  console.error('Error fetching user profile:', error);
                  return;
                }
                
                if (profile) {
                  const userIsAdmin = profile.is_admin || isKnownAdmin;
                  setIsAdmin(userIsAdmin);
                  
                  // Update storage with complete data
                  authStorageService.setAuthData(
                    true, 
                    userIsAdmin, 
                    session.user.email || '', 
                    session.user.user_metadata?.full_name || session.user.email || ''
                  );
                }
              } catch (error) {
                console.error('Background profile check error:', error);
              }
            }, 0);
          }
        } else if (event === 'SIGNED_OUT') {
          // Clear state immediately for sign out
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
