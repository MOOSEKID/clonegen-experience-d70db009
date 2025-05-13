
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StaffAvailability } from '../../trainers/types';

export const useAvailabilityOperations = () => {
  const { toast } = useToast();
  
  const addAvailability = async (availability: Omit<StaffAvailability, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('staff_availability')
        .insert({
          staff_id: availability.staff_id,
          day_of_week: availability.day_of_week,
          start_time: availability.start_time,
          end_time: availability.end_time
        })
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
        .from('staff_availability')
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
