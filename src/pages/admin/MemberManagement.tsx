
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MemberHeader from '@/components/admin/members/MemberHeader';
import MembersContainer from '@/components/admin/members/MembersContainer';
import MemberBulkActions from '@/components/admin/members/MemberBulkActions';
import AddMemberDialog from '@/components/admin/members/AddMemberDialog';
import ImportMembersDialog from '@/components/admin/members/ImportMembersDialog';
import MemberProfileDialog from '@/components/admin/members/MemberProfileDialog';
import { Member } from '@/types/memberTypes';
import { getMemberData } from '@/components/admin/members/MemberData';

const MemberManagement = () => {
  // State
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [currentMembers, setCurrentMembers] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage, setMembersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [membershipFilter, setMembershipFilter] = useState('All');
  
  // Load members data
  useEffect(() => {
    setMembers(getMemberData());
  }, []);

  // Filter members based on search and filters
  useEffect(() => {
    let result = [...members];
    
    // Apply search term
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(member => 
        member.name.toLowerCase().includes(lowercasedSearch) ||
        member.email.toLowerCase().includes(lowercasedSearch) ||
        (member.memberId && member.memberId.toLowerCase().includes(lowercasedSearch))
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      result = result.filter(member => member.status === statusFilter);
    }
    
    // Apply membership filter
    if (membershipFilter !== 'All') {
      result = result.filter(member => member.membershipType === membershipFilter);
    }
    
    setFilteredMembers(result);
  }, [members, searchTerm, statusFilter, membershipFilter]);

  // Pagination
  useEffect(() => {
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    setCurrentMembers(filteredMembers.slice(indexOfFirstMember, indexOfLastMember));
  }, [filteredMembers, currentPage, membersPerPage]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, membershipFilter]);

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    if (selectedMembers.length === 0) {
      toast.error('Please select at least one member');
      return;
    }

    switch (action) {
      case 'activate':
        handleBulkStatusChange('Active', filteredMembers);
        break;
      case 'deactivate':
        handleBulkStatusChange('Inactive', filteredMembers);
        break;
      case 'delete':
        handleBulkDelete(filteredMembers);
        break;
      case 'export':
        handleExportMembers(filteredMembers);
        break;
      default:
        break;
    }
  };

  // Select all members
  const selectAllMembers = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map(member => member.id as string));
    }
  };

  // Toggle member selection
  const toggleMemberSelection = (memberId: string) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  // Handlers
  const handleBulkStatusChange = (newStatus: string, members: Member[]) => {
    const updatedMembers = [...members];
    selectedMembers.forEach(id => {
      const index = updatedMembers.findIndex(member => member.id === id);
      if (index !== -1) {
        updatedMembers[index] = { ...updatedMembers[index], status: newStatus };
      }
    });
    setMembers(updatedMembers);
    toast.success(`${selectedMembers.length} members updated to ${newStatus}`);
    setSelectedMembers([]);
  };

  const handleBulkDelete = (members: Member[]) => {
    setMembers(members.filter(member => !selectedMembers.includes(member.id as string)));
    toast.success(`${selectedMembers.length} members deleted`);
    setSelectedMembers([]);
  };

  const handleExportMembers = (members: Member[]) => {
    // Implement export functionality here
    console.log('Exporting members:', members.filter(member => selectedMembers.includes(member.id as string)));
    toast.success(`${selectedMembers.length} members exported`);
  };

  const handleStatusChange = (memberId: string, newStatus: string) => {
    const updatedMembers = members.map(member => 
      member.id === memberId ? { ...member, status: newStatus } : member
    );
    setMembers(updatedMembers);
    toast.success(`Member status updated to ${newStatus}`);
  };

  const handleDelete = (memberId: string) => {
    setMembers(members.filter(member => member.id !== memberId));
    toast.success('Member deleted successfully');
  };

  const handleViewProfile = (memberId: string) => {
    setSelectedMemberId(memberId);
    setIsProfileOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setMembersPerPage(items);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleMembershipFilterChange = (membership: string) => {
    setMembershipFilter(membership);
  };

  const handleAddMember = (newMember: Member) => {
    // Generate a unique ID for the new member
    const memberId = `MEM${Math.floor(100000 + Math.random() * 900000)}`;
    const memberWithId = { ...newMember, id: memberId, createdAt: new Date().toISOString() };
    setMembers([memberWithId, ...members]);
    toast.success('Member added successfully');
    setIsAddMemberOpen(false);
  };

  const handleImportMembers = (importedMembers: Member[]) => {
    // Add IDs to imported members
    const membersWithIds = importedMembers.map(member => ({
      ...member,
      id: `MEM${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: member.createdAt || new Date().toISOString()
    }));
    
    setMembers([...membersWithIds, ...members]);
    toast.success(`${importedMembers.length} members imported successfully`);
    setIsImportOpen(false);
  };

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  return (
    <div className="space-y-6">
      <MemberHeader 
        title="Member Management"
        totalMembers={members.length}
        activeMembers={members.filter(m => m.status === 'Active').length}
        onAddMember={() => setIsAddMemberOpen(true)}
        onImportMembers={() => setIsImportOpen(true)}
      />

      {selectedMembers.length > 0 && (
        <MemberBulkActions 
          selectedCount={selectedMembers.length}
          onAction={handleBulkAction}
          onClearSelection={() => setSelectedMembers([])}
        />
      )}

      <MembersContainer 
        members={members}
        filteredMembers={filteredMembers}
        currentMembers={currentMembers}
        selectedMembers={selectedMembers}
        toggleMemberSelection={toggleMemberSelection}
        selectAllMembers={selectAllMembers}
        handleStatusChange={handleStatusChange}
        handleDelete={handleDelete}
        onViewProfile={handleViewProfile}
        currentPage={currentPage}
        membersPerPage={membersPerPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        handleItemsPerPageChange={handleItemsPerPageChange}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        membershipFilter={membershipFilter}
        handleStatusFilterChange={handleStatusFilterChange}
        handleMembershipFilterChange={handleMembershipFilterChange}
      />

      <AddMemberDialog 
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onAddMember={handleAddMember}
      />

      <ImportMembersDialog 
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImport={handleImportMembers}
      />

      <MemberProfileDialog 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        memberId={selectedMemberId}
        members={members}
      />
    </div>
  );
};

export default MemberManagement;
