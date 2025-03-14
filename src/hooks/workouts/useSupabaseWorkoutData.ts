
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export interface WorkoutProgram {
  id: string;
  name: string;
  description?: string;
  difficulty_level?: string;
  duration_weeks?: number;
  created_by?: string;
  creator_name?: string;
  is_template?: boolean;
  created_at?: string;
  updated_at?: string;
  exercise_count?: number;
}

export interface Exercise {
  id: string;
  name: string;
  description?: string;
  muscle_group?: string;
  equipment_needed?: string;
  difficulty_level?: string;
  instructions?: string;
  video_url?: string;
  image_url?: string;
}

export interface ProgramExercise {
  id: string;
  program_id: string;
  exercise_id: string;
  sets?: number;
  reps?: number;
  duration_seconds?: number;
  day_number?: number;
  week_number?: number;
  order_in_workout?: number;
  notes?: string;
  exercise?: Exercise;
}

export const useSupabaseWorkoutData = () => {
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
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
      toast.error('Failed to load workout programs');
    } finally {
      setIsLoading(false);
    }
  };

  // Load all exercises
  const loadExercises = async () => {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .order('name');
        
      if (error) throw error;
      
      setExercises(data || []);
    } catch (error) {
      console.error('Error loading exercises:', error);
      toast.error('Failed to load exercises');
    }
  };

  // Get program exercises
  const getProgramExercises = async (programId: string): Promise<ProgramExercise[]> => {
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
      loadWorkoutPrograms();
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
      loadWorkoutPrograms();
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
      loadWorkoutPrograms();
      return true;
    } catch (error) {
      console.error('Error deleting workout program:', error);
      toast.error('Failed to delete workout program');
      return false;
    }
  };

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

  // Load all data on component mount
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
  }, []);

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
