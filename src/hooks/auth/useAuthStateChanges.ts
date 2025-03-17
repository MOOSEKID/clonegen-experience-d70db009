
import { supabase } from '@/lib/supabase';
import { Dispatch, SetStateAction } from 'react';
import { AuthUser } from '@/types/auth.types';

interface UseAuthStateChangesProps {
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export const useAuthStateChanges = ({ setUser, setIsAdmin, setIsAuthenticated }: UseAuthStateChangesProps) => {
  // Set up subscription to auth state changes
  const setupAuthSubscription = () => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN') {
          if (session?.user) {
            // Check if admin based on email
            const isAdminUser = session.user.email === 'admin@uptowngym.rw' || 
                              session.user.email === 'admin@example.com';
            
            // Get profile from database to check admin status
            const { data: profileData } = await supabase
              .from('profiles')
              .select('is_admin, role, full_name')
              .eq('id', session.user.id)
              .single();
            
            // Set user state
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
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAdmin(false);
          setIsAuthenticated(false);
        }
      }
    );
    
    return subscription;
  };
  
  return { setupAuthSubscription };
};

export default useAuthStateChanges;
