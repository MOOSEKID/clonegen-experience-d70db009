
import { useState } from 'react';
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
        
        authStorageService.setAuthData(
          true, 
          userIsAdmin, 
          currentUser.email || '', 
          currentUser.user_metadata?.full_name || currentUser.email || ''
        );
      } else {
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
    } finally {
      setIsLoading(false);
    }
  };

  return { checkAuth };
};

export default useInitialAuthCheck;
