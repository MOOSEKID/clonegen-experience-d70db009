
import { useTrainerProfiles } from '@/hooks/trainers/useTrainerProfiles';
import { useDialogState } from './state/useDialogState';
import { useTrainerFiltering } from './state/useTrainerFiltering';
import { useTrainerSubmitActions } from './state/useTrainerSubmitActions';

export function useTrainerProfilesState() {
  // Get trainer data
  const {
    trainers,
    isLoading,
  } = useTrainerProfiles();

  // Dialog state management
  const [
    { isAddDialogOpen, isEditDialogOpen, isCertDialogOpen, isAvailDialogOpen, selectedTrainer },
    { 
      setIsAddDialogOpen, 
      setIsEditDialogOpen, 
      setIsCertDialogOpen, 
      setIsAvailDialogOpen,
      setSelectedTrainer,
      handleAddTrainer,
      handleEditTrainer,
      handleAddCertification,
      handleAddAvailability 
    }
  ] = useDialogState();

  // Trainer filtering
  const [
    { activeTab },
    { setActiveTab },
    filteredTrainers
  ] = useTrainerFiltering(trainers);

  // Get the selected trainer data
  const getSelectedTrainer = () => {
    return trainers.find((trainer) => trainer.id === selectedTrainer) || null;
  };

  // Form submission actions
  const {
    handleAddTrainerSubmit,
    handleUpdateTrainerSubmit,
    handleDeleteTrainerSubmit,
    handleAddCertificationSubmit,
    handleDeleteCertificationSubmit,
    handleAddAvailabilitySubmit,
    handleDeleteAvailabilitySubmit,
  } = useTrainerSubmitActions();

  // Dialog submission handlers with dialog closing
  const handleAddTrainerWithClose = async (data: any) => {
    await handleAddTrainerSubmit(data);
    setIsAddDialogOpen(false);
  };

  const handleUpdateTrainerWithClose = async (id: string, data: any) => {
    await handleUpdateTrainerSubmit(id, data);
    setIsEditDialogOpen(false);
  };

  const handleAddCertificationWithClose = async (data: any) => {
    await handleAddCertificationSubmit(data);
    setIsCertDialogOpen(false);
  };

  const handleAddAvailabilityWithClose = async (data: any) => {
    await handleAddAvailabilitySubmit(data);
    setIsAvailDialogOpen(false);
  };

  return {
    // Data
    trainers,
    isLoading,
    filteredTrainers,
    
    // Dialog state
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isCertDialogOpen,
    setIsCertDialogOpen,
    isAvailDialogOpen,
    setIsAvailDialogOpen,
    selectedTrainer,
    
    // Filtering
    activeTab,
    setActiveTab,
    
    // Helper methods
    getSelectedTrainer,
    
    // Action handlers
    handleAddTrainer,
    handleEditTrainer,
    handleAddCertification,
    handleAddAvailability,
    
    // Submission handlers with dialog closing
    handleAddTrainerSubmit: handleAddTrainerWithClose,
    handleUpdateTrainerSubmit: handleUpdateTrainerWithClose,
    handleDeleteTrainerSubmit,
    handleAddCertificationSubmit: handleAddCertificationWithClose,
    handleDeleteCertificationSubmit,
    handleAddAvailabilitySubmit: handleAddAvailabilityWithClose,
    handleDeleteAvailabilitySubmit,
  };
}
