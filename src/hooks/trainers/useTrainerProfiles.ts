
import { useTrainerProfilesData } from './profiles/useTrainerProfilesData';
import { useTrainerProfileActions } from './profiles/useTrainerProfileActions';
import { useCertificationActions } from './profiles/useCertificationActions';
import { useAvailabilityActions } from './profiles/useAvailabilityActions';

// Re-export the types using 'export type' for TypeScript's isolatedModules
export type { TrainerProfile, TrainerCertification, TrainerAvailability } from './profiles/types';

export const useTrainerProfiles = () => {
  const { trainers, isLoading, error } = useTrainerProfilesData();
  const { addTrainer, updateTrainer, deleteTrainer } = useTrainerProfileActions();
  const { addCertification, deleteCertification } = useCertificationActions();
  const { addAvailability, deleteAvailability } = useAvailabilityActions();
  
  return {
    trainers,
    isLoading,
    error,
    addTrainer,
    updateTrainer,
    deleteTrainer,
    addCertification,
    deleteCertification,
    addAvailability,
    deleteAvailability
  };
};
