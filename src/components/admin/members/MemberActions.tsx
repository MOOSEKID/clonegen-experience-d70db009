
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MemberActionsProps {
  memberId: number;
  status: string;
  onStatusChange: (memberId: number, newStatus: string) => void;
  onDelete: (memberId: number) => void;
}

const MemberActions = ({ memberId, status, onStatusChange, onDelete }: MemberActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="px-2">
          <ChevronDown size={16} className="text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem onClick={() => console.log('View profile', memberId)}>
          View Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('Edit member', memberId)}>
          Edit Details
        </DropdownMenuItem>
        {status === 'Active' ? (
          <DropdownMenuItem onClick={() => onStatusChange(memberId, 'Inactive')} className="text-red-600">
            Deactivate Member
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => onStatusChange(memberId, 'Active')} className="text-green-600">
            Activate Member
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => console.log('Send email', memberId)}>
          Send Email
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('Send SMS', memberId)}>
          Send SMS
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('Log check-in', memberId)}>
          Log Check-in
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-600"
          onClick={() => onDelete(memberId)}
        >
          Delete Member
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MemberActions;
