
import { supabase } from '@/integrations/supabase/client';

// Log a workout session
export const logWorkout = async (
  memberId: string,
  memberWorkoutId: string,
  date: string,
  durationMinutes: number,
  notes?: string,
  rating?: number
): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('workout_logs')
      .insert({
        member_id: memberId,
        member_workout_id: memberWorkoutId,
        date,
        duration_minutes: durationMinutes,
        notes,
        rating
      })
      .select('id')
      .single();
      
    if (error) {
      throw error;
    }
    
    return data?.id || null;
  } catch (error) {
    console.error('Error logging workout:', error);
    return null;
  }
};

// Log an exercise within a workout
export const logExercise = async (
  workoutLogId: string,
  exerciseId: string,
  setsCompleted: number,
  repsCompleted: number,
  weightUsed?: number,
  durationSeconds?: number,
  notes?: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('exercise_logs')
      .insert({
        workout_log_id: workoutLogId,
        exercise_id: exerciseId,
        sets_completed: setsCompleted,
        reps_completed: repsCompleted,
        weight_used: weightUsed,
        duration_seconds: durationSeconds,
        notes
      });
      
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error logging exercise:', error);
    return false;
  }
};
