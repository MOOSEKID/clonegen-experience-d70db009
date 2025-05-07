
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { AuthUser } from '@/types/auth.types';
import { toast } from 'sonner';
import { User, AuthError } from '@supabase/supabase-js';

// Constants
const AUTH_STORAGE_KEY = 'uptownGym_auth_state';
const PROFILE_STORAGE_KEY = 'uptownGym_profile';

/**
 * Check if email is a known admin email
 */
const isKnownAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  const lowerEmail = email.toLowerCase();
  return lowerEmail === 'admin@example.com' || lowerEmail === 'admin@uptowngym.rw';
};

/**
 * Optimized authentication hook that reduces database calls and improves performance
 */
export const useOptimizedAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authStateInitializedRef = useRef(false);

  // Convert Supabase User to AuthUser
  const convertToAuthUser = useCallback((sbUser: User | null): AuthUser | null => {
    if (!sbUser) return null;
    
    return {
      ...sbUser,
      id: sbUser.id,
      email: sbUser.email || '',
      role: sbUser.user_metadata?.role || 'member'
    };
  }, []);

  // Cache management functions
  const saveToCache = useCallback((authState: any) => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    } catch (err) {
      console.error('Error saving auth state to cache:', err);
    }
  }, []);

  const loadFromCache = useCallback(() => {
    try {
      const cachedState = localStorage.getItem(AUTH_STORAGE_KEY);
      if (cachedState) {
        return JSON.parse(cachedState);
      }
    } catch (err) {
      console.error('Error loading auth state from cache:', err);
    }
    return null;
  }, []);

  // Profile cache management
  const loadCachedProfile = useCallback((userId: string) => {
    try {
      const cachedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (cachedProfile) {
        const profile = JSON.parse(cachedProfile);
        if (profile.id === userId) {
          return profile;
        }
      }
    } catch (err) {
      console.error('Error loading profile from cache:', err);
    }
    return null;
  }, []);
  
  const saveProfileToCache = useCallback((profile: any) => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch (err) {
      console.error('Error saving profile to cache:', err);
    }
  }, []);

  // Fetch user profile with optimizations
  const fetchUserProfile = useCallback(async (userId: string, userEmail: string | null) => {
    // Fast path for known admin emails
    if (isKnownAdminEmail(userEmail)) {
      setIsAdmin(true);
      return { is_admin: true, role: 'admin' };
    }
    
    // Check for cached profile first
    const cachedProfile = loadCachedProfile(userId);
    if (cachedProfile) {
      setIsAdmin(cachedProfile.is_admin || false);
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
        
        // Update admin state
        setIsAdmin(profile.is_admin || false);
        return profile;
      }
      
      return null;
    } catch (err) {
      console.error('Error in fetchUserProfile:', err);
      return null;
    }
  }, [loadCachedProfile, saveProfileToCache]);

  // Update auth state with optimized profile check
  const updateAuthState = useCallback(async (session: any) => {
    if (session?.user) {
      const authUser = convertToAuthUser(session.user);
      
      // Update UI state synchronously for better UX
      setUser(authUser);
      setIsAuthenticated(true);
      
      // Fast path for known admin emails
      if (isKnownAdminEmail(session.user.email)) {
        setIsAdmin(true);
      }
      
      // Save current auth state to cache for faster loading next time
      saveToCache({
        isAuthenticated: true,
        userId: session.user.id,
        email: session.user.email || '',
        lastUpdated: new Date().toISOString(),
      });
      
      // Non-blocking profile check
      setTimeout(() => {
        fetchUserProfile(session.user.id, session.user.email)
          .then(profile => {
            if (profile) {
              const userIsAdmin = profile.is_admin || isKnownAdminEmail(session.user.email);
              setIsAdmin(userIsAdmin);
              
              // Update cache with admin status
              saveToCache({
                isAuthenticated: true,
                isAdmin: userIsAdmin,
                userId: session.user.id,
                email: session.user.email || '',
                lastUpdated: new Date().toISOString(),
              });
            }
          });
      }, 0);
    } else {
      // No session - clear state
      setUser(null);
      setIsAdmin(false);
      setIsAuthenticated(false);
      saveToCache({ isAuthenticated: false, isAdmin: false });
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    }
  }, [convertToAuthUser, fetchUserProfile, saveToCache]);

  // Login function
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Fast path for known admins
      const knownAdmin = isKnownAdminEmail(email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message);
        return false;
      }
      
      if (data.user) {
        // Fast UI update before complete profile check
        const authUser = convertToAuthUser(data.user);
        setUser(authUser);
        setIsAuthenticated(true);
        
        if (knownAdmin) {
          setIsAdmin(true);
        }
        
        // Save auth state to cache
        saveToCache({
          isAuthenticated: true,
          isAdmin: knownAdmin,
          userId: data.user.id,
          email: data.user.email || '',
          lastUpdated: new Date().toISOString(),
        });
        
        toast.success('Login successful');
        
        // Background profile check
        setTimeout(async () => {
          await fetchUserProfile(data.user.id, data.user.email);
        }, 0);
        
        return true;
      }
      
      return false;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [convertToAuthUser, fetchUserProfile, saveToCache]);

  // Sign up function
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
        toast.error(error.message);
        return false;
      }
      
      toast.success('Signup successful! Please check your email for verification.');
      return true;
    } catch (error) {
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
      localStorage.removeItem(PROFILE_STORAGE_KEY);
      
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

  // Password reset request
  const requestPasswordReset = useCallback(async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        toast.error(error.message);
        return false;
      }
      
      toast.success('Password reset link has been sent to your email');
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send password reset link');
      return false;
    }
  }, []);

  // Password update
  const updatePassword = useCallback(async (newPassword: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        toast.error(error.message);
        return false;
      }
      
      toast.success('Password updated successfully');
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update password');
      return false;
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authStateInitializedRef.current) return;
        authStateInitializedRef.current = true;
        
        setIsLoading(true);
        console.log('Initializing optimized auth...');
        
        // First check for cached auth state for faster initial load
        const cachedAuth = loadFromCache();
        if (cachedAuth?.isAuthenticated) {
          // Use cached values immediately to reduce perceived loading time
          setIsAuthenticated(true);
          setIsAdmin(cachedAuth.isAdmin || false);
        }
        
        // Set up auth state change listener
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
          console.log('Auth state changed:', event);
          
          // Non-blocking update
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
            updateAuthState(session);
          } else if (event === 'SIGNED_OUT') {
            // Clear state immediately for sign out
            setUser(null);
            setIsAdmin(false);
            setIsAuthenticated(false);
            saveToCache({ isAuthenticated: false, isAdmin: false });
            localStorage.removeItem(PROFILE_STORAGE_KEY);
          }
        });
        
        // Get the current session
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
