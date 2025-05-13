
import { supabase } from '@/integrations/supabase/client';
import { ClientAssignment } from '../assignments/types';

export const fetchAssignments = async (trainerId?: string, clientId?: string): Promise<ClientAssignment[]> => {
  try {
    // Use any to avoid deep type instantiation error
    let query = supabase.from('trainer_client_assignments').select('*') as any;
    
    if (trainerId) {
      query = query.eq('staff_id', trainerId);
    }
    
    if (clientId) {
      query = query.eq('client_id', clientId);
    }
    
    const { data, error } = await query.order('assignment_date', { ascending: false });
    
    if (error) throw error;
    
    // Map the data to match our ClientAssignment type
    const assignments = data.map((item: any) => ({
      ...item,
      staff_id: item.staff_id || item.trainer_id, // Handle both trainer_id and staff_id
    })) as ClientAssignment[];
    
    return assignments;
  } catch (error) {
    console.error('Error fetching assignments:', error);
    throw error;
  }
};

export const createAssignment = async (trainerId: string, clientId: string): Promise<ClientAssignment> => {
  try {
    const newAssignment = {
      staff_id: trainerId,
      client_id: clientId,
      assignment_date: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    
    const { data, error } = await supabase
      .from('trainer_client_assignments')
      .insert(newAssignment)
      .select()
      .single();
    
    if (error) throw error;
    
    return data as unknown as ClientAssignment;
  } catch (error) {
    console.error('Error creating assignment:', error);
    throw error;
  }
};

export const updateAssignmentStatus = async (id: string, status: 'active' | 'paused' | 'ended'): Promise<boolean> => {
  try {
    let updateData: any = { status };
    
    if (status === 'ended') {
      updateData.end_date = new Date().toISOString().split('T')[0];
    }
    
    const { error } = await supabase
      .from('trainer_client_assignments')
      .update(updateData)
      .eq('id', id);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating assignment status:', error);
    throw error;
  }
};
