
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const useSupabaseAuth = () => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch user role using the security definer function
  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('get_user_role', { user_id: userId });
        
      if (error) {
        console.error('Error fetching user role:', error);
        return;
      }
      
      setUserRole(data || 'member');
    } catch (error) {
      console.error('Failed to fetch user role:', error);
    }
  };

  useEffect(() => {
    const setupAuthListener = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user || null);
        
        if (initialSession?.user) {
          await fetchUserRole(initialSession.user.id);
        }
        
        // Set up auth state change listener
        const { data: { subscription } } = await supabase.auth.onAuthStateChange(
          async (event, newSession) => {
            console.log('Auth state change:', event);
            setSession(newSession);
            setUser(newSession?.user || null);
            
            if (newSession?.user) {
              await fetchUserRole(newSession.user.id);
            } else {
              setUserRole(null);
            }
            
            if (event === 'SIGNED_OUT') {
              navigate('/login');
              toast.info('You have been signed out');
            } else if (event === 'SIGNED_IN') {
              toast.success('Signed in successfully');
            } else if (event === 'PASSWORD_RECOVERY') {
              navigate('/reset-password');
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
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to sign in');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setIsLoading(true);
      
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name: userData.name,
          }
        }
      });
      
      if (authError) {
        throw authError;
      }
      
      if (authData.user) {
        // Create member record
        const { error: memberError } = await supabase.from('members').insert({
          id: authData.user.id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone || '',
          membershiptype: 'Basic',
          status: 'Pending',
          username: userData.email
        });
        
        if (memberError) {
          console.error('Error creating member record:', memberError);
          toast.error('Account created but profile setup failed');
          return false;
        }
        
        // Assign member role
        const { data: roleData } = await supabase
          .from('roles')
          .select('id')
          .eq('name', 'member')
          .single();
          
        if (roleData?.id) {
          await supabase.from('user_roles').insert({
            user_id: authData.user.id,
            role_id: roleData.id
          });
        }
      }
      
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to create account');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      toast.success('Password reset instructions sent to your email');
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error(error.message || 'Failed to send password reset email');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) {
        throw error;
      }
      
      toast.success('Password updated successfully');
      navigate('/login');
      return true;
    } catch (error) {
      console.error('Update password error:', error);
      toast.error(error.message || 'Failed to update password');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

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
    isMember,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword
  };
};
