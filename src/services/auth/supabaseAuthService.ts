
import { supabase } from '@/integrations/supabase/client';

interface UserCredentials {
  email: string;
  password: string;
}

interface SignUpData extends UserCredentials {
  metadata?: {
    name?: string;
    [key: string]: any;
  };
}

// Fix the type issue for reset token verification
interface VerifyTokenParams {
  token: string;
}

// Authenticate with Supabase
export const signIn = async ({ email, password }: UserCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
};

// Sign up with Supabase
export const signUp = async ({ email, password, metadata }: SignUpData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  });
  
  if (error) throw error;
  return data;
};

// Sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Reset password
export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  });
  
  if (error) throw error;
};

// Verify password reset token from URL
export const verifyPasswordResetToken = async (token: string) => {
  const params: VerifyTokenParams = { token };
  const { data, error } = await supabase.rpc('verify_password_reset_token', params);
  
  if (error) throw error;
  return data as string;
};

// Update password after reset
export const updatePassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({
    password
  });
  
  if (error) throw error;
};

// Get current user
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data?.user || null;
};

// Get current session
export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data?.session || null;
};
