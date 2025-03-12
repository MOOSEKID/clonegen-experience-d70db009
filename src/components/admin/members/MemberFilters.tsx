
import { Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface MemberFiltersProps {
  selectedMembers: number[];
}

const MemberFilters = ({ selectedMembers }: MemberFiltersProps) => {
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter size={16} />
            <span>Filter</span>
            <ChevronDown size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>All Members</DropdownMenuItem>
          <DropdownMenuItem>Active Members</DropdownMenuItem>
          <DropdownMenuItem>Inactive Members</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Premium</DropdownMenuItem>
          <DropdownMenuItem>Standard</DropdownMenuItem>
          <DropdownMenuItem>Basic</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => {
          if (selectedMembers.length > 0) {
            toast.success(`${selectedMembers.length} members selected`);
          } else {
            toast.error('No members selected');
          }
        }}
      >
        Bulk Actions
      </Button>
    </div>
  );
};

export default MemberFilters;
