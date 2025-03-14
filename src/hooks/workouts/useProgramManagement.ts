
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { WorkoutProgram } from './types';

export const useProgramManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Create a workout program
  const createWorkoutProgram = async (program: Omit<WorkoutProgram, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('workout_programs')
        .insert(program)
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success('Workout program created successfully');
      return data;
    } catch (error) {
      console.error('Error creating workout program:', error);
      toast.error('Failed to create workout program');
      throw error;
    }
  };

  // Update a workout program
  const updateWorkoutProgram = async (id: string, updates: Partial<WorkoutProgram>) => {
    try {
      const { data, error } = await supabase
        .from('workout_programs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success('Workout program updated successfully');
      return data;
    } catch (error) {
      console.error('Error updating workout program:', error);
      toast.error('Failed to update workout program');
      throw error;
    }
  };

  // Delete a workout program
  const deleteWorkoutProgram = async (id: string) => {
    try {
      const { error } = await supabase
        .from('workout_programs')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success('Workout program deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting workout program:', error);
      toast.error('Failed to delete workout program');
      return false;
    }
  };

  return {
    isLoading,
    error,
    createWorkoutProgram,
    updateWorkoutProgram,
    deleteWorkoutProgram
  };
};
