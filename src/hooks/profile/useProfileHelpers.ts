
import { UserProfile } from '@/types/userProfile.types';

/**
 * Creates a complete user profile object from potentially incomplete data
 */
export const useProfileHelpers = () => {
  /**
   * Creates a complete profile by filling in missing fields with defaults
   */
  const createCompleteProfile = (
    profile: Partial<UserProfile>, 
    email?: string | null
  ): UserProfile => {
    return {
      id: profile.id || '',
      full_name: profile.full_name || null,
      username: profile.username || null,
      contact_number: profile.contact_number || null,
      preferred_workout_time: profile.preferred_workout_time || null,
      gym_location: profile.gym_location || null,
      avatar_url: profile.avatar_url || null,
      bio: profile.bio || null, // Ensure bio exists, default to null
      role: profile.role || 'member',
      is_admin: profile.is_admin || false,
      is_staff: profile.is_staff || false,
      email: email || profile.email || undefined,
      created_at: profile.created_at || new Date().toISOString(),
      updated_at: profile.updated_at || new Date().toISOString(),
      specialization: profile.specialization || undefined,
    };
  };

  return {
    createCompleteProfile
  };
};

export default useProfileHelpers;
