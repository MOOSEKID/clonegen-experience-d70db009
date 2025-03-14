
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface ClientAssignment {
  id: string;
  trainer_id: string;
  client_id: string;
  assignment_date: string;
  status: 'active' | 'paused' | 'ended';
  created_at: string;
  updated_at: string;
  client_name?: string;
  trainer_name?: string;
}

export const useClientAssignments = (trainerId?: string, clientId?: string) => {
  const [assignments, setAssignments] = useState<ClientAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      
      try {
        let query = supabase
          .from('trainer_client_assignments')
          .select(`
            *,
            trainers:trainer_id(name),
            members:client_id(name)
          `)
          .order('assignment_date', { ascending: false });
          
        if (trainerId) {
          query = query.eq('trainer_id', trainerId);
        }
        
        if (clientId) {
          query = query.eq('client_id', clientId);
        }
        
        const { data, error } = await query;
          
        if (error) throw error;
        
        if (data) {
          const formattedData = data.map(assignment => ({
            ...assignment,
            client_name: assignment.members?.name,
            trainer_name: assignment.trainers?.name,
            // Ensure status is one of the valid types
            status: (assignment.status as 'active' | 'paused' | 'ended') || 'active'
          }));
          setAssignments(formattedData as ClientAssignment[]);
        }
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
    
    fetchAssignments();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('client-assignments-changes')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'trainer_client_assignments'
      }, () => {
        fetchAssignments();
      })
      .subscribe();
      
    return () => {
      channel.unsubscribe();
    };
  }, [trainerId, clientId]);
  
  const assignClient = async (trainerId: string, clientId: string) => {
    try {
      // Check if assignment already exists
      const { data: existingAssignment } = await supabase
        .from('trainer_client_assignments')
        .select('*')
        .eq('trainer_id', trainerId)
        .eq('client_id', clientId)
        .single();
        
      if (existingAssignment) {
        // If already exists but not active, reactivate it
        if (existingAssignment.status !== 'active') {
          const { data, error } = await supabase
            .from('trainer_client_assignments')
            .update({ status: 'active', assignment_date: new Date().toISOString() })
            .eq('id', existingAssignment.id)
            .select()
            .single();
            
          if (error) throw error;
          
          toast({
            title: "Client reassigned",
            description: "The client has been reassigned to the trainer.",
          });
          
          return data;
        } else {
          // Already assigned and active
          toast({
            title: "Already assigned",
            description: "This client is already assigned to the trainer.",
          });
          
          return existingAssignment;
        }
      }
      
      // Create new assignment
      const { data, error } = await supabase
        .from('trainer_client_assignments')
        .insert({
          trainer_id: trainerId,
          client_id: clientId,
          assignment_date: new Date().toISOString(),
          status: 'active'
        })
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Client assigned",
        description: "The client has been assigned to the trainer.",
      });
      
      return data;
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
  
  const updateAssignmentStatus = async (id: string, status: 'active' | 'paused' | 'ended') => {
    try {
      const { data, error } = await supabase
        .from('trainer_client_assignments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      const statusMessages = {
        active: "The client assignment has been activated.",
        paused: "The client assignment has been paused.",
        ended: "The client assignment has been ended."
      };
      
      toast({
        title: "Assignment updated",
        description: statusMessages[status],
      });
      
      return data;
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
  
  const pauseAssignment = (id: string) => updateAssignmentStatus(id, 'paused');
  const activateAssignment = (id: string) => updateAssignmentStatus(id, 'active');
  const endAssignment = (id: string) => updateAssignmentStatus(id, 'ended');
  
  const getAssignedClients = () => {
    return assignments.filter(a => a.status === 'active').map(a => ({
      id: a.client_id,
      name: a.client_name || 'Unknown Client',
      assignmentId: a.id,
      status: a.status
    }));
  };
  
  const generateMockAssignments = (trainerId?: string, clientId?: string): ClientAssignment[] => {
    const defaultTrainerId = trainerId || 'default-trainer-id';
    const mockAssignments: ClientAssignment[] = [];
    
    // Generate 5 mock assignments with different statuses
    const statuses: ('active' | 'paused' | 'ended')[] = ['active', 'active', 'active', 'paused', 'ended'];
    
    for (let i = 0; i < 5; i++) {
      const assignmentDate = new Date();
      assignmentDate.setMonth(assignmentDate.getMonth() - i);
      
      mockAssignments.push({
        id: `mock-${i}`,
        trainer_id: defaultTrainerId,
        client_id: clientId || `client-${i}`,
        assignment_date: assignmentDate.toISOString(),
        status: statuses[i],
        created_at: assignmentDate.toISOString(),
        updated_at: new Date().toISOString(),
        client_name: `Client ${i + 1}`,
        trainer_name: "Trainer Name"
      });
    }
    
    return mockAssignments;
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
