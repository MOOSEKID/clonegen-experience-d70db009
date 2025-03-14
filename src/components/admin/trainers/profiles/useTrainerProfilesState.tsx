import { useState } from 'react';
import { useTrainerProfiles, TrainerProfile } from '@/hooks/trainers/useTrainerProfiles';

export function useTrainerProfilesState() {
  const {
    trainers,
    isLoading,
    addTrainer,
    updateTrainer,
    deleteTrainer,
    addCertification,
    deleteCertification,
    addAvailability,
    deleteAvailability,
  } = useTrainerProfiles();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCertDialogOpen, setIsCertDialogOpen] = useState(false);
  const [isAvailDialogOpen, setIsAvailDialogOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const filteredTrainers = trainers.filter((trainer) => {
    if (activeTab === 'all') return true;
    return trainer.status?.toLowerCase() === activeTab;
  });

  const getSelectedTrainer = () => {
    return trainers.find((trainer) => trainer.id === selectedTrainer) || null;
  };

  const handleAddTrainer = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditTrainer = (trainerId: string) => {
    setSelectedTrainer(trainerId);
    setIsEditDialogOpen(true);
  };

  const handleAddCertification = (trainerId: string) => {
    setSelectedTrainer(trainerId);
    setIsCertDialogOpen(true);
  };

  const handleAddAvailability = (trainerId: string) => {
    setSelectedTrainer(trainerId);
    setIsAvailDialogOpen(true);
  };

  const handleAddTrainerSubmit = async (data: any) => {
    await addTrainer(data);
    setIsAddDialogOpen(false);
  };

  const handleUpdateTrainerSubmit = async (id: string, data: any) => {
    await updateTrainer(id, data);
    setIsEditDialogOpen(false);
  };

  const handleDeleteTrainerSubmit = async (id: string) => {
    await deleteTrainer(id);
  };

  const handleAddCertificationSubmit = async (data: any) => {
    await addCertification(data);
    setIsCertDialogOpen(false);
  };

  const handleDeleteCertificationSubmit = async (id: string) => {
    await deleteCertification(id);
  };

  const handleAddAvailabilitySubmit = async (data: any) => {
    await addAvailability(data);
    setIsAvailDialogOpen(false);
  };

  const handleDeleteAvailabilitySubmit = async (id: string) => {
    await deleteAvailability(id);
  };

  return {
    trainers,
    isLoading,
    filteredTrainers,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isCertDialogOpen,
    setIsCertDialogOpen,
    isAvailDialogOpen,
    setIsAvailDialogOpen,
    selectedTrainer,
    activeTab,
    setActiveTab,
    getSelectedTrainer,
    handleAddTrainer,
    handleEditTrainer,
    handleAddCertification,
    handleAddAvailability,
    handleAddTrainerSubmit,
    handleUpdateTrainerSubmit,
    handleDeleteTrainerSubmit,
    handleAddCertificationSubmit,
    handleDeleteCertificationSubmit,
    handleAddAvailabilitySubmit,
    handleDeleteAvailabilitySubmit,
  };
}
