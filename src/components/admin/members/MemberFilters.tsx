
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
  onFilterChange?: (filter: string) => void;
}

const MemberFilters = ({ selectedMembers, onFilterChange }: MemberFiltersProps) => {
  const handleFilterClick = (filter: string) => {
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

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
          <DropdownMenuItem onClick={() => handleFilterClick('all')}>
            All Members
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterClick('active')}>
            Active Members
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterClick('inactive')}>
            Inactive Members
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleFilterClick('premium')}>
            Premium
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterClick('standard')}>
            Standard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterClick('basic')}>
            Basic
          </DropdownMenuItem>
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
