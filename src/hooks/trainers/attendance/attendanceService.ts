
import { supabase, getTable } from '@/integrations/supabase/client';
import { TrainerAttendanceRecord, CheckInOutResult } from './types';
import { generateMockAttendance } from './mockData';
import { useToast } from '@/components/ui/use-toast';

export const fetchTrainerAttendance = async (trainerId?: string): Promise<TrainerAttendanceRecord[]> => {
  try {
    let query = getTable('trainer_attendance')
      .select(`
        *,
        trainers:trainer_id(name)
      `)
      .order('date', { ascending: false });
      
    if (trainerId) {
      query = query.eq('trainer_id', trainerId);
    }
    
    const { data, error } = await query;
      
    if (error) throw error;
    
    if (data) {
      const formattedData = data.map((record: any) => ({
        ...record,
        trainer_name: record.trainers?.name
      }));
      return formattedData as TrainerAttendanceRecord[];
    }
    
    return [];
  } catch (err) {
    console.error('Error fetching trainer attendance:', err);
    
    // Use mock data for development if needed
    if (trainerId) {
      return generateMockAttendance(trainerId);
    }
    
    return [];
  }
};

export const checkInTrainer = async (
  trainerId: string, 
  notes?: string
): Promise<CheckInOutResult> => {
  const { toast } = useToast();
  
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if there's already a check-in for today
    const { data: existingRecord } = await getTable('trainer_attendance')
      .select('*')
      .eq('trainer_id', trainerId)
      .eq('date', today)
      .single();
      
    if (existingRecord) {
      // If already checked out, don't allow another check-in
      if (existingRecord.check_out_time) {
        return {
          success: false,
          data: null,
          message: "You have already completed your attendance for today."
        };
      }
      
      // If already checked in but not checked out, return the record
      if (existingRecord.check_in_time) {
        return {
          success: false,
          data: existingRecord,
          message: "You are already checked in for today."
        };
      }
    }
    
    // Create new attendance record with check-in time
    const checkInTime = new Date().toISOString();
    
    const { data, error } = await getTable('trainer_attendance')
      .upsert({
        trainer_id: trainerId,
        date: today,
        check_in_time: checkInTime,
        notes: notes || null
      } as any)
      .select()
      .single();
      
    if (error) throw error;
    
    return {
      success: true,
      data,
      message: `Check in time: ${new Date(checkInTime).toLocaleTimeString()}`
    };
  } catch (err) {
    console.error('Error checking in:', err);
    return {
      success: false,
      data: null,
      message: "Failed to record check-in. Please try again."
    };
  }
};

export const checkOutTrainer = async (
  trainerId: string, 
  notes?: string
): Promise<CheckInOutResult> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Find today's attendance record
    const { data: existingRecord } = await getTable('trainer_attendance')
      .select('*')
      .eq('trainer_id', trainerId)
      .eq('date', today)
      .single();
      
    if (!existingRecord) {
      // No check-in record found
      return {
        success: false,
        data: null,
        message: "You need to check in first before checking out."
      };
    }
    
    if (existingRecord.check_out_time) {
      // Already checked out
      return {
        success: false,
        data: existingRecord,
        message: "You have already checked out for today."
      };
    }
    
    // Update record with check-out time
    const checkOutTime = new Date().toISOString();
    
    const { data, error } = await getTable('trainer_attendance')
      .update({
        check_out_time: checkOutTime,
        notes: notes || existingRecord.notes
      })
      .eq('id', existingRecord.id)
      .select()
      .single();
      
    if (error) throw error;
    
    return {
      success: true,
      data,
      message: `Check out time: ${new Date(checkOutTime).toLocaleTimeString()}`
    };
  } catch (err) {
    console.error('Error checking out:', err);
    return {
      success: false,
      data: null,
      message: "Failed to record check-out. Please try again."
    };
  }
};

export const subscribeToAttendanceChanges = (callback: () => void) => {
  const channel = supabase
    .channel('trainer-attendance-changes')
    .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'trainer_attendance'
    }, callback)
    .subscribe();
    
  return channel;
};
