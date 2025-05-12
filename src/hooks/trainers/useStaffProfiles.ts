
import { useStaffData } from './useStaffData';
import { useStaffOperations } from './useStaffOperations';
import { useCertificationsManagement } from './useCertificationsManagement';
import { useAvailabilityManagement } from './useAvailabilityManagement';
import { StaffProfile, StaffCertification, StaffAvailability } from './types';

export type { StaffProfile, StaffCertification, StaffAvailability };

export const useStaffProfiles = () => {
  const { staff, isLoading, error } = useStaffData();
  const { addStaffMember, updateStaffMember, deleteStaffMember } = useStaffOperations();
  const { addCertification, deleteCertification } = useCertificationsManagement();
  const { addAvailability, deleteAvailability } = useAvailabilityManagement();

  return {
    staff,
    isLoading,
    error,
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
export const useTrainerProfiles = useStaffProfiles;
