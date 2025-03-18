
import { useState, useEffect } from 'react';
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
