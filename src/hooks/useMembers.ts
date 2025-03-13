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
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  emergencyContact?: string;
  membershipPlan?: string;
  trainerAssigned?: string;
  workoutGoals?: string;
  medicalConditions?: string;
  preferredWorkoutTime?: string[];
  paymentStatus?: string;
  discountsUsed?: string;
  notes?: string;
  profilePicture?: string;
  nfcCardId?: string;
  fingerprintId?: string;
}

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [memberPerPage] = useState(5);
  const [filterType, setFilterType] = useState('all');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (memberId: number, newStatus: string) => {
    setMembers(members.map(member => 
      member.id === memberId ? { ...member, status: newStatus } : member
    ));
    toast.success(`Member status updated to ${newStatus}`);
  };

  const handleDelete = (memberId: number) => {
    setMembers(members.filter(member => member.id !== memberId));
    setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    toast.success('Member deleted successfully');
  };

  const handleFilterChange = (filter: string) => {
    setFilterType(filter);
    setCurrentPage(1);
  };

  const toggleMemberSelection = (memberId: number) => {
    setSelectedMembers(prevSelected => 
      prevSelected.includes(memberId)
        ? prevSelected.filter(id => id !== memberId)
        : [...prevSelected, memberId]
    );
  };

  const selectAllMembers = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map(member => member.id));
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedMembers.length === 0) {
      toast.error('No members selected');
      return;
    }

    if (action === 'activate') {
      setMembers(members.map(member => 
        selectedMembers.includes(member.id) ? { ...member, status: 'Active' } : member
      ));
      toast.success(`${selectedMembers.length} members activated`);
    } else if (action === 'deactivate') {
      setMembers(members.map(member => 
        selectedMembers.includes(member.id) ? { ...member, status: 'Inactive' } : member
      ));
      toast.success(`${selectedMembers.length} members deactivated`);
    } else if (action === 'delete') {
      setMembers(members.filter(member => !selectedMembers.includes(member.id)));
      setSelectedMembers([]);
      toast.success(`${selectedMembers.length} members deleted`);
    } else if (action === 'export') {
      toast.success(`Exporting data for ${selectedMembers.length} members`);
    } else if (action === 'email') {
      toast.success(`Sending email reminder to ${selectedMembers.length} members`);
    } else if (action === 'sms') {
      toast.success(`Sending SMS reminder to ${selectedMembers.length} members`);
    }
  };

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

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.membershipType.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'active') return matchesSearch && member.status === 'Active';
    if (filterType === 'inactive') return matchesSearch && member.status === 'Inactive';
    if (filterType === 'premium') return matchesSearch && member.membershipType === 'Premium';
    if (filterType === 'standard') return matchesSearch && member.membershipType === 'Standard';
    if (filterType === 'basic') return matchesSearch && member.membershipType === 'Basic';
    
    return matchesSearch;
  });

  const indexOfLastMember = currentPage * memberPerPage;
  const indexOfFirstMember = indexOfLastMember - memberPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(filteredMembers.length / memberPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return {
    members,
    selectedMembers,
    searchTerm,
    filteredMembers,
    currentMembers,
    currentPage,
    totalPages,
    filterType,
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
