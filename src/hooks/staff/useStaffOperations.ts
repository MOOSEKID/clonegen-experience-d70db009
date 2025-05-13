
import { useStaffMemberOperations } from './operations/staffMemberOperations';
import { useCertificationOperations } from './operations/certificationOperations';
import { useAvailabilityOperations } from './operations/availabilityOperations';

export const useStaffOperations = () => {
  const { addStaffMember, updateStaffMember, deleteStaffMember } = useStaffMemberOperations();
  const { addCertification, deleteCertification } = useCertificationOperations();
  const { addAvailability, deleteAvailability } = useAvailabilityOperations();
  
  return {
    // Staff member operations
    addStaffMember,
    updateStaffMember,
    deleteStaffMember,
    
    // Certification operations
    addCertification,
    deleteCertification,
    
    // Availability operations
    addAvailability,
    deleteAvailability
  };
};
