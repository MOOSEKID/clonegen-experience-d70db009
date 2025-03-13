
import { toast } from 'sonner';
import { Member } from '@/types/memberTypes';

export const useMemberCreation = (
  members: Member[], 
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>
) => {
  const addMember = (memberData: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin">) => {
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
    
    const newMember: Member = {
      id: newId,
      ...memberData,
      startDate: today,
      endDate: endDate.toISOString().split('T')[0],
      lastCheckin: today,
      // Initialize attendance history for tracking
      attendanceHistory: memberData.membershipCategory === "Company" 
        ? [] // Companies will track employee attendance separately
        : [{ date: today, checkInTime: new Date().toLocaleTimeString() }]
    };
    
    setMembers([...members, newMember]);
    
    // Show appropriate success message based on membership type
    if (memberData.membershipCategory === "Company") {
      toast.success(`Company ${memberData.name} added successfully`);
    } else if (memberData.linkedToCompany) {
      toast.success(`${memberData.name} added successfully and linked to ${memberData.linkedCompanyName}`);
    } else {
      toast.success(`${memberData.name} added successfully`);
    }
  };

  const importMembers = (importedMembers: Omit<Member, "id">[]) => {
    const lastId = members.length > 0 ? Math.max(...members.map(m => m.id)) : 0;
    
    const newMembers = importedMembers.map((member, index) => {
      const today = new Date().toISOString().split('T')[0];
      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      
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
        // Copy all other member properties
        ...member
      };
    });
    
    setMembers([...members, ...newMembers]);
    toast.success(`${newMembers.length} members imported successfully`);
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
      return {
        id: lastId + index + 1,
        ...employee,
        linkedToCompany: true,
        linkedCompanyName: company.name,
        startDate: today,
        endDate: companyEndDate,
        lastCheckin: today,
        status: "Active"
      };
    });
    
    setMembers([...members, ...newEmployees]);
    toast.success(`${newEmployees.length} employees added to ${company.name}`);
  };

  return {
    addMember,
    importMembers,
    importCompanyEmployees
  };
};
