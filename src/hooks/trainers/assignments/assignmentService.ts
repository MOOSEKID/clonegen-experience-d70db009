
import { ClientAssignment } from '../types';
import { mockAssignments } from './mockAssignments';
import { mockMembers } from '@/data/mockMembersData';
import mockTrainers from '../mockTrainers';
import { supabase } from '@/integrations/supabase/client';

// Mock function to get assignments with trainer and client details
export const getClientAssignments = async (trainerId?: string, clientId?: string): Promise<ClientAssignment[]> => {
  try {
    // In a real implementation, this would be a database call
    
    // For mock data, we're adding trainer and client details
    let filteredAssignments = [...mockAssignments];

    // Apply filters if provided
    if (trainerId) {
      filteredAssignments = filteredAssignments.filter(assignment => assignment.staff_id === trainerId);
    }
    
    if (clientId) {
      filteredAssignments = filteredAssignments.filter(assignment => assignment.client_id === clientId);
    }
    
    // Add trainer and client details
    const enrichedAssignments = filteredAssignments.map(assignment => {
      const trainer = mockTrainers.find(t => t.id === assignment.staff_id);
      const client = mockMembers.find(m => m.id === assignment.client_id);
      
      return {
        ...assignment,
        trainer_name: trainer?.name || 'Unknown Trainer',
        client_name: client?.name || 'Unknown Client',
        trainers: trainer,
        members: client
      };
    });
    
    return enrichedAssignments as any;
  } catch (error) {
    console.error("Error fetching client assignments:", error);
    return [];
  }
};

// Function to create a new client assignment
export const createClientAssignment = async (assignmentData: Omit<ClientAssignment, 'id'>): Promise<ClientAssignment | null> => {
  try {
    // In a real implementation, this would be a database insert
    const newAssignment: ClientAssignment = {
      id: `mock_${Date.now()}`,
      ...assignmentData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Return the newly created assignment
    return newAssignment;
  } catch (error) {
    console.error("Error creating client assignment:", error);
    return null;
  }
};

// Function to update an existing client assignment
export const updateClientAssignment = async (id: string, assignmentData: Partial<ClientAssignment>): Promise<ClientAssignment | null> => {
  try {
    // In a real implementation, this would be a database update
    const assignmentIndex = mockAssignments.findIndex(a => a.id === id);
    
    if (assignmentIndex === -1) {
      throw new Error("Assignment not found");
    }
    
    const updatedAssignment: ClientAssignment = {
      ...mockAssignments[assignmentIndex],
      ...assignmentData,
      updated_at: new Date().toISOString()
    };
    
    // Return the updated assignment
    return updatedAssignment;
  } catch (error) {
    console.error("Error updating client assignment:", error);
    return null;
  }
};

// Function to delete a client assignment
export const deleteClientAssignment = async (id: string): Promise<boolean> => {
  try {
    // In a real implementation, this would be a database delete
    const assignmentIndex = mockAssignments.findIndex(a => a.id === id);
    
    if (assignmentIndex === -1) {
      throw new Error("Assignment not found");
    }
    
    // Return success
    return true;
  } catch (error) {
    console.error("Error deleting client assignment:", error);
    return false;
  }
};
