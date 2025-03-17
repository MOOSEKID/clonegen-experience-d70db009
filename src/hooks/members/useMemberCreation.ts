
import { useState } from 'react';
import { toast } from 'sonner';
import { Member, MemberFormAction } from '@/types/memberTypes';
import { calculateMembershipEndDate } from '@/utils/memberDateUtils';
import { useCredentialGeneration } from './useCredentialGeneration';
import { useMemberImport } from './useMemberImport';
import { useCompanyEmployeeImport } from './useCompanyEmployeeImport';

export const useMemberCreation = (
  members: Member[], 
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>
) => {
  const [isCreating, setIsCreating] = useState(false);
  
  // Get all existing usernames for uniqueness checks
  const getAllUsernames = (): string[] => {
    return members
      .filter(m => m.username)
      .map(m => m.username as string);
  };

  const { generateMemberCredentials } = useCredentialGeneration(getAllUsernames);
  const { importMembers } = useMemberImport(members, setMembers);
  const { importCompanyEmployees } = useCompanyEmployeeImport(members, setMembers);

  const addMember = async (memberData: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction) => {
    setIsCreating(true);
    
    try {
      const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
      const today = new Date().toISOString().split('T')[0];
      
      // Calculate end date based on membership plan or billing cycle
      const endDate = calculateMembershipEndDate(
        memberData.membershipPlan,
        memberData.membershipCategory === "Company" ? memberData.billingCycle : undefined
      );
      
      // Generate authentication credentials if needed
      let username = '';
      let tempPassword = '';
      
      // Only generate for individual members
      if (memberData.membershipCategory === 'Individual') {
        const credentials = await generateMemberCredentials(
          {
            generateUsername: memberData.generateUsername || false,
            username: memberData.username,
            generateTemporaryPassword: memberData.generateTemporaryPassword || false,
            temporaryPassword: memberData.temporaryPassword,
            sendCredentials: memberData.sendCredentials || false
          },
          memberData.name || '',
          memberData.email,
          memberData.phone
        );
        
        username = credentials.username;
        tempPassword = credentials.tempPassword;
      }
      
      // Extract form-specific fields before creating the member object
      const { 
        generateUsername: genUsername, 
        generateTemporaryPassword: genPassword, 
        temporaryPassword, 
        sendCredentials,
        ...cleanedMemberData 
      } = memberData;
      
      const newMember: Member = {
        id: newId,
        ...cleanedMemberData,
        startDate: today,
        endDate: endDate.toISOString().split('T')[0],
        lastCheckin: today,
        // Add authentication data
        username: username || undefined,
        passwordResetRequired: true,
        accountEnabled: true,
        // Don't store the temporary password in the member record
        // temporaryPassword is only used during the creation process
        
        // Initialize attendance history for tracking
        attendanceHistory: memberData.membershipCategory === "Company" 
          ? [] // Companies will track employee attendance separately
          : [{ date: today, checkInTime: new Date().toLocaleTimeString() }]
      };
      
      setMembers([...members, newMember]);
      
      // Show appropriate success message based on membership type
      if (memberData.membershipCategory === "Company") {
        toast.success(`Company ${memberData.companyName} added successfully`, {
          description: "You can now add employees to this company."
        });
      } else if (memberData.linkedToCompany) {
        toast.success(`${memberData.name} added successfully and linked to ${memberData.linkedCompanyName}`, {
          description: "Login credentials have been sent to the member."
        });
      } else {
        toast.success(`${memberData.name} added successfully`, {
          description: "Login credentials have been sent to the member."
        });
      }
      
      return true;
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error(error instanceof Error ? error.message : "Failed to add member");
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    addMember,
    importMembers,
    importCompanyEmployees,
    isCreating
  };
};
