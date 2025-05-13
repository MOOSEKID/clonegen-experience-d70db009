
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface StaffAttendanceRecord {
  id?: string;
  staff_id: string;
  full_name: string;
  roles?: string[];
  sign_in_time?: string;
  sign_out_time?: string;
  date?: string;
  method?: string;
  notes?: string;
}

export const useStaffAttendance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  // Fetch attendance records for a specific day
  const fetchAttendanceByDate = async (date: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('staff_attendance')
        .select('*')
        .eq('date', date)
        .order('sign_in_time', { ascending: false });
        
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching attendance records:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch attendance records'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch attendance records for a specific staff member
  const fetchAttendanceByStaffId = async (staffId: string, limit: number = 10) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('staff_attendance')
        .select('*')
        .eq('staff_id', staffId)
        .order('date', { ascending: false })
        .order('sign_in_time', { ascending: false })
        .limit(limit);
        
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching staff attendance records:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch staff attendance records'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Check in a staff member
  const checkIn = async (staffId: string, fullName: string, roles: string[] = []) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      
      // Check if already checked in today
      const { data: existingRecord } = await supabase
        .from('staff_attendance')
        .select('*')
        .eq('staff_id', staffId)
        .eq('date', today)
        .is('sign_out_time', null);
      
      if (existingRecord && existingRecord.length > 0) {
        toast({
          title: "Already checked in",
          description: `${fullName} is already checked in today.`,
          variant: "warning",
        });
        return existingRecord[0];
      }
      
      const attendanceRecord = {
        staff_id: staffId,
        full_name: fullName,
        roles,
        sign_in_time: now.toISOString(),
        date: today,
        method: 'manual'
      };
      
      const { data, error } = await supabase
        .from('staff_attendance')
        .insert(attendanceRecord)
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Check-in successful",
        description: `${fullName} has been checked in successfully.`,
      });
      
      return data;
    } catch (err) {
      console.error('Error checking in staff member:', err);
      setError(err instanceof Error ? err : new Error('Failed to check in staff member'));
      
      toast({
        title: "Check-in failed",
        description: "Failed to check in staff member. Please try again.",
        variant: "destructive",
      });
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Check out a staff member
  const checkOut = async (attendanceId: string, fullName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const now = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('staff_attendance')
        .update({ sign_out_time: now })
        .eq('id', attendanceId)
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Check-out successful",
        description: `${fullName} has been checked out successfully.`,
      });
      
      return data;
    } catch (err) {
      console.error('Error checking out staff member:', err);
      setError(err instanceof Error ? err : new Error('Failed to check out staff member'));
      
      toast({
        title: "Check-out failed",
        description: "Failed to check out staff member. Please try again.",
        variant: "destructive",
      });
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    fetchAttendanceByDate,
    fetchAttendanceByStaffId,
    checkIn,
    checkOut
  };
};
