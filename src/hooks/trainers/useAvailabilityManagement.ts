
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StaffAvailability } from './types';
import { toast } from 'sonner';

export function useAvailabilityManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addAvailability = async (availability: Omit<StaffAvailability, 'id'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Insert new availability
      const { data, error: insertError } = await supabase
        .from('staff_availability')
        .insert(availability)
        .select()
        .single();
      
      if (insertError) {
        throw new Error(`Error adding availability: ${insertError.message}`);
      }
      
      toast.success('Availability added successfully');
      return data;
    } catch (err: any) {
      console.error('Error in addAvailability:', err);
      toast.error(err.message || 'Failed to add availability');
      setError(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAvailability = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Delete availability by id
      const { error: deleteError } = await supabase
        .from('staff_availability')
        .delete()
        .eq('id', id);
      
      if (deleteError) {
        throw new Error(`Error deleting availability: ${deleteError.message}`);
      }
      
      toast.success('Availability deleted successfully');
      return true;
    } catch (err: any) {
      console.error('Error in deleteAvailability:', err);
      toast.error(err.message || 'Failed to delete availability');
      setError(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addAvailability,
    deleteAvailability,
    isLoading,
    error
  };
}
