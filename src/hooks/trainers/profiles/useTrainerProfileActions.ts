
import { useToast } from '@/components/ui/use-toast';
import { TrainerProfile, TrainerCertification, TrainerAvailability } from './types';
import { 
  addTrainer, 
  updateTrainer, 
  deleteTrainer,
  addCertification,
  deleteCertification,
  addAvailability,
  deleteAvailability
} from './trainerService';

export const useTrainerProfileActions = () => {
  const { toast } = useToast();
  
  const handleAddTrainer = async (trainer: Omit<TrainerProfile, 'id' | 'certifications' | 'availability'>) => {
    try {
      const newTrainer = await addTrainer(trainer);
      
      toast({
        title: "Trainer added",
        description: `${trainer.name} has been added successfully.`
      });
      
      return newTrainer;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add trainer. Please try again."
      });
      throw err;
    }
  };
  
  const handleUpdateTrainer = async (id: string, updates: Partial<Omit<TrainerProfile, 'id' | 'certifications' | 'availability'>>) => {
    try {
      await updateTrainer(id, updates);
      
      toast({
        title: "Trainer updated",
        description: "Trainer profile has been updated successfully."
      });
      
      return true;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update trainer. Please try again."
      });
      throw err;
    }
  };
  
  const handleDeleteTrainer = async (id: string) => {
    try {
      await deleteTrainer(id);
      
      toast({
        title: "Trainer deleted",
        description: "Trainer has been removed successfully."
      });
      
      return true;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete trainer. Please try again."
      });
      throw err;
    }
  };
  
  return {
    addTrainer: handleAddTrainer,
    updateTrainer: handleUpdateTrainer,
    deleteTrainer: handleDeleteTrainer
  };
};
