
import { supabase } from '@/integrations/supabase/client';

export type WorkoutStatus = 'Assigned' | 'In Progress' | 'Completed' | 'Canceled';

export interface WorkoutProgram {
  id: string;
  name: string;
  description: string;
  difficulty_level: string;
  duration_weeks: number;
  created_by: string;
  created_at: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscle_group: string;
  equipment_needed: string;
  difficulty_level: string;
  instructions: string;
  video_url?: string;
  image_url?: string;
  sets?: number;
  reps?: number;
  duration_seconds?: number;
  day_number?: number;
  week_number?: number;
  order_in_workout?: number;
  notes?: string;
}

export interface MemberWorkout {
  id: string;
  member_id: string;
  program_id: string;
  trainer_id: string;
  start_date: string;
  end_date: string;
  status: WorkoutStatus;
  notes?: string;
  program?: Partial<WorkoutProgram>;
  trainer_name?: string;
}

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
      exercises: []
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

// Fetch member workouts
export const fetchMemberWorkouts = async (memberId: string): Promise<MemberWorkout[]> => {
  try {
    const { data, error } = await supabase
      .from('member_workouts')
      .select(`
        *,
        workout_program:program_id(name, description, difficulty_level),
        trainer:trainer_id(name)
      `)
      .eq('member_id', memberId);
      
    if (error) {
      throw error;
    }
    
    return (data || []).map(item => ({
      id: item.id,
      member_id: item.member_id,
      program_id: item.program_id,
      trainer_id: item.trainer_id,
      start_date: item.start_date,
      end_date: item.end_date,
      status: (item.status as WorkoutStatus) || 'Assigned',
      notes: item.notes,
      program: item.workout_program,
      trainer_name: item.trainer?.name
    }));
  } catch (error) {
    console.error('Error fetching member workouts:', error);
    return [];
  }
};

// Assign a workout program to a member
export const assignWorkoutToMember = async (
  memberId: string,
  programId: string,
  trainerId: string,
  startDate: string,
  endDate: string,
  notes?: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('member_workouts')
      .insert({
        member_id: memberId,
        program_id: programId,
        trainer_id: trainerId,
        start_date: startDate,
        end_date: endDate,
        status: 'Assigned',
        notes
      });
      
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error assigning workout to member:', error);
    return false;
  }
};

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
