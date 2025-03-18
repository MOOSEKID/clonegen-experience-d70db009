
import { useTrainerData } from './useTrainerData';
import { useTrainerOperations } from './useTrainerOperations';
import { useCertificationsManagement } from './useCertificationsManagement';
import { useAvailabilityManagement } from './useAvailabilityManagement';
import { TrainerProfile, TrainerCertification, TrainerAvailability } from './types';

export type { TrainerProfile, TrainerCertification, TrainerAvailability };

export const useTrainerProfiles = () => {
  const { trainers, isLoading, error } = useTrainerData();
  const { addTrainer, updateTrainer, deleteTrainer } = useTrainerOperations();
  const { addCertification, deleteCertification } = useCertificationsManagement();
  const { addAvailability, deleteAvailability } = useAvailabilityManagement();

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
