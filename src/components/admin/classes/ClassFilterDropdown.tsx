
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ClassFilterDropdownProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const ClassFilterDropdown = ({ currentFilter, onFilterChange }: ClassFilterDropdownProps) => {
  const filterLabels: Record<string, string> = {
    'all': 'All Classes',
    'yoga': 'Yoga',
    'hiit': 'HIIT',
    'strength': 'Strength',
    'cardio': 'Cardio',
    'pilates': 'Pilates',
    'available': 'Available',
    'full': 'Full',
    'waitlist': 'With Waitlist'
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter size={16} />
          <span>{filterLabels[currentFilter] || 'Filter'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>Filter Classes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => onFilterChange('all')}>
            All Classes
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>By Class Type</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onFilterChange('yoga')}>
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            Yoga
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange('hiit')}>
            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
            HIIT
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange('strength')}>
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
            Strength Training
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange('cardio')}>
            <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
            Cardio
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange('pilates')}>
            <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
            Pilates
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>By Availability</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onFilterChange('available')}>
            Available Spots
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange('full')}>
            Full Classes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange('waitlist')}>
            With Waitlist
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ClassFilterDropdown;
