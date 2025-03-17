
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { ClientProgressRecord, ClientProgressInput } from './types';
import { 
  fetchClientProgress, 
  addProgressRecord as addRecord, 
  updateProgressRecord as updateRecord, 
  deleteProgressRecord as deleteRecord 
} from './progressService';

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
        const data = await fetchClientProgress(clientId, trainerId);
        setProgressRecords(data);
      } catch (err) {
        console.error('Error in useClientProgress:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch client progress'));
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
      const data = await addRecord(progressData);
      
      toast({
        title: "Progress recorded",
        description: "Client progress has been successfully recorded.",
      });
      
      return data;
    } catch (err) {
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
      const data = await updateRecord(id, progressData);
      
      toast({
        title: "Progress updated",
        description: "Client progress has been successfully updated.",
      });
      
      return data;
    } catch (err) {
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
      const success = await deleteRecord(id);
      
      if (success) {
        toast({
          title: "Record deleted",
          description: "Client progress record has been deleted.",
        });
      } else {
        throw new Error("Failed to delete record");
      }
      
      return success;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete progress record. Please try again.",
      });
      return false;
    }
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

// Re-export types for backward compatibility
export type { ClientProgressRecord, ClientProgressInput } from './types';
