
import { createContext, ReactNode, useEffect } from 'react';
import { useAuthState } from '@/hooks/useAuthState';
import { AuthContextType } from '@/types/auth.types';
import { useLoginService } from '@/hooks/auth/useLoginService';
import { useSignUpService } from '@/hooks/auth/useSignUpService';
import { useLogoutService } from '@/hooks/auth/useLogoutService';
import { usePasswordService } from '@/hooks/auth/usePasswordService';
import { useTestUsers } from '@/hooks/auth/useTestUsers';
import { authStorageService } from '@/services/authStorageService';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Create the auth context with default values
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

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
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed in context:', event);
        
        if (event === 'SIGNED_IN' && session) {
          // Additional setup after sign-in if needed
          console.log('User signed in, session established', session);
          
          // Get user profile to check if admin
          try {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('role, is_admin, full_name')
              .eq('id', session.user.id)
              .single();
            
            if (error) {
              console.error('Error fetching user profile after sign-in:', error);
              
              // Create a default profile if one doesn't exist
              if (error.code === 'PGRST116') {
                console.log('Profile not found after sign-in, creating profile...');
                
                const { error: insertError } = await supabase
                  .from('profiles')
                  .insert([
                    { 
                      id: session.user.id,
                      full_name: session.user.user_metadata?.full_name || session.user.email || 'User',
                      role: 'member',
                      is_admin: session.user.email === 'admin@example.com'
                    }
                  ]);
                  
                if (insertError) {
                  console.error('Error creating profile after sign-in:', insertError);
                } else {
                  console.log('Profile created after sign-in');
                  
                  // Set state with newly created profile
                  setUser({
                    ...session.user,
                    email: session.user.email || '',
                    role: 'member'
                  });
                  
                  setIsAdmin(session.user.email === 'admin@example.com');
                  setIsAuthenticated(true);
                  
                  toast.success('Login successful');
                }
              }
            } else {
              // Profile exists, update auth state
              console.log('User profile found after sign-in:', profile);
              
              const userRole = profile?.role || 'member';
              const userIsAdmin = profile?.is_admin || false;
              
              setUser({
                ...session.user,
                email: session.user.email || '',
                role: userRole
              });
              
              setIsAdmin(userIsAdmin);
              setIsAuthenticated(true);
              
              authStorageService.setAuthData(
                true, 
                userIsAdmin, 
                session.user.email || '', 
                session.user.user_metadata?.full_name || profile?.full_name || session.user.email || ''
              );
              
              toast.success('Login successful');
            }
          } catch (error) {
            console.error('Error in profile check after sign-in:', error);
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out, clearing auth state');
          setUser(null);
          setIsAdmin(false);
          setIsAuthenticated(false);
          authStorageService.setAuthData(false, false, '', '');
        } else if (event === 'USER_UPDATED') {
          console.log('User was updated');
        }
      }
    );
    
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
      const result = await loginService(email, password);
      
      if (result.success && result.user) {
        // Update auth state
        setUser(result.user);
        setIsAdmin(result.isAdmin || false);
        setIsAuthenticated(true);
        
        // Store auth data in local storage and cookies
        authStorageService.setAuthData(
          true, 
          result.isAdmin || false, 
          result.user.email, 
          result.user.user_metadata?.full_name || result.user.email
        );
        
        console.log('Login success in context, auth state updated:', { 
          isAuthenticated: true, 
          isAdmin: result.isAdmin 
        });
        
        return true;
      }
      
      console.log('Login failed in context');
      return false;
    } catch (error) {
      console.error('Error in login context method:', error);
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
    const success = await logoutService();
    
    if (success) {
      // Clear auth state
      setUser(null);
      setIsAdmin(false);
      setIsAuthenticated(false);
      
      // Clear local storage and cookies
      authStorageService.setAuthData(false, false, '', '');
    }
    
    return success;
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
