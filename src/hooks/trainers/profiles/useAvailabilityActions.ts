
import { useToast } from '@/components/ui/use-toast';
import { TrainerAvailability } from './types';
import { 
  addAvailability,
  deleteAvailability
} from './trainerService';

export const useAvailabilityActions = () => {
  const { toast } = useToast();
  
  const handleAddAvailability = async (availability: Omit<TrainerAvailability, 'id'>) => {
    try {
      const newAvailability = await addAvailability(availability);
      
      toast({
        title: "Availability added",
        description: "Availability has been added successfully."
      });
      
      return newAvailability;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add availability. Please try again."
      });
      throw err;
    }
  };
  
  const handleDeleteAvailability = async (id: string) => {
    try {
      await deleteAvailability(id);
      
      toast({
        title: "Availability deleted",
        description: "Availability has been removed successfully."
      });
      
      return true;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete availability. Please try again."
      });
      throw err;
    }
  };
  
  return {
    addAvailability: handleAddAvailability,
    deleteAvailability: handleDeleteAvailability
  };
};
