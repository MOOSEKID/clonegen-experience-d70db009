
import { supabase } from '@/integrations/supabase/client';
import { AttendanceRecord } from '../performance/types';

export const fetchTrainerAttendance = async (trainerId: string, period: 'day' | 'week' | 'month' = 'week') => {
  try {
    // Calculate date range based on period
    const now = new Date();
    let startDate = new Date();
    
    if (period === 'day') {
      startDate.setHours(0, 0, 0, 0);
    } else if (period === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(now.getMonth() - 1);
    }
    
    const { data, error } = await supabase
      .from('attendance_tracking')
      .select('*')
      .eq('trainer_id', trainerId)
      .gte('check_in', startDate.toISOString())
      .lte('check_in', now.toISOString())
      .order('check_in', { ascending: false });
      
    if (error) throw error;
    
    return data as AttendanceRecord[];
  } catch (err) {
    console.error('Error fetching trainer attendance:', err);
    return [];
  }
};

export const recordTrainerAttendance = async (
  trainerId: string,
  action: 'check_in' | 'check_out',
  notes?: string
) => {
  try {
    const now = new Date().toISOString();
    const today = now.split('T')[0]; // YYYY-MM-DD
    
    if (action === 'check_in') {
      // Check if already checked in today
      const { data: existingCheckin } = await supabase
        .from('attendance_tracking')
        .select('id')
        .eq('trainer_id', trainerId)
        .gte('check_in', `${today}T00:00:00Z`)
        .lte('check_in', `${today}T23:59:59Z`)
        .maybeSingle();
        
      if (existingCheckin) {
        console.log('Already checked in today');
        return null;
      }
      
      // Create new check-in record
      const { data, error } = await supabase
        .from('attendance_tracking')
        .insert({
          trainer_id: trainerId,
          check_in: now,
          status: 'present',
          notes
        })
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } else {
      // Find today's check-in record to update with check-out time
      const { data: checkInRecord } = await supabase
        .from('attendance_tracking')
        .select('id')
        .eq('trainer_id', trainerId)
        .gte('check_in', `${today}T00:00:00Z`)
        .lte('check_in', `${today}T23:59:59Z`)
        .is('check_out', null)
        .maybeSingle();
        
      if (!checkInRecord) {
        console.log('No check-in found to update');
        return null;
      }
      
      // Update with check-out time
      const { data, error } = await supabase
        .from('attendance_tracking')
        .update({
          check_out: now,
          notes: notes
        })
        .eq('id', checkInRecord.id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    }
  } catch (err) {
    console.error('Error recording trainer attendance:', err);
    return null;
  }
};
