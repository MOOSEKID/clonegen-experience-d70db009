
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface ClientProgressRecord {
  id: string;
  client_id: string;
  trainer_id: string;
  date: string;
  weight?: number;
  body_fat_percentage?: number;
  chest_measurement?: number;
  waist_measurement?: number;
  hip_measurement?: number;
  arm_measurement?: number;
  thigh_measurement?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  client_name?: string;
}

export interface ClientProgressInput {
  client_id: string;
  trainer_id: string;
  date: string;
  weight?: number;
  body_fat_percentage?: number;
  chest_measurement?: number;
  waist_measurement?: number;
  hip_measurement?: number;
  arm_measurement?: number;
  thigh_measurement?: number;
  notes?: string;
}

export const useClientProgress = (clientId?: string, trainerId?: string) => {
  const [progressRecords, setProgressRecords] = useState<ClientProgressRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchProgress = async () => {
      if (!clientId && !trainerId) {
        setProgressRecords([]);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      
      try {
        let query = supabase
          .from('client_progress')
          .select(`
            *,
            members:client_id(name)
          `)
          .order('date', { ascending: false });
          
        if (clientId) {
          query = query.eq('client_id', clientId);
        }
        
        if (trainerId) {
          query = query.eq('trainer_id', trainerId);
        }
        
        const { data, error } = await query;
          
        if (error) throw error;
        
        if (data) {
          const formattedData = data.map(record => ({
            ...record,
            client_name: record.members?.name
          }));
          setProgressRecords(formattedData);
        }
      } catch (err) {
        console.error('Error fetching client progress:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch client progress'));
        
        // For development, use mock data
        if (clientId || trainerId) {
          setProgressRecords(generateMockProgress(clientId, trainerId));
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProgress();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('client-progress-changes')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'client_progress'
      }, () => {
        fetchProgress();
      })
      .subscribe();
      
    return () => {
      channel.unsubscribe();
    };
  }, [clientId, trainerId]);
  
  const addProgressRecord = async (progressData: ClientProgressInput) => {
    try {
      const { data, error } = await supabase
        .from('client_progress')
        .insert(progressData)
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Progress recorded",
        description: "Client progress has been successfully recorded.",
      });
      
      return data;
    } catch (err) {
      console.error('Error recording progress:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to record client progress. Please try again.",
      });
      throw err;
    }
  };
  
  const updateProgressRecord = async (id: string, progressData: Partial<ClientProgressInput>) => {
    try {
      const { data, error } = await supabase
        .from('client_progress')
        .update(progressData)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Progress updated",
        description: "Client progress has been successfully updated.",
      });
      
      return data;
    } catch (err) {
      console.error('Error updating progress:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update client progress. Please try again.",
      });
      throw err;
    }
  };
  
  const deleteProgressRecord = async (id: string) => {
    try {
      const { error } = await supabase
        .from('client_progress')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Record deleted",
        description: "Client progress record has been deleted.",
      });
      
      return true;
    } catch (err) {
      console.error('Error deleting progress record:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete progress record. Please try again.",
      });
      return false;
    }
  };
  
  const generateMockProgress = (clientId?: string, trainerId?: string): ClientProgressRecord[] => {
    const mockRecords: ClientProgressRecord[] = [];
    const defaultClientId = clientId || 'default-client-id';
    const defaultTrainerId = trainerId || 'default-trainer-id';
    
    // Generate records for the past 3 months (monthly records)
    for (let i = 0; i < 3; i++) {
      const recordDate = new Date();
      recordDate.setMonth(recordDate.getMonth() - i);
      
      // Start with baseline measurements and adjust based on month
      const weight = 180 - i * 2; // Losing weight over time
      const bodyFat = 20 - i * 0.5; // Decreasing body fat
      
      mockRecords.push({
        id: `mock-${i}`,
        client_id: defaultClientId,
        trainer_id: defaultTrainerId,
        date: recordDate.toISOString().split('T')[0],
        weight,
        body_fat_percentage: bodyFat,
        chest_measurement: 42 + i * 0.2, // Increasing chest
        waist_measurement: 34 - i * 0.3, // Decreasing waist
        hip_measurement: 40,
        arm_measurement: 14 + i * 0.1, // Increasing arms
        thigh_measurement: 22 + i * 0.1, // Increasing thighs
        notes: i === 0 ? "Great progress this month" : undefined,
        createdAt: recordDate.toISOString(),
        updatedAt: recordDate.toISOString(),
        client_name: "John Doe"
      });
    }
    
    return mockRecords;
  };
  
  return {
    progressRecords,
    isLoading,
    error,
    addProgressRecord,
    updateProgressRecord,
    deleteProgressRecord
  };
};
