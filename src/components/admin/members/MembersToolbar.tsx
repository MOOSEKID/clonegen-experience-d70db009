
import { Filter } from 'lucide-react';
import MemberSearch from './MemberSearch';
import MemberBulkActions from './MemberBulkActions';
import { Button } from '@/components/ui/button';

interface MembersToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedMembers: string[]; // Changed from number[] to string[]
  onFilterChange: (filter: string) => void;
  onBulkAction: (action: string) => void;
  filterType: string;
}

const MembersToolbar = ({ 
  searchTerm, 
  onSearchChange, 
  selectedMembers,
  onFilterChange,
  onBulkAction,
  filterType
}: MembersToolbarProps) => {
  return (
    <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
      <MemberSearch searchTerm={searchTerm} onSearchChange={onSearchChange} />
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => {
            const filterMenu = document.getElementById('filter-dropdown');
            if (filterMenu) {
              filterMenu.classList.toggle('hidden');
            }
          }}
        >
          <Filter size={16} />
          <span>Filter</span>
          <span className="ml-1">▼</span>
        </Button>
        
        <div id="filter-dropdown" className="hidden absolute right-40 top-64 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="py-1">
            <button 
              className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${filterType === 'all' ? 'bg-gray-100' : ''}`}
              onClick={() => onFilterChange('all')}
            >
              All Members
            </button>
            <button 
              className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${filterType === 'active' ? 'bg-gray-100' : ''}`}
              onClick={() => onFilterChange('active')}
            >
              Active Members
            </button>
            <button 
              className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${filterType === 'inactive' ? 'bg-gray-100' : ''}`}
              onClick={() => onFilterChange('inactive')}
            >
              Inactive Members
            </button>
            <hr className="my-1 border-gray-200" />
            <button 
              className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${filterType === 'premium' ? 'bg-gray-100' : ''}`}
              onClick={() => onFilterChange('premium')}
            >
              Premium
            </button>
            <button 
              className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${filterType === 'standard' ? 'bg-gray-100' : ''}`}
              onClick={() => onFilterChange('standard')}
            >
              Standard
            </button>
            <button 
              className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${filterType === 'basic' ? 'bg-gray-100' : ''}`}
              onClick={() => onFilterChange('basic')}
            >
              Basic
            </button>
          </div>
        </div>
        
        <MemberBulkActions 
          selectedMembers={selectedMembers} 
          onBulkAction={onBulkAction} 
        />
      </div>
    </div>
  );
};

export default MembersToolbar;
