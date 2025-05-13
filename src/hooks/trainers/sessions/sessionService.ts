
import { supabase } from '@/integrations/supabase/client';
import { ClientSession, ClientSessionInput } from '../types';

export const fetchSessions = async (trainerId?: string, clientId?: string) => {
  try {
    let query = supabase.from('client_sessions').select('*');
    
    if (trainerId) {
      query = query.eq('trainer_id', trainerId);
    }
    
    if (clientId) {
      query = query.eq('client_id', clientId);
    }
    
    const { data, error } = await query.order('session_date', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (err) {
    console.error('Error fetching sessions:', err);
    throw err;
  }
};

export const createSession = async (session: ClientSessionInput) => {
  try {
    const { data, error } = await supabase
      .from('client_sessions')
      .insert(session)
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (err) {
    console.error('Error creating session:', err);
    throw err;
  }
};

export const updateSession = async (id: string, updates: Partial<ClientSessionInput>) => {
  try {
    const { data, error } = await supabase
      .from('client_sessions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (err) {
    console.error('Error updating session:', err);
    throw err;
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
  } catch (err) {
    console.error('Error deleting session:', err);
    throw err;
  }
};
