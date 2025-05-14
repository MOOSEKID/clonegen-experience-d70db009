
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StaffAvailability } from './types';

export const useAvailabilityManagement = () => {
  const { toast } = useToast();
  
  const addAvailability = async (availability: Omit<StaffAvailability, 'id'>) => {
    try {
      // Try to use staff_availability table with staff_id
      const { data, error } = await supabase
        .from('staff_availability')
        .insert({
          staff_id: availability.staff_id,
          day_of_week: availability.day_of_week,
          startTime: availability.startTime,
          endTime: availability.endTime
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
      // Try staff_availability first
      let { error } = await supabase
        .from('staff_availability')
        .delete()
        .eq('id', id);
      
      // If no rows affected, try trainer_availability as fallback
      if (error) {
        const { error: trainerError } = await supabase
          .from('trainer_availability')
          .delete()
          .eq('id', id);
          
        if (trainerError) throw trainerError;
      }
      
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
