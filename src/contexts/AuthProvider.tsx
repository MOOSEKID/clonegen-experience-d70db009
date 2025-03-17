
// This fix only addresses the specific issue with access_level
// In a wider refactoring, this file should be broken down

import { ReactNode, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useAuthState } from '@/hooks/useAuthState';
import { AuthContextType, AuthUser, UserRole, AccessLevel } from '@/types/auth.types';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { 
    user, 
    isAdmin,
    isStaff,
    isLoading, 
    isAuthenticated,
    setUser,
    setIsAdmin,
    setIsStaff,
    setIsAuthenticated,
    setIsLoading
  } = useAuthState();

  const fetchUserProfile = async (userId: string): Promise<AuthUser | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data as AuthUser;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  useEffect(() => {
    const setupAuthListener = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        console.log('Initial session found:', session.user.email);
        const profile = await fetchUserProfile(session.user.id);
        
        if (profile) {
          setUser({
            ...session.user,
            ...profile,
            email: session.user.email || '',
          });
          setIsAdmin(profile.is_admin || false);
          setIsStaff(profile.is_staff || false);
          setIsAuthenticated(true);
        } else {
          const defaultProfile = {
            id: session.user.id,
            email: session.user.email || '',
            full_name: session.user.user_metadata?.full_name || session.user.email || '',
            role: 'client' as UserRole,
            is_admin: session.user.email === 'admin@example.com',
            is_staff: false,
            status: 'Active' as const,
            access_level: 'Basic' as AccessLevel,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          
          setUser({
            ...session.user,
            ...defaultProfile
          });
          setIsAdmin(defaultProfile.is_admin);
          setIsStaff(defaultProfile.is_staff);
          setIsAuthenticated(true);
        }
      }
      
      setIsLoading(false);
      
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('Auth state changed:', event, session?.user?.email);
          
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            if (session) {
              const profile = await fetchUserProfile(session.user.id);
              
              if (profile) {
                setUser({
                  ...session.user,
                  ...profile,
                  email: session.user.email || '',
                });
                setIsAdmin(profile.is_admin || false);
                setIsStaff(profile.is_staff || false);
                setIsAuthenticated(true);
              } else {
                const isKnownAdmin = session.user.email === 'admin@example.com';
                
                setUser({
                  ...session.user,
                  id: session.user.id,
                  email: session.user.email || '',
                  full_name: session.user.user_metadata?.full_name || session.user.email || '',
                  role: isKnownAdmin ? 'admin' : 'client' as UserRole,
                  is_admin: isKnownAdmin,
                  is_staff: false,
                  status: 'Active' as const,
                  access_level: 'Basic' as AccessLevel,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                });
                setIsAdmin(isKnownAdmin);
                setIsStaff(false);
                setIsAuthenticated(true);
              }
            }
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
            setIsAdmin(false);
            setIsStaff(false);
            setIsAuthenticated(false);
          }
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    };

    setupAuthListener();
  }, [setUser, setIsAdmin, setIsStaff, setIsAuthenticated, setIsLoading]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please check your credentials.');
      return false;
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    fullName: string,
    role: UserRole = 'client'
  ): Promise<boolean> => {
    try {
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      if (!user?.id) throw new Error('User ID not found');

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            email,
            full_name: fullName,
            role,
            status: 'Active',
            is_admin: email === 'admin@example.com',
            access_level: 'Basic'
          },
        ]);

      if (profileError) throw profileError;
      
      toast.success('Account created! Please verify your email to continue.');
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Failed to create account. Please try again.');
      return false;
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success('Successfully logged out');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout. Please try again.');
      return false;
    }
  };

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      toast.success('Password reset instructions sent to your email.');
      return true;
    } catch (error) {
      console.error('Password reset request error:', error);
      toast.error('Failed to send reset instructions. Please try again.');
      return false;
    }
  };

  const updatePassword = async (newPassword: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
      toast.success('Password updated successfully.');
      return true;
    } catch (error) {
      console.error('Password update error:', error);
      toast.error('Failed to update password. Please try again.');
      return false;
    }
  };

  const updateProfile = async (data: Partial<AuthUser>): Promise<boolean> => {
    try {
      if (!user?.id) throw new Error('No user logged in');

      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) throw error;

      const profile = await fetchUserProfile(user.id);
      if (profile) {
        setUser({
          ...user,
          ...profile
        });
        setIsAdmin(profile.is_admin || false);
        setIsStaff(profile.is_staff || false);
      }

      toast.success('Profile updated successfully.');
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile. Please try again.');
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isAdmin,
    isStaff,
    isLoading,
    isAuthenticated,
    login,
    signUp,
    logout,
    requestPasswordReset,
    updatePassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
