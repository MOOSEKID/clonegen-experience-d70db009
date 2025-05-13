import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StaffProfile } from './types';
import { adaptStaffToTrainer } from './adapters';

export const useStaffOperations = () => {
  const { toast } = useToast();
  
  const addStaffMember = async (staffMember: Omit<StaffProfile, 'id' | 'certifications' | 'availability'>) => {
    try {
      // Use trainers table for now since staff table might not exist yet
      // Convert from StaffProfile to trainer fields for backward compatibility
      const { data, error } = await supabase
        .from('trainers')
        .insert({
          name: staffMember.full_name,
          email: staffMember.email,
          phone: staffMember.phone || null,
          bio: staffMember.bio || null,
          profilepicture: staffMember.photo_url || null,
          specialization: staffMember.specialties || [],
          status: staffMember.status || 'Active',
          hiredate: staffMember.hire_date || new Date().toISOString().split('T')[0],
        })
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Staff member added",
        description: `${staffMember.full_name} has been added successfully.`
      });
      
      return data;
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
      // Convert profile_picture to profilepicture and hire_date to hiredate for DB fields
      const dbUpdates: Record<string, any> = {};
      
      Object.entries(updates).forEach(([key, value]) => {
        if (key === 'photo_url') {
          dbUpdates['profilepicture'] = value;
        } else if (key === 'hire_date') {
          dbUpdates['hiredate'] = value;
        } else if (key === 'full_name') {
          dbUpdates['name'] = value;
        } else if (key === 'specialties') {
          dbUpdates['specialization'] = value;
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
        .from('trainers')
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

  const addCertification = async (staffId: string, certification: string) => {
    try {
      const { error } = await supabase
        .from('trainers')
        .update({ certifications: supabase.functions.call('add_certification', [staffId, certification]) })
        .eq('id', staffId);
        
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

  const deleteCertification = async (staffId: string, certification: string) => {
    try {
      const { error } = await supabase
        .from('trainers')
        .update({ certifications: supabase.functions.call('remove_certification', [staffId, certification]) })
        .eq('id', staffId);
        
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

  const addAvailability = async (staffId: string, availability: string) => {
    try {
      const { error } = await supabase
        .from('trainers')
        .update({ availability: supabase.functions.call('add_availability', [staffId, availability]) })
        .eq('id', staffId);
        
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

  const deleteAvailability = async (staffId: string, availability: string) => {
    try {
      const { error } = await supabase
        .from('trainers')
        .update({ availability: supabase.functions.call('remove_availability', [staffId, availability]) })
        .eq('id', staffId);
        
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
