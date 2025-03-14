
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  specialization?: string[];
  profilepicture?: string;
  status: string;
  hiredate?: string;
  schedule?: any;
}

export const useSupabaseTrainerData = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Function to load trainers from Supabase
  const loadTrainers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('trainers')
        .select('*')
        .order('name');
        
      if (error) {
        throw error;
      }
      
      if (!data) {
        console.log('No trainer data returned');
        setTrainers([]);
        return;
      }
      
      setTrainers(data);
      console.log(`Loaded ${data.length} trainers from Supabase`);
    } catch (error) {
      console.error('Error loading trainers:', error);
      setError(error instanceof Error ? error : new Error('Failed to load trainers'));
      toast.error('Failed to load trainers: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  // Load trainers and set up real-time subscription
  useEffect(() => {
    loadTrainers();
    
    // Subscribe to changes in trainers table
    const channel = supabase
      .channel('trainers-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'trainers' }, 
        (payload) => {
          console.log('Trainers table change detected:', payload);
          loadTrainers();
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
        setIsSubscribed(status === 'SUBSCRIBED');
      });
    
    return () => {
      console.log('Cleaning up trainers subscription');
      supabase.removeChannel(channel);
    };
  }, []);

  // Function to add a trainer
  const addTrainer = async (trainer: Omit<Trainer, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('trainers')
        .insert(trainer)
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      toast.success(`Trainer ${trainer.name} added successfully`);
      return data;
    } catch (error) {
      console.error('Error adding trainer:', error);
      toast.error('Failed to add trainer: ' + (error instanceof Error ? error.message : 'Unknown error'));
      throw error;
    }
  };

  // Function to update a trainer
  const updateTrainer = async (id: string, updates: Partial<Trainer>) => {
    try {
      const { data, error } = await supabase
        .from('trainers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      toast.success(`Trainer ${updates.name || 'profile'} updated successfully`);
      return data;
    } catch (error) {
      console.error('Error updating trainer:', error);
      toast.error('Failed to update trainer: ' + (error instanceof Error ? error.message : 'Unknown error'));
      throw error;
    }
  };

  // Function to delete a trainer
  const deleteTrainer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('trainers')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      toast.success('Trainer deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting trainer:', error);
      toast.error('Failed to delete trainer: ' + (error instanceof Error ? error.message : 'Unknown error'));
      return false;
    }
  };

  return {
    trainers,
    isLoading,
    error,
    isSubscribed,
    addTrainer,
    updateTrainer,
    deleteTrainer,
    refreshTrainers: loadTrainers
  };
};
