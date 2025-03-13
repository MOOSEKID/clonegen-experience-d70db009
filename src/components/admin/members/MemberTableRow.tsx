
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
    <TableRow key={member.id} className="border-b border-gray-100">
      <TableCell className="px-4 py-4 w-[50px]">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-gym-orange focus:ring-gym-orange"
          checked={isSelected}
          onChange={() => onToggleSelect(member.id)}
        />
      </TableCell>
      <TableCell className="px-4 py-4 font-medium">{member.name}</TableCell>
      <TableCell className="px-4 py-4">
        <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
          {member.email}
        </a>
      </TableCell>
      <TableCell className="px-4 py-4">
        <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="text-blue-600 hover:underline">
          {member.phone}
        </a>
      </TableCell>
      <TableCell className="px-4 py-4">{member.membershipType}</TableCell>
      <TableCell className="px-4 py-4">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
          ${member.status === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'}`}
        >
          {member.status}
        </span>
      </TableCell>
      <TableCell className="px-4 py-4">{member.endDate}</TableCell>
      <TableCell className="px-4 py-4">{member.lastCheckin}</TableCell>
      <TableCell className="px-4 py-4 text-right">
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
