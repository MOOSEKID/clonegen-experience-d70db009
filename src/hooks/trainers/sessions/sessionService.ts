
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
    // Calculate end time based on duration
    const sessionDateTime = new Date(`${sessionData.session_date}T00:00:00`);
    const startTime = sessionData.start_time || '09:00'; // Default to 9 AM if not provided
    const durationInHours = (sessionData.duration || 60) / 60; // Convert minutes to hours
    
    // Parse startTime (assuming format "HH:MM")
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    
    // Calculate end time by adding duration
    const endHours = startHours + Math.floor(durationInHours);
    const endMinutes = startMinutes + Math.floor((durationInHours % 1) * 60);
    const endTime = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    
    const { data, error } = await supabase
      .from('client_sessions')
      .insert({
        trainer_id: sessionData.trainer_id,
        client_id: sessionData.client_id,
        session_date: sessionData.session_date,
        start_time: startTime,
        end_time: endTime,
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
    // Build update object
    const updateData: any = { ...sessionData };
    
    // If we're updating duration, recalculate end_time if start_time is available
    if (sessionData.duration && sessionData.start_time) {
      const durationInHours = sessionData.duration / 60;
      const [startHours, startMinutes] = sessionData.start_time.split(':').map(Number);
      const endHours = startHours + Math.floor(durationInHours);
      const endMinutes = startMinutes + Math.floor((durationInHours % 1) * 60);
      updateData.end_time = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    }
    
    const { data, error } = await supabase
      .from('client_sessions')
      .update(updateData)
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
