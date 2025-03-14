
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
