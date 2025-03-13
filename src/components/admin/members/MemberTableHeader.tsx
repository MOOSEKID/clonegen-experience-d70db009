
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
      <TableRow className="border-b border-gray-200 bg-gray-50">
        <TableHead className="w-[50px] px-4 py-3 text-left">
          {hasMembers && (
            <input 
              type="checkbox" 
              className="h-4 w-4 rounded border-gray-300 text-gym-orange focus:ring-gym-orange"
              checked={allSelected}
              onChange={onSelectAll}
            />
          )}
        </TableHead>
        <TableHead className="px-4 py-3 text-left font-medium text-gray-600">Name</TableHead>
        <TableHead className="px-4 py-3 text-left font-medium text-gray-600">Email</TableHead>
        <TableHead className="px-4 py-3 text-left font-medium text-gray-600">Phone</TableHead>
        <TableHead className="px-4 py-3 text-left font-medium text-gray-600">Membership</TableHead>
        <TableHead className="px-4 py-3 text-left font-medium text-gray-600">Status</TableHead>
        <TableHead className="px-4 py-3 text-left font-medium text-gray-600">End Date</TableHead>
        <TableHead className="px-4 py-3 text-left font-medium text-gray-600">Last Check-in</TableHead>
        <TableHead className="px-4 py-3 text-right font-medium text-gray-600">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default MemberTableHeader;
