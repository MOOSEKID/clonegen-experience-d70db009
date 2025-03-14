
import { supabase } from '@/integrations/supabase/client';
import { ClassEnrollment, UpdateWaitlistPositionsParams } from '@/types/classTypes';

// Enroll a member in a class
export const enrollMember = async (
  classId: string,
  memberId: string,
  memberName: string,
  memberEmail: string
): Promise<string | null> => {
  try {
    // Check if the member is already enrolled
    const { data: existingEnrollment, error: checkError } = await supabase
      .from('class_enrollments')
      .select('id, status')
      .eq('class_id', classId)
      .eq('member_id', memberId)
      .single();
      
    if (checkError && checkError.code !== 'PGRST116') { // No rows returned
      throw checkError;
    }
    
    // If already enrolled, don't create a duplicate
    if (existingEnrollment) {
      if (existingEnrollment.status === 'enrolled') {
        return existingEnrollment.id;
      } else if (existingEnrollment.status === 'waitlisted') {
        // Already on waitlist
        return existingEnrollment.id;
      } else if (existingEnrollment.status === 'canceled') {
        // Re-activate canceled enrollment
        const { error: updateError } = await supabase
          .from('class_enrollments')
          .update({ status: 'enrolled' })
          .eq('id', existingEnrollment.id);
          
        if (updateError) {
          throw updateError;
        }
        
        return existingEnrollment.id;
      }
    }
    
    // Get class info to check capacity
    const { data: classData, error: classError } = await supabase
      .from('classes')
      .select(`
        capacity,
        enrollments:class_enrollments(status)
      `)
      .eq('id', classId)
      .single();
      
    if (classError) {
      throw classError;
    }
    
    // Count current enrollments
    const enrolledCount = classData.enrollments.filter(e => e.status === 'enrolled').length;
    
    // Determine if the class is full
    const isFull = enrolledCount >= classData.capacity;
    
    // Set status based on capacity
    const status = isFull ? 'waitlisted' : 'enrolled';
    
    // If waitlisted, get the next position
    let waitlistPosition = null;
    if (status === 'waitlisted') {
      const { data: waitlistData, error: waitlistError } = await supabase
        .from('class_enrollments')
        .select('waitlist_position')
        .eq('class_id', classId)
        .eq('status', 'waitlisted')
        .order('waitlist_position', { ascending: false })
        .limit(1);
        
      if (waitlistError) {
        throw waitlistError;
      }
      
      waitlistPosition = waitlistData.length > 0 ? 
        (waitlistData[0].waitlist_position || 0) + 1 : 1;
    }
    
    // Insert the enrollment
    const { data, error } = await supabase
      .from('class_enrollments')
      .insert({
        class_id: classId,
        member_id: memberId,
        status,
        waitlist_position: waitlistPosition
      })
      .select('id')
      .single();
      
    if (error) {
      throw error;
    }
    
    // If we enrolled and the class is now full, update class status
    if (status === 'enrolled' && (enrolledCount + 1) >= classData.capacity) {
      const { error: updateError } = await supabase
        .from('classes')
        .update({ status: 'full' })
        .eq('id', classId);
        
      if (updateError) {
        console.error('Error updating class status:', updateError);
      }
    }
    
    return data?.id || null;
  } catch (error) {
    console.error('Error enrolling member:', error);
    return null;
  }
};

// Update waitlist positions after a cancellation
export const updateWaitlistPositions = async (classId: string): Promise<boolean> => {
  try {
    const params: UpdateWaitlistPositionsParams = { class_id_param: classId };
    await supabase.rpc('update_waitlist_positions', params);
    return true;
  } catch (error) {
    console.error('Error updating waitlist positions:', error);
    return false;
  }
};

// Cancel enrollment
export const cancelEnrollment = async (enrollmentId: string): Promise<boolean> => {
  try {
    // Get the enrollment to check status and class ID
    const { data: enrollment, error: getError } = await supabase
      .from('class_enrollments')
      .select('status, class_id')
      .eq('id', enrollmentId)
      .single();
      
    if (getError) {
      throw getError;
    }
    
    // Update the enrollment status to canceled
    const { error: updateError } = await supabase
      .from('class_enrollments')
      .update({ status: 'canceled', waitlist_position: null })
      .eq('id', enrollmentId);
      
    if (updateError) {
      throw updateError;
    }
    
    // If the enrollment was active (not waitlisted), promote someone from waitlist
    if (enrollment.status === 'enrolled') {
      // Find the first person on the waitlist
      const { data: waitlist, error: waitlistError } = await supabase
        .from('class_enrollments')
        .select('id')
        .eq('class_id', enrollment.class_id)
        .eq('status', 'waitlisted')
        .order('waitlist_position', { ascending: true })
        .limit(1);
        
      if (waitlistError) {
        throw waitlistError;
      }
      
      if (waitlist && waitlist.length > 0) {
        // Promote the first waitlisted person to enrolled
        const { error: promoteError } = await supabase
          .from('class_enrollments')
          .update({ 
            status: 'enrolled',
            waitlist_position: null
          })
          .eq('id', waitlist[0].id);
          
        if (promoteError) {
          throw promoteError;
        }
        
        // Update remaining waitlist positions
        await updateWaitlistPositions(enrollment.class_id);
      } else {
        // If there was no waitlist, update class status back to 'scheduled'
        const { error: classError } = await supabase
          .from('classes')
          .update({ status: 'scheduled' })
          .eq('id', enrollment.class_id);
          
        if (classError) {
          throw classError;
        }
      }
    } else if (enrollment.status === 'waitlisted') {
      // If a waitlisted enrollment was canceled, update the remaining waitlist positions
      await updateWaitlistPositions(enrollment.class_id);
    }
    
    return true;
  } catch (error) {
    console.error('Error canceling enrollment:', error);
    return false;
  }
};

// Get enrollments for a member
export const getMemberEnrollments = async (memberId: string): Promise<ClassEnrollment[]> => {
  try {
    const { data, error } = await supabase
      .from('class_enrollments')
      .select(`
        id,
        class_id,
        member_id,
        status,
        enrollment_date,
        waitlist_position,
        classes:class_id(name, day, time, trainer:trainer_id(name))
      `)
      .eq('member_id', memberId);
      
    if (error) {
      throw error;
    }
    
    return (data || []).map(item => ({
      id: item.id,
      class_id: item.class_id,
      member_id: item.member_id,
      status: item.status as 'enrolled' | 'waitlisted' | 'canceled',
      enrollment_date: item.enrollment_date,
      waitlist_position: item.waitlist_position,
      // Additional normalized fields that might be used in the app
      class_name: item.classes?.name,
      class_day: item.classes?.day,
      class_time: item.classes?.time,
      trainer_name: item.classes?.trainer?.name
    }));
  } catch (error) {
    console.error('Error fetching member enrollments:', error);
    return [];
  }
};
