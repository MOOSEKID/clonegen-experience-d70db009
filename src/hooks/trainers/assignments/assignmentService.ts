
import { supabase } from '@/integrations/supabase/client';
import { ClientAssignment } from './types';

export const fetchAssignments = async (trainerId?: string, clientId?: string) => {
  let query = supabase
    .from('trainer_client_assignments')
    .select(`
      *,
      trainers:trainer_id(name),
      members:client_id(name)
    `)
    .order('assignment_date', { ascending: false });
    
  if (trainerId) {
    query = query.eq('trainer_id', trainerId);
  }
  
  if (clientId) {
    query = query.eq('client_id', clientId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  if (data) {
    return data.map(assignment => ({
      ...assignment,
      client_name: assignment.members?.name,
      trainer_name: assignment.trainers?.name,
      status: (assignment.status as 'active' | 'paused' | 'ended') || 'active'
    })) as ClientAssignment[];
  }
  
  return [];
};

export const createAssignment = async (trainerId: string, clientId: string) => {
  // Check if assignment already exists
  const { data: existingAssignment } = await supabase
    .from('trainer_client_assignments')
    .select('*')
    .eq('trainer_id', trainerId)
    .eq('client_id', clientId)
    .single();
    
  if (existingAssignment) {
    // If already exists but not active, reactivate it
    if (existingAssignment.status !== 'active') {
      const { data, error } = await supabase
        .from('trainer_client_assignments')
        .update({ status: 'active', assignment_date: new Date().toISOString() })
        .eq('id', existingAssignment.id)
        .select()
        .single();
        
      if (error) throw error;
      
      return data;
    } else {
      // Already assigned and active
      return existingAssignment;
    }
  }
  
  // Create new assignment
  const { data, error } = await supabase
    .from('trainer_client_assignments')
    .insert({
      trainer_id: trainerId,
      client_id: clientId,
      assignment_date: new Date().toISOString(),
      status: 'active'
    })
    .select()
    .single();
    
  if (error) throw error;
  
  return data;
};

export const updateAssignmentStatus = async (id: string, status: 'active' | 'paused' | 'ended') => {
  const { data, error } = await supabase
    .from('trainer_client_assignments')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  
  return data;
};
