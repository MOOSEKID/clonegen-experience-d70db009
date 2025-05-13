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
      const trainerData = adaptStaffToTrainer(staffMember);
      
      const { data, error } = await supabase
        .from('trainers')
        .insert({
          name: trainerData.name,
          email: trainerData.email,
          phone: trainerData.phone || null,
          bio: trainerData.bio || null,
          profilepicture: trainerData.profile_picture || null,
          specialization: trainerData.specialization || [],
          status: trainerData.status || 'Active',
          hiredate: trainerData.hire_date || new Date().toISOString().split('T')[0],
          experience_years: trainerData.experience_years || 0,
          experience_level: trainerData.experience_level || 'Beginner'
        })
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Staff member added",
        description: `${trainerData.name} has been added successfully.`
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
      // Convert from StaffProfile to trainer fields for backward compatibility
      const trainerUpdates = adaptStaffToTrainer(updates as any);
      
      // Convert profile_picture to profilepicture and hire_date to hiredate for DB fields
      const dbUpdates: Record<string, any> = {};
      
      Object.entries(trainerUpdates).forEach(([key, value]) => {
        if (key === 'profile_picture') {
          dbUpdates['profilepicture'] = value;
        } else if (key === 'hire_date') {
          dbUpdates['hiredate'] = value;
        } else if (key === 'name') {
          dbUpdates['name'] = value;
        } else if (key === 'specialization') {
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

  // Certificate management
  const addCertification = async (staffId: string, certification: string) => {
    try {
      // First, fetch the current certifications
      const { data: trainerData, error: fetchError } = await supabase
        .from('trainers')
        .select('certifications')
        .eq('id', staffId)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Update certifications array
      let currentCerts: string[] = [];
      
      // Safely handle the certifications value which might be null, a string, or an array
      if (trainerData?.certifications) {
        if (Array.isArray(trainerData.certifications)) {
          currentCerts = trainerData.certifications as string[];
        } else if (typeof trainerData.certifications === 'string') {
          try {
            // If it's a JSON string, try parsing it
            const parsed = JSON.parse(trainerData.certifications);
            if (Array.isArray(parsed)) {
              currentCerts = parsed;
            } else {
              // If parsing didn't result in an array, use a single item array
              currentCerts = [String(trainerData.certifications)];
            }
          } catch (e) {
            // If parsing fails, treat as a single string value
            currentCerts = [String(trainerData.certifications)];
          }
        } else {
          // Handle other cases by converting to string
          currentCerts = [String(trainerData.certifications)];
        }
      }
      
      const updatedCerts = [...currentCerts, certification];
      
      // Save the updated array
      const { error } = await supabase
        .from('trainers')
        .update({ certifications: updatedCerts })
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
      // First, fetch the current certifications
      const { data: trainerData, error: fetchError } = await supabase
        .from('trainers')
        .select('certifications')
        .eq('id', staffId)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Update certifications array by removing the certification
      let currentCerts: string[] = [];
      let updatedCerts: string[] = [];
      
      // Safely handle the certifications value
      if (trainerData?.certifications) {
        if (Array.isArray(trainerData.certifications)) {
          currentCerts = trainerData.certifications as string[];
          updatedCerts = currentCerts.filter((cert: string) => cert !== certification);
        } else if (typeof trainerData.certifications === 'string') {
          try {
            // Try parsing as JSON
            const parsed = JSON.parse(trainerData.certifications);
            if (Array.isArray(parsed)) {
              currentCerts = parsed;
              updatedCerts = currentCerts.filter(cert => cert !== certification);
            } else {
              // If parsing didn't yield an array, handle as single string
              const certString = String(trainerData.certifications);
              updatedCerts = certString === certification ? [] : [certString];
            }
          } catch (e) {
            // If parsing fails, treat as single string
            const certString = String(trainerData.certifications);
            updatedCerts = certString === certification ? [] : [certString];
          }
        } else {
          // Handle as single item
          const certString = String(trainerData.certifications);
          updatedCerts = certString === certification ? [] : [certString];
        }
      }
      
      // Save the updated array
      const { error } = await supabase
        .from('trainers')
        .update({ certifications: updatedCerts })
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
      // First, fetch the current availability
      const { data: trainerData, error: fetchError } = await supabase
        .from('trainers')
        .select('availability')
        .eq('id', staffId)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Update availability array
      const currentAvail = trainerData?.availability || [];
      const updatedAvail = [...currentAvail, availability];
      
      // Save the updated array
      const { error } = await supabase
        .from('trainers')
        .update({ availability: updatedAvail })
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
      // First, fetch the current availability
      const { data: trainerData, error: fetchError } = await supabase
        .from('trainers')
        .select('availability')
        .eq('id', staffId)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Update availability array by removing the item
      const currentAvail = trainerData?.availability || [];
      const updatedAvail = currentAvail.filter((avail: string) => avail !== availability);
      
      // Save the updated array
      const { error } = await supabase
        .from('trainers')
        .update({ availability: updatedAvail })
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
