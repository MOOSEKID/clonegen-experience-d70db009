
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TrainerAvailability } from './types';

export const useAvailabilityManagement = () => {
  const { toast } = useToast();
  
  const addAvailability = async (availability: Omit<TrainerAvailability, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('trainer_availability')
        .insert(availability)
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Availability added",
        description: "Availability has been added successfully."
      });
      
      return data;
    } catch (err) {
      console.error('Error adding availability:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add availability. Please try again."
      });
      throw err;
    }
  };
  
  const deleteAvailability = async (id: string) => {
    try {
      const { error } = await supabase
        .from('trainer_availability')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Availability deleted",
        description: "Availability has been removed successfully."
      });
      
      return true;
    } catch (err) {
      console.error('Error deleting availability:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete availability. Please try again."
      });
      throw err;
    }
  };

  return {
    addAvailability,
    deleteAvailability
  };
};
