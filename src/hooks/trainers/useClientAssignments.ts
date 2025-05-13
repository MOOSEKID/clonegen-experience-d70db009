
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ClientAssignment } from './assignments/types';
import { AssignedClient } from './assignments/types';
import { fetchAssignments, createAssignment, updateAssignmentStatus } from './assignments/assignmentService';
import generateMockAssignments from './assignments/mockAssignments';
import { supabase } from '@/integrations/supabase/client';

export type { ClientAssignment, AssignedClient };

export const useClientAssignments = (trainerId?: string, clientId?: string) => {
  const [assignments, setAssignments] = useState<ClientAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadAssignments = async () => {
      setIsLoading(true);
      
      try {
        const data = await fetchAssignments(trainerId, clientId);
        setAssignments(data);
      } catch (err) {
        console.error('Error fetching client assignments:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch client assignments'));
        
        // Use mock data for development if needed
        if (trainerId || clientId) {
          setAssignments(generateMockAssignments(trainerId, clientId));
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAssignments();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('client-assignments-changes')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'trainer_client_assignments'
      }, () => {
        loadAssignments();
      })
      .subscribe();
      
    return () => {
      channel.unsubscribe();
    };
  }, [trainerId, clientId]);
  
  const assignClient = async (trainerId: string, clientId: string) => {
    try {
      await createAssignment(trainerId, clientId);
      
      toast({
        title: "Client assigned",
        description: "The client has been assigned to the trainer.",
      });
    } catch (err) {
      console.error('Error assigning client:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to assign client. Please try again.",
      });
      throw err;
    }
  };
  
  const handleStatusUpdate = async (id: string, status: 'active' | 'paused' | 'ended') => {
    try {
      await updateAssignmentStatus(id, status);
      
      const statusMessages = {
        active: "The client assignment has been activated.",
        paused: "The client assignment has been paused.",
        ended: "The client assignment has been ended."
      };
      
      toast({
        title: "Assignment updated",
        description: statusMessages[status],
      });
    } catch (err) {
      console.error('Error updating assignment status:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update assignment status. Please try again.",
      });
      throw err;
    }
  };
  
  const pauseAssignment = (id: string) => handleStatusUpdate(id, 'paused');
  const activateAssignment = (id: string) => handleStatusUpdate(id, 'active');
  const endAssignment = (id: string) => handleStatusUpdate(id, 'ended');
  
  const getAssignedClients = (): AssignedClient[] => {
    return assignments
      .filter(a => a.status === 'active')
      .map(a => ({
        id: a.client_id,
        name: a.client_id || 'Unknown Client',
        assignmentId: a.id,
        status: a.status
      }));
  };
  
  return {
    assignments,
    isLoading,
    error,
    assignClient,
    pauseAssignment,
    activateAssignment,
    endAssignment,
    getAssignedClients
  };
};
