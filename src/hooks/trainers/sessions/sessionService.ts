
import { supabase, getTable } from '@/integrations/supabase/client';
import { ClientSession, ClientSessionInput } from './types';

export const fetchSessions = async (trainerId?: string, clientId?: string) => {
  let query = getTable('client_sessions')
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
    return data.map(session => ({
      ...session,
      client_name: session.members?.name,
      trainer_name: session.trainers?.name,
      // Ensure status is one of the valid types
      status: (session.status as ClientSession['status']) || 'scheduled'
    })) as ClientSession[];
  }
  
  return [];
};

export const createSession = async (sessionData: ClientSessionInput) => {
  // Calculate duration if not provided
  if (!sessionData.duration && sessionData.start_time && sessionData.end_time) {
    const startParts = sessionData.start_time.split(':').map(Number);
    const endParts = sessionData.end_time.split(':').map(Number);
    
    const startMinutes = startParts[0] * 60 + startParts[1];
    const endMinutes = endParts[0] * 60 + endParts[1];
    
    // If end time is earlier than start time, assume it's the next day
    const durationMinutes = endMinutes < startMinutes 
      ? (24 * 60 - startMinutes) + endMinutes 
      : endMinutes - startMinutes;
      
    sessionData.duration = durationMinutes;
  }
  
  const { data, error } = await getTable('client_sessions')
    .insert(sessionData)
    .select()
    .single();
    
  if (error) throw error;
  
  return data;
};

export const updateSession = async (id: string, sessionData: Partial<ClientSessionInput>) => {
  const { data, error } = await getTable('client_sessions')
    .update(sessionData)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  
  return data;
};

export const deleteSession = async (id: string): Promise<boolean> => {
  const { error } = await getTable('client_sessions')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting session:', error);
    return false;
  }
  
  return true;
};
