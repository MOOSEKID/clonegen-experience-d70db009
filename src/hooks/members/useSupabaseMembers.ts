
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Member, MemberFormAction } from '@/types/memberTypes';
import { fetchMembers, updateMemberStatus, deleteMember } from '@/services/memberService';
import { useMemberFilters } from './useMemberFilters';
import { useMemberCreation } from './useMemberCreation';

export const useSupabaseMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Use the existing filter hooks
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
  } = useMemberFilters([]);

  // Use the existing member creation hook but override the addMember function
  const {
    addMember: originalAddMember,
    importMembers,
    importCompanyEmployees,
    isCreating
  } = useMemberCreation(members, setMembers);

  // Load members from Supabase on component mount
  useEffect(() => {
    const loadMembers = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMembers();
        setMembers(data);
        setAllMembers(data);
      } catch (error) {
        console.error('Error loading members:', error);
        toast.error('Failed to load members');
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('public:members')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'members' 
      }, async () => {
        // Refresh the members list when changes occur
        const data = await fetchMembers();
        setMembers(data);
        setAllMembers(data);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Handle status change
  const handleStatusChange = async (memberId: string, newStatus: string) => {
    try {
      const updatedMember = await updateMemberStatus(memberId, newStatus);
      if (updatedMember) {
        toast.success(`Member status updated to ${newStatus}`);
        // The real-time subscription will update the list
      } else {
        toast.error('Failed to update member status');
      }
    } catch (error) {
      console.error('Error updating member status:', error);
      toast.error('Failed to update member status');
    }
  };

  // Handle member deletion
  const handleDelete = async (memberId: string) => {
    try {
      const success = await deleteMember(memberId);
      if (success) {
        toast.success('Member deleted successfully');
        // The real-time subscription will update the list
      } else {
        toast.error('Failed to delete member');
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      toast.error('Failed to delete member');
    }
  };

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
    if (selectedMembers.length === membersToSelect.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(membersToSelect.map(m => m.id as string));
    }
  };

  // Handle bulk actions
  const handleBulkAction = async (action: string, targetMembers: Member[]) => {
    if (selectedMembers.length === 0) {
      toast.error('No members selected');
      return;
    }

    const targetIds = targetMembers
      .filter(m => selectedMembers.includes(m.id as string))
      .map(m => m.id as string);

    try {
      switch (action) {
        case 'activate':
          for (const id of targetIds) {
            await updateMemberStatus(id, 'Active');
          }
          toast.success(`${targetIds.length} members activated`);
          break;
        case 'deactivate':
          for (const id of targetIds) {
            await updateMemberStatus(id, 'Inactive');
          }
          toast.success(`${targetIds.length} members deactivated`);
          break;
        case 'delete':
          if (confirm(`Are you sure you want to delete ${targetIds.length} members? This action cannot be undone.`)) {
            for (const id of targetIds) {
              await deleteMember(id);
            }
            toast.success(`${targetIds.length} members deleted`);
          }
          break;
        case 'export':
          toast.success('Export functionality coming soon');
          break;
        case 'email':
          toast.success('Email sending functionality coming soon');
          break;
        case 'sms':
          toast.success('SMS sending functionality coming soon');
          break;
        default:
          toast.error('Unknown action');
      }
    } catch (error) {
      console.error(`Error performing bulk action ${action}:`, error);
      toast.error(`Failed to perform ${action} on members`);
    } finally {
      setSelectedMembers([]);
    }
  };

  // Custom addMember function that uses Supabase
  const addMember = async (memberData: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction) => {
    try {
      // Format data for Supabase - convert camelCase to snake_case
      const dbMemberData = {
        name: memberData.name,
        email: memberData.email,
        phone: memberData.phone,
        membershiptype: memberData.membershipType,
        startdate: new Date().toISOString(),
        enddate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
        status: memberData.status || 'Active',
        gender: memberData.gender,
        address: memberData.address,
        emergencycontact: memberData.emergencyContact,
        membershipplan: memberData.membershipPlan || 'Monthly',
        membershipcategory: memberData.membershipCategory || 'Individual',
        trainerassigned: memberData.trainerAssigned,
        workoutgoals: memberData.workoutGoals,
        medicalconditions: memberData.medicalConditions,
        preferredworkouttime: memberData.preferredWorkoutTime,
        paymentstatus: memberData.paymentStatus || 'Pending',
        discountsused: memberData.discountsUsed || 'No',
        notes: memberData.notes,
        username: memberData.username,
        passwordresetrequired: memberData.passwordResetRequired !== undefined ? memberData.passwordResetRequired : true,
        accountenabled: memberData.accountEnabled !== undefined ? memberData.accountEnabled : true,
        linkedtocompany: memberData.linkedToCompany || false,
        linkedcompanyid: memberData.linkedCompanyId
      };
        
      const { data, error } = await supabase
        .from('members')
        .insert([dbMemberData])
        .select();
        
      if (error) {
        console.error('Error adding member:', error);
        toast.error('Failed to add member');
        return false;
      }
      
      toast.success('Member added successfully');
      return true;
    } catch (error) {
      console.error('Error in addMember:', error);
      toast.error('Failed to add member');
      return false;
    }
  };

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
    importCompanyEmployees,
    paginate,
    nextPage,
    prevPage,
  };
};
