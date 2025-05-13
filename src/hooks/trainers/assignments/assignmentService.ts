
import { supabase } from '@/integrations/supabase/client';
import { ClientAssignment } from '../types';
import { toast } from 'sonner';

export const fetchAssignments = async (trainerId?: string, clientId?: string) => {
  try {
    let query = supabase.from('trainer_client_assignments').select('*');
    
    if (trainerId) {
      query = query.eq('trainer_id', trainerId);
    }
    
    if (clientId) {
      query = query.eq('client_id', clientId);
    }
    
    const { data, error } = await query.order('assignment_date', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (err) {
    console.error('Error fetching assignments:', err);
    throw err;
  }
};

export const createAssignment = async (trainerId: string, clientId: string) => {
  try {
    const { data, error } = await supabase
      .from('trainer_client_assignments')
      .insert({
        trainer_id: trainerId,
        client_id: clientId,
        assignment_date: new Date().toISOString().split('T')[0],
        status: 'active'
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (err) {
    console.error('Error creating assignment:', err);
    throw err;
  }
};

export const updateAssignmentStatus = async (id: string, status: 'active' | 'paused' | 'ended') => {
  try {
    let updates: { status: string; end_date?: string } = { status };
    
    if (status === 'ended') {
      updates.end_date = new Date().toISOString().split('T')[0];
    }
    
    const { error } = await supabase
      .from('trainer_client_assignments')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
    
    return true;
  } catch (err) {
    console.error('Error updating assignment status:', err);
    throw err;
  }
};
