
import { TrainerProfile } from '@/hooks/trainers/useTrainerProfiles';

export interface TrainerProfilesState {
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isCertDialogOpen: boolean;
  isAvailDialogOpen: boolean;
  selectedTrainer: string | null;
  activeTab: string;
}

export interface TrainerProfilesActions {
  setIsAddDialogOpen: (value: boolean) => void;
  setIsEditDialogOpen: (value: boolean) => void;
  setIsCertDialogOpen: (value: boolean) => void;
  setIsAvailDialogOpen: (value: boolean) => void;
  setSelectedTrainer: (trainerId: string | null) => void;
  setActiveTab: (tab: string) => void;
  handleAddTrainer: () => void;
  handleEditTrainer: (trainerId: string) => void;
  handleAddCertification: (trainerId: string) => void;
  handleAddAvailability: (trainerId: string) => void;
  getSelectedTrainer: () => TrainerProfile | null;
}
