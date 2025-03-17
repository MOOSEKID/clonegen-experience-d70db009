
import { supabase } from '@/integrations/supabase/client';
import type { AuthUser } from '@/types/auth.types';
import { authStorageService } from '@/services/authStorageService';

type SessionManagerProps = {
  setUser: (user: AuthUser | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

/**
 * Hook for managing user sessions and profile data
 */
export const useSessionManager = ({ setUser, setIsAdmin, setIsAuthenticated }: SessionManagerProps) => {
  /**
   * Handle session update - common logic for SIGNED_IN and initial session check
   */
  const handleSessionUpdate = async (session: any) => {
    // Additional setup after sign-in or session found
    console.log('Session established', session.user.email);
    
    // Get user profile to check if admin
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role, is_admin, full_name')
        .eq('id', session.user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user profile after session update:', error);
        
        // Create a default profile if one doesn't exist
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating profile...');
          
          // Check if it's a known admin email
          const isKnownAdmin = session.user.email === 'admin@example.com' || 
                              session.user.email === 'admin@uptowngym.rw';
          
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([
              { 
                id: session.user.id,
                full_name: session.user.user_metadata?.full_name || session.user.email || 'User',
                role: isKnownAdmin ? 'admin' : 'member',
                is_admin: isKnownAdmin
              }
            ]);
            
          if (insertError) {
            console.error('Error creating profile after session update:', insertError);
          } else {
            console.log('Profile created after session update');
            
            // Set state with newly created profile
            setUser({
              ...session.user,
              email: session.user.email || '',
              role: isKnownAdmin ? 'admin' : 'member'
            });
            
            setIsAdmin(isKnownAdmin);
            setIsAuthenticated(true);
            
            authStorageService.setAuthData(
              true, 
              isKnownAdmin, 
              session.user.email || '', 
              session.user.user_metadata?.full_name || session.user.email || ''
            );
          }
        }
      } else {
        // Profile exists, update auth state
        console.log('User profile found after session update:', profile);
        
        const userRole = profile?.role || 'member';
        const userIsAdmin = profile?.is_admin || false;
        
        // Also check for known admin emails
        const isKnownAdmin = session.user.email === 'admin@example.com' || 
                            session.user.email === 'admin@uptowngym.rw';
        
        const finalIsAdmin = userIsAdmin || isKnownAdmin;
        
        // Update profile if it's a known admin but not marked as such
        if (isKnownAdmin && !userIsAdmin) {
          console.log('Updating admin status for known admin email');
          const { error: updateError } = await supabase
            .from('profiles')
            .update({
              is_admin: true,
              role: 'admin'
            })
            .eq('id', session.user.id);
            
          if (updateError) {
            console.error('Error updating admin status:', updateError);
          } else {
            console.log('Admin status updated successfully');
          }
        }
        
        setUser({
          ...session.user,
          email: session.user.email || '',
          role: finalIsAdmin ? 'admin' : userRole
        });
        
        setIsAdmin(finalIsAdmin);
        setIsAuthenticated(true);
        
        authStorageService.setAuthData(
          true, 
          finalIsAdmin, 
          session.user.email || '', 
          session.user.user_metadata?.full_name || profile?.full_name || session.user.email || ''
        );
      }
    } catch (error) {
      console.error('Error in profile check after session update:', error);
    }
  };

  /**
   * Check current session and update auth state
   */
  const checkCurrentSession = async () => {
    try {
      console.log("Checking current session");
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error checking current session:', error);
        return;
      }
      
      if (session) {
        console.log("Session found, user is authenticated:", session.user.email);
        await handleSessionUpdate(session);
      } else {
        // No session, ensure auth state is cleared
        console.log("No session found, clearing auth state");
        setUser(null);
        setIsAdmin(false);
        setIsAuthenticated(false);
        authStorageService.setAuthData(false, false, '', '');
      }
    } catch (error) {
      console.error("Error checking current session:", error);
    }
  };

  return {
    handleSessionUpdate,
    checkCurrentSession
  };
};
