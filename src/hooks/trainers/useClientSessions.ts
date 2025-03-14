
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ClientSession, ClientSessionInput } from './sessions/types';
import { 
  fetchSessions, 
  createSession, 
  updateSession, 
  deleteSession 
} from './sessions/sessionService';
import { generateMockSessions } from './sessions/mockSessions';

export type { ClientSession, ClientSessionInput } from './sessions/types';

export const useClientSessions = (trainerId?: string, clientId?: string) => {
  const [sessions, setSessions] = useState<ClientSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadSessions = async () => {
      setIsLoading(true);
      
      try {
        const data = await fetchSessions(trainerId, clientId);
        setSessions(data);
      } catch (err) {
        console.error('Error fetching client sessions:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch client sessions'));
        
        // Use mock data for development if needed
        if (trainerId || clientId) {
          setSessions(generateMockSessions(trainerId, clientId));
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSessions();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('client-sessions-changes')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'client_sessions'
      }, () => {
        loadSessions();
      })
      .subscribe();
      
    return () => {
      channel.unsubscribe();
    };
  }, [trainerId, clientId]);
  
  const createClientSession = async (sessionData: ClientSessionInput) => {
    try {
      await createSession(sessionData);
      
      toast({
        title: "Session created",
        description: "The client session has been scheduled.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create client session. Please try again.",
      });
      throw err;
    }
  };
  
  const updateClientSession = async (id: string, sessionData: Partial<ClientSessionInput>) => {
    try {
      await updateSession(id, sessionData);
      
      toast({
        title: "Session updated",
        description: "The client session has been updated.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update client session. Please try again.",
      });
      throw err;
    }
  };
  
  const completeSession = async (id: string, achievements: string, notes?: string) => {
    return updateClientSession(id, {
      status: 'completed',
      achievements,
      notes
    });
  };
  
  const cancelSession = async (id: string, notes?: string) => {
    return updateClientSession(id, {
      status: 'canceled',
      notes
    });
  };
  
  const markNoShow = async (id: string, notes?: string) => {
    return updateClientSession(id, {
      status: 'no-show',
      notes
    });
  };
  
  const deleteClientSession = async (id: string) => {
    try {
      const success = await deleteSession(id);
      
      if (success) {
        toast({
          title: "Session deleted",
          description: "The client session has been removed.",
        });
      }
      
      return success;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete client session. Please try again.",
      });
      return false;
    }
  };
  
  return {
    sessions,
    isLoading,
    error,
    createSession: createClientSession,
    updateSession: updateClientSession,
    completeSession,
    cancelSession,
    markNoShow,
    deleteSession: deleteClientSession
  };
};
