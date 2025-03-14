
import { useState, useEffect } from 'react';
import { fetchUserRole, getCurrentSession, onAuthStateChange } from '@/services/auth/supabaseAuthService';

export interface AuthState {
  user: any;
  session: any;
  isLoading: boolean;
  userRole: string | null;
  isAdmin: boolean;
  isTrainer: boolean;
  isMember: boolean;
}

export const useAuthState = (): AuthState => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const setupAuthListener = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession } } = await getCurrentSession();
        setSession(initialSession);
        setUser(initialSession?.user || null);
        
        if (initialSession?.user) {
          const role = await fetchUserRole(initialSession.user.id);
          setUserRole(role);
        }
        
        // Set up auth state change listener
        const { data: { subscription } } = await onAuthStateChange(
          async (event, newSession) => {
            console.log('Auth state change:', event);
            setSession(newSession);
            setUser(newSession?.user || null);
            
            if (newSession?.user) {
              const role = await fetchUserRole(newSession.user.id);
              setUserRole(role);
            } else {
              setUserRole(null);
            }
          }
        );
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Auth setup error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    setupAuthListener();
  }, []);

  const isAdmin = userRole === 'admin';
  const isTrainer = userRole === 'trainer';
  const isMember = userRole === 'member';

  return {
    user,
    session,
    isLoading,
    userRole,
    isAdmin,
    isTrainer,
    isMember
  };
};
