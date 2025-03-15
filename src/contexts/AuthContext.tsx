
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthUser {
  id: string;
  email: string;
  role?: string;
  user_metadata?: {
    full_name?: string;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, fullName: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refreshSession = async () => {
    try {
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const currentUser = session.user;
        
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
          email: currentUser.email || '',
          role: userRole
        });
        
        setIsAdmin(userIsAdmin);
        setIsAuthenticated(true);
        
        // Set local storage values for backward compatibility
        localStorage.setItem('isLoggedIn', 'true');
        
        if (userIsAdmin) {
          localStorage.setItem('isAdmin', 'true');
        } else {
          localStorage.removeItem('isAdmin');
        }
        
        localStorage.setItem('userEmail', currentUser.email || '');
        localStorage.setItem('userName', currentUser.user_metadata?.full_name || currentUser.email || '');
        
        // Set cookies for backward compatibility
        document.cookie = "session_active=true; path=/; max-age=2592000"; // 30 days
        
        if (userIsAdmin) {
          document.cookie = "user_role=admin; path=/; max-age=2592000"; // 30 days
        } else {
          document.cookie = "user_role=member; path=/; max-age=2592000"; // 30 days
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        setIsAuthenticated(false);
        
        // Clear local storage and cookies
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        
        document.cookie = "session_active=; path=/; max-age=0";
        document.cookie = "user_role=; path=/; max-age=0";
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        await refreshSession();
      } catch (error) {
        console.error('Error checking auth:', error);
        setUser(null);
        setIsAdmin(false);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          await refreshSession();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAdmin(false);
          setIsAuthenticated(false);
          
          // Clear local storage and cookies
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('isAdmin');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('userName');
          
          document.cookie = "session_active=; path=/; max-age=0";
          document.cookie = "user_role=; path=/; max-age=0";
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Handle the admin credentials
      if (email === 'admin@example.com' && password === 'admin123') {
        // Check if admin user exists
        const { data: existingUsers } = await supabase
          .from('profiles')
          .select('id')
          .eq('role', 'admin')
          .eq('is_admin', true);
          
        let adminId;
          
        if (!existingUsers || existingUsers.length === 0) {
          // Create admin user in auth
          const { data: authUser, error: authError } = await supabase.auth.signUp({
            email: 'admin@example.com',
            password: 'admin123',
            options: {
              data: {
                full_name: 'Admin User'
              }
            }
          });
          
          if (authError) {
            console.error('Error creating admin auth user:', authError);
            throw new Error('Failed to create admin user');
          }
          
          adminId = authUser.user?.id;
          
          // Make sure profile is created with admin role
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              role: 'admin',
              is_admin: true,
              full_name: 'Admin User'
            })
            .eq('id', adminId);
            
          if (profileError) {
            console.error('Error updating admin profile:', profileError);
          }
        }
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Login error:', error);
        toast.error(error.message);
        return false;
      }
      
      await refreshSession();
      
      toast.success('Logged in successfully');
      
      return true;
    } catch (error) {
      console.error('Error in login:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to login');
      return false;
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });
      
      if (error) {
        console.error('Sign up error:', error);
        toast.error(error.message);
        return false;
      }
      
      toast.success('Account created successfully! Please check your email to confirm your account.');
      
      return true;
    } catch (error) {
      console.error('Error in signUp:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to sign up');
      return false;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        toast.error(error.message);
        return false;
      }
      
      setUser(null);
      setIsAdmin(false);
      setIsAuthenticated(false);
      
      // Clear local storage and cookies
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      
      document.cookie = "session_active=; path=/; max-age=0";
      document.cookie = "user_role=; path=/; max-age=0";
      
      toast.success('Logged out successfully');
      
      return true;
    } catch (error) {
      console.error('Error in logout:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to logout');
      return false;
    }
  };

  const value = {
    user,
    isAdmin,
    isLoading,
    isAuthenticated,
    login,
    signUp,
    logout,
    refreshSession
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
