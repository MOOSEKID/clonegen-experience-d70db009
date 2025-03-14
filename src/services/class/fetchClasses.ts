
import { supabase } from '@/integrations/supabase/client';
import { GymClass, ClassStatus } from '@/types/classTypes';

// Fetch all classes
export const fetchClasses = async (): Promise<GymClass[]> => {
  try {
    const { data, error } = await supabase
      .from('classes')
      .select(`
        *,
        trainer:trainer_id(name),
        enrollments:class_enrollments(status)
      `);
      
    if (error) {
      throw error;
    }
    
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      type: item.type,
      trainer_id: item.trainer_id,
      trainer_name: item.trainer?.name,
      capacity: item.capacity,
      enrolled: item.enrollments ? item.enrollments.filter(e => e.status === 'enrolled').length : 0,
      day: item.day,
      time: item.time,
      duration: item.duration,
      room: item.room,
      status: (item.status as ClassStatus) || 'scheduled'
    }));
  } catch (error) {
    console.error('Error fetching classes:', error);
    return [];
  }
};
