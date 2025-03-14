
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
