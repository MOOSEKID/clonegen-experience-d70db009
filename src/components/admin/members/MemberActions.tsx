
import { CheckCircle, XCircle, Edit, Trash2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/Button';
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
        <Button variant="ghost" size="sm">
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        {status === 'Active' ? (
          <DropdownMenuItem onClick={() => onStatusChange(memberId, 'Inactive')}>
            <XCircle className="mr-2 h-4 w-4" />
            <span>Mark Inactive</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => onStatusChange(memberId, 'Active')}>
            <CheckCircle className="mr-2 h-4 w-4" />
            <span>Mark Active</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-600"
          onClick={() => onDelete(memberId)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MemberActions;
