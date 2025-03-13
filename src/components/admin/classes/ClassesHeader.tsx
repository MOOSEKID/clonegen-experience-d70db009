
import { Button } from '@/components/ui/button';
import { Plus, Filter, Bell, BellOff } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import ClassFilterDropdown from './ClassFilterDropdown';

interface ClassesHeaderProps {
  onAddClass: () => void;
  onFilterChange: (filter: string) => void;
  filterType: string;
  onToggleNotifications: () => boolean;
  notificationsEnabled: boolean;
}

const ClassesHeader = ({ 
  onAddClass, 
  onFilterChange, 
  filterType, 
  onToggleNotifications,
  notificationsEnabled 
}: ClassesHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Classes</h1>
        <p className="text-gray-500">Manage your gym class schedules and bookings</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <div className="flex items-center gap-2 mr-2">
          <span className="text-sm text-gray-600">Notifications:</span>
          <Switch 
            checked={notificationsEnabled}
            onCheckedChange={onToggleNotifications}
            className="data-[state=checked]:bg-gym-orange"
          />
          {notificationsEnabled ? 
            <Bell size={16} className="text-gym-orange" /> : 
            <BellOff size={16} className="text-gray-400" />
          }
        </div>
        
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
