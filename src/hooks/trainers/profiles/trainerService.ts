
import { supabase } from '@/integrations/supabase/client';
import { TrainerProfile, TrainerCertification, TrainerAvailability } from './types';
import { getMockTrainers } from './mockData';

export const fetchTrainers = async (): Promise<TrainerProfile[]> => {
  try {
    const { data: trainersData, error: trainersError } = await supabase
      .from('trainers')
      .select('*')
      .order('name');
      
    if (trainersError) throw trainersError;
    
    if (trainersData) {
      const processedTrainers = await Promise.all(
        trainersData.map(async (trainer) => {
          const { data: certifications, error: certError } = await supabase
            .from('trainer_certifications')
            .select('*')
            .eq('trainer_id', trainer.id);
            
          if (certError) console.error('Error fetching certifications:', certError);
          
          const { data: availability, error: availError } = await supabase
            .from('trainer_availability')
            .select('*')
            .eq('trainer_id', trainer.id);
            
          if (availError) console.error('Error fetching availability:', availError);
          
          const profile_picture = trainer.profile_picture || trainer.profilepicture || null;
          const hire_date = trainer.hire_date || trainer.hiredate || new Date().toISOString().split('T')[0];
            
          return {
            ...trainer,
            profile_picture,
            hire_date,
            certifications: certifications || [],
            availability: availability || [],
            experience_years: trainer.experience_years || null,
            experience_level: trainer.experience_level || null
          } as TrainerProfile;
        })
      );
      
      return processedTrainers;
    } else {
      return getMockTrainers();
    }
  } catch (err) {
    console.error('Error fetching trainers:', err);
    return getMockTrainers();
  }
};

export const addTrainer = async (trainer: Omit<TrainerProfile, 'id' | 'certifications' | 'availability'>) => {
  try {
    const { data, error } = await supabase
      .from('trainers')
      .insert({
        name: trainer.name,
        email: trainer.email,
        phone: trainer.phone || null,
        bio: trainer.bio || null,
        profile_picture: trainer.profile_picture || null,
        specialization: trainer.specialization || [],
        status: trainer.status || 'Active',
        hire_date: trainer.hire_date || new Date().toISOString().split('T')[0],
        experience_years: trainer.experience_years || null,
        experience_level: trainer.experience_level || null
      })
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (err) {
    console.error('Error adding trainer:', err);
    throw err;
  }
};

export const updateTrainer = async (id: string, updates: Partial<Omit<TrainerProfile, 'id' | 'certifications' | 'availability'>>) => {
  try {
    const { error } = await supabase
      .from('trainers')
      .update(updates)
      .eq('id', id);
      
    if (error) throw error;
    
    return true;
  } catch (err) {
    console.error('Error updating trainer:', err);
    throw err;
  }
};

export const deleteTrainer = async (id: string) => {
  try {
    const { error } = await supabase
      .from('trainers')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return true;
  } catch (err) {
    console.error('Error deleting trainer:', err);
    throw err;
  }
};

export const addCertification = async (certification: Omit<TrainerCertification, 'id'>) => {
  try {
    const { data, error } = await supabase
      .from('trainer_certifications')
      .insert(certification)
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (err) {
    console.error('Error adding certification:', err);
    throw err;
  }
};

export const deleteCertification = async (id: string) => {
  try {
    const { error } = await supabase
      .from('trainer_certifications')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return true;
  } catch (err) {
    console.error('Error deleting certification:', err);
    throw err;
  }
};

export const addAvailability = async (availability: Omit<TrainerAvailability, 'id'>) => {
  try {
    const { data, error } = await supabase
      .from('trainer_availability')
      .insert(availability)
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (err) {
    console.error('Error adding availability:', err);
    throw err;
  }
};

export const deleteAvailability = async (id: string) => {
  try {
    const { error } = await supabase
      .from('trainer_availability')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return true;
  } catch (err) {
    console.error('Error deleting availability:', err);
    throw err;
  }
};
