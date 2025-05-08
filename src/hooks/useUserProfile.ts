import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  full_name: string | null;
  username: string | null;
  contact_number: string | null;
  preferred_workout_time: string | null;
  gym_location: string | null;
  avatar_url: string | null;
  role: string;
  is_admin: boolean;
  email?: string;
  created_at: string;
  updated_at: string;
  // Add subscription-related fields
  active_plan_id?: string | null;
  billing_start_date?: string | null;
  subscription_status?: string | null;
}

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log('No session found, user is not authenticated');
          setIsLoading(false);
          return;
        }
        
        const user = session.user;
        console.log('Current user:', user.id);
        
        // Fetch user profile from profiles table
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          
          // Check if error is due to no rows returned
          if (profileError.code === 'PGRST116') {
            // Try to create a new profile
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert([{ 
                id: user.id,
                full_name: user.user_metadata.full_name || user.email,
                username: null,
                role: 'member',
                is_admin: false
              }])
              .select('*')
              .single();
              
            if (createError) {
              console.error('Error creating user profile:', createError);
              throw new Error('Failed to create user profile');
            }
            
            setUserProfile(newProfile);
          } else {
            throw new Error('Failed to fetch user profile');
          }
        } else {
          // Add email from auth user to profile data
          const profileWithEmail = {
            ...profileData,
            email: user.email
          };
          
          setUserProfile(profileWithEmail);
        }
      } catch (err) {
        console.error('Error in useUserProfile:', err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          if (session?.user) {
            // Fetch or create user profile
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
              
            if (error && error.code === 'PGRST116') {
              // No profile exists, create one
              const { data: newProfile, error: createError } = await supabase
                .from('profiles')
                .insert([{ 
                  id: session.user.id,
                  full_name: session.user.user_metadata.full_name || session.user.email,
                  username: null,
                  role: 'member',
                  is_admin: false
                }])
                .select('*')
                .single();
                
              if (!createError) {
                const profileWithEmail = {
                  ...newProfile,
                  email: session.user.email
                };
                
                setUserProfile(profileWithEmail);
              }
            } else if (!error) {
              const profileWithEmail = {
                ...profile,
                email: session.user.email
              };
              
              setUserProfile(profileWithEmail);
            }
          }
        } else if (event === 'SIGNED_OUT') {
          setUserProfile(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!userProfile || !userProfile.id) {
        throw new Error('No user profile found to update');
      }
      
      // Remove email from updates as it's not a column in the profiles table
      const { email, ...profileUpdates } = updates;
      
      const { data, error } = await supabase
        .from('profiles')
        .update(profileUpdates)
        .eq('id', userProfile.id)
        .select('*')
        .single();
        
      if (error) {
        console.error('Error updating user profile:', error);
        throw new Error('Failed to update user profile');
      }
      
      setUserProfile({
        ...data,
        email: userProfile.email // Preserve email
      });
      
      return data;
    } catch (err) {
      console.error('Error in updateUserProfile:', err);
      throw err;
    }
  };

  return {
    userProfile,
    isLoading,
    error,
    updateUserProfile
  };
};
