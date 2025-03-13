
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
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    
    const newMember: Member = {
      id: newId,
      ...memberData,
      startDate: today,
      endDate: endDate.toISOString().split('T')[0],
      lastCheckin: today
    };
    
    setMembers([...members, newMember]);
    toast.success(`${memberData.name} added successfully`);
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
        lastCheckin: member.lastCheckin || today
      };
    });
    
    setMembers([...members, ...newMembers]);
    toast.success(`${newMembers.length} members imported successfully`);
  };

  return {
    addMember,
    importMembers
  };
};
