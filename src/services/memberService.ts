
import { MemberInfo } from '@/types/classTypes';
import { mockMembers } from '@/data/mockMembersData';

// Get members who are not enrolled or waitlisted in the class
export const getAvailableMembers = (
  enrolledMembers: MemberInfo[], 
  waitlistMembers: MemberInfo[],
  searchTerm: string = ''
): MemberInfo[] => {
  const enrolledIds = new Set(enrolledMembers.map(m => m.id));
  const waitlistIds = new Set(waitlistMembers.map(m => m.id));
  
  return mockMembers.filter(member => 
    !enrolledIds.has(member.id) && 
    !waitlistIds.has(member.id) &&
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
