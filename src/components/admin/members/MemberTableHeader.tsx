
import {
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface MemberTableHeaderProps {
  onSelectAll: () => void;
  allSelected: boolean;
  hasMembers: boolean;
}

const MemberTableHeader = ({ onSelectAll, allSelected, hasMembers }: MemberTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-12">
          {hasMembers && (
            <input 
              type="checkbox" 
              className="h-4 w-4 rounded border-gray-300 text-gym-orange focus:ring-gym-orange"
              checked={allSelected}
              onChange={onSelectAll}
            />
          )}
        </TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Phone</TableHead>
        <TableHead>Membership</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>End Date</TableHead>
        <TableHead>Last Check-in</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default MemberTableHeader;
