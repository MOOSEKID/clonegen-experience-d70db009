
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { AuthUser, UserProfile } from '@/contexts/auth/types';
import { toast } from 'sonner';

export const useAuthSession = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Initial session check
  useEffect(() => {
    const getInitialSession = async () => {
      try {
        setIsLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setIsLoading(false);
          return;
        }
        
        if (session) {
          await handleSessionUpdate(session);
        } else {
          handleSignOut();
        }
      } catch (error) {
        console.error('Session initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getInitialSession();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (session) {
          await handleSessionUpdate(session);
        } else {
          handleSignOut();
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSessionUpdate = async (session: Session) => {
    try {
      // Create a basic user object from session
      const authUser: AuthUser = {
        id: session.user.id,
        email: session.user.email,
        full_name: session.user.user_metadata?.full_name || null,
        role: 'individual_client',
        is_admin: false,
        app_metadata: session.user.app_metadata,
        aud: session.user.aud
      };
        
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (profileError) {
        console.error('Error fetching profile:', profileError);
      } else if (profileData) {
        // Check if admin based on email
        const isAdminUser = session.user.email === 'admin@uptowngym.rw' || 
                            session.user.email === 'admin@example.com';
                            
        // Update user with profile data
        authUser.full_name = profileData.full_name;
        authUser.role = profileData.role;
        authUser.is_admin = isAdminUser || profileData.is_admin;

        const userProfile: UserProfile = {
          id: profileData.id,
          email: profileData.email,
          full_name: profileData.full_name || '',
          username: profileData.username || '',
          avatar_url: profileData.avatar_url || '',
          role: profileData.role,
          is_admin: authUser.is_admin,
          is_staff: profileData.is_staff || false,
          staff_category: profileData.staff_category,
          department: profileData.department,
          access_level: profileData.access_level || 'limited',
          status: profileData.status || 'active',
          contact_number: profileData.contact_number || '',
          preferred_workout_time: profileData.preferred_workout_time || '',
          gym_location: profileData.gym_location || '',
          created_at: profileData.created_at || new Date().toISOString(),
          updated_at: profileData.updated_at || new Date().toISOString()
        };
            
        setProfile(userProfile);
        setIsAdmin(authUser.is_admin);
      }
      
      setUser(authUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error handling session update:', error);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setProfile(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return {
    user,
    profile,
    isAuthenticated,
    isLoading,
    isAdmin,
    setUser,
    setProfile,
    setIsAuthenticated,
    setIsAdmin,
    setIsLoading,
    handleSignOut
  };
};
