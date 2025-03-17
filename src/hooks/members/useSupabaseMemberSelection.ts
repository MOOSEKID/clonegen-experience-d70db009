
import { useState } from 'react';
import { Member } from '@/types/memberTypes';

export const useSupabaseMemberSelection = () => {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  // Toggle member selection
  const toggleMemberSelection = (memberId: string) => {
    setSelectedMembers(prev => {
      if (prev.includes(memberId)) {
        return prev.filter(id => id !== memberId);
      } else {
        return [...prev, memberId];
      }
    });
  };

  // Select all members
  const selectAllMembers = (membersToSelect: Member[]) => {
    if (membersToSelect.length === 0) {
      setSelectedMembers([]);
      return;
    }
    
    // If all members are already selected, deselect all
    const allMemberIds = membersToSelect.map(m => m.id as string);
    const allSelected = allMemberIds.every(id => selectedMembers.includes(id));
    
    if (allSelected) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(allMemberIds);
    }
  };

  return {
    selectedMembers,
    toggleMemberSelection,
    selectAllMembers,
    setSelectedMembers
  };
};
