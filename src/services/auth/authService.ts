
import { supabase } from '@/integrations/supabase/client';
import { AuthError } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { AuthUser } from '@/contexts/auth/AuthContext';

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) throw error;
    
    toast.success('Signed in successfully');
    return { success: true };
  } catch (error) {
    console.error('Error signing in:', error);
    const authError = error as AuthError;
    return { 
      success: false,
      error: authError.message || 'Failed to sign in'
    };
  }
};

// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string, userData: { full_name?: string }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.full_name || '',
        }
      }
    });
    
    if (error) throw error;
    
    toast.success('Registration successful! Please check your email to confirm your account.');
    return { success: true };
  } catch (error) {
    console.error('Error signing up:', error);
    const authError = error as AuthError;
    return { 
      success: false,
      error: authError.message || 'Failed to register'
    };
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await supabase.auth.signOut();
    toast.success('Signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
    toast.error('Failed to sign out');
  }
};

// Request password reset
export const requestPasswordReset = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error requesting password reset:', error);
    return false;
  }
};

// Reset password (after clicking email link)
export const resetUserPassword = async (password: string) => {
  try {
    const { error } = await supabase.auth.updateUser({ password });
    
    if (error) throw error;
    
    toast.success('Password updated successfully');
    return true;
  } catch (error) {
    console.error('Error resetting password:', error);
    toast.error('Failed to reset password');
    return false;
  }
};

// Get user profile data
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('role, is_admin')
      .eq('id', userId)
      .single();
      
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user profile:', error);
    }
    
    return data;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};
