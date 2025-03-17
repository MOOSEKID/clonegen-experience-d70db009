
import React from 'react';
import { MoreHorizontal, CheckCircle, XCircle, Trash2, Edit, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface MemberActionsProps {
  memberId: string;
  status: string;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  onViewProfile: (id: string) => void;
}

const MemberActions = ({ 
  memberId, 
  status, 
  onStatusChange, 
  onDelete,
  onViewProfile 
}: MemberActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer" onClick={() => onViewProfile(memberId)}>
          <Eye className="mr-2 h-4 w-4" />
          <span>View Details</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => console.log(`Edit member ${memberId}`)}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {status === 'Active' ? (
          <DropdownMenuItem className="cursor-pointer" onClick={() => onStatusChange(memberId, 'Inactive')}>
            <XCircle className="mr-2 h-4 w-4" />
            <span>Deactivate</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="cursor-pointer" onClick={() => onStatusChange(memberId, 'Active')}>
            <CheckCircle className="mr-2 h-4 w-4" />
            <span>Activate</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="cursor-pointer text-red-600" onClick={() => onDelete(memberId)}>
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MemberActions;
