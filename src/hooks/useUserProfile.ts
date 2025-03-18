
import { UserProfile, UserProfileUpdate } from '@/types/userProfile.types';
import useFetchUserProfile from './profile/useFetchUserProfile';
import useUpdateUserProfile from './profile/useUpdateUserProfile';

export { UserProfile, UserProfileUpdate } from '@/types/userProfile.types';

export const useUserProfile = () => {
  const { 
    userProfile, 
    isLoading, 
    error, 
    setUserProfile 
  } = useFetchUserProfile();
  
  const { 
    updateUserProfile, 
    isUpdating, 
    updateError 
  } = useUpdateUserProfile(userProfile, setUserProfile);

  return {
    userProfile,
    isLoading: isLoading || isUpdating,
    error: error || updateError,
    updateUserProfile
  };
};

export default useUserProfile;
