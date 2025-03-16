
import { createContext, ReactNode, useEffect } from 'react';
import { useAuthState } from '@/hooks/useAuthState';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType } from '@/types/auth.types';
import { toast } from 'sonner';
import { passwordManager, storageManager } from '@/utils/auth.utils';
import { createAdminUser } from '@/services/createAdmin';

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

  // Initialize test users on mount
  useEffect(() => {
    const createTestUsers = async () => {
      try {
        // Check if admin exists first
        const { data: adminExists, error: checkAdminError } = await supabase
          .from('profiles')
          .select('id')
          .eq('role', 'admin')
          .maybeSingle();
          
        if (checkAdminError) {
          console.error('Error checking for admin user:', checkAdminError);
        }
        
        // If admin doesn't exist, create one
        if (!adminExists) {
          console.log('Creating admin test user...');
          // Changed to use admin@example.com for testing
          const result = await createAdminUser(
            'admin@example.com', 
            'admin123', 
            'Admin User'
          );
          console.log('Admin creation result:', result);
        }
        
        // Check if regular user exists
        const { data: userExists, error: checkUserError } = await supabase
          .from('profiles')
          .select('id')
          .eq('role', 'member')
          .maybeSingle();
          
        if (checkUserError) {
          console.error('Error checking for regular user:', checkUserError);
        }
        
        // If regular user doesn't exist, create one
        if (!userExists) {
          console.log('Creating regular test user...');
          const { data, error } = await supabase.auth.signUp({
            email: 'user@example.com',
            password: 'user123',
            options: {
              data: {
                full_name: 'Regular User'
              }
            }
          });
          
          if (error) {
            console.error('Error creating regular user:', error);
          } else if (data.user) {
            // Create a profile entry for the new user
            const { error: profileError } = await supabase
              .from('profiles')
              .upsert([
                { 
                  id: data.user.id,
                  full_name: 'Regular User',
                  role: 'member',
                  is_admin: false
                }
              ]);
              
            if (profileError) {
              console.error('Error creating user profile:', profileError);
            } else {
              console.log('Regular user created successfully');
            }
          }
        }
      } catch (err) {
        console.error('Error creating test users:', err);
      }
    };
    
    createTestUsers();
  }, []);

  /**
   * Login with email and password
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log(`Attempting login with email: ${email}`);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error);
        toast.error(error.message);
        return false;
      }
      
      if (data.user) {
        console.log('Login successful, fetching profile for user:', data.user.id);
        // Get user role from profiles table
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role, is_admin, full_name')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          // Handle the case where profile doesn't exist yet
          if (profileError.code === 'PGRST116') {
            console.log('Profile not found, creating default profile');
            // Create a default profile
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([
                { 
                  id: data.user.id,
                  full_name: data.user.user_metadata?.full_name || '',
                  role: 'member',
                  is_admin: false
                }
              ]);
              
            if (insertError) {
              console.error('Error creating profile:', insertError);
            }
          }
        }
        
        const userRole = profile?.role || 'member';
        const userIsAdmin = profile?.is_admin || false;
        const fullName = profile?.full_name || data.user.user_metadata?.full_name || '';
        
        console.log('User role:', userRole, 'Is admin:', userIsAdmin);
        
        // Update auth state
        setUser({
          ...data.user,
          email: data.user.email || '', // Ensure email is always provided
          role: userRole
        });
        setIsAdmin(userIsAdmin);
        setIsAuthenticated(true);
        
        // Store auth data in local storage and cookies
        storageManager.setAuthData(
          true, 
          userIsAdmin, 
          data.user.email || '', 
          fullName
        );
        
        toast.success('Login successful');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Unexpected login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
      return false;
    }
  };

  /**
   * Sign up a new user
   */
  const signUp = async (email: string, password: string, fullName: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      
      if (error) {
        console.error('Sign up error:', error);
        toast.error(error.message);
        return false;
      }
      
      if (data.user) {
        // Create a profile entry for the new user
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user.id,
              email: data.user.email,
              full_name: fullName,
              role: 'member',
              is_admin: false
            }
          ]);
          
        if (profileError) {
          console.error('Error creating user profile:', profileError);
          toast.error('Account created but profile setup failed');
        }
        
        toast.success('Sign up successful! Please check your email to confirm your account.');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Unexpected sign up error:', error);
      toast.error(error instanceof Error ? error.message : 'Sign up failed');
      return false;
    }
  };

  /**
   * Log out the current user
   */
  const logout = async (): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        toast.error(error.message);
        return false;
      }
      
      // Clear auth state
      setUser(null);
      setIsAdmin(false);
      setIsAuthenticated(false);
      
      // Clear local storage and cookies
      storageManager.setAuthData(false, false, '', '');
      
      toast.success('Logged out successfully');
      return true;
    } catch (error) {
      console.error('Unexpected logout error:', error);
      toast.error(error instanceof Error ? error.message : 'Logout failed');
      return false;
    }
  };

  /**
   * Request a password reset for the given email
   */
  const requestPasswordReset = async (email: string): Promise<boolean> => {
    return passwordManager.requestPasswordReset(email);
  };

  /**
   * Update the password for the currently logged in user
   */
  const updatePassword = async (newPassword: string): Promise<boolean> => {
    return passwordManager.updatePassword(newPassword);
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
