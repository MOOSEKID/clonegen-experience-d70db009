
import { useStaffData } from './useStaffData';
import { useStaffOperations } from './useStaffOperations';
import { StaffProfile, StaffCertification, StaffAvailability } from '../trainers/types';

export const useStaffProfiles = () => {
  const { staff, isLoading, error, getStaffByRole } = useStaffData();
  const { 
    addStaffMember, 
    updateStaffMember, 
    deleteStaffMember,
    addCertification,
    deleteCertification,
    addAvailability,
    deleteAvailability
  } = useStaffOperations();

  return {
    staff,
    isLoading,
    error,
    getStaffByRole,
    addStaffMember,
    updateStaffMember,
    deleteStaffMember,
    addCertification,
    deleteCertification,
    addAvailability,
    deleteAvailability
  };
};
