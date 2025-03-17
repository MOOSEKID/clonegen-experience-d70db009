
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
  selectedMembers?: string[];
  statusFilter?: string;
  membershipFilter?: string;
  onFilterChange?: (filter: string) => void;
  onStatusFilterChange?: (status: string) => void;
  onMembershipFilterChange?: (membership: string) => void;
}

const MemberFilters = ({ 
  selectedMembers = [], 
  statusFilter = 'All', 
  membershipFilter = 'All',
  onFilterChange,
  onStatusFilterChange,
  onMembershipFilterChange
}: MemberFiltersProps) => {
  const handleFilterClick = (filter: string) => {
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  const handleStatusFilterChange = (status: string) => {
    if (onStatusFilterChange) {
      onStatusFilterChange(status);
    }
  };

  const handleMembershipFilterChange = (membership: string) => {
    if (onMembershipFilterChange) {
      onMembershipFilterChange(membership);
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
          <DropdownMenuItem onClick={() => {
            handleFilterClick('all');
            handleStatusFilterChange('All');
          }}>
            All Members
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            handleFilterClick('active');
            handleStatusFilterChange('Active');
          }}>
            Active Members
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            handleFilterClick('inactive');
            handleStatusFilterChange('Inactive');
          }}>
            Inactive Members
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {
            handleFilterClick('premium');
            handleMembershipFilterChange('Premium');
          }}>
            Premium
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            handleFilterClick('standard');
            handleMembershipFilterChange('Standard');
          }}>
            Standard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            handleFilterClick('basic');
            handleMembershipFilterChange('Basic');
          }}>
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
