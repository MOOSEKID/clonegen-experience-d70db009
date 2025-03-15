
import { TrainerProfile, TrainerCertification, TrainerAvailability } from './types';
import { supabase } from '@/integrations/supabase/client';
import { getMockTrainers } from './mockData';

export const fetchTrainers = async (): Promise<TrainerProfile[]> => {
  try {
    // First attempt to get trainers from the database
    const { data: trainersData, error: trainersError } = await supabase
      .from('trainers')
      .select('*');

    if (trainersError) throw trainersError;

    // If no trainers found in the database, return mock data
    if (!trainersData || trainersData.length === 0) {
      console.log('No trainers found in database, returning mock data');
      return getMockTrainers();
    }

    // For each trainer, fetch their certifications
    const trainersWithCerts = await Promise.all(
      trainersData.map(async (trainer) => {
        const { data: certifications, error: certError } = await supabase
          .from('trainer_certifications')
          .select('*')
          .eq('trainer_id', trainer.id);

        if (certError) {
          console.error('Error fetching certifications:', certError);
          return { ...trainer, certifications: [] };
        }

        // Fetch availability
        const { data: availability, error: availError } = await supabase
          .from('trainer_availability')
          .select('*')
          .eq('trainer_id', trainer.id);

        if (availError) {
          console.error('Error fetching availability:', availError);
          return { ...trainer, certifications: certifications || [], availability: [] };
        }

        return {
          ...trainer,
          certifications: certifications || [],
          availability: availability || []
        };
      })
    );

    return trainersWithCerts;
  } catch (error) {
    console.error('Error in fetchTrainers:', error);
    // Return mock data if there's an error
    return getMockTrainers();
  }
};

export const addTrainer = async (trainer: Omit<TrainerProfile, 'id' | 'certifications' | 'availability'>): Promise<TrainerProfile> => {
  try {
    const { data, error } = await supabase
      .from('trainers')
      .insert([trainer])
      .select()
      .single();

    if (error) throw error;
    
    return { ...data, certifications: [], availability: [] };
  } catch (error) {
    console.error('Error adding trainer:', error);
    throw error;
  }
};

export const updateTrainer = async (id: string, updates: Partial<Omit<TrainerProfile, 'id' | 'certifications' | 'availability'>>): Promise<void> => {
  try {
    const { error } = await supabase
      .from('trainers')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating trainer:', error);
    throw error;
  }
};

export const deleteTrainer = async (id: string): Promise<void> => {
  try {
    // First delete related certifications and availability
    await supabase.from('trainer_certifications').delete().eq('trainer_id', id);
    await supabase.from('trainer_availability').delete().eq('trainer_id', id);
    
    // Then delete the trainer
    const { error } = await supabase
      .from('trainers')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting trainer:', error);
    throw error;
  }
};

export const addCertification = async (certification: Omit<TrainerCertification, 'id'>): Promise<void> => {
  try {
    const { error } = await supabase
      .from('trainer_certifications')
      .insert([certification]);

    if (error) throw error;
  } catch (error) {
    console.error('Error adding certification:', error);
    throw error;
  }
};

export const deleteCertification = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('trainer_certifications')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting certification:', error);
    throw error;
  }
};

export const addAvailability = async (availability: Omit<TrainerAvailability, 'id'>): Promise<void> => {
  try {
    const { error } = await supabase
      .from('trainer_availability')
      .insert([availability]);

    if (error) throw error;
  } catch (error) {
    console.error('Error adding availability:', error);
    throw error;
  }
};

export const deleteAvailability = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('trainer_availability')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting availability:', error);
    throw error;
  }
};
