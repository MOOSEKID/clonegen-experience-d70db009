
import { supabase } from '@/integrations/supabase/client';
import { ClientSession, ClientSessionInput } from './types';

export const fetchSessions = async (trainerId?: string, clientId?: string): Promise<ClientSession[]> => {
  try {
    // Use any to avoid deep type instantiation error
    let query = supabase.from('client_sessions').select('*') as any;
    
    if (trainerId) {
      query = query.eq('assigned_trainer_id', trainerId);
    }
    
    if (clientId) {
      query = query.eq('member_id', clientId);
    }
    
    const { data, error } = await query.order('session_date', { ascending: false });
    
    if (error) throw error;
    
    // Map the data to match our ClientSession type
    const sessions = data.map((item: any) => ({
      ...item,
      // For backward compatibility or handling existing data
      assigned_trainer_id: item.assigned_trainer_id || item.trainer_id || item.staff_id,
      member_id: item.member_id || item.client_id,
      session_focus_tags: item.session_focus_tags || item.focus_areas,
      session_outcomes: item.session_outcomes || item.achievements,
      session_location: item.session_location || item.location,
    })) as ClientSession[];
    
    return sessions;
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw error;
  }
};

export const createSession = async (session: ClientSessionInput): Promise<ClientSession> => {
  try {
    // Make sure session object conforms to the expected structure
    // Cast to any to avoid type issues
    const { data, error } = await supabase
      .from('client_sessions')
      .insert(session as any)
      .select()
      .single();
    
    if (error) throw error;
    
    return data as unknown as ClientSession;
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
};

export const updateSession = async (id: string, updates: Partial<ClientSessionInput>): Promise<ClientSession> => {
  try {
    const { data, error } = await supabase
      .from('client_sessions')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return data as unknown as ClientSession;
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
