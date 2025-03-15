
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AuthUser {
  id: string;
  email: string;
  role?: string;
  user_metadata?: {
    full_name?: string;
  };
  // Add any other properties from Supabase User that we need
  app_metadata?: any;
  confirmation_sent_at?: string;
  confirmed_at?: string;
  created_at?: string;
  factors?: any[];
  identities?: any[];
  last_sign_in_at?: string;
  phone?: string;
  recovery_sent_at?: string;
  updated_at?: string;
  aud?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
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
          if (session?.user) {
            // Get user role from profiles table
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('role, is_admin')
              .eq('id', session.user.id)
              .single();
              
            const userRole = profile?.role || 'member';
            const userIsAdmin = profile?.is_admin || false;
            
            setUser({
              ...session.user,
              email: session.user.email || '',
              role: userRole
            });
            
            setIsAdmin(userIsAdmin);
            setIsAuthenticated(true);
            
            // Update local storage and cookies
            localStorage.setItem('isLoggedIn', 'true');
            
            if (userIsAdmin) {
              localStorage.setItem('isAdmin', 'true');
            } else {
              localStorage.removeItem('isAdmin');
            }
            
            localStorage.setItem('userEmail', session.user.email || '');
            localStorage.setItem('userName', session.user.user_metadata?.full_name || session.user.email || '');
            
            document.cookie = "session_active=true; path=/; max-age=2592000";
            
            if (userIsAdmin) {
              document.cookie = "user_role=admin; path=/; max-age=2592000";
            } else {
              document.cookie = "user_role=member; path=/; max-age=2592000";
            }
          }
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
      
      // Get user role from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, is_admin')
        .eq('id', data.user.id)
        .single();
        
      if (profileError) {
        console.error('Error fetching user profile:', profileError);
      }
      
      const userRole = profile?.role || 'member';
      const userIsAdmin = profile?.is_admin || false;
      
      setUser({
        ...data.user,
        email: data.user.email || '',
        role: userRole
      });
      
      setIsAdmin(userIsAdmin);
      setIsAuthenticated(true);
      
      toast.success('Logged in successfully');
      
      // Redirect based on role
      if (userIsAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
      
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
      navigate('/login');
      
      return true;
    } catch (error) {
      console.error('Error in logout:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to logout');
      return false;
    }
  };
  
  const requestPasswordReset = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        console.error('Password reset request error:', error);
        toast.error(error.message);
        return false;
      }
      
      toast.success('Password reset link has been sent to your email');
      return true;
    } catch (error) {
      console.error('Error in requestPasswordReset:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send password reset link');
      return false;
    }
  };
  
  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        console.error('Update password error:', error);
        toast.error(error.message);
        return false;
      }
      
      toast.success('Password updated successfully');
      return true;
    } catch (error) {
      console.error('Error in updatePassword:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update password');
      return false;
    }
  };

  return {
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
};
