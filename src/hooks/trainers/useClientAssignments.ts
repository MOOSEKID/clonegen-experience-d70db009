
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ClientAssignment, AssignedClient } from './assignments/types';
import { fetchAssignments, createAssignment, updateAssignmentStatus } from './assignments/assignmentService';
import generateMockAssignments from './assignments/mockAssignments';

export const useClientAssignments = (trainerId?: string, clientId?: string) => {
  const [assignments, setAssignments] = useState<ClientAssignment[]>([]);
  const [clients, setClients] = useState<AssignedClient[]>([]);
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
  }, [trainerId, clientId]);
  
  const assignClient = async (trainerId: string, clientId: string) => {
    try {
      const newAssignment = await createAssignment(trainerId, clientId);
      setAssignments(prev => [...prev, newAssignment]);
      
      toast({
        title: "Client assigned",
        description: "The client has been assigned to the trainer.",
      });
      
      return newAssignment;
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
  
  const updateAssignmentStatusLocal = async (id: string, status: 'active' | 'paused' | 'ended') => {
    try {
      const success = await updateAssignmentStatus(id, status);
      
      if (success) {
        setAssignments(prev => 
          prev.map(assignment => 
            assignment.id === id 
              ? { ...assignment, status, ...(status === 'ended' ? { end_date: new Date().toISOString().split('T')[0] } : {}) } 
              : assignment
          )
        );
        
        toast({
          title: "Status updated",
          description: `The assignment has been marked as ${status}.`,
        });
      }
      
      return success;
    } catch (err) {
      console.error('Error updating assignment status:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update status. Please try again.",
      });
      throw err;
    }
  };
  
  return {
    assignments,
    clients,
    isLoading,
    error,
    assignClient,
    updateAssignmentStatus: updateAssignmentStatusLocal
  };
};
