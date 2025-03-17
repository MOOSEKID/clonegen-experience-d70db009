
import { useState, useEffect } from 'react';
import { TrainerAttendanceRecord } from './types';
import { 
  fetchTrainerAttendance, 
  checkInTrainer, 
  checkOutTrainer, 
  subscribeToAttendanceChanges 
} from './attendanceService';
import { useToast } from '@/components/ui/use-toast';

export const useTrainerAttendance = (trainerId?: string) => {
  const [records, setRecords] = useState<TrainerAttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadAttendance = async () => {
      setIsLoading(true);
      
      try {
        const data = await fetchTrainerAttendance(trainerId);
        setRecords(data);
      } catch (err) {
        console.error('Error in useTrainerAttendance:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch trainer attendance'));
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAttendance();
    
    // Set up real-time subscription
    const channel = subscribeToAttendanceChanges(loadAttendance);
      
    return () => {
      channel.unsubscribe();
    };
  }, [trainerId]);
  
  const checkIn = async (trainerId: string, notes?: string) => {
    const result = await checkInTrainer(trainerId, notes);
    
    if (result.success) {
      toast({
        title: "Checked in successfully",
        description: result.message,
      });
      // Refresh the records
      const updatedRecords = await fetchTrainerAttendance(trainerId);
      setRecords(updatedRecords);
      return result.data;
    } else {
      toast({
        variant: "destructive",
        title: "Check-in failed",
        description: result.message,
      });
      return null;
    }
  };
  
  const checkOut = async (trainerId: string, notes?: string) => {
    const result = await checkOutTrainer(trainerId, notes);
    
    if (result.success) {
      toast({
        title: "Checked out successfully",
        description: result.message,
      });
      // Refresh the records
      const updatedRecords = await fetchTrainerAttendance(trainerId);
      setRecords(updatedRecords);
      return result.data;
    } else {
      toast({
        variant: "destructive",
        title: "Check-out failed",
        description: result.message,
      });
      return null;
    }
  };
  
  return {
    records,
    isLoading,
    error,
    checkIn,
    checkOut
  };
};

export * from './types';
