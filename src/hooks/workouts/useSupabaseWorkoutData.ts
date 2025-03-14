
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useWorkoutData } from './useWorkoutData';
import { useProgramManagement } from './useProgramManagement';
import { useExerciseManagement } from './useExerciseManagement';

// Use export type for re-exporting types
export type { WorkoutProgram, Exercise, ProgramExercise } from './types';

export const useSupabaseWorkoutData = () => {
  const { 
    workoutPrograms, 
    exercises, 
    isLoading, 
    error, 
    loadWorkoutPrograms, 
    loadExercises 
  } = useWorkoutData();
  
  const { 
    createWorkoutProgram, 
    updateWorkoutProgram, 
    deleteWorkoutProgram 
  } = useProgramManagement();
  
  const { 
    addExerciseToProgram, 
    getProgramExercises 
  } = useExerciseManagement();

  // Load all data on component mount and set up subscriptions
  useEffect(() => {
    loadWorkoutPrograms();
    loadExercises();
    
    // Set up real-time subscription for workouts
    const workoutChannel = supabase
      .channel('workout_programs_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'workout_programs' }, 
        () => {
          console.log('Workout programs change detected');
          loadWorkoutPrograms();
        }
      )
      .subscribe();
      
    // Set up real-time subscription for program exercises
    const exercisesChannel = supabase
      .channel('program_exercises_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'program_exercises' }, 
        () => {
          console.log('Program exercises change detected');
          loadWorkoutPrograms();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(workoutChannel);
      supabase.removeChannel(exercisesChannel);
    };
  }, [loadWorkoutPrograms, loadExercises]);

  return {
    workoutPrograms,
    exercises,
    isLoading,
    error,
    loadWorkoutPrograms,
    getProgramExercises,
    createWorkoutProgram,
    updateWorkoutProgram,
    deleteWorkoutProgram,
    addExerciseToProgram
  };
};
