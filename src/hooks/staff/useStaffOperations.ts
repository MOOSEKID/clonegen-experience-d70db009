
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StaffProfile, StaffCertification, StaffAvailability } from '../trainers/types';

export const useStaffOperations = () => {
  const { toast } = useToast();
  
  const addStaffMember = async (staffMember: Omit<StaffProfile, 'id' | 'certifications' | 'availability'>) => {
    try {
      const { data, error } = await supabase
        .from('staff')
        .insert({
          full_name: staffMember.full_name,
          email: staffMember.email,
          phone: staffMember.phone || null,
          role: staffMember.role,
          photo_url: staffMember.photo_url || null,
          access_level: staffMember.access_level || 'staff',
          status: staffMember.status || 'Active',
          specialties: staffMember.specialties || [],
          bio: staffMember.bio || null,
          hire_date: staffMember.hire_date || new Date().toISOString().split('T')[0]
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
      const { error } = await supabase
        .from('staff')
        .update(updates)
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
        .from('staff')
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
  const addCertification = async (certification: Omit<StaffCertification, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('staff_certifications')
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
        .from('staff_certifications')
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

  // Availability management
  const addAvailability = async (availability: Omit<StaffAvailability, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('staff_availability')
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
        .from('staff_availability')
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
    addStaffMember,
    updateStaffMember,
    deleteStaffMember,
    addCertification,
    deleteCertification,
    addAvailability,
    deleteAvailability
  };
};
