
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface ClientSession {
  id: string;
  trainer_id: string;
  client_id: string;
  session_date: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'canceled' | 'no-show';
  notes: string | null;
  focus_areas: string[] | null;
  achievements: string | null;
  created_at: string;
  updated_at: string;
  client_name?: string;
  trainer_name?: string;
}

export interface ClientSessionInput {
  trainer_id: string;
  client_id: string;
  session_date: string;
  duration: number;
  status?: 'scheduled' | 'completed' | 'canceled' | 'no-show';
  notes?: string;
  focus_areas?: string[];
  achievements?: string;
}

export const useClientSessions = (trainerId?: string, clientId?: string) => {
  const [sessions, setSessions] = useState<ClientSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchSessions = async () => {
      setIsLoading(true);
      
      try {
        let query = supabase
          .from('client_sessions')
          .select(`
            *,
            trainers:trainer_id(name),
            members:client_id(name)
          `)
          .order('session_date', { ascending: false });
          
        if (trainerId) {
          query = query.eq('trainer_id', trainerId);
        }
        
        if (clientId) {
          query = query.eq('client_id', clientId);
        }
        
        const { data, error } = await query;
          
        if (error) throw error;
        
        if (data) {
          const formattedData = data.map(session => ({
            ...session,
            client_name: session.members?.name,
            trainer_name: session.trainers?.name
          }));
          setSessions(formattedData);
        }
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
    
    fetchSessions();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('client-sessions-changes')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'client_sessions'
      }, () => {
        fetchSessions();
      })
      .subscribe();
      
    return () => {
      channel.unsubscribe();
    };
  }, [trainerId, clientId]);
  
  const createSession = async (sessionData: ClientSessionInput) => {
    try {
      const { data, error } = await supabase
        .from('client_sessions')
        .insert({
          trainer_id: sessionData.trainer_id,
          client_id: sessionData.client_id,
          session_date: sessionData.session_date,
          duration: sessionData.duration,
          status: sessionData.status || 'scheduled',
          notes: sessionData.notes || null,
          focus_areas: sessionData.focus_areas || null,
          achievements: sessionData.achievements || null
        })
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Session created",
        description: "The client session has been scheduled.",
      });
      
      return data;
    } catch (err) {
      console.error('Error creating session:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create client session. Please try again.",
      });
      throw err;
    }
  };
  
  const updateSession = async (id: string, sessionData: Partial<ClientSessionInput>) => {
    try {
      const { data, error } = await supabase
        .from('client_sessions')
        .update(sessionData)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Session updated",
        description: "The client session has been updated.",
      });
      
      return data;
    } catch (err) {
      console.error('Error updating session:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update client session. Please try again.",
      });
      throw err;
    }
  };
  
  const completeSession = async (id: string, achievements: string, notes?: string) => {
    return updateSession(id, {
      status: 'completed',
      achievements,
      notes
    });
  };
  
  const cancelSession = async (id: string, notes?: string) => {
    return updateSession(id, {
      status: 'canceled',
      notes
    });
  };
  
  const markNoShow = async (id: string, notes?: string) => {
    return updateSession(id, {
      status: 'no-show',
      notes
    });
  };
  
  const deleteSession = async (id: string) => {
    try {
      const { error } = await supabase
        .from('client_sessions')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
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
        description: "Failed to delete client session. Please try again.",
      });
      return false;
    }
  };
  
  const generateMockSessions = (trainerId?: string, clientId?: string): ClientSession[] => {
    const mockSessions: ClientSession[] = [];
    const now = new Date();
    
    // Generate sessions for the past and future
    for (let i = -5; i < 10; i++) {
      const sessionDate = new Date();
      sessionDate.setDate(now.getDate() + i);
      
      let status: 'scheduled' | 'completed' | 'canceled' | 'no-show';
      
      if (i < 0) {
        // Past sessions
        const random = Math.random();
        if (random < 0.7) {
          status = 'completed';
        } else if (random < 0.85) {
          status = 'canceled';
        } else {
          status = 'no-show';
        }
      } else {
        // Future sessions
        status = 'scheduled';
      }
      
      const defaultTrainerId = trainerId || 'default-trainer-id';
      const defaultClientId = clientId || 'default-client-id';
      
      mockSessions.push({
        id: `mock-${i + 5}`,
        trainer_id: defaultTrainerId,
        client_id: defaultClientId,
        session_date: sessionDate.toISOString(),
        duration: 60,
        status,
        notes: status === 'completed' ? "Great progress today" : null,
        focus_areas: ["Strength", "Core"],
        achievements: status === 'completed' ? "Increased squat weight by 10lbs" : null,
        created_at: new Date(sessionDate.getTime() - 1000 * 60 * 60 * 24).toISOString(),
        updated_at: new Date().toISOString(),
        client_name: "John Doe",
        trainer_name: "Trainer Name"
      });
    }
    
    return mockSessions;
  };
  
  return {
    sessions,
    isLoading,
    error,
    createSession,
    updateSession,
    completeSession,
    cancelSession,
    markNoShow,
    deleteSession
  };
};
