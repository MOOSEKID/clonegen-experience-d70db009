
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
    { setActiveTab, getSelectedTrainer },
    filteredTrainers
  ] = useTrainerFiltering(trainers);

  // Form submission actions
  const {
    handleAddTrainerSubmit: baseAddTrainerSubmit,
    handleUpdateTrainerSubmit: baseUpdateTrainerSubmit,
    handleDeleteTrainerSubmit,
    handleAddCertificationSubmit: baseAddCertificationSubmit,
    handleDeleteCertificationSubmit,
    handleAddAvailabilitySubmit: baseAddAvailabilitySubmit,
    handleDeleteAvailabilitySubmit,
  } = useTrainerSubmitActions();

  // Dialog submission handlers with dialog closing
  const handleAddTrainerSubmit = async (data: any): Promise<void> => {
    await baseAddTrainerSubmit(data);
    setIsAddDialogOpen(false);
  };

  const handleUpdateTrainerSubmit = async (id: string, data: any): Promise<void> => {
    await baseUpdateTrainerSubmit(id, data);
    setIsEditDialogOpen(false);
  };

  const handleAddCertificationSubmit = async (data: any): Promise<void> => {
    await baseAddCertificationSubmit(data);
    setIsCertDialogOpen(false);
  };

  const handleAddAvailabilitySubmit = async (data: any): Promise<void> => {
    await baseAddAvailabilitySubmit(data);
    setIsAvailDialogOpen(false);
  };

  // Custom getSelectedTrainer implementation that uses the selectedTrainer state
  const getSelectedTrainerData = () => {
    return trainers.find((trainer) => trainer.id === selectedTrainer) || null;
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
    getSelectedTrainer: getSelectedTrainerData,
    
    // Action handlers
    handleAddTrainer,
    handleEditTrainer,
    handleAddCertification,
    handleAddAvailability,
    
    // Submission handlers with dialog closing
    handleAddTrainerSubmit,
    handleUpdateTrainerSubmit,
    handleDeleteTrainerSubmit,
    handleAddCertificationSubmit,
    handleDeleteCertificationSubmit,
    handleAddAvailabilitySubmit,
    handleDeleteAvailabilitySubmit,
  };
}
