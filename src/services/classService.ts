import { supabase } from '@/integrations/supabase/client';

export type ClassStatus = 'scheduled' | 'full' | 'canceled';

export interface GymClass {
  id: string;
  name: string;
  description: string;
  type: string;
  trainer_id: string;
  trainer_name?: string;
  capacity: number;
  enrolled?: number;
  day: string;
  time: string;
  duration: number;
  room?: string;
  status: ClassStatus;
  enrollments?: ClassEnrollment[];
}

export interface ClassEnrollment {
  id: string;
  class_id: string;
  member_id: string;
  member_name?: string;
  member_email?: string;
  status: 'enrolled' | 'waitlisted' | 'canceled';
  enrollment_date: string;
  waitlist_position?: number;
}

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

// Enroll a member in a class
export const enrollMemberInClass = async (
  classId: string, 
  memberId: string
): Promise<{success: boolean; waitlisted: boolean}> => {
  try {
    // First, get the current class and enrollment information
    const classInfo = await fetchClassWithEnrollments(classId);
    
    if (!classInfo) {
      throw new Error('Class not found');
    }
    
    const isClassFull = classInfo.enrolled >= classInfo.capacity;
    
    // Check if the member is already enrolled
    const existingEnrollment = classInfo.enrollments?.find(e => e.member_id === memberId);
    if (existingEnrollment) {
      if (existingEnrollment.status === 'enrolled') {
        return { success: true, waitlisted: false };
      } else if (existingEnrollment.status === 'waitlisted') {
        return { success: true, waitlisted: true };
      }
    }
    
    // Calculate waitlist position if needed
    let waitlistPosition = null;
    if (isClassFull) {
      const waitlistCount = classInfo.enrollments?.filter(e => e.status === 'waitlisted').length || 0;
      waitlistPosition = waitlistCount + 1;
    }
    
    // Add the enrollment - use proper type for status
    const enrollmentStatus: 'enrolled' | 'waitlisted' = isClassFull ? 'waitlisted' : 'enrolled';
    
    const { error } = await supabase
      .from('class_enrollments')
      .insert({
        class_id: classId,
        member_id: memberId,
        status: enrollmentStatus,
        waitlist_position: waitlistPosition
      });
      
    if (error) {
      throw error;
    }
    
    // Update the class status if it's now full
    if (!isClassFull && (classInfo.enrolled + 1) >= classInfo.capacity) {
      await updateClass(classId, { status: 'full' });
    }
    
    return { success: true, waitlisted: isClassFull };
  } catch (error) {
    console.error('Error enrolling member in class:', error);
    return { success: false, waitlisted: false };
  }
};

// Remove a member from a class
export const removeMemberFromClass = async (
  enrollmentId: string
): Promise<boolean> => {
  try {
    // Get the enrollment details first to get the class information
    const { data: enrollment, error: fetchError } = await supabase
      .from('class_enrollments')
      .select('class_id, status')
      .eq('id', enrollmentId)
      .single();
      
    if (fetchError) {
      throw fetchError;
    }
    
    // Delete the enrollment
    const { error: deleteError } = await supabase
      .from('class_enrollments')
      .delete()
      .eq('id', enrollmentId);
      
    if (deleteError) {
      throw deleteError;
    }
    
    // If removing from waitlist, update positions for other waitlisted members
    if (enrollment.status === 'waitlisted') {
      await supabase.rpc('update_waitlist_positions', { 
        class_id_param: enrollment.class_id 
      });
    }
    
    // Check if a waitlisted member can now be moved to enrolled
    if (enrollment.status === 'enrolled') {
      const { data: classData } = await supabase
        .from('classes')
        .select('capacity')
        .eq('id', enrollment.class_id)
        .single();
        
      const { data: enrollments } = await supabase
        .from('class_enrollments')
        .select('id, status')
        .eq('class_id', enrollment.class_id)
        .eq('status', 'enrolled');
        
      if (enrollments && classData && enrollments.length < classData.capacity) {
        // Get the first waitlisted member
        const { data: waitlisted } = await supabase
          .from('class_enrollments')
          .select('id')
          .eq('class_id', enrollment.class_id)
          .eq('status', 'waitlisted')
          .order('waitlist_position')
          .limit(1)
          .single();
          
        if (waitlisted) {
          // Move the waitlisted member to enrolled with properly typed status
          const newStatus: 'enrolled' = 'enrolled';
          
          await supabase
            .from('class_enrollments')
            .update({ status: newStatus, waitlist_position: null })
            .eq('id', waitlisted.id);
            
          // Update the remaining waitlist positions
          await supabase.rpc('update_waitlist_positions', { 
            class_id_param: enrollment.class_id 
          });
        }
        
        // Update class status from full to scheduled with properly typed status
        const newClassStatus: ClassStatus = 'scheduled';
        
        await supabase
          .from('classes')
          .update({ status: newClassStatus })
          .eq('id', enrollment.class_id);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error removing member from class:', error);
    return false;
  }
};
