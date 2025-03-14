
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WorkoutProgram } from './types';

export const useProgramData = () => {
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load workout programs with exercise count
  const loadWorkoutPrograms = async () => {
    try {
      setIsLoading(true);
      
      // Get programs with creator info
      const { data: programs, error: programsError } = await supabase
        .from('workout_programs')
        .select(`
          *,
          trainers:created_by (name)
        `)
        .order('created_at', { ascending: false });
        
      if (programsError) throw programsError;
      
      // Get exercise counts for each program
      const programIds = programs.map(p => p.id);
      const { data: exerciseCounts, error: countsError } = await supabase
        .from('program_exercises')
        .select('program_id, id')
        .in('program_id', programIds);
        
      if (countsError) throw countsError;
      
      // Map counts to programs
      const countMap = exerciseCounts.reduce((acc, curr) => {
        acc[curr.program_id] = (acc[curr.program_id] || 0) + 1;
        return acc;
      }, {});
      
      const formattedPrograms = programs.map(program => ({
        ...program,
        creator_name: program.trainers?.name || 'Unknown',
        exercise_count: countMap[program.id] || 0
      }));
      
      setWorkoutPrograms(formattedPrograms);
    } catch (error) {
      console.error('Error loading workout programs:', error);
      setError(error instanceof Error ? error : new Error('Failed to load workout programs'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    workoutPrograms,
    isLoading,
    error,
    loadWorkoutPrograms
  };
};
