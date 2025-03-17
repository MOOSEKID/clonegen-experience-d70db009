
import { supabase } from '@/integrations/supabase/client';
import { ClientSession, ClientSessionInput } from './types';

export const fetchSessions = async (trainerId?: string, clientId?: string) => {
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
    return data.map(session => ({
      ...session,
      client_name: session.members?.name,
      trainer_name: session.trainers?.name,
      // Ensure status is one of the valid types
      status: (session.status as 'scheduled' | 'completed' | 'canceled' | 'no-show') || 'scheduled'
    })) as ClientSession[];
  }
  
  return [];
};

export const createSession = async (sessionData: ClientSessionInput) => {
  // Calculate duration if not provided
  if (!sessionData.duration && sessionData.start_time && sessionData.end_time) {
    const startTime = new Date(`2000-01-01T${sessionData.start_time}`);
    const endTime = new Date(`2000-01-01T${sessionData.end_time}`);
    sessionData.duration = Math.round((endTime.getTime() - startTime.getTime()) / 60000); // in minutes
  }
  
  // Set default status if not provided
  if (!sessionData.status) {
    sessionData.status = 'scheduled';
  }
  
  const { data, error } = await supabase
    .from('client_sessions')
    .insert(sessionData)
    .select()
    .single();
    
  if (error) throw error;
  
  return data;
};

export const updateSession = async (id: string, sessionData: Partial<ClientSessionInput>) => {
  // Calculate duration if start_time and end_time are provided but duration isn't
  if (sessionData.start_time && sessionData.end_time && !sessionData.duration) {
    const startTime = new Date(`2000-01-01T${sessionData.start_time}`);
    const endTime = new Date(`2000-01-01T${sessionData.end_time}`);
    sessionData.duration = Math.round((endTime.getTime() - startTime.getTime()) / 60000); // in minutes
  }
  
  const { data, error } = await supabase
    .from('client_sessions')
    .update(sessionData)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  
  return data;
};

export const deleteSession = async (id: string) => {
  const { error } = await supabase
    .from('client_sessions')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
  
  return true;
};
