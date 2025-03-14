
import { supabase } from '@/integrations/supabase/client';
import { MemberWorkout, WorkoutStatus } from '@/types/workoutTypes';

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
        status: 'Assigned' as WorkoutStatus,
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
