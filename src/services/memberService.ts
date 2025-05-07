
import { MemberInfo } from '@/types/classTypes';
import { mockMembers } from '@/data/mockMembersData';

// This function would typically make an API call to get available members
// For now, we'll use the mock data and add some extra properties
export const getAvailableMembers = (): Promise<MemberInfo[]> => {
  return new Promise((resolve) => {
    // Add joinDate and status to the mock members for display purposes
    const enrichedMembers = mockMembers.map(member => ({
      ...member,
      joinDate: new Date().toISOString().split('T')[0], // Today's date
      status: 'Active'
    }));
    
    setTimeout(() => {
      resolve(enrichedMembers);
    }, 500); // Simulate network delay
  });
};
