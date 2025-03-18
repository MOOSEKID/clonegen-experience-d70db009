
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserProfileUpdate } from '@/types/userProfile.types';
import useProfileHelpers from './useProfileHelpers';

export const useUpdateUserProfile = (
  userProfile: UserProfile | null,
  setUserProfile: (profile: UserProfile | null) => void
) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<Error | null>(null);
  const { createCompleteProfile } = useProfileHelpers();

  const updateUserProfile = async (updates: UserProfileUpdate) => {
    try {
      setIsUpdating(true);
      setUpdateError(null);
      
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
      
      // Create complete profile with all required fields
      const completeProfile = createCompleteProfile({
        ...data,
        bio: data.bio || null, // Ensure bio exists, default to null
        created_at: data.created_at || userProfile.created_at,
        updated_at: data.updated_at || new Date().toISOString(),
      }, userProfile.email);
      
      setUserProfile(completeProfile);
      
      return data;
    } catch (err) {
      console.error('Error in updateUserProfile:', err);
      setUpdateError(err instanceof Error ? err : new Error('An unknown error occurred'));
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateUserProfile,
    isUpdating,
    updateError
  };
};

export default useUpdateUserProfile;
