
import { createContext, ReactNode, useEffect } from 'react';
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
import { User } from '@supabase/supabase-js';

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
    email: user.email || '', // Provide default empty string for email
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

  // Initialize test users
  useTestUsers();

  // Get authentication service hooks
  const { login: loginService } = useLoginService();
  const { signUp: signUpService } = useSignUpService();
  const { logout: logoutService } = useLogoutService();
  const { requestPasswordReset, updatePassword } = usePasswordService();

  // Listen for auth changes
  useEffect(() => {
    console.log("Setting up auth state change listener in AuthContext");
    
    // Set up the auth state change listener FIRST (important to prevent deadlocks)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed in context:', event);
        
        if (event === 'SIGNED_IN' && session) {
          // Handle signed in event - Use non-blocking approach to prevent deadlocks
          setUser(convertToAuthUser(session.user));
          setIsAuthenticated(true);
          
          // Use setTimeout to defer profile checking after auth state update
          setTimeout(async () => {
            try {
              // Check if this is one of our known admin emails
              const userEmail = session.user.email;
              const isKnownAdmin = userEmail === 'admin@example.com' || userEmail === 'admin@uptowngym.rw';
              
              // If known admin, set state immediately for faster UI response
              if (isKnownAdmin) {
                console.log('Known admin email detected, setting admin status immediately');
                setIsAdmin(true);
                authStorageService.setAuthData(
                  true, 
                  true, 
                  session.user.email || '', 
                  session.user.user_metadata?.full_name || session.user.email || ''
                );
              }
              
              // Still check profile for consistency
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('role, is_admin, full_name')
                .eq('id', session.user.id)
                .maybeSingle();
              
              if (error && error.code !== 'PGRST116') {
                console.error('Error fetching user profile after session update:', error);
                return;
              }
              
              // Set admin status based on profile or known admin emails
              const userIsAdmin = profile?.is_admin || isKnownAdmin || false;
              console.log('Auth state admin check:', { 
                profile, 
                isKnownAdmin, 
                userIsAdmin,
                userEmail
              });
              
              setIsAdmin(userIsAdmin);
              
              authStorageService.setAuthData(
                true, 
                userIsAdmin, 
                session.user.email || '', 
                session.user.user_metadata?.full_name || profile?.full_name || session.user.email || ''
              );
            } catch (error) {
              console.error('Error in profile check after session update:', error);
            }
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out, clearing auth state');
          setUser(null);
          setIsAdmin(false);
          setIsAuthenticated(false);
          authStorageService.setAuthData(false, false, '', '');
        } else if (event === 'USER_UPDATED' && session) {
          console.log('User was updated');
          setUser(convertToAuthUser(session.user));
        }
      }
    );
    
    // THEN check for existing session
    const checkCurrentSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error checking current session:', error);
          return;
        }
        
        if (session) {
          setUser(convertToAuthUser(session.user));
          setIsAuthenticated(true);
          
          // Check if this is one of our known admin emails
          const userEmail = session.user.email;
          const isKnownAdmin = userEmail === 'admin@example.com' || userEmail === 'admin@uptowngym.rw';
          
          // If known admin, set state immediately for faster UI response
          if (isKnownAdmin) {
            console.log('Known admin email detected, setting admin status immediately');
            setIsAdmin(true);
            authStorageService.setAuthData(
              true, 
              true, 
              session.user.email || '', 
              session.user.user_metadata?.full_name || session.user.email || ''
            );
          }
          
          // Defer profile checking
          setTimeout(async () => {
            try {
              // Get user profile to check if admin
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('role, is_admin, full_name')
                .eq('id', session.user.id)
                .maybeSingle();
              
              if (error && error.code !== 'PGRST116') {
                console.error('Error fetching user profile during initial session:', error);
                return;
              }
              
              // Set admin status based on profile or known admin emails
              const userIsAdmin = profile?.is_admin || isKnownAdmin || false;
              console.log('Initial session admin check:', { 
                profile, 
                isKnownAdmin, 
                userIsAdmin,
                userEmail
              });
              
              setIsAdmin(userIsAdmin);
              
              authStorageService.setAuthData(
                true, 
                userIsAdmin, 
                session.user.email || '', 
                session.user.user_metadata?.full_name || profile?.full_name || session.user.email || ''
              );
            } catch (error) {
              console.error('Error in profile check during initial session:', error);
            }
          }, 0);
        } else {
          // No session, ensure auth state is cleared
          setUser(null);
          setIsAdmin(false);
          setIsAuthenticated(false);
          authStorageService.setAuthData(false, false, '', '');
        }
      } catch (error) {
        console.error('Error checking initial session:', error);
      }
    };
    
    checkCurrentSession();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setIsAdmin, setIsAuthenticated]);

  /**
   * Login with email and password
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Login attempt in context for:', email);
      
      // Fast path for known admin emails
      const isKnownAdmin = email.toLowerCase() === 'admin@example.com' || email.toLowerCase() === 'admin@uptowngym.rw';
      if (isKnownAdmin) {
        console.log('Known admin login detected, taking fast path');
      }
      
      const result = await loginService(email, password);
      
      if (result.success && result.user) {
        // Update auth state immediately to provide feedback
        setUser(convertToAuthUser(result.user));
        setIsAdmin(result.isAdmin || isKnownAdmin || false);
        setIsAuthenticated(true);
        
        // Store auth data in local storage and cookies
        authStorageService.setAuthData(
          true, 
          result.isAdmin || isKnownAdmin || false, 
          result.user.email || '', 
          result.user.user_metadata?.full_name || result.user.email || ''
        );
        
        console.log('Login success in context, auth state updated:', { 
          isAuthenticated: true, 
          isAdmin: result.isAdmin || isKnownAdmin
        });
        
        return true;
      }
      
      console.log('Login failed in context');
      return false;
    } catch (error) {
      console.error('Error in login context method:', error);
      // Ensure loading state is cleared on error
      toast.error(error instanceof Error ? error.message : 'Login failed');
      return false;
    }
  };

  /**
   * Sign up a new user
   */
  const signUp = async (email: string, password: string, fullName: string): Promise<boolean> => {
    return signUpService(email, password, fullName);
  };

  /**
   * Log out the current user
   */
  const logout = async (): Promise<boolean> => {
    console.log("Starting logout process in AuthContext");
    
    // First clear all local auth state
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
    
    // Clear local storage and cookies
    authStorageService.setAuthData(false, false, '', '');
    
    try {
      // Then call Supabase logout service
      const success = await logoutService();
      
      if (success) {
        console.log("Logout successfully completed");
        toast.success('Logged out successfully');
      } else {
        console.error("Logout service returned unsuccessful");
        toast.error("There was an issue during logout");
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error during logout process:", error);
      toast.error("Failed to log out. Please try again.");
      return false;
    }
  };

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
