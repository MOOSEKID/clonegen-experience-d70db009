
import { MemberInfo } from '@/types/classTypes';
import { mockMembers } from '@/data/mockMembersData';

// This function would typically make an API call to get available members
// For now, we'll use the mock data and add some extra properties
export const getAvailableMembers = (
  enrolledMembers: MemberInfo[] = [], 
  waitlistMembers: MemberInfo[] = [], 
  searchTerm: string = ''
): Promise<MemberInfo[]> => {
  return new Promise((resolve) => {
    // Add joinDate and status to the mock members for display purposes
    const enrichedMembers = mockMembers.map(member => ({
      ...member,
      joinDate: new Date().toISOString().split('T')[0], // Today's date
      status: 'Active'
    }));
    
    // Filter out members that are already enrolled or on waitlist
    const enrolledIds = enrolledMembers.map(m => m.id);
    const waitlistIds = waitlistMembers.map(m => m.id);
    const alreadyInClassIds = [...enrolledIds, ...waitlistIds];
    
    let filteredMembers = enrichedMembers.filter(
      member => !alreadyInClassIds.includes(member.id)
    );
    
    // Apply search filter if provided
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredMembers = filteredMembers.filter(
        member => member.name.toLowerCase().includes(searchLower) || 
                 member.email.toLowerCase().includes(searchLower)
      );
    }
    
    setTimeout(() => {
      resolve(filteredMembers);
    }, 500); // Simulate network delay
  });
};

// Mock function for updating member status
export const updateMemberStatus = async (memberId: string, status: string) => {
  console.log(`Updating member ${memberId} status to ${status}`);
  // In a real app, this would be an API call
  return {
    id: memberId,
    status
  };
};

// Mock function for deleting a member
export const deleteMember = async (memberId: string) => {
  console.log(`Deleting member ${memberId}`);
  // In a real app, this would be an API call
  return true; // successful deletion
};
