
import { useTrainerProfiles } from '@/hooks/trainers/useTrainerProfiles';

export const useTrainerSubmitActions = () => {
  const {
    addTrainer,
    updateTrainer,
    deleteTrainer,
    addCertification,
    deleteCertification,
    addAvailability,
    deleteAvailability,
  } = useTrainerProfiles();

  const handleAddTrainerSubmit = async (data: any) => {
    await addTrainer(data);
    return true;
  };

  const handleUpdateTrainerSubmit = async (id: string, data: any) => {
    await updateTrainer(id, data);
    return true;
  };

  const handleDeleteTrainerSubmit = async (id: string) => {
    await deleteTrainer(id);
    return true;
  };

  const handleAddCertificationSubmit = async (data: any) => {
    await addCertification(data);
    return true;
  };

  const handleDeleteCertificationSubmit = async (id: string) => {
    await deleteCertification(id);
    return true;
  };

  const handleAddAvailabilitySubmit = async (data: any) => {
    await addAvailability(data);
    return true;
  };

  const handleDeleteAvailabilitySubmit = async (id: string) => {
    await deleteAvailability(id);
    return true;
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
