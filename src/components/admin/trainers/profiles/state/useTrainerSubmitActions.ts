
import { useTrainerProfiles } from '@/hooks/trainers/useTrainerProfiles';
import { TrainerSubmitActions } from './types';

export const useTrainerSubmitActions = (): TrainerSubmitActions => {
  const {
    addTrainer,
    updateTrainer,
    deleteTrainer,
    addCertification,
    deleteCertification,
    addAvailability,
    deleteAvailability,
  } = useTrainerProfiles();

  const handleAddTrainerSubmit = async (data: any): Promise<void> => {
    await addTrainer(data);
  };

  const handleUpdateTrainerSubmit = async (id: string, data: any): Promise<void> => {
    await updateTrainer(id, data);
  };

  const handleDeleteTrainerSubmit = async (id: string): Promise<void> => {
    await deleteTrainer(id);
  };

  const handleAddCertificationSubmit = async (data: any): Promise<void> => {
    await addCertification(data);
  };

  const handleDeleteCertificationSubmit = async (id: string): Promise<void> => {
    await deleteCertification(id);
  };

  const handleAddAvailabilitySubmit = async (data: any): Promise<void> => {
    await addAvailability(data);
  };

  const handleDeleteAvailabilitySubmit = async (id: string): Promise<void> => {
    await deleteAvailability(id);
  };

  return {
    handleAddTrainerSubmit,
    handleUpdateTrainerSubmit,
    handleDeleteTrainerSubmit,
    handleAddCertificationSubmit,
    handleDeleteCertificationSubmit,
    handleAddAvailabilitySubmit,
    handleDeleteAvailabilitySubmit,
  };
};
