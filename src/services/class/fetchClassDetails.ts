
import { supabase } from '@/integrations/supabase/client';
import { GymClass, ClassStatus, ClassEnrollment } from '@/types/classTypes';

// Fetch a single class with enrollment details
export const fetchClassWithEnrollments = async (classId: string): Promise<GymClass | null> => {
  try {
    const { data, error } = await supabase
      .from('classes')
      .select(`
        *,
        trainer:trainer_id(name),
        enrollments:class_enrollments(
          id,
          member_id,
          status,
          enrollment_date,
          waitlist_position,
          member:member_id(name, email)
        )
      `)
      .eq('id', classId)
      .single();
      
    if (error) {
      throw error;
    }
    
    if (!data) {
      return null;
    }
    
    const enrolledCount = data.enrollments ? 
      data.enrollments.filter(e => e.status === 'enrolled').length : 0;
    
    const formattedEnrollments = data.enrollments ? 
      data.enrollments.map(e => ({
        id: e.id,
        class_id: classId,
        member_id: e.member_id,
        member_name: e.member?.name,
        member_email: e.member?.email,
        status: e.status as 'enrolled' | 'waitlisted' | 'canceled',
        enrollment_date: e.enrollment_date,
        waitlist_position: e.waitlist_position
      })) : [];
    
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      type: data.type,
      trainer_id: data.trainer_id,
      trainer_name: data.trainer?.name,
      capacity: data.capacity,
      enrolled: enrolledCount,
      day: data.day,
      time: data.time,
      duration: data.duration,
      room: data.room,
      status: (data.status as ClassStatus) || 'scheduled',
      enrollments: formattedEnrollments
    };
  } catch (error) {
    console.error('Error fetching class with enrollments:', error);
    return null;
  }
};
