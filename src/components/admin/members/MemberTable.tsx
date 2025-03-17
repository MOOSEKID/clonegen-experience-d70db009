
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import MemberTableHeader from './MemberTableHeader';
import MemberTableRow from './MemberTableRow';

interface Member {
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

interface MemberTableProps {
  members: Member[];
  filteredMembers: Member[];
  currentMembers: Member[];
  selectedMembers: number[];
  toggleMemberSelection: (memberId: number) => void;
  selectAllMembers: () => void;
  handleStatusChange: (memberId: number, newStatus: string) => void;
  handleDelete: (memberId: number) => void;
}

const MemberTable = ({
  members,
  filteredMembers,
  currentMembers,
  selectedMembers,
  toggleMemberSelection,
  selectAllMembers,
  handleStatusChange,
  handleDelete
}: MemberTableProps) => {
  const allSelected = selectedMembers.length === filteredMembers.length && filteredMembers.length > 0;
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <MemberTableHeader 
          onSelectAll={selectAllMembers}
          allSelected={allSelected}
          hasMembers={members.length > 0}
        />
        <TableBody>
          {currentMembers.length > 0 ? (
            currentMembers.map((member) => (
              <MemberTableRow
                key={member.id}
                member={member}
                isSelected={selectedMembers.includes(member.id)}
                onToggleSelect={toggleMemberSelection}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                No members found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MemberTable;
