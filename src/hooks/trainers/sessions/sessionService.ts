import { supabase } from '@/integrations/supabase/client';
import { ClientSession, ClientSessionInput } from './types';

export const fetchSessions = async (trainerId?: string, clientId?: string): Promise<ClientSession[]> => {
  try {
    let query = supabase
      .from('client_sessions')
      .select(`
        id,
        assigned_trainer_id,
        member_id,
        session_date,
        start_time,
        end_time,
        duration,
        status,
        notes,
        focus_areas,
        achievements,
        created_at,
        updated_at
      `);

    if (trainerId) {
      query = query.eq('assigned_trainer_id', trainerId);
    }

    if (clientId) {
      query = query.eq('member_id', clientId);
    }

    const { data, error } = await query.order('session_date', { ascending: false });

    if (error) throw error;

    return data as ClientSession[];
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw error;
  }
};

export const createSession = async (session: ClientSessionInput): Promise<ClientSession> => {
  try {
    const { data, error } = await supabase
      .from('client_sessions')
      .insert(session)
      .select()
      .single();

    if (error) throw error;

    return data as ClientSession;
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
};

export const updateSession = async (id: string, updates: Partial<ClientSessionInput>): Promise<ClientSession> => {
  try {
    const { data, error } = await supabase
      .from('client_sessions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return data as ClientSession;
  } catch (error) {
    console.error('Error updating session:', error);
    throw error;
  }
};

export const deleteSession = async (id: string): Promise<boolean> => {
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