
import { Member } from '@/hooks/useMembers';
import MemberHeader from './MemberHeader';
import MembersToolbar from './MembersToolbar';
import MemberTable from './MemberTable';
import MemberPagination from './MemberPagination';

interface MembersContainerProps {
  members: Member[];
  filteredMembers: Member[];
  selectedMembers: number[];
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (memberId: number, newStatus: string) => void;
  onDelete: (memberId: number) => void;
  onToggleSelect: (memberId: number) => void;
  onSelectAll: () => void;
}

const MembersContainer = ({
  members,
  filteredMembers,
  selectedMembers,
  searchTerm,
  onSearchChange,
  onStatusChange,
  onDelete,
  onToggleSelect,
  onSelectAll
}: MembersContainerProps) => {
  return (
    <div className="space-y-6">
      <MemberHeader />
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <MembersToolbar 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          selectedMembers={selectedMembers}
        />

        <MemberTable 
          members={members}
          filteredMembers={filteredMembers}
          selectedMembers={selectedMembers}
          toggleMemberSelection={onToggleSelect}
          selectAllMembers={onSelectAll}
          handleStatusChange={onStatusChange}
          handleDelete={onDelete}
        />

        <MemberPagination 
          filteredCount={filteredMembers.length}
          totalCount={members.length}
        />
      </div>
    </div>
  );
};

export default MembersContainer;
