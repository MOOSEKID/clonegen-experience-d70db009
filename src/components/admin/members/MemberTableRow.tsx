
import {
  TableCell,
  TableRow,
} from '@/components/ui/table';
import MemberActions from './MemberActions';

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

interface MemberTableRowProps {
  member: Member;
  isSelected: boolean;
  onToggleSelect: (memberId: number) => void;
  onStatusChange: (memberId: number, newStatus: string) => void;
  onDelete: (memberId: number) => void;
}

const MemberTableRow = ({ 
  member, 
  isSelected, 
  onToggleSelect, 
  onStatusChange, 
  onDelete 
}: MemberTableRowProps) => {
  return (
    <TableRow key={member.id}>
      <TableCell>
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-gym-orange focus:ring-gym-orange"
          checked={isSelected}
          onChange={() => onToggleSelect(member.id)}
        />
      </TableCell>
      <TableCell className="font-medium">{member.name}</TableCell>
      <TableCell>{member.email}</TableCell>
      <TableCell>{member.phone}</TableCell>
      <TableCell>{member.membershipType}</TableCell>
      <TableCell>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
          ${member.status === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'}`}
        >
          {member.status}
        </span>
      </TableCell>
      <TableCell>{member.endDate}</TableCell>
      <TableCell>{member.lastCheckin}</TableCell>
      <TableCell className="text-right">
        <MemberActions 
          memberId={member.id} 
          status={member.status} 
          onStatusChange={onStatusChange} 
          onDelete={onDelete} 
        />
      </TableCell>
    </TableRow>
  );
};

export default MemberTableRow;
