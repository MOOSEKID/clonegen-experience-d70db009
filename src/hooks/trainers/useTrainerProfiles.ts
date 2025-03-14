import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface TrainerProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  profile_picture?: string;
  specialization: string[];
  status?: string;
  hire_date?: string;
  experience_years?: number;
  experience_level?: string;
  stripe_account_id?: string;
  certifications: TrainerCertification[];
  availability: TrainerAvailability[];
}

export interface TrainerCertification {
  id: string;
  trainer_id: string;
  certification_name: string;
  issuing_organization: string;
  issue_date?: string;
  expiry_date?: string;
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
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchTrainers = async () => {
      setIsLoading(true);
      
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
          
          setTrainers(processedTrainers);
        } else {
          setTrainers(getMockTrainers());
        }
      } catch (err) {
        console.error('Error fetching trainers:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch trainers'));
        
        setTrainers(getMockTrainers());
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTrainers();
    
    const subscription = supabase
      .channel('public:trainers')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'trainers'
      }, () => {
        fetchTrainers();
      })
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const addTrainer = async (trainer: Omit<TrainerProfile, 'id' | 'certifications' | 'availability'>) => {
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
      const { error } = await supabase
        .from('trainers')
        .update(updates)
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
  
  const addCertification = async (certification: Omit<TrainerCertification, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('trainer_certifications')
        .insert(certification)
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Certification added",
        description: "Certification has been added successfully."
      });
      
      return data;
    } catch (err) {
      console.error('Error adding certification:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add certification. Please try again."
      });
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
      
      toast({
        title: "Certification deleted",
        description: "Certification has been removed successfully."
      });
      
      return true;
    } catch (err) {
      console.error('Error deleting certification:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete certification. Please try again."
      });
      throw err;
    }
  };
  
  const addAvailability = async (availability: Omit<TrainerAvailability, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('trainer_availability')
        .insert(availability)
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Availability added",
        description: "Availability has been added successfully."
      });
      
      return data;
    } catch (err) {
      console.error('Error adding availability:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add availability. Please try again."
      });
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
      
      toast({
        title: "Availability deleted",
        description: "Availability has been removed successfully."
      });
      
      return true;
    } catch (err) {
      console.error('Error deleting availability:', err);
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
    addTrainer,
    updateTrainer,
    deleteTrainer,
    addCertification,
    deleteCertification,
    addAvailability,
    deleteAvailability
  };
};

const getMockTrainers = (): TrainerProfile[] => {
  const mockTrainers = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@uptowngym.com",
      phone: "+1234567890",
      bio: "Certified personal trainer with 5+ years of experience in strength training and weight loss.",
      specialization: ["Strength Training", "Weight Loss"],
      status: "Active",
      hire_date: "2022-01-15",
      profile_picture: null,
      experience_years: 5,
      experience_level: "Intermediate",
      certifications: [
        {
          id: "cert1",
          trainer_id: "1",
          certification_name: "NASM Certified Personal Trainer",
          issuing_organization: "National Academy of Sports Medicine",
          issue_date: "2020-05-20",
          expiry_date: "2024-05-20"
        },
        {
          id: "cert2",
          trainer_id: "1",
          certification_name: "First Aid & CPR",
          issuing_organization: "Red Cross",
          issue_date: "2023-01-10",
          expiry_date: "2025-01-10"
        }
      ],
      availability: [
        {
          id: "avail1",
          trainer_id: "1",
          day_of_week: "Monday",
          start_time: "09:00",
          end_time: "17:00"
        },
        {
          id: "avail2",
          trainer_id: "1",
          day_of_week: "Wednesday",
          start_time: "09:00",
          end_time: "17:00"
        },
        {
          id: "avail3",
          trainer_id: "1",
          day_of_week: "Friday",
          start_time: "09:00",
          end_time: "17:00"
        }
      ]
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@uptowngym.com",
      phone: "+1987654321",
      bio: "Yoga instructor and mindfulness coach with expertise in Hatha and Vinyasa styles.",
      specialization: ["Yoga", "Pilates", "Meditation"],
      status: "Active",
      hire_date: "2022-03-10",
      profile_picture: null,
      experience_years: 8,
      experience_level: "Advanced",
      certifications: [
        {
          id: "cert3",
          trainer_id: "2",
          certification_name: "RYT 200-Hour Yoga Teacher",
          issuing_organization: "Yoga Alliance",
          issue_date: "2019-11-15",
          expiry_date: null
        }
      ],
      availability: [
        {
          id: "avail4",
          trainer_id: "2",
          day_of_week: "Tuesday",
          start_time: "08:00",
          end_time: "14:00"
        },
        {
          id: "avail5",
          trainer_id: "2",
          day_of_week: "Thursday",
          start_time: "08:00",
          end_time: "14:00"
        },
        {
          id: "avail6",
          trainer_id: "2",
          day_of_week: "Saturday",
          start_time: "10:00",
          end_time: "15:00"
        }
      ]
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@uptowngym.com",
      phone: "+1122334455",
      bio: "Former athlete specializing in sports-specific training and athletic performance.",
      specialization: ["Sports Performance", "HIIT", "Functional Training"],
      status: "Active",
      hire_date: "2022-06-01",
      profile_picture: null,
      experience_years: 3,
      experience_level: "Beginner",
      certifications: [
        {
          id: "cert4",
          trainer_id: "3",
          certification_name: "CSCS",
          issuing_organization: "NSCA",
          issue_date: "2021-02-28",
          expiry_date: "2025-02-28"
        }
      ],
      availability: [
        {
          id: "avail7",
          trainer_id: "3",
          day_of_week: "Monday",
          start_time: "14:00",
          end_time: "21:00"
        },
        {
          id: "avail8",
          trainer_id: "3",
          day_of_week: "Wednesday",
          start_time: "14:00",
          end_time: "21:00"
        },
        {
          id: "avail9",
          trainer_id: "3",
          day_of_week: "Friday",
          start_time: "14:00",
          end_time: "21:00"
        },
        {
          id: "avail10",
          trainer_id: "3",
          day_of_week: "Sunday",
          start_time: "10:00",
          end_time: "16:00"
        }
      ]
    }
  ];
  
  return mockTrainers;
};
