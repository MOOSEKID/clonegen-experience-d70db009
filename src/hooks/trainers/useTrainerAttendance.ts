
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface TrainerAttendanceRecord {
  id: string;
  trainer_id: string;
  date: string;
  check_in_time: string | null;
  check_out_time: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  trainer_name?: string;
}

export const useTrainerAttendance = (trainerId?: string) => {
  const [records, setRecords] = useState<TrainerAttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchAttendance = async () => {
      setIsLoading(true);
      
      try {
        // We need to use a basic query since the join relation isn't available in the types
        let query = supabase
          .from('trainer_attendance')
          .select('*')
          .order('date', { ascending: false });
          
        if (trainerId) {
          query = query.eq('trainer_id', trainerId);
        }
        
        const { data, error } = await query;
          
        if (error) throw error;
        
        if (data) {
          // We need to manually add the trainer names by fetching them separately
          const trainerIds = [...new Set(data.map(record => record.trainer_id))];
          const trainerProfiles: Record<string, string> = {};
          
          // Get trainer names in a separate query
          if (trainerIds.length > 0) {
            const { data: trainers, error: trainersError } = await supabase
              .from('trainer_profiles')
              .select('id, name')
              .in('id', trainerIds);
              
            if (!trainersError && trainers) {
              trainers.forEach(trainer => {
                trainerProfiles[trainer.id] = trainer.name;
              });
            }
          }
          
          // Add trainer names to the records
          const formattedData = data.map(record => ({
            ...record,
            trainer_name: trainerProfiles[record.trainer_id] || 'Unknown'
          }));
          
          setRecords(formattedData);
        }
      } catch (err) {
        console.error('Error fetching trainer attendance:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch trainer attendance'));
        
        // Use mock data for development if needed
        if (trainerId) {
          setRecords(generateMockAttendance(trainerId));
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAttendance();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('trainer-attendance-changes')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'trainer_attendance'
      }, () => {
        fetchAttendance();
      })
      .subscribe();
      
    return () => {
      channel.unsubscribe();
    };
  }, [trainerId]);
  
  const checkIn = async (trainerId: string, notes?: string) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Check if there's already a check-in for today
      const { data: existingRecord } = await supabase
        .from('trainer_attendance')
        .select('*')
        .eq('trainer_id', trainerId)
        .eq('date', today)
        .single();
        
      if (existingRecord) {
        // If already checked out, don't allow another check-in
        if (existingRecord.check_out_time) {
          toast({
            title: "Already checked out",
            description: "You have already completed your attendance for today.",
            variant: "destructive"
          });
          return null;
        }
        
        // If already checked in but not checked out, return the record
        if (existingRecord.check_in_time) {
          toast({
            title: "Already checked in",
            description: "You are already checked in for today.",
          });
          return existingRecord;
        }
      }
      
      // Create new attendance record with check-in time
      const checkInTime = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('trainer_attendance')
        .upsert({
          trainer_id: trainerId,
          date: today,
          check_in_time: checkInTime,
          notes: notes || null
        })
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Checked in successfully",
        description: `Check in time: ${new Date(checkInTime).toLocaleTimeString()}`,
      });
      
      return data;
    } catch (err) {
      console.error('Error checking in:', err);
      toast({
        variant: "destructive",
        title: "Check-in failed",
        description: "Failed to record check-in. Please try again.",
      });
      return null;
    }
  };
  
  const checkOut = async (trainerId: string, notes?: string) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Find today's attendance record
      const { data: existingRecord } = await supabase
        .from('trainer_attendance')
        .select('*')
        .eq('trainer_id', trainerId)
        .eq('date', today)
        .single();
        
      if (!existingRecord) {
        // No check-in record found
        toast({
          variant: "destructive",
          title: "No check-in found",
          description: "You need to check in first before checking out.",
        });
        return null;
      }
      
      if (existingRecord.check_out_time) {
        // Already checked out
        toast({
          title: "Already checked out",
          description: "You have already checked out for today.",
        });
        return existingRecord;
      }
      
      // Update record with check-out time
      const checkOutTime = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('trainer_attendance')
        .update({
          check_out_time: checkOutTime,
          notes: notes || existingRecord.notes
        })
        .eq('id', existingRecord.id)
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Checked out successfully",
        description: `Check out time: ${new Date(checkOutTime).toLocaleTimeString()}`,
      });
      
      return data;
    } catch (err) {
      console.error('Error checking out:', err);
      toast({
        variant: "destructive",
        title: "Check-out failed",
        description: "Failed to record check-out. Please try again.",
      });
      return null;
    }
  };
  
  const generateMockAttendance = (trainerId: string): TrainerAttendanceRecord[] => {
    const mockRecords: TrainerAttendanceRecord[] = [];
    const now = new Date();
    
    // Generate records for the past week
    for (let i = 0; i < 7; i++) {
      const recordDate = new Date();
      recordDate.setDate(now.getDate() - i);
      const dateStr = recordDate.toISOString().split('T')[0];
      
      // For weekdays (1-5), create check-in and check-out
      // For weekends (0, 6), only create records sometimes
      const isWeekend = recordDate.getDay() === 0 || recordDate.getDay() === 6;
      
      if (!isWeekend || Math.random() > 0.5) {
        // Create base time for the day
        const checkInHour = 8 + Math.floor(Math.random() * 2); // 8-9 AM
        const checkOutHour = 16 + Math.floor(Math.random() * 3); // 4-6 PM
        
        const checkInTime = new Date(recordDate);
        checkInTime.setHours(checkInHour, Math.floor(Math.random() * 60), 0);
        
        const checkOutTime = new Date(recordDate);
        checkOutTime.setHours(checkOutHour, Math.floor(Math.random() * 60), 0);
        
        mockRecords.push({
          id: `mock-${i}`,
          trainer_id: trainerId,
          date: dateStr,
          check_in_time: checkInTime.toISOString(),
          check_out_time: checkOutTime.toISOString(),
          notes: i % 3 === 0 ? "Regular shift" : null,
          created_at: recordDate.toISOString(),
          updated_at: recordDate.toISOString(),
          trainer_name: "Mock Trainer"
        });
      }
    }
    
    return mockRecords;
  };
  
  return {
    records,
    isLoading,
    error,
    checkIn,
    checkOut
  };
};
