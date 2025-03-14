
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ProgramExercise } from './types';

export const useExerciseManagement = () => {
  // Add exercise to a program
  const addExerciseToProgram = async (programExercise: Omit<ProgramExercise, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('program_exercises')
        .insert(programExercise)
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success('Exercise added to program successfully');
      return data;
    } catch (error) {
      console.error('Error adding exercise to program:', error);
      toast.error('Failed to add exercise to program');
      throw error;
    }
  };

  // Get program exercises
  const getProgramExercises = async (programId: string) => {
    try {
      const { data, error } = await supabase
        .from('program_exercises')
        .select(`
          *,
          exercise:exercises (*)
        `)
        .eq('program_id', programId)
        .order('week_number')
        .order('day_number')
        .order('order_in_workout');
        
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error loading program exercises:', error);
      toast.error('Failed to load program exercises');
      return [];
    }
  };

  return {
    addExerciseToProgram,
    getProgramExercises
  };
};
