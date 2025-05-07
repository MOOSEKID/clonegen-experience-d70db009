
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { AuthUser } from '@/types/auth.types';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';

const LOCAL_STORAGE_AUTH_KEY = 'uptownGym_auth_state';
const LOCAL_STORAGE_PROFILE_KEY = 'uptownGym_profile';

const isKnownAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  const lowerEmail = email.toLowerCase();
  return lowerEmail === 'admin@example.com' || lowerEmail === 'admin@uptowngym.rw';
};

export const useOptimizedAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Convert Supabase User to AuthUser
  const convertToAuthUser = (sbUser: User | null): AuthUser | null => {
    if (!sbUser) return null;
    
    return {
      ...sbUser,
      id: sbUser.id,
      email: sbUser.email || '',
      role: sbUser.user_metadata?.role || 'member'
    };
  };

  // Cached auth state management
  const saveToCache = useCallback((authState: any) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(authState));
    } catch (err) {
      console.error('Error saving auth state to cache:', err);
    }
  }, []);

  const loadFromCache = useCallback(() => {
    try {
      const cachedState = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
      if (cachedState) {
        return JSON.parse(cachedState);
      }
    } catch (err) {
      console.error('Error loading auth state from cache:', err);
    }
    return null;
  }, []);

  // Function to check cached profile after getting session
  const checkCachedProfile = useCallback((userId: string) => {
    try {
      const cachedProfile = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
      if (cachedProfile) {
        const profile = JSON.parse(cachedProfile);
        
        if (profile.id === userId) {
          console.log('Using cached profile data');
          // Set admin status from cache first for faster UI response
          setIsAdmin(profile.is_admin || false);
          return profile;
        }
      }
    } catch (err) {
      console.error('Error loading profile from cache:', err);
    }
    return null;
  }, []);
  
  // Save profile to cache
  const saveProfileToCache = useCallback((profile: any) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(profile));
    } catch (err) {
      console.error('Error saving profile to cache:', err);
    }
  }, []);

  // Optimized check for admin status
  const fetchUserProfileOptimized = useCallback(async (userId: string, userEmail: string | null) => {
    // Check if this is a known admin email for immediate response
    if (userEmail && isKnownAdminEmail(userEmail)) {
      setIsAdmin(true);
      return { is_admin: true, role: 'admin' };
    }
    
    // Check if we have a cached profile
    const cachedProfile = checkCachedProfile(userId);
    if (cachedProfile) {
      return cachedProfile;
    }
    
    // If no cache hit, fetch from database
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('is_admin, role, full_name')
        .eq('id', userId)
        .maybeSingle();
        
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
        return null;
      }
      
      // If profile exists, save to cache
      if (profile) {
        saveProfileToCache({
          id: userId,
          ...profile
        });
        return profile;
      }
      
      return null;
    } catch (err) {
      console.error('Error in fetchUserProfileOptimized:', err);
      return null;
    }
  }, [checkCachedProfile, saveProfileToCache]);

  // Update auth state with optimized profile check
  const updateAuthState = useCallback(async (session: any) => {
    if (session?.user) {
      const authUser = convertToAuthUser(session.user);
      setUser(authUser);
      setIsAuthenticated(true);
      
      // Optimized profile check
      const profile = await fetchUserProfileOptimized(session.user.id, session.user.email);
      const userIsAdmin = profile?.is_admin || isKnownAdminEmail(session.user.email) || false;
      setIsAdmin(userIsAdmin);
      
      // Save to cache
      saveToCache({
        isAuthenticated: true,
        isAdmin: userIsAdmin,
        userId: session.user.id,
        email: session.user.email || '',
      });
    } else {
      // No session - clear state
      setUser(null);
      setIsAdmin(false);
      setIsAuthenticated(false);
      saveToCache({ isAuthenticated: false, isAdmin: false });
    }
  }, [fetchUserProfileOptimized, saveToCache]);

  // Login function
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Check for known admin email
      const knownAdmin = isKnownAdminEmail(email);
      
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
        // Fast path - update UI immediately before profile check
        const authUser = convertToAuthUser(data.user);
        setUser(authUser);
        setIsAuthenticated(true);
        
        if (knownAdmin) {
          setIsAdmin(true);
        }
        
        toast.success('Login successful');
        
        // In background, verify profile (non-blocking)
        setTimeout(async () => {
          await fetchUserProfileOptimized(data.user.id, data.user.email);
        }, 0);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserProfileOptimized]);

  // Signup function
  const signUp = useCallback(async (email: string, password: string, fullName: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
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
        console.error('Signup error:', error);
        toast.error(error.message);
        return false;
      }
      
      toast.success('Signup successful! Please check your email for verification.');
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error instanceof Error ? error.message : 'Signup failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Update state first for immediate UI response
      setUser(null);
      setIsAdmin(false);
      setIsAuthenticated(false);
      
      // Clear cache
      saveToCache({ isAuthenticated: false, isAdmin: false });
      localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
      
      // Then perform actual logout
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        toast.error(error.message);
        return false;
      }
      
      toast.success('Logged out successfully');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(error instanceof Error ? error.message : 'Logout failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [saveToCache]);

  // Password reset functions
  const requestPasswordReset = useCallback(async (email: string): Promise<boolean> => {
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
      console.error('Password reset error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send password reset link');
      return false;
    }
  }, []);

  const updatePassword = useCallback(async (newPassword: string): Promise<boolean> => {
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
      console.error('Update password error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update password');
      return false;
    }
  }, []);

  // Initialize auth - this runs once on component mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsLoading(true);
        console.log('Initializing optimized auth...');
        
        // First check for cached auth state for faster initial load
        const cachedAuth = loadFromCache();
        if (cachedAuth?.isAuthenticated) {
          // Use cached values immediately to reduce perceived loading time
          setIsAuthenticated(true);
          setIsAdmin(cachedAuth.isAdmin || false);
          // We'll still verify with actual session check below
        }
        
        // Set up the auth state change listener FIRST (important to prevent deadlocks)
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
          console.log('Auth state changed:', event);
          
          // Non-blocking update using setTimeout to prevent deadlocks
          setTimeout(() => {
            updateAuthState(session);
          }, 0);
          
          if (event === 'SIGNED_OUT') {
            // Clear state immediately for sign out
            setUser(null);
            setIsAdmin(false);
            setIsAuthenticated(false);
            saveToCache({ isAuthenticated: false, isAdmin: false });
            localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
          }
        });
        
        // THEN get the current session
        const { data } = await supabase.auth.getSession();
        await updateAuthState(data.session);
        setIsLoading(false);

        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error in auth initialization:', error);
        setIsLoading(false);
      }
    };

    initAuth();
  }, [loadFromCache, saveToCache, updateAuthState]);

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

export default useOptimizedAuth;
