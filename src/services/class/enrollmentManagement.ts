
import { supabase } from '@/integrations/supabase/client';
import { fetchClassWithEnrollments } from './fetchClassDetails';
import { updateClassStatus } from './classManagement';
import { UpdateWaitlistPositionsParams } from '@/types/classTypes';

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
      await updateClassStatus(classId, 'full');
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
      await updateWaitlistPositions(enrollment.class_id);
    }
    
    // Check if a waitlisted member can now be moved to enrolled
    if (enrollment.status === 'enrolled') {
      await handleEnrollmentPromotion(enrollment.class_id);
    }
    
    return true;
  } catch (error) {
    console.error('Error removing member from class:', error);
    return false;
  }
};

// Helper function to update waitlist positions
export const updateWaitlistPositions = async (classId: string): Promise<boolean> => {
  try {
    await supabase.rpc<void, UpdateWaitlistPositionsParams>(
      'update_waitlist_positions', 
      { class_id_param: classId }
    );
    return true;
  } catch (error) {
    console.error('Error updating waitlist positions:', error);
    return false;
  }
};

// Helper function to promote a waitlisted member to enrolled if space available
export const handleEnrollmentPromotion = async (classId: string): Promise<boolean> => {
  try {
    const { data: classData } = await supabase
      .from('classes')
      .select('capacity')
      .eq('id', classId)
      .single();
      
    const { data: enrollments } = await supabase
      .from('class_enrollments')
      .select('id, status')
      .eq('class_id', classId)
      .eq('status', 'enrolled');
      
    if (enrollments && classData && enrollments.length < classData.capacity) {
      // Get the first waitlisted member
      const { data: waitlisted } = await supabase
        .from('class_enrollments')
        .select('id')
        .eq('class_id', classId)
        .eq('status', 'waitlisted')
        .order('waitlist_position')
        .limit(1)
        .single();
        
      if (waitlisted) {
        // Move the waitlisted member to enrolled
        const newStatus: 'enrolled' = 'enrolled';
        
        await supabase
          .from('class_enrollments')
          .update({ status: newStatus, waitlist_position: null })
          .eq('id', waitlisted.id);
          
        // Update the remaining waitlist positions
        await updateWaitlistPositions(classId);
      }
      
      // Update class status from full to scheduled
      await updateClassStatus(classId, 'scheduled');
    }
    
    return true;
  } catch (error) {
    console.error('Error handling enrollment promotion:', error);
    return false;
  }
};
