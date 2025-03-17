import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface TrainerProfile {
  id: string;
  email: string;
  full_name: string;
  staff_category: string;
  role: string;
  is_admin: boolean;
  is_staff: boolean;
  access_level: string;
  status: string;
  created_at: string;
  updated_at: string;
  last_login: string;
  department: string | null;
  specializations: string[] | null;
  reporting_to: string | null;
  shift_preference: string | null;
  max_clients: number | null;
  certifications: string[] | null;
  primary_location: string | null;
  secondary_locations: string[] | null;
  working_hours: {
    start: string;
    end: string;
    days: string[];
  } | null;
  contact_email: string | null;
  contact_phone: string | null;
  emergency_contact: {
    name: string;
    phone: string;
    relationship: string;
  } | null;
  availability: {
    id: string;
    trainer_id: string;
    day_of_week: string;
    start_time: string;
    end_time: string;
  }[];
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
          .from('profiles')
          .select('*, availability(*)')
          .eq('staff_category', 'training')
          .not('role', 'eq', 'trainee');
          
        if (trainersError) throw trainersError;
        
        if (trainersData) {
          const processedTrainers = trainersData.map((trainer: any) => ({
            id: trainer.id,
            email: trainer.email,
            full_name: trainer.full_name,
            staff_category: trainer.staff_category,
            role: trainer.role,
            is_admin: trainer.is_admin,
            is_staff: true,
            access_level: trainer.access_level,
            status: trainer.status,
            created_at: trainer.created_at,
            updated_at: trainer.updated_at,
            last_login: trainer.last_login,
            department: trainer.department,
            specializations: trainer.specializations,
            reporting_to: trainer.reporting_to,
            shift_preference: trainer.shift_preference,
            max_clients: trainer.max_clients,
            certifications: trainer.certifications,
            primary_location: trainer.primary_location,
            secondary_locations: trainer.secondary_locations,
            working_hours: trainer.working_hours,
            contact_email: trainer.contact_email,
            contact_phone: trainer.contact_phone,
            emergency_contact: trainer.emergency_contact,
            availability: trainer.availability || []
          })) as TrainerProfile[];
          
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
      .channel('public:profiles')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'profiles'
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
        .from('profiles')
        .insert({
          email: trainer.email,
          full_name: trainer.full_name,
          staff_category: trainer.staff_category,
          role: trainer.role,
          is_admin: trainer.is_admin,
          access_level: trainer.access_level,
          status: trainer.status,
          department: trainer.department || null,
          specializations: trainer.specializations || null,
          reporting_to: trainer.reporting_to || null,
          shift_preference: trainer.shift_preference || null,
          max_clients: trainer.max_clients || null,
          certifications: trainer.certifications || null,
          primary_location: trainer.primary_location || null,
          secondary_locations: trainer.secondary_locations || null,
          working_hours: trainer.working_hours || null,
          contact_email: trainer.contact_email || null,
          contact_phone: trainer.contact_phone || null,
          emergency_contact: trainer.emergency_contact || null,
        })
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Trainer added",
        description: `${trainer.full_name} has been added successfully.`
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
        .from('profiles')
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
        .from('profiles')
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
      email: "john.doe@uptowngym.com",
      full_name: "John Doe",
      staff_category: "training",
      role: "trainer",
      is_admin: false,
      is_staff: true,
      access_level: "staff",
      status: "active",
      created_at: "2022-01-15T14:30:00.000Z",
      updated_at: "2022-01-15T14:30:00.000Z",
      last_login: "2022-01-15T14:30:00.000Z",
      department: "Training",
      specializations: ["Strength Training", "Weight Loss"],
      reporting_to: "Jane Smith",
      shift_preference: "morning",
      max_clients: 10,
      certifications: ["NASM Certified Personal Trainer", "First Aid & CPR"],
      primary_location: "Uptown Gym",
      secondary_locations: ["Downtown Gym", "Suburban Gym"],
      working_hours: {
        start: "09:00",
        end: "17:00",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      },
      contact_email: "john.doe@uptowngym.com",
      contact_phone: "+1234567890",
      emergency_contact: {
        name: "Jane Doe",
        phone: "+1987654321",
        relationship: "spouse"
      },
      availability: []
    },
    {
      id: "2",
      email: "jane.smith@uptowngym.com",
      full_name: "Jane Smith",
      staff_category: "training",
      role: "trainer",
      is_admin: false,
      is_staff: true,
      access_level: "staff",
      status: "active",
      created_at: "2022-03-10T14:30:00.000Z",
      updated_at: "2022-03-10T14:30:00.000Z",
      last_login: "2022-03-10T14:30:00.000Z",
      department: "Training",
      specializations: ["Yoga", "Pilates", "Meditation"],
      reporting_to: "John Doe",
      shift_preference: "afternoon",
      max_clients: 15,
      certifications: ["RYT 200-Hour Yoga Teacher"],
      primary_location: "Uptown Gym",
      secondary_locations: ["Downtown Gym"],
      working_hours: {
        start: "08:00",
        end: "14:00",
        days: ["Tuesday", "Thursday", "Saturday"]
      },
      contact_email: "jane.smith@uptowngym.com",
      contact_phone: "+1122334455",
      emergency_contact: {
        name: "John Smith",
        phone: "+1234567890",
        relationship: "spouse"
      },
      availability: []
    },
    {
      id: "3",
      email: "mike.johnson@uptowngym.com",
      full_name: "Mike Johnson",
      staff_category: "training",
      role: "trainer",
      is_admin: false,
      is_staff: true,
      access_level: "staff",
      status: "active",
      created_at: "2022-06-01T14:30:00.000Z",
      updated_at: "2022-06-01T14:30:00.000Z",
      last_login: "2022-06-01T14:30:00.000Z",
      department: "Training",
      specializations: ["Sports Performance", "HIIT", "Functional Training"],
      reporting_to: "Jane Smith",
      shift_preference: "evening",
      max_clients: 12,
      certifications: ["CSCS"],
      primary_location: "Uptown Gym",
      secondary_locations: ["Suburban Gym"],
      working_hours: {
        start: "14:00",
        end: "21:00",
        days: ["Monday", "Wednesday", "Friday", "Sunday"]
      },
      contact_email: "mike.johnson@uptowngym.com",
      contact_phone: "+1987654321",
      emergency_contact: {
        name: "Emily Johnson",
        phone: "+1122334455",
        relationship: "spouse"
      },
      availability: []
    }
  ];
  
  return mockTrainers;
};
