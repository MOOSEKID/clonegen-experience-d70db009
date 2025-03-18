
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
  bio?: string | null; // Make bio optional
  role: string;
  is_admin: boolean;
  is_staff: boolean;
  email?: string;
  created_at: string;
  updated_at: string;
  specialization?: string[]; // Optional field
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
                contact_number: null,
                preferred_workout_time: null,
                gym_location: null,
                role: 'member',
                is_admin: false,
                avatar_url: null,
                bio: null, // Add bio field explicitly
              }])
              .select()
              .single();
              
            if (createError) {
              console.error('Error creating user profile:', createError);
              throw new Error('Failed to create user profile');
            }
            
            // Add email and ensure bio exists
            const completeProfile: UserProfile = {
              ...newProfile,
              bio: null,
              email: user.email,
              is_staff: newProfile.is_staff || false,
              created_at: newProfile.created_at || new Date().toISOString(),
              updated_at: newProfile.updated_at || new Date().toISOString(),
            };
            
            setUserProfile(completeProfile);
          } else {
            throw new Error('Failed to fetch user profile');
          }
        } else {
          // Add email from auth user to profile data and ensure bio exists
          const completeProfile: UserProfile = {
            ...profileData,
            bio: profileData.bio || null,
            email: user.email,
            is_staff: profileData.is_staff || false,
            created_at: profileData.created_at || new Date().toISOString(),
            updated_at: profileData.updated_at || new Date().toISOString(),
          };
          
          setUserProfile(completeProfile);
        }
      } catch (err) {
        console.error('Error in useUserProfile:', err);
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
                  bio: null, // Add bio field explicitly
                }])
                .select()
                .single();
                
              if (!createError && newProfile) {
                // Create complete profile with required fields
                const completeProfile: UserProfile = {
                  ...newProfile,
                  bio: null,
                  email: session.user.email,
                  is_staff: newProfile.is_staff || false,
                  created_at: newProfile.created_at || new Date().toISOString(),
                  updated_at: newProfile.updated_at || new Date().toISOString(),
                };
                
                setUserProfile(completeProfile);
              }
            } else if (!error && profile) {
              // Create complete profile with required fields
              const completeProfile: UserProfile = {
                ...profile,
                bio: profile.bio || null,
                email: session.user.email,
                is_staff: profile.is_staff || false,
                created_at: profile.created_at || new Date().toISOString(),
                updated_at: profile.updated_at || new Date().toISOString(),
              };
              
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
        .select()
        .single();
        
      if (error) {
        console.error('Error updating user profile:', error);
        throw new Error('Failed to update user profile');
      }
      
      // Create complete profile with required fields
      const completeProfile: UserProfile = {
        ...data,
        bio: data.bio || null,
        email: userProfile.email,
        is_staff: data.is_staff || false,
        created_at: data.created_at || userProfile.created_at,
        updated_at: data.updated_at || new Date().toISOString(),
      };
      
      setUserProfile(completeProfile);
      
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
