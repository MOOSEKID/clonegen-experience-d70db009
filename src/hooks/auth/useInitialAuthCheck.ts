
import { useState } from 'react';
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
        toast.error('Authentication error: ' + sessionError.message);
        return;
      }
      
      if (session) {
        const currentUser = session.user;
        console.log('Current user found:', currentUser);
        
        // Get user role from profiles table
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role, is_admin')
          .eq('id', currentUser.id)
          .single();
          
        if (error) {
          console.error('Error fetching user profile:', error);
          
          // If profile doesn't exist, create a default one
          if (error.code === 'PGRST116') {
            console.log('No profile found, creating default profile...');
            
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert([{ 
                id: currentUser.id,
                full_name: currentUser.user_metadata?.full_name || currentUser.email,
                username: null,
                role: 'member',
                is_admin: false
              }])
              .select('*')
              .single();
              
            if (createError) {
              console.error('Error creating user profile:', createError);
              toast.error('Failed to create user profile');
            } else {
              console.log('Default profile created successfully');
            }
          }
        }
        
        const userRole = profile?.role || 'member';
        const userIsAdmin = profile?.is_admin || false;
        
        console.log('User role:', userRole, 'Is admin:', userIsAdmin);
        
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
        
        console.log('Auth check complete - user is authenticated');
      } else {
        console.log('No session found, user is not authenticated');
        setUser(null);
        setIsAdmin(false);
        setIsAuthenticated(false);
        
        authStorageService.setAuthData(false, false, '', '');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      toast.error('Authentication check failed');
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
