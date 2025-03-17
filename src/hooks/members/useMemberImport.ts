
import { toast } from 'sonner';
import { Member } from '@/types/memberTypes';
import { 
  generateUsername, 
  makeUsernameUnique 
} from '@/utils/authUtils';

export const useMemberImport = (
  members: Member[], 
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>
) => {
  // Get all existing usernames for uniqueness checks
  const getAllUsernames = (): string[] => {
    return members
      .filter(m => m.username)
      .map(m => m.username as string);
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

  return { importMembers };
};
