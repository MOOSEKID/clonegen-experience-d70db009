
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface TrainerProfile {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  specialization?: string[] | null;
  bio?: string | null;
  profilepicture?: string | null;
  status?: string | null;
  hiredate?: string | null;
  certifications?: TrainerCertification[];
  availability?: TrainerAvailability[];
}

export interface TrainerCertification {
  id: string;
  trainer_id: string;
  certification_name: string;
  issuing_organization: string;
  issue_date?: string | null;
  expiry_date?: string | null;
}

export interface TrainerAvailability {
  id: string;
  trainer_id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

export const useTrainerProfiles = () => {
  const [trainers, setTrainers] = useState<TrainerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('trainers')
          .select('*')
          .order('name');
        
        if (error) throw error;
        
        // Fetch certifications for each trainer
        const trainersWithCertifications = await Promise.all(
          (data || []).map(async (trainer) => {
            const { data: certifications } = await supabase
              .from('trainer_certifications')
              .select('*')
              .eq('trainer_id', trainer.id)
              .order('certification_name');
            
            const { data: availability } = await supabase
              .from('trainer_availability')
              .select('*')
              .eq('trainer_id', trainer.id)
              .order('day_of_week');
            
            return {
              ...trainer,
              certifications: certifications || [],
              availability: availability || []
            };
          })
        );
        
        setTrainers(trainersWithCertifications);
      } catch (err) {
        console.error('Error fetching trainers:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch trainers'));
        toast.error('Failed to load trainers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrainers();

    // Set up real-time listener for trainer changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trainers'
        },
        () => {
          fetchTrainers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addTrainer = async (trainer: Omit<TrainerProfile, 'id' | 'certifications' | 'availability'>) => {
    try {
      const { data, error } = await supabase
        .from('trainers')
        .insert(trainer)
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success('Trainer added successfully');
      return data;
    } catch (err) {
      console.error('Error adding trainer:', err);
      toast.error('Failed to add trainer');
      throw err;
    }
  };

  const updateTrainer = async (id: string, updates: Partial<Omit<TrainerProfile, 'id' | 'certifications' | 'availability'>>) => {
    try {
      const { error } = await supabase
        .from('trainers')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Trainer updated successfully');
    } catch (err) {
      console.error('Error updating trainer:', err);
      toast.error('Failed to update trainer');
      throw err;
    }
  };

  const deleteTrainer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('trainers')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Trainer deleted successfully');
    } catch (err) {
      console.error('Error deleting trainer:', err);
      toast.error('Failed to delete trainer');
      throw err;
    }
  };

  const addCertification = async (certification: Omit<TrainerCertification, 'id'>) => {
    try {
      const { error } = await supabase
        .from('trainer_certifications')
        .insert(certification);
      
      if (error) throw error;
      
      toast.success('Certification added successfully');
    } catch (err) {
      console.error('Error adding certification:', err);
      toast.error('Failed to add certification');
      throw err;
    }
  };

  const deleteCertification = async (id: string) => {
    try {
      const { error } = await supabase
        .from('trainer_certifications')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Certification removed successfully');
    } catch (err) {
      console.error('Error deleting certification:', err);
      toast.error('Failed to remove certification');
      throw err;
    }
  };

  const addAvailability = async (availability: Omit<TrainerAvailability, 'id'>) => {
    try {
      const { error } = await supabase
        .from('trainer_availability')
        .insert(availability);
      
      if (error) throw error;
      
      toast.success('Availability added successfully');
    } catch (err) {
      console.error('Error adding availability:', err);
      toast.error('Failed to add availability');
      throw err;
    }
  };

  const deleteAvailability = async (id: string) => {
    try {
      const { error } = await supabase
        .from('trainer_availability')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Availability removed successfully');
    } catch (err) {
      console.error('Error deleting availability:', err);
      toast.error('Failed to remove availability');
      throw err;
    }
  };

  return {
    trainers,
    isLoading,
    error,
    addTrainer,
    updateTrainer,
    deleteTrainer,
    addCertification,
    deleteCertification,
    addAvailability,
    deleteAvailability
  };
};
