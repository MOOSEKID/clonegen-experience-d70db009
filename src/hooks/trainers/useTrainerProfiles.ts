
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TrainerProfile, TrainerCertification, TrainerAvailability } from './profiles/types';
import { 
  fetchTrainers, 
  addTrainer, 
  updateTrainer, 
  deleteTrainer,
  addCertification,
  deleteCertification,
  addAvailability,
  deleteAvailability
} from './profiles/trainerService';

// Re-export the types
export { TrainerProfile, TrainerCertification, TrainerAvailability };

export const useTrainerProfiles = () => {
  const [trainers, setTrainers] = useState<TrainerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadTrainers = async () => {
      setIsLoading(true);
      
      try {
        const trainersData = await fetchTrainers();
        setTrainers(trainersData);
      } catch (err) {
        console.error('Error in useTrainerProfiles:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch trainers'));
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTrainers();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('public:trainers')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'trainers'
      }, () => {
        loadTrainers();
      })
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const handleAddTrainer = async (trainer: Omit<TrainerProfile, 'id' | 'certifications' | 'availability'>) => {
    try {
      const newTrainer = await addTrainer(trainer);
      
      toast({
        title: "Trainer added",
        description: `${trainer.name} has been added successfully.`
      });
      
      return newTrainer;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add trainer. Please try again."
      });
      throw err;
    }
  };
  
  const handleUpdateTrainer = async (id: string, updates: Partial<Omit<TrainerProfile, 'id' | 'certifications' | 'availability'>>) => {
    try {
      await updateTrainer(id, updates);
      
      toast({
        title: "Trainer updated",
        description: "Trainer profile has been updated successfully."
      });
      
      return true;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update trainer. Please try again."
      });
      throw err;
    }
  };
  
  const handleDeleteTrainer = async (id: string) => {
    try {
      await deleteTrainer(id);
      
      toast({
        title: "Trainer deleted",
        description: "Trainer has been removed successfully."
      });
      
      return true;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete trainer. Please try again."
      });
      throw err;
    }
  };
  
  const handleAddCertification = async (certification: Omit<TrainerCertification, 'id'>) => {
    try {
      const newCertification = await addCertification(certification);
      
      toast({
        title: "Certification added",
        description: "Certification has been added successfully."
      });
      
      return newCertification;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add certification. Please try again."
      });
      throw err;
    }
  };
  
  const handleDeleteCertification = async (id: string) => {
    try {
      await deleteCertification(id);
      
      toast({
        title: "Certification deleted",
        description: "Certification has been removed successfully."
      });
      
      return true;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete certification. Please try again."
      });
      throw err;
    }
  };
  
  const handleAddAvailability = async (availability: Omit<TrainerAvailability, 'id'>) => {
    try {
      const newAvailability = await addAvailability(availability);
      
      toast({
        title: "Availability added",
        description: "Availability has been added successfully."
      });
      
      return newAvailability;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add availability. Please try again."
      });
      throw err;
    }
  };
  
  const handleDeleteAvailability = async (id: string) => {
    try {
      await deleteAvailability(id);
      
      toast({
        title: "Availability deleted",
        description: "Availability has been removed successfully."
      });
      
      return true;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete availability. Please try again."
      });
      throw err;
    }
  };
  
  return {
    trainers,
    isLoading,
    error,
    addTrainer: handleAddTrainer,
    updateTrainer: handleUpdateTrainer,
    deleteTrainer: handleDeleteTrainer,
    addCertification: handleAddCertification,
    deleteCertification: handleDeleteCertification,
    addAvailability: handleAddAvailability,
    deleteAvailability: handleDeleteAvailability
  };
};
