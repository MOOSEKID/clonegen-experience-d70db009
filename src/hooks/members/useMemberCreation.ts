
import { useState } from 'react';
import { toast } from 'sonner';
import { Member, MemberFormAction } from '@/types/memberTypes';
import { 
  generateUsername, 
  makeUsernameUnique, 
  generateTemporaryPassword,
  sendCredentialsByEmail,
  sendCredentialsBySMS
} from '@/utils/authUtils';

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

  const addMember = async (memberData: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction) => {
    setIsCreating(true);
    
    try {
      const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
      const today = new Date().toISOString().split('T')[0];
      
      let endDate = new Date();
      if (memberData.membershipPlan === "Monthly") {
        endDate.setMonth(endDate.getMonth() + 1);
      } else if (memberData.membershipPlan === "Quarterly") {
        endDate.setMonth(endDate.getMonth() + 3);
      } else if (memberData.membershipPlan === "Yearly") {
        endDate.setFullYear(endDate.getFullYear() + 1);
      } else {
        // Default to 1 year for custom plans
        endDate.setFullYear(endDate.getFullYear() + 1);
      }

      // For company memberships with billing cycles
      if (memberData.membershipCategory === "Company" && memberData.billingCycle) {
        if (memberData.billingCycle === "Monthly") {
          endDate = new Date();
          endDate.setMonth(endDate.getMonth() + 1);
        } else if (memberData.billingCycle === "Quarterly") {
          endDate = new Date();
          endDate.setMonth(endDate.getMonth() + 3);
        } else if (memberData.billingCycle === "Annually") {
          endDate = new Date();
          endDate.setFullYear(endDate.getFullYear() + 1);
        }
      }
      
      // Generate authentication credentials if needed
      let username = '';
      let tempPassword = '';
      
      // Only generate for individual members
      if (memberData.membershipCategory === 'Individual') {
        // Create username based on name
        if (memberData.generateUsername) {
          const baseUsername = generateUsername(memberData.name || '');
          username = makeUsernameUnique(baseUsername, getAllUsernames());
        } else {
          // Use the provided username
          username = memberData.username || '';
          
          // Check if username already exists
          if (getAllUsernames().includes(username)) {
            throw new Error(`Username "${username}" is already taken. Please choose a different username.`);
          }
        }
        
        // Generate or use provided password
        if (memberData.generateTemporaryPassword) {
          tempPassword = generateTemporaryPassword();
        } else {
          tempPassword = memberData.temporaryPassword || '';
        }
        
        // Send credentials if requested
        if (memberData.sendCredentials) {
          if (memberData.email) {
            await sendCredentialsByEmail(
              memberData.email, 
              username, 
              tempPassword
            );
          }
          
          if (memberData.phone) {
            await sendCredentialsBySMS(
              memberData.phone, 
              username, 
              tempPassword
            );
          }
        }
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

  const importMembers = (importedMembers: Omit<Member, "id">[]) => {
    const lastId = members.length > 0 ? Math.max(...members.map(m => m.id)) : 0;
    
    const newMembers = importedMembers.map((member, index) => {
      const today = new Date().toISOString().split('T')[0];
      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      
      // Generate username and password for imported members
      let username = '';
      if (member.name) {
        const baseUsername = generateUsername(member.name);
        username = makeUsernameUnique(baseUsername, getAllUsernames());
      }
      
      return {
        id: lastId + index + 1,
        name: member.name,
        email: member.email,
        phone: member.phone || "",
        membershipType: member.membershipType || "Standard",
        startDate: member.startDate || today,
        endDate: member.endDate || nextYear.toISOString().split('T')[0],
        status: member.status || "Active",
        lastCheckin: member.lastCheckin || today,
        username: username || undefined,
        passwordResetRequired: true,
        accountEnabled: true,
        // Copy all other member properties
        ...member
      };
    });
    
    setMembers([...members, ...newMembers]);
    toast.success(`${newMembers.length} members imported successfully`, {
      description: "Login credentials have been generated for all imported members."
    });
  };

  // New function to bulk import company employees
  const importCompanyEmployees = (companyId: number, employees: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin">[]) => {
    const company = members.find(m => m.id === companyId);
    
    if (!company || company.membershipCategory !== "Company") {
      toast.error("Invalid company selected for employee import");
      return;
    }
    
    const lastId = members.length > 0 ? Math.max(...members.map(m => m.id)) : 0;
    const today = new Date().toISOString().split('T')[0];
    
    // Get company end date to apply to all employees
    const companyEndDate = company.endDate;
    
    const newEmployees = employees.map((employee, index) => {
      // Generate username and password for each employee
      let username = '';
      let tempPassword = '';
      
      if (employee.name) {
        const baseUsername = generateUsername(employee.name);
        username = makeUsernameUnique(baseUsername, getAllUsernames());
        tempPassword = generateTemporaryPassword();
        
        // Send credentials
        if (employee.email) {
          sendCredentialsByEmail(employee.email, username, tempPassword);
        }
        if (employee.phone) {
          sendCredentialsBySMS(employee.phone, username, tempPassword);
        }
      }
      
      return {
        id: lastId + index + 1,
        ...employee,
        linkedToCompany: true,
        linkedCompanyName: company.companyName || company.name,
        startDate: today,
        endDate: companyEndDate,
        lastCheckin: today,
        status: "Active",
        username: username || undefined,
        passwordResetRequired: true,
        accountEnabled: true,
      };
    });
    
    setMembers([...members, ...newEmployees]);
    toast.success(`${newEmployees.length} employees added to ${company.companyName || company.name}`, {
      description: "Login credentials have been generated and sent to all employees."
    });
  };

  return {
    addMember,
    importMembers,
    importCompanyEmployees,
    isCreating
  };
};
