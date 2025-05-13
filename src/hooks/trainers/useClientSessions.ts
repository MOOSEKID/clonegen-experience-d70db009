
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ClientSession, ClientSessionInput } from './types';
import { 
  fetchSessions, 
  createSession, 
  updateSession, 
  deleteSession 
} from './sessions/sessionService';
import generateMockSessions from './sessions/mockSessions';

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
  
  const addSession = async (session: ClientSessionInput) => {
    try {
      const newSession = await createSession(session);
      
      toast({
        title: "Session created",
        description: "The client session has been added to the schedule.",
      });
      
      return newSession;
    } catch (err) {
      console.error('Error adding session:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create session. Please try again.",
      });
      throw err;
    }
  };
  
  const editSession = async (id: string, updates: Partial<ClientSessionInput>) => {
    try {
      const updatedSession = await updateSession(id, updates);
      
      toast({
        title: "Session updated",
        description: "The client session has been updated.",
      });
      
      return updatedSession;
    } catch (err) {
      console.error('Error updating session:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update session. Please try again.",
      });
      throw err;
    }
  };
  
  const removeSession = async (id: string) => {
    try {
      await deleteSession(id);
      
      toast({
        title: "Session deleted",
        description: "The client session has been removed.",
      });
      
      return true;
    } catch (err) {
      console.error('Error deleting session:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete session. Please try again.",
      });
      throw err;
    }
  };
  
  const updateSessionStatus = (id: string, status: string) => {
    return editSession(id, { status });
  };
  
  return {
    sessions,
    isLoading,
    error,
    addSession,
    editSession,
    removeSession,
    updateSessionStatus
  };
};

// Add missing supabase import
import { supabase } from '@/integrations/supabase/client';
