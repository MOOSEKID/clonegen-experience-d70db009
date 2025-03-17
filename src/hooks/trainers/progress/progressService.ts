
import { supabase, getTable } from '@/integrations/supabase/client';
import { ClientProgressRecord, ClientProgressInput, ProgressMeasurements } from './types';
import { generateMockProgress } from './mockData';

export const fetchClientProgress = async (clientId?: string, trainerId?: string): Promise<ClientProgressRecord[]> => {
  if (!clientId && !trainerId) {
    return [];
  }
  
  try {
    let query = getTable('client_progress')
      .select(`
        *,
        members:client_id(name)
      `)
      .order('date', { ascending: false });
      
    if (clientId) {
      query = query.eq('client_id', clientId);
    }
    
    if (trainerId) {
      query = query.eq('trainer_id', trainerId);
    }
    
    const { data, error } = await query;
      
    if (error) throw error;
    
    if (data) {
      return data.map((record: any) => {
        // Extract measurements from JSONB if they exist
        const measurements = record.measurements || {};
        
        return {
          ...record,
          client_name: record.members?.name,
          // Flatten measurements for backward compatibility
          chest_measurement: measurements.chest,
          waist_measurement: measurements.waist,
          hip_measurement: measurements.hip,
          arm_measurement: measurements.arm,
          thigh_measurement: measurements.thigh
        };
      }) as ClientProgressRecord[];
    }
    
    return [];
  } catch (err) {
    console.error('Error fetching client progress:', err);
    
    // For development, use mock data
    if (clientId || trainerId) {
      return generateMockProgress(clientId, trainerId);
    }
    
    throw err;
  }
};

export const addProgressRecord = async (progressData: ClientProgressInput): Promise<any> => {
  try {
    // Create measurements object from flat properties
    const measurements: ProgressMeasurements = {
      chest: progressData.chest_measurement,
      waist: progressData.waist_measurement,
      hip: progressData.hip_measurement,
      arm: progressData.arm_measurement,
      thigh: progressData.thigh_measurement
    };
    
    // Prepare data for database insertion
    const dbData = {
      client_id: progressData.client_id,
      trainer_id: progressData.trainer_id,
      date: progressData.date,
      weight: progressData.weight,
      body_fat_percentage: progressData.body_fat_percentage,
      measurements,
      notes: progressData.notes
    };
    
    const { data, error } = await getTable('client_progress')
      .insert(dbData)
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (err) {
    console.error('Error recording progress:', err);
    throw err;
  }
};

export const updateProgressRecord = async (id: string, progressData: Partial<ClientProgressInput>): Promise<any> => {
  try {
    // Create measurements object from flat properties if they exist
    const measurements: Partial<ProgressMeasurements> = {};
    
    if (progressData.chest_measurement !== undefined) {
      measurements.chest = progressData.chest_measurement;
    }
    if (progressData.waist_measurement !== undefined) {
      measurements.waist = progressData.waist_measurement;
    }
    if (progressData.hip_measurement !== undefined) {
      measurements.hip = progressData.hip_measurement;
    }
    if (progressData.arm_measurement !== undefined) {
      measurements.arm = progressData.arm_measurement;
    }
    if (progressData.thigh_measurement !== undefined) {
      measurements.thigh = progressData.thigh_measurement;
    }
    
    // Prepare data for database update
    const dbData: any = {};
    
    if (progressData.date) dbData.date = progressData.date;
    if (progressData.weight !== undefined) dbData.weight = progressData.weight;
    if (progressData.body_fat_percentage !== undefined) dbData.body_fat_percentage = progressData.body_fat_percentage;
    if (progressData.notes !== undefined) dbData.notes = progressData.notes;
    
    // Only update measurements if any were provided
    if (Object.keys(measurements).length > 0) {
      dbData.measurements = measurements;
    }
    
    const { data, error } = await getTable('client_progress')
      .update(dbData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (err) {
    console.error('Error updating progress:', err);
    throw err;
  }
};

export const deleteProgressRecord = async (id: string): Promise<boolean> => {
  try {
    const { error } = await getTable('client_progress')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return true;
  } catch (err) {
    console.error('Error deleting progress record:', err);
    return false;
  }
};
