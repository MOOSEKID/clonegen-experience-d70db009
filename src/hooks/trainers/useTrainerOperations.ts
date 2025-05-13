
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TrainerProfile } from './types';

export const useTrainerOperations = () => {
  const { toast } = useToast();
  
  const addTrainer = async (trainer: Omit<TrainerProfile, 'id' | 'certifications' | 'availability'>) => {
    try {
      const { data, error } = await supabase
        .from('trainers')
        .insert({
          name: trainer.name,
          email: trainer.email,
          phone: trainer.phone || null,
          bio: trainer.bio || null,
          profilepicture: trainer.profile_picture || null,
          specialization: trainer.specialization || [],
          status: trainer.status || 'Active',
          hiredate: trainer.hire_date || new Date().toISOString().split('T')[0],
          experience_years: trainer.experience_years || null,
          experience_level: trainer.experience_level || null
        })
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Trainer added",
        description: `${trainer.name} has been added successfully.`
      });
      
      return data;
    } catch (err) {
      console.error('Error adding trainer:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add trainer. Please try again."
      });
      throw err;
    }
  };
  
  const updateTrainer = async (id: string, updates: Partial<Omit<TrainerProfile, 'id' | 'certifications' | 'availability'>>) => {
    try {
      // Convert profile_picture to profilepicture and hire_date to hiredate for DB fields
      const dbUpdates: Record<string, any> = {};
      
      Object.entries(updates).forEach(([key, value]) => {
        if (key === 'profile_picture') {
          dbUpdates['profilepicture'] = value;
        } else if (key === 'hire_date') {
          dbUpdates['hiredate'] = value;
        } else {
          dbUpdates[key] = value;
        }
      });
      
      const { error } = await supabase
        .from('trainers')
        .update(dbUpdates)
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Trainer updated",
        description: "Trainer profile has been updated successfully."
      });
      
      return true;
    } catch (err) {
      console.error('Error updating trainer:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update trainer. Please try again."
      });
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
      
      toast({
        title: "Trainer deleted",
        description: "Trainer has been removed successfully."
      });
      
      return true;
    } catch (err) {
      console.error('Error deleting trainer:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete trainer. Please try again."
      });
      throw err;
    }
  };

  return {
    addTrainer,
    updateTrainer,
    deleteTrainer
  };
};
