
import { useState } from 'react';
import { TrainerProfilesState, TrainerProfilesActions } from './types';

export const useDialogState = (): [
  Pick<TrainerProfilesState, 'isAddDialogOpen' | 'isEditDialogOpen' | 'isCertDialogOpen' | 'isAvailDialogOpen' | 'selectedTrainer'>,
  Pick<TrainerProfilesActions, 'setIsAddDialogOpen' | 'setIsEditDialogOpen' | 'setIsCertDialogOpen' | 'setIsAvailDialogOpen' | 'setSelectedTrainer' | 'handleAddTrainer' | 'handleEditTrainer' | 'handleAddCertification' | 'handleAddAvailability'>
] => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCertDialogOpen, setIsCertDialogOpen] = useState(false);
  const [isAvailDialogOpen, setIsAvailDialogOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);

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

  return [
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
  ];
};
