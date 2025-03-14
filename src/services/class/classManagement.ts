
import { supabase } from '@/integrations/supabase/client';
import { GymClass, ClassStatus } from '@/types/classTypes';

// Create a new class
export const createClass = async (classData: Omit<GymClass, 'id'>): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('classes')
      .insert({
        name: classData.name,
        description: classData.description,
        type: classData.type,
        trainer_id: classData.trainer_id,
        capacity: classData.capacity,
        day: classData.day,
        time: classData.time,
        duration: classData.duration,
        room: classData.room,
        status: classData.status || 'scheduled'
      })
      .select('id')
      .single();
      
    if (error) {
      throw error;
    }
    
    return data?.id || null;
  } catch (error) {
    console.error('Error creating class:', error);
    return null;
  }
};

// Update an existing class
export const updateClass = async (classId: string, classData: Partial<GymClass>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('classes')
      .update({
        name: classData.name,
        description: classData.description,
        type: classData.type,
        trainer_id: classData.trainer_id,
        capacity: classData.capacity,
        day: classData.day,
        time: classData.time,
        duration: classData.duration,
        room: classData.room,
        status: classData.status
      })
      .eq('id', classId);
      
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error updating class:', error);
    return false;
  }
};

// Update class status
export const updateClassStatus = async (classId: string, status: ClassStatus): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('classes')
      .update({ status })
      .eq('id', classId);
      
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error updating class status:', error);
    return false;
  }
};
