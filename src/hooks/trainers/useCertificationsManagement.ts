
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StaffCertification } from './types';

export const useCertificationsManagement = () => {
  const { toast } = useToast();
  
  const addCertification = async (certification: Omit<StaffCertification, 'id'>) => {
    try {
      // Map staff_id to trainer_id if using trainer_certifications table
      const certificationData = {
        trainer_id: certification.staff_id,
        certification_name: certification.certification_name,
        issuing_organization: certification.issuing_organization,
        issue_date: certification.issue_date,
        expiry_date: certification.expiry_date
      };
      
      const { data, error } = await supabase
        .from('trainer_certifications')
        .insert(certificationData)
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

  return {
    addCertification,
    deleteCertification
  };
};
