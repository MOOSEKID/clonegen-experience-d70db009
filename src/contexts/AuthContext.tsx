
import { createContext, ReactNode, useEffect, useState, useCallback } from 'react';
import { useAuthState } from '@/hooks/useAuthState';
import { AuthContextType, AuthUser } from '@/types/auth.types';
import { useLoginService } from '@/hooks/auth/useLoginService';
import { useSignUpService } from '@/hooks/auth/useSignUpService';
import { useLogoutService } from '@/hooks/auth/useLogoutService';
import { usePasswordService } from '@/hooks/auth/usePasswordService';
import { useTestUsers } from '@/hooks/auth/useTestUsers';
import { authStorageService } from '@/services/authStorageService';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, Session } from '@supabase/supabase-js';

// Create the auth context with default values
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Helper function to convert Supabase User to AuthUser
const convertToAuthUser = (user: User | null): AuthUser | null => {
  if (!user) return null;
  
  return {
    ...user,
    id: user.id,
    email: user.email || '', 
    role: user.user_metadata?.role || 'member'
  };
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Get the authentication state using our custom hook
  const { 
    user, 
    isAdmin, 
    isLoading, 
    isAuthenticated,
    setUser,
    setIsAdmin, 
    setIsAuthenticated 
  } = useAuthState();

  // Store Supabase session for token management
  const [session, setSession] = useState<Session | null>(null);

  // Initialize test users - only if needed
  useTestUsers();

  // Get authentication service hooks
  const { login: loginService } = useLoginService();
  const { signUp: signUpService } = useSignUpService();
  const { logout: logoutService } = useLogoutService();
  const { requestPasswordReset, updatePassword } = usePasswordService();

  // Set up auth state listener and check current session
  useEffect(() => {
    console.log("Setting up auth state change listener in AuthContext");
    
    // Set up the auth state change listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state changed:', event);
        
        // Update session state
        setSession(newSession);
        
        // Handle auth events
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (newSession?.user) {
            // Update user state synchronously for UI
            setUser(convertToAuthUser(newSession.user));
            setIsAuthenticated(true);
            
            // Check if known admin
            const email = newSession.user.email;
            const isKnownAdmin = email === 'admin@example.com' || email === 'admin@uptowngym.rw';
            
            if (isKnownAdmin) {
              setIsAdmin(true);
            }
            
            // Deferred profile check to avoid deadlocks
            setTimeout(async () => {
              try {
                const { data: profile } = await supabase
                  .from('profiles')
                  .select('is_admin')
                  .eq('id', newSession.user.id)
                  .maybeSingle();
                  
                // Update admin status if profile found
                if (profile) {
                  const userIsAdmin = profile.is_admin || isKnownAdmin;
                  setIsAdmin(userIsAdmin);
                  
                  // Update storage
                  authStorageService.setAuthData(
                    true,
                    userIsAdmin,
                    newSession.user.email || '',
                    newSession.user.user_metadata?.full_name || ''
                  );
                }
              } catch (error) {
                console.error('Error in deferred profile check:', error);
              }
            }, 0);
          }
        } else if (event === 'SIGNED_OUT') {
          // Clear all auth state
          setUser(null);
          setIsAdmin(false);
          setIsAuthenticated(false);
          setSession(null);
          
          // Clear storage
          authStorageService.setAuthData(false, false, '', '');
        }
      }
    );
    
    // THEN check for existing session
    const getInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        // Update session state
        setSession(data.session);
        
        if (data.session?.user) {
          // Update auth state for immediate UI response
          setUser(convertToAuthUser(data.session.user));
          setIsAuthenticated(true);
          
          // Fast path for known admins
          const email = data.session.user.email;
          const isKnownAdmin = email === 'admin@example.com' || email === 'admin@uptowngym.rw';
          
          if (isKnownAdmin) {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      }
    };
    
    getInitialSession();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setIsAdmin, setIsAuthenticated]);

  /**
   * Login with email and password
   */
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      // Fast path for known admin emails
      const isKnownAdmin = email === 'admin@example.com' || email === 'admin@uptowngym.rw';
      
      const result = await loginService(email, password);
      
      if (result.success && result.user) {
        // Update auth state
        setUser(convertToAuthUser(result.user));
        setIsAdmin(result.isAdmin || isKnownAdmin);
        setIsAuthenticated(true);
        
        // Store auth data
        authStorageService.setAuthData(
          true, 
          result.isAdmin || isKnownAdmin, 
          result.user.email || '', 
          result.user.user_metadata?.full_name || result.user.email || ''
        );
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error in login:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
      return false;
    }
  }, [loginService, setUser, setIsAdmin, setIsAuthenticated]);

  /**
   * Sign up a new user
   */
  const signUp = useCallback(async (email: string, password: string, fullName: string): Promise<boolean> => {
    return signUpService(email, password, fullName);
  }, [signUpService]);

  /**
   * Log out the current user
   */
  const logout = useCallback(async (): Promise<boolean> => {
    try {
      // Clear local state first for immediate UI response
      setIsAuthenticated(false);
      setIsAdmin(false);
      setUser(null);
      setSession(null);
      
      // Clear storage
      authStorageService.setAuthData(false, false, '', '');
      
      // Then sign out from Supabase
      const success = await logoutService();
      
      if (success) {
        toast.success('Logged out successfully');
      } else {
        toast.error("There was an issue during logout");
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out");
      return false;
    }
  }, [logoutService, setUser, setIsAdmin, setIsAuthenticated]);

  // Provide auth context value
  const value: AuthContextType = {
    user,
    isAdmin,
    isLoading,
    isAuthenticated,
    login,
    signUp,
    logout,
    requestPasswordReset,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
