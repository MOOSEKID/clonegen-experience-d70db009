
import { supabase } from '@/integrations/supabase/client';
import { WorkoutProgram } from '@/types/workoutTypes';

// Fetch all workout programs
export const fetchWorkoutPrograms = async (): Promise<WorkoutProgram[]> => {
  try {
    const { data, error } = await supabase
      .from('workout_programs')
      .select('*');
      
    if (error) {
      throw error;
    }
    
    // Add an empty exercises array to each program to match the interface
    return (data || []).map(item => ({
      ...item,
      exercises: [] as WorkoutProgram['exercises']
    }));
  } catch (error) {
    console.error('Error fetching workout programs:', error);
    return [];
  }
};

// Fetch a workout program with exercises
export const fetchWorkoutProgramWithExercises = async (programId: string): Promise<WorkoutProgram | null> => {
  try {
    // Fetch the program
    const { data: programData, error: programError } = await supabase
      .from('workout_programs')
      .select('*')
      .eq('id', programId)
      .single();
      
    if (programError) {
      throw programError;
    }
    
    if (!programData) {
      return null;
    }
    
    // Fetch the exercises for this program
    const { data: exercisesData, error: exercisesError } = await supabase
      .from('program_exercises')
      .select(`
        id,
        sets,
        reps,
        duration_seconds,
        day_number,
        week_number,
        order_in_workout,
        notes,
        exercise:exercises(*)
      `)
      .eq('program_id', programId)
      .order('week_number, day_number, order_in_workout');
      
    if (exercisesError) {
      throw exercisesError;
    }
    
    // Format exercises data
    const exercises = exercisesData?.map(item => ({
      id: item.exercise.id,
      name: item.exercise.name,
      description: item.exercise.description,
      muscle_group: item.exercise.muscle_group,
      equipment_needed: item.exercise.equipment_needed,
      difficulty_level: item.exercise.difficulty_level,
      instructions: item.exercise.instructions,
      video_url: item.exercise.video_url,
      image_url: item.exercise.image_url,
      sets: item.sets,
      reps: item.reps,
      duration_seconds: item.duration_seconds,
      day_number: item.day_number,
      week_number: item.week_number,
      order_in_workout: item.order_in_workout,
      notes: item.notes
    })) || [];
    
    return {
      ...programData,
      exercises
    };
  } catch (error) {
    console.error('Error fetching workout program with exercises:', error);
    return null;
  }
};
