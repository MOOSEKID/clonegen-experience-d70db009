
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Member, MemberFormAction } from '@/types/memberTypes';
import { useSupabaseMemberData } from './useSupabaseMemberData';
import { useMemberFilters } from './useMemberFilters';
import { v4 as uuidv4 } from 'uuid';

export const useSupabaseMembers = () => {
  const { members, setMembers, isLoading } = useSupabaseMemberData();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  // Use the member filters hook to handle filtering, pagination, etc.
  const {
    searchTerm,
    filterType,
    filteredMembers,
    currentMembers,
    currentPage,
    totalPages,
    handleSearch,
    handleFilterChange,
    paginate,
    nextPage,
    prevPage,
    setAllMembers
  } = useMemberFilters(members);

  // Update the member filters when members change
  useState(() => {
    if (members.length > 0) {
      setAllMembers(members);
    }
  });

  // Toggle member selection
  const toggleMemberSelection = useCallback((memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  }, []);

  // Select all members
  const selectAllMembers = useCallback((filteredMembers: Member[]) => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map(member => member.id as string));
    }
  }, [selectedMembers]);

  // Change member status
  const handleStatusChange = useCallback((memberId: string, newStatus: string) => {
    setMembers(prevMembers => 
      prevMembers.map(member => 
        member.id === memberId ? { ...member, status: newStatus } : member
      )
    );
    toast.success(`Member status updated to ${newStatus}`);
  }, [setMembers]);

  // Delete member
  const handleDelete = useCallback((memberId: string) => {
    setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
    setSelectedMembers(prev => prev.filter(id => id !== memberId));
    toast.success('Member deleted successfully');
  }, [setMembers]);

  // Bulk action on members
  const handleBulkAction = useCallback((action: string, filteredMembers: Member[]) => {
    if (selectedMembers.length === 0) {
      toast.error('No members selected');
      return;
    }

    switch (action) {
      case 'activate':
        setMembers(prevMembers => 
          prevMembers.map(member => 
            selectedMembers.includes(member.id as string) ? { ...member, status: 'Active' } : member
          )
        );
        toast.success(`${selectedMembers.length} members activated`);
        break;
      case 'deactivate':
        setMembers(prevMembers => 
          prevMembers.map(member => 
            selectedMembers.includes(member.id as string) ? { ...member, status: 'Inactive' } : member
          )
        );
        toast.success(`${selectedMembers.length} members deactivated`);
        break;
      case 'delete':
        setMembers(prevMembers => 
          prevMembers.filter(member => !selectedMembers.includes(member.id as string))
        );
        setSelectedMembers([]);
        toast.success(`${selectedMembers.length} members deleted`);
        break;
      case 'export':
        toast.success(`Exporting data for ${selectedMembers.length} members`);
        break;
      case 'email':
        toast.success(`Sending email reminder to ${selectedMembers.length} members`);
        break;
      case 'sms':
        toast.success(`Sending SMS reminder to ${selectedMembers.length} members`);
        break;
      default:
        toast.error(`Action ${action} not implemented`);
    }
  }, [selectedMembers, setMembers]);

  // Add member
  const addMember = useCallback(async (memberData: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction): Promise<boolean> => {
    try {
      setIsCreating(true);
      
      // Create a simulated delay to mimic API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const today = new Date().toISOString().split('T')[0];
      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      
      // Create new member with generated ID
      const newMember: Member = {
        id: uuidv4(),
        name: memberData.name || '',
        email: memberData.email || '',
        phone: memberData.phone || '',
        membershipType: memberData.membershipType || 'Standard',
        startDate: today,
        endDate: nextYear.toISOString().split('T')[0],
        status: 'Active',
        lastCheckin: today,
        // Add any other fields needed
        membershipCategory: memberData.membershipCategory,
        membershipPlan: memberData.membershipPlan,
        companyName: memberData.companyName,
      };
      
      // Update state with new member
      setMembers(prevMembers => [...prevMembers, newMember]);
      console.log('Added new member:', newMember);
      
      return true;
    } catch (error) {
      console.error('Error adding member:', error);
      return false;
    } finally {
      setIsCreating(false);
    }
  }, [setMembers]);

  // Import members
  const importMembers = useCallback((importedMembers: Omit<Member, "id">[]) => {
    const newMembers = importedMembers.map(member => ({
      ...member,
      id: uuidv4()
    }));
    
    setMembers(prevMembers => [...prevMembers, ...newMembers]);
    toast.success(`${newMembers.length} members imported successfully`);
  }, [setMembers]);

  return {
    members,
    selectedMembers,
    searchTerm,
    filteredMembers,
    currentMembers,
    currentPage,
    totalPages,
    filterType,
    isCreating,
    isLoading,
    handleSearch,
    handleStatusChange,
    handleDelete,
    handleFilterChange,
    toggleMemberSelection,
    selectAllMembers,
    handleBulkAction,
    addMember,
    importMembers,
    paginate,
    nextPage,
    prevPage,
  };
};
