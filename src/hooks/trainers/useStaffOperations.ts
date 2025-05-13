
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StaffProfile } from './types';

export const useStaffOperations = () => {
  const { toast } = useToast();
  
  const addStaffMember = async (staffMember: Omit<StaffProfile, 'id' | 'certifications' | 'availability'>) => {
    try {
      // Use trainers table for now since staff table might not exist yet
      const { data, error } = await supabase
        .from('trainers')
        .insert({
          name: staffMember.name,
          email: staffMember.email,
          phone: staffMember.phone || null,
          bio: staffMember.bio || null,
          profilepicture: staffMember.profile_picture || null,
          specialization: staffMember.specialization || [],
          status: staffMember.status || 'Active',
          hiredate: staffMember.hire_date || new Date().toISOString().split('T')[0],
          experience_years: staffMember.experience_years || null,
          experience_level: staffMember.experience_level || null
        })
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Staff member added",
        description: `${staffMember.name} has been added successfully.`
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

  return {
    addStaffMember,
    updateStaffMember,
    deleteStaffMember
  };
};

// For backward compatibility
export const useTrainerOperations = useStaffOperations;
