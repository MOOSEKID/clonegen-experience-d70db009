
import { supabase } from '@/integrations/supabase/client';
import { ClientSession, ClientSessionInput } from './types';

export const fetchSessions = async (trainerId?: string, clientId?: string) => {
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
      return data.map(session => ({
        ...session,
        client_name: session.members?.name,
        trainer_name: session.trainers?.name,
        // Ensure status is one of the valid types
        status: (session.status as 'scheduled' | 'completed' | 'canceled' | 'no-show') || 'scheduled'
      })) as ClientSession[];
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw error;
  }
};

export const createSession = async (sessionData: ClientSessionInput) => {
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
    
    return data;
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
};

export const updateSession = async (id: string, sessionData: Partial<ClientSessionInput>) => {
  try {
    const { data, error } = await supabase
      .from('client_sessions')
      .update(sessionData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error updating session:', error);
    throw error;
  }
};

export const deleteSession = async (id: string) => {
  try {
    const { error } = await supabase
      .from('client_sessions')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error deleting session:', error);
    throw error;
  }
};
