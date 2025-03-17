
import { useState, useEffect } from 'react';
import MemberTable from './MemberTable';
import MemberPagination from './MemberPagination';
import MemberSearch from './MemberSearch';
import MemberFilters from './MemberFilters';
import { Member } from '@/types/memberTypes';

interface MembersContainerProps {
  members: Member[];
  filteredMembers: Member[];
  currentMembers: Member[];
  selectedMembers: string[];
  toggleMemberSelection: (memberId: string) => void;
  selectAllMembers: () => void;
  handleStatusChange: (memberId: string, newStatus: string) => void;
  handleDelete: (memberId: string) => void;
  onViewProfile: (memberId: string) => void;
  currentPage: number;
  membersPerPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  handleItemsPerPageChange: (itemsPerPage: number) => void;
  searchTerm: string;
  handleSearchChange: (value: string) => void;
  statusFilter: string;
  membershipFilter: string;
  handleStatusFilterChange: (status: string) => void;
  handleMembershipFilterChange: (membership: string) => void;
}

const MembersContainer = ({
  members,
  filteredMembers,
  currentMembers,
  selectedMembers,
  toggleMemberSelection,
  selectAllMembers,
  handleStatusChange,
  handleDelete,
  onViewProfile,
  currentPage,
  membersPerPage,
  totalPages,
  handlePageChange,
  handleItemsPerPageChange,
  searchTerm,
  handleSearchChange,
  statusFilter,
  membershipFilter,
  handleStatusFilterChange,
  handleMembershipFilterChange
}: MembersContainerProps) => {
  // Responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Set up resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <MemberSearch 
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <MemberFilters
            statusFilter={statusFilter}
            membershipFilter={membershipFilter}
            onStatusFilterChange={handleStatusFilterChange}
            onMembershipFilterChange={handleMembershipFilterChange}
          />
        </div>
      </div>

      <MemberTable
        members={members}
        filteredMembers={filteredMembers}
        currentMembers={currentMembers}
        selectedMembers={selectedMembers}
        toggleMemberSelection={toggleMemberSelection}
        selectAllMembers={selectAllMembers}
        handleStatusChange={handleStatusChange}
        handleDelete={handleDelete}
        onViewProfile={onViewProfile}
      />

      <MemberPagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={membersPerPage}
        totalItems={filteredMembers.length}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default MembersContainer;
