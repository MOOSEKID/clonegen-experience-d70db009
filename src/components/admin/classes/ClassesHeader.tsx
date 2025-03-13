
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import ClassFilterDropdown from './ClassFilterDropdown';

interface ClassesHeaderProps {
  onAddClass: () => void;
  onFilterChange: (filter: string) => void;
  filterType: string;
}

const ClassesHeader = ({ onAddClass, onFilterChange, filterType }: ClassesHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Classes</h1>
        <p className="text-gray-500">Manage your gym class schedules and bookings</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <ClassFilterDropdown 
          currentFilter={filterType}
          onFilterChange={onFilterChange}
        />
        <Button 
          size="sm" 
          className="gap-2 bg-gym-orange hover:bg-gym-orange/90"
          onClick={onAddClass}
        >
          <Plus size={16} />
          <span>Add Class</span>
        </Button>
      </div>
    </div>
  );
};

export default ClassesHeader;
