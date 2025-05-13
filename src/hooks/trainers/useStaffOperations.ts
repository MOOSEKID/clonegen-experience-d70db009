
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StaffProfile } from './types';
import { adaptStaffToTrainer } from './adapters';

export const useStaffOperations = () => {
  const { toast } = useToast();
  
  const addStaffMember = async (staffMember: Omit<StaffProfile, 'id' | 'certifications' | 'availability'>) => {
    try {
      // Use trainer_profiles table for now since staff table might not exist yet
      // Convert from StaffProfile to trainer fields for backward compatibility
      const trainerData = adaptStaffToTrainer(staffMember);
      
      const { data, error } = await supabase
        .from('trainer_profiles')
        .insert({
          name: trainerData.name,
          email: trainerData.email,
          phone: trainerData.phone || null,
          bio: trainerData.bio || null,
          profilepicture: trainerData.profilepicture || null,
          specialization: trainerData.specialization || [],
          status: trainerData.status || 'Active',
          hiredate: trainerData.hiredate || new Date().toISOString().split('T')[0],
          experience_years: trainerData.experience_years || 0,
          experience_level: trainerData.experience_level || 'Beginner'
        })
        .select();
        
      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }
      
      toast({
        title: "Staff member added",
        description: `${trainerData.name} has been added successfully.`
      });
      
      return data?.[0];
    } catch (err) {
      console.error('Error adding staff member:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add staff member. Please try again."
      });
      throw err;
    }
  };
  
  const updateStaffMember = async (id: string, updates: Partial<Omit<StaffProfile, 'id' | 'certifications' | 'availability'>>) => {
    try {
      // Convert from StaffProfile to trainer fields for backward compatibility
      const trainerUpdates = adaptStaffToTrainer(updates as any);
      
      // Convert profile_picture to profilepicture and hire_date to hiredate for DB fields
      const dbUpdates: Record<string, any> = {};
      
      Object.entries(trainerUpdates).forEach(([key, value]) => {
        if (key === 'profilepicture' && value !== undefined) {
          dbUpdates['profilepicture'] = value;
        } else if (key === 'hiredate' && value !== undefined) {
          dbUpdates['hiredate'] = value;
        } else if (key === 'name' && value !== undefined) {
          dbUpdates['name'] = value;
        } else if (key === 'specialization' && value !== undefined) {
          dbUpdates['specialization'] = value;
        } else if (value !== undefined) {
          dbUpdates[key] = value;
        }
      });
      
      const { error } = await supabase
        .from('trainer_profiles')
        .update(dbUpdates)
        .eq('id', id);
        
      if (error) {
        console.error("Supabase update error:", error);
        throw error;
      }
      
      toast({
        title: "Staff updated",
        description: "Staff profile has been updated successfully."
      });
      
      return true;
    } catch (err) {
      console.error('Error updating staff member:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update staff member. Please try again."
      });
      throw err;
    }
  };
  
  const deleteStaffMember = async (id: string) => {
    try {
      const { error } = await supabase
        .from('trainer_profiles')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Staff deleted",
        description: "Staff member has been removed successfully."
      });
      
      return true;
    } catch (err) {
      console.error('Error deleting staff member:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete staff member. Please try again."
      });
      throw err;
    }
  };

  // Certificate management
  const addCertification = async (data: any) => {
    try {
      const { error } = await supabase
        .from('trainer_certifications')
        .insert({
          trainer_id: data.staff_id,
          certification_name: data.certification_name,
          issuing_organization: data.issuing_organization || null,
          issue_date: data.issue_date || null,
          expiry_date: data.expiry_date || null,
          certification_file: data.certification_file || null,
          verified: data.verified || false
        });
        
      if (error) throw error;
      
      toast({
        title: "Certification added",
        description: "Certification has been added successfully."
      });
      
      return true;
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
        title: "Certification removed",
        description: "Certification has been removed successfully."
      });
      
      return true;
    } catch (err) {
      console.error('Error removing certification:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove certification. Please try again."
      });
      throw err;
    }
  };

  const addAvailability = async (data: any) => {
    try {
      const { error } = await supabase
        .from('trainer_availability')
        .insert({
          trainer_id: data.staff_id,
          day_of_week: data.day_of_week,
          start_time: data.start_time,
          end_time: data.end_time
        });
        
      if (error) throw error;
      
      toast({
        title: "Availability added",
        description: "Availability has been added successfully."
      });
      
      return true;
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
        title: "Availability removed",
        description: "Availability has been removed successfully."
      });
      
      return true;
    } catch (err) {
      console.error('Error removing availability:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove availability. Please try again."
      });
      throw err;
    }
  };

  return {
    addStaffMember,
    updateStaffMember,
    deleteStaffMember,
    addCertification,
    deleteCertification,
    addAvailability,
    deleteAvailability
  };
};

// For backward compatibility
export const useTrainerOperations = useStaffOperations;
