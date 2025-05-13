
import { ClientSession } from '../types';
import { mockSessions } from './mockSessions';
import { mockMembers } from '@/data/mockMembersData';
import mockTrainers from '../mockTrainers';
import { supabase } from '@/integrations/supabase/client';

// Mock function to get sessions with trainer and client details
export const getClientSessions = async (trainerId?: string, clientId?: string, status?: string): Promise<ClientSession[]> => {
  try {
    // In a real implementation, this would be a database call
    
    // For mock data, we're adding trainer and client details
    let filteredSessions = [...mockSessions];

    // Apply filters if provided
    if (trainerId) {
      filteredSessions = filteredSessions.filter(session => session.staff_id === trainerId);
    }
    
    if (clientId) {
      filteredSessions = filteredSessions.filter(session => session.client_id === clientId);
    }
    
    if (status) {
      filteredSessions = filteredSessions.filter(session => session.status === status);
    }
    
    // Add trainer and client details
    const enrichedSessions = filteredSessions.map(session => {
      const trainer = mockTrainers.find(t => t.id === session.staff_id);
      const client = mockMembers.find(m => m.id === session.client_id);
      
      return {
        ...session,
        trainer_name: trainer?.name || 'Unknown Trainer',
        client_name: client?.name || 'Unknown Client',
        trainers: trainer,
        members: client
      };
    });
    
    return enrichedSessions as any;
  } catch (error) {
    console.error("Error fetching client sessions:", error);
    return [];
  }
};

// Function to create a new client session
export const createClientSession = async (sessionData: Omit<ClientSession, 'id'>): Promise<ClientSession | null> => {
  try {
    // In a real implementation, this would be a database insert
    const newSession: ClientSession = {
      id: `mock_${Date.now()}`,
      ...sessionData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Return the newly created session
    return newSession;
  } catch (error) {
    console.error("Error creating client session:", error);
    return null;
  }
};

// Function to update an existing client session
export const updateClientSession = async (id: string, sessionData: Partial<ClientSession>): Promise<ClientSession | null> => {
  try {
    // In a real implementation, this would be a database update
    const sessionIndex = mockSessions.findIndex(s => s.id === id);
    
    if (sessionIndex === -1) {
      throw new Error("Session not found");
    }
    
    const updatedSession: ClientSession = {
      ...mockSessions[sessionIndex],
      ...sessionData,
      updated_at: new Date().toISOString()
    };
    
    // Return the updated session
    return updatedSession;
  } catch (error) {
    console.error("Error updating client session:", error);
    return null;
  }
};

// Function to delete a client session
export const deleteClientSession = async (id: string): Promise<boolean> => {
  try {
    // In a real implementation, this would be a database delete
    const sessionIndex = mockSessions.findIndex(s => s.id === id);
    
    if (sessionIndex === -1) {
      throw new Error("Session not found");
    }
    
    // Return success
    return true;
  } catch (error) {
    console.error("Error deleting client session:", error);
    return false;
  }
};

// Function to mark attendance for a session
export const markSessionAttendance = async (id: string, attended: boolean): Promise<ClientSession | null> => {
  try {
    // In a real implementation, this would be a database update
    const sessionIndex = mockSessions.findIndex(s => s.id === id);
    
    if (sessionIndex === -1) {
      throw new Error("Session not found");
    }
    
    const updatedSession: ClientSession = {
      ...mockSessions[sessionIndex],
      status: attended ? 'completed' : 'no-show',
      updated_at: new Date().toISOString()
    };
    
    // Return the updated session
    return updatedSession;
  } catch (error) {
    console.error("Error marking session attendance:", error);
    return null;
  }
};
