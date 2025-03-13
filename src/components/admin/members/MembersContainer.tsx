
import { useState } from 'react';
import { Member, MemberFormAction } from '@/types/memberTypes';
import MemberHeader from './MemberHeader';
import MembersToolbar from './MembersToolbar';
import MemberTable from './MemberTable';
import MemberPagination from './MemberPagination';
import AddMemberDialog from './AddMemberDialog';
import ImportMembersDialog from './ImportMembersDialog';
import { Skeleton } from '@/components/ui/skeleton';

interface MembersContainerProps {
  members: Member[];
  filteredMembers: Member[];
  currentMembers: Member[];
  currentPage: number;
  totalPages: number;
  selectedMembers: string[];
  searchTerm: string;
  filterType: string;
  isCreating?: boolean;
  isLoading?: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (memberId: string, newStatus: string) => void;
  onDelete: (memberId: string) => void;
  onToggleSelect: (memberId: string) => void;
  onSelectAll: () => void;
  onFilterChange: (filter: string) => void;
  onBulkAction: (action: string) => void;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onAddMember: (member: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction) => Promise<boolean> | boolean;
  onImportMembers: (members: Omit<Member, "id">[]) => void;
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
  isCreating = false,
  isLoading = false,
  onSearchChange,
  onStatusChange,
  onDelete,
  onToggleSelect,
  onSelectAll,
  onFilterChange,
  onBulkAction,
  onPageChange,
  onPrevPage,
  onNextPage,
  onAddMember,
  onImportMembers
}: MembersContainerProps) => {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  
  return (
    <div className="space-y-6">
      <MemberHeader 
        selectedCount={selectedMembers.length} 
        onAddMember={() => setIsAddMemberOpen(true)}
        onImport={() => setIsImportOpen(true)}
        members={members}
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

        {isLoading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="w-full h-16 rounded-md" />
            ))}
          </div>
        ) : (
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
        )}

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

      <AddMemberDialog 
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onAddMember={onAddMember}
        isCreating={isCreating}
      />

      <ImportMembersDialog
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImportMembers={onImportMembers}
      />
    </div>
  );
};

export default MembersContainer;
