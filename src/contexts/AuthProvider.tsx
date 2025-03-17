import { ReactNode, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useAuthState } from '@/hooks/useAuthState';
import { AuthContextType, AuthUser, UserRole } from '@/types/auth.types';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

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

  // Fetch user profile from database
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

  // Handle session changes
  const handleSessionChange = async (userId: string | undefined) => {
    if (!userId) {
      setUser(null);
      setIsAdmin(false);
      setIsStaff(false);
      setIsAuthenticated(false);
      return;
    }

    const profile = await fetchUserProfile(userId);
    if (profile) {
      setUser(profile);
      setIsAdmin(profile.is_admin);
      setIsStaff(profile.is_staff);
      setIsAuthenticated(true);
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        await handleSessionChange(session?.user?.id);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await handleSessionChange(session?.user?.id);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const profile = await fetchUserProfile(data.user.id);
      if (!profile) throw new Error('Profile not found');

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

      // Create user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            email,
            full_name: fullName,
            role,
            status: 'Active',
          },
        ]);

      if (profileError) throw profileError;

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
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout. Please try again.');
      return false;
    }
  };

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
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

      // Refresh user profile
      const profile = await fetchUserProfile(user.id);
      if (profile) {
        setUser(profile);
        setIsAdmin(profile.is_admin);
        setIsStaff(profile.is_staff);
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
