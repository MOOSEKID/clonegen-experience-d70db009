
import { Member } from '@/hooks/useMembers';
import MemberHeader from './MemberHeader';
import MembersToolbar from './MembersToolbar';
import MemberTable from './MemberTable';
import MemberPagination from './MemberPagination';

interface MembersContainerProps {
  members: Member[];
  filteredMembers: Member[];
  currentMembers: Member[];
  currentPage: number;
  totalPages: number;
  selectedMembers: number[];
  searchTerm: string;
  filterType: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (memberId: number, newStatus: string) => void;
  onDelete: (memberId: number) => void;
  onToggleSelect: (memberId: number) => void;
  onSelectAll: () => void;
  onFilterChange: (filter: string) => void;
  onBulkAction: (action: string) => void;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const MembersContainer = ({
  members,
  filteredMembers,
  currentMembers,
  currentPage,
  totalPages,
  selectedMembers,
  searchTerm,
  filterType,
  onSearchChange,
  onStatusChange,
  onDelete,
  onToggleSelect,
  onSelectAll,
  onFilterChange,
  onBulkAction,
  onPageChange,
  onPrevPage,
  onNextPage
}: MembersContainerProps) => {
  return (
    <div className="space-y-6">
      <MemberHeader 
        selectedCount={selectedMembers.length} 
      />
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <MembersToolbar 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          selectedMembers={selectedMembers}
          onFilterChange={onFilterChange}
          onBulkAction={onBulkAction}
          filterType={filterType}
        />

        <MemberTable 
          members={members}
          filteredMembers={filteredMembers}
          currentMembers={currentMembers}
          selectedMembers={selectedMembers}
          toggleMemberSelection={onToggleSelect}
          selectAllMembers={onSelectAll}
          handleStatusChange={onStatusChange}
          handleDelete={onDelete}
        />

        <MemberPagination 
          filteredCount={filteredMembers.length}
          totalCount={members.length}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
        />
      </div>
    </div>
  );
};

export default MembersContainer;
