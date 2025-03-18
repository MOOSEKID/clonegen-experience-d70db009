
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/userProfile.types';
import useProfileHelpers from './useProfileHelpers';

export const useFetchUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { createCompleteProfile } = useProfileHelpers();

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
                contact_number: null,
                preferred_workout_time: null,
                gym_location: null,
                role: 'member',
                is_admin: false,
                avatar_url: null,
                bio: null, // Set bio to null explicitly
              }])
              .select()
              .single();
              
            if (createError) {
              console.error('Error creating user profile:', createError);
              throw new Error('Failed to create user profile');
            }
            
            // Create complete profile with all required fields
            const completeProfile = createCompleteProfile(newProfile, user.email);
            setUserProfile(completeProfile);
          } else {
            throw new Error('Failed to fetch user profile');
          }
        } else {
          // Create complete profile with all required fields
          const completeProfile = createCompleteProfile(profileData, user.email);
          setUserProfile(completeProfile);
        }
      } catch (err) {
        console.error('Error in useFetchUserProfile:', err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
    
    // Auth state change listener
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
                  contact_number: null,
                  preferred_workout_time: null,
                  gym_location: null,
                  role: 'member',
                  is_admin: false,
                  avatar_url: null,
                  bio: null, // Set bio to null explicitly
                }])
                .select()
                .single();
                
              if (!createError && newProfile) {
                // Create complete profile with all required fields
                const completeProfile = createCompleteProfile(newProfile, session.user.email);
                setUserProfile(completeProfile);
              }
            } else if (!error && profile) {
              // Create complete profile with all required fields
              const completeProfile = createCompleteProfile(profile, session.user.email);
              setUserProfile(completeProfile);
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

  return {
    userProfile,
    isLoading,
    error,
    setUserProfile
  };
};

export default useFetchUserProfile;
