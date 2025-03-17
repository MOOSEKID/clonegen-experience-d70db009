
import { useToast } from '@/components/ui/use-toast';
import { TrainerCertification } from './types';
import { 
  addCertification,
  deleteCertification
} from './trainerService';

export const useCertificationActions = () => {
  const { toast } = useToast();
  
  const handleAddCertification = async (certification: Omit<TrainerCertification, 'id'>) => {
    try {
      const newCertification = await addCertification(certification);
      
      toast({
        title: "Certification added",
        description: "Certification has been added successfully."
      });
      
      return newCertification;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add certification. Please try again."
      });
      throw err;
    }
  };
  
  const handleDeleteCertification = async (id: string) => {
    try {
      await deleteCertification(id);
      
      toast({
        title: "Certification deleted",
        description: "Certification has been removed successfully."
      });
      
      return true;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete certification. Please try again."
      });
      throw err;
    }
  };
  
  return {
    addCertification: handleAddCertification,
    deleteCertification: handleDeleteCertification
  };
};
