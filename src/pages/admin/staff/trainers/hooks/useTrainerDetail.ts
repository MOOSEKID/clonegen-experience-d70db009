
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StaffProfile, StaffCertification, StaffAvailability } from '@/hooks/trainers/types';
import { convertTrainerCertToStaffCert, convertTrainerAvailabilityToStaffAvailability } from '@/hooks/trainers/adapters';

export const useTrainerDetail = (id: string | undefined) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [trainer, setTrainer] = useState<StaffProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchTrainer = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Fetch trainer basic info
        const { data: trainerData, error: trainerError } = await supabase
          .from('trainer_profiles')
          .select('*')
          .eq('id', id)
          .single();
          
        if (trainerError) throw trainerError;
        
        // Fetch certifications
        const { data: certifications, error: certError } = await supabase
          .from('trainer_certifications')
          .select('*')
          .eq('trainer_id', id);
          
        if (certError) throw certError;
        
        // Fetch availability
        const { data: availability, error: availError } = await supabase
          .from('trainer_availability')
          .select('*')
          .eq('trainer_id', id);
          
        if (availError) throw availError;

        // Map trainer data to StaffProfile format
        const staffProfile: StaffProfile = {
          id: trainerData.id,
          full_name: trainerData.name || '',
          email: trainerData.email || '',
          phone: trainerData.phone || '',
          role: 'trainer',
          photo_url: trainerData.profilepicture || '',
          status: trainerData.status || 'Active',
          specialties: trainerData.specialization || [],
          bio: trainerData.bio || '',
          hire_date: trainerData.hiredate || '',
          // Default values for potentially missing experience fields
          experience_years: undefined,
          experience_level: undefined,
          // Convert certifications and availability to StaffProfile format
          certifications: (certifications || []).map(cert => ({
            ...convertTrainerCertToStaffCert(cert),
            staff_id: cert.trainer_id
          })) as StaffCertification[],
          availability: (availability || []).map(avail => ({
            ...convertTrainerAvailabilityToStaffAvailability(avail),
            staff_id: avail.trainer_id
          })) as StaffAvailability[]
        };
        
        // Check if trainerData has experience fields and add them if available
        if (trainerData && 'experience_years' in trainerData) {
          staffProfile.experience_years = typeof trainerData.experience_years === 'number' 
            ? Number(trainerData.experience_years) 
            : undefined;
        }
        
        if (trainerData && 'experience_level' in trainerData) {
          // Ensure experience_level is treated as a string or undefined
          staffProfile.experience_level = typeof trainerData.experience_level === 'string' 
            ? trainerData.experience_level 
            : undefined;
        }
        
        setTrainer(staffProfile);
      } catch (err) {
        console.error('Error fetching trainer details:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch trainer details'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTrainer();
  }, [id]);

  const handleSave = async (updatedTrainer: Partial<StaffProfile>) => {
    if (!trainer) return;
    
    try {
      // Update the trainer in Supabase
      const { error } = await supabase
        .from('trainer_profiles')
        .update({
          name: updatedTrainer.full_name,
          email: updatedTrainer.email,
          phone: updatedTrainer.phone,
          bio: updatedTrainer.bio,
          profilepicture: updatedTrainer.photo_url,
          specialization: updatedTrainer.specialties,
          status: updatedTrainer.status,
          experience_years: updatedTrainer.experience_years,
          experience_level: updatedTrainer.experience_level
        })
        .eq('id', trainer.id);
        
      if (error) throw error;
      
      // Update local state
      setTrainer(prev => prev ? { ...prev, ...updatedTrainer } : null);
      
      toast({
        title: "Success",
        description: "Trainer profile updated successfully."
      });
    } catch (err) {
      console.error('Error updating trainer:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update trainer. Please try again."
      });
    }
  };

  const handleDelete = async () => {
    if (!trainer) return;
    
    try {
      const { error } = await supabase
        .from('trainer_profiles')
        .delete()
        .eq('id', trainer.id);
        
      if (error) throw error;
      
      toast({
        title: "Trainer deleted",
        description: "Trainer has been removed successfully."
      });
      
      navigate('/admin/staff/trainers/profiles');
    } catch (err) {
      console.error('Error deleting trainer:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete trainer. Please try again."
      });
    }
  };

  return {
    trainer,
    isLoading,
    error,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleSave,
    handleDelete
  };
};
