
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { Member, MemberFormAction } from '@/types/memberTypes';

export const useSupabaseMemberAdd = () => {
  // Mock addMember function that uses local data instead of Supabase
  const addMember = async (memberData: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction): Promise<boolean> => {
    try {
      console.log("Starting useSupabaseMemberAdd with data:", memberData);
      
      // Validate required fields
      if (!memberData) {
        console.error("Member data is null or undefined");
        toast.error('Missing member data');
        return false;
      }
      
      if (memberData.membershipCategory === 'Individual') {
        if (!memberData.name || !memberData.email) {
          console.error("Invalid individual member data - missing required fields:", 
            {name: memberData.name, email: memberData.email});
          toast.error('Missing required member data: name and email are required for individual members');
          return false;
        }
      } else if (memberData.membershipCategory === 'Company') {
        if (!memberData.companyName || !memberData.companyEmail) {
          console.error("Invalid company member data - missing required fields:", 
            {companyName: memberData.companyName, companyEmail: memberData.companyEmail});
          toast.error('Missing required member data: company name and email are required for company members');
          return false;
        }
      } else {
        console.error("Invalid membership category:", memberData.membershipCategory);
        toast.error('Invalid membership category');
        return false;
      }
      
      // Ensure status is set
      if (!memberData.status) {
        console.log("Status field missing, setting to Active");
        memberData.status = 'Active';
      }
      
      // Log some specific fields to help debug
      console.log("Member key fields:", {
        name: memberData.name,
        email: memberData.email,
        status: memberData.status,
        membershipCategory: memberData.membershipCategory,
        membershipType: memberData.membershipType
      });
      
      // Log stringified data for detailed inspection
      console.log("Full member data:", JSON.stringify(memberData, null, 2));
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Member added successfully');
      return true;
    } catch (error) {
      console.error('Error in addMember:', error);
      toast.error('Failed to add member: ' + (error instanceof Error ? error.message : String(error)));
      return false;
    }
  };

  return {
    addMember
  };
};
