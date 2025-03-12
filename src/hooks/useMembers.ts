
import { useState } from 'react';
import { toast } from 'sonner';
import { mockMembers } from '@/components/admin/members/MemberData';

export interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  startDate: string;
  endDate: string;
  status: string;
  lastCheckin: string;
}

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // In a real app, you would search the database here
  };

  const handleStatusChange = (memberId: number, newStatus: string) => {
    setMembers(members.map(member => 
      member.id === memberId ? { ...member, status: newStatus } : member
    ));
    toast.success(`Member status updated to ${newStatus}`);
  };

  const handleDelete = (memberId: number) => {
    setMembers(members.filter(member => member.id !== memberId));
    toast.success('Member deleted successfully');
  };

  const toggleMemberSelection = (memberId: number) => {
    setSelectedMembers(prevSelected => 
      prevSelected.includes(memberId)
        ? prevSelected.filter(id => id !== memberId)
        : [...prevSelected, memberId]
    );
  };

  const selectAllMembers = () => {
    if (selectedMembers.length === members.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(members.map(member => member.id));
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.membershipType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    members,
    selectedMembers,
    searchTerm,
    filteredMembers,
    handleSearch,
    handleStatusChange,
    handleDelete,
    toggleMemberSelection,
    selectAllMembers,
  };
};
