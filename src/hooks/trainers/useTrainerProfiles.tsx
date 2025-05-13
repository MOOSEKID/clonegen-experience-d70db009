
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StaffProfile } from './types';
import { adaptTrainerToStaff } from './adapters';

export const useTrainerProfiles = () => {
  const [trainers, setTrainers] = useState<StaffProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch trainers data from Supabase
  useEffect(() => {
    const fetchTrainers = async () => {
      setIsLoading(true);
      
      try {
        // Fetch trainers from the trainers table
        const { data: trainersData, error: trainersError } = await supabase
          .from('trainers')
          .select('*')
          .order('name');
          
        if (trainersError) throw trainersError;
        
        if (trainersData && trainersData.length > 0) {
          // Fetch certifications for all trainers
          const { data: certsData, error: certsError } = await supabase
            .from('trainer_certifications')
            .select('*');
            
          if (certsError) throw certsError;
          
          // Fetch availability for all trainers
          const { data: availData, error: availError } = await supabase
            .from('trainer_availability')
            .select('*');
            
          if (availError) throw availError;
          
          // Process and map the data to StaffProfile format
          const processedTrainers = trainersData.map(trainer => {
            const trainerProfile = adaptTrainerToStaff(trainer);
            
            // Add certifications to this trainer
            if (certsData) {
              trainerProfile.certifications = certsData.filter(cert => 
                cert.trainer_id === trainer.id
              );
            }
            
            // Add availability to this trainer
            if (availData) {
              trainerProfile.availability = availData.filter(avail => 
                avail.trainer_id === trainer.id
              );
            }
            
            return trainerProfile;
          });
          
          setTrainers(processedTrainers);
        } else {
          setTrainers([]);
        }
      } catch (err) {
        console.error('Error fetching trainers:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch trainers'));
        setTrainers([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTrainers();
    
    // Set up real-time subscriptions for updates
    const trainerSubscription = supabase
      .channel('public:trainers')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'trainers'
      }, () => {
        fetchTrainers();
      })
      .subscribe();
      
    const certSubscription = supabase
      .channel('public:trainer_certifications')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'trainer_certifications'
      }, () => {
        fetchTrainers();
      })
      .subscribe();
      
    const availSubscription = supabase
      .channel('public:trainer_availability')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'trainer_availability'
      }, () => {
        fetchTrainers();
      })
      .subscribe();
      
    return () => {
      trainerSubscription.unsubscribe();
      certSubscription.unsubscribe();
      availSubscription.unsubscribe();
    };
  }, []);

  // Add/update trainer
  const addTrainer = async (trainerData: Omit<StaffProfile, 'id' | 'certifications' | 'availability'>) => {
    try {
      const { name, email, phone, bio, photo_url, status, specialties, hire_date, experience_years, experience_level } = {
        name: trainerData.full_name,
        email: trainerData.email,
        phone: trainerData.phone,
        bio: trainerData.bio,
        photo_url: trainerData.photo_url,
        status: trainerData.status,
        specialties: trainerData.specialties,
        hire_date: trainerData.hire_date,
        experience_years: trainerData.experience_years,
        experience_level: trainerData.experience_level
      };

      const { data, error } = await supabase
        .from('trainers')
        .insert({
          name,
          email,
          phone: phone || null,
          bio: bio || null,
          profilepicture: photo_url || null,
          specialization: specialties || [],
          status: status || 'Active',
          hiredate: hire_date || new Date().toISOString().split('T')[0],
          experience_years: experience_years || 0,
          experience_level: experience_level || 'Beginner'
        })
        .select();
        
      if (error) throw error;
      
      return data?.[0];
    } catch (error) {
      console.error('Error adding trainer:', error);
      throw error;
    }
  };

  // Update trainer
  const updateTrainer = async (id: string, updates: Partial<StaffProfile>) => {
    try {
      const dbUpdates: Record<string, any> = {};
      
      if (updates.full_name !== undefined) dbUpdates.name = updates.full_name;
      if (updates.email !== undefined) dbUpdates.email = updates.email;
      if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
      if (updates.bio !== undefined) dbUpdates.bio = updates.bio;
      if (updates.photo_url !== undefined) dbUpdates.profilepicture = updates.photo_url;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.specialties !== undefined) dbUpdates.specialization = updates.specialties;
      if (updates.hire_date !== undefined) dbUpdates.hiredate = updates.hire_date;
      if (updates.experience_years !== undefined) dbUpdates.experience_years = updates.experience_years;
      if (updates.experience_level !== undefined) dbUpdates.experience_level = updates.experience_level;
      
      const { error } = await supabase
        .from('trainers')
        .update(dbUpdates)
        .eq('id', id);
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error updating trainer:', error);
      throw error;
    }
  };

  // Delete trainer
  const deleteTrainer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('trainers')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error deleting trainer:', error);
      throw error;
    }
  };

  // Add certification
  const addCertification = async (certData: any) => {
    try {
      const { error } = await supabase
        .from('trainer_certifications')
        .insert({
          trainer_id: certData.staff_id,
          certification_name: certData.certification_name,
          issuing_organization: certData.issuing_organization,
          issue_date: certData.issue_date || null,
          expiry_date: certData.expiry_date || null
        });
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error adding certification:', error);
      throw error;
    }
  };

  // Delete certification
  const deleteCertification = async (id: string) => {
    try {
      const { error } = await supabase
        .from('trainer_certifications')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error deleting certification:', error);
      throw error;
    }
  };

  // Add availability
  const addAvailability = async (availData: any) => {
    try {
      const { error } = await supabase
        .from('trainer_availability')
        .insert({
          trainer_id: availData.staff_id,
          day_of_week: availData.day_of_week,
          start_time: availData.start_time,
          end_time: availData.end_time
        });
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error adding availability:', error);
      throw error;
    }
  };

  // Delete availability
  const deleteAvailability = async (id: string) => {
    try {
      const { error } = await supabase
        .from('trainer_availability')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error deleting availability:', error);
      throw error;
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
    deleteAvailability,
  };
};
