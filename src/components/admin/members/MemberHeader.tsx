
import { Plus, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MemberHeaderProps {
  selectedCount?: number;
}

const MemberHeader = ({ selectedCount = 0 }: MemberHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Members</h1>
        <p className="text-gray-500">
          {selectedCount > 0 
            ? `${selectedCount} members selected` 
            : 'Manage your gym members'}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Upload size={16} />
          <span>Import</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Download size={16} />
          <span>Export</span>
        </Button>
        <Button 
          size="sm" 
          className="gap-2 bg-gym-orange hover:bg-gym-orange/90"
          onClick={() => {
            // In a real app, this would open a modal to add a new member
            // For now, we'll just show a toast message
            // toast.info('Add member functionality coming soon');
          }}
        >
          <Plus size={16} />
          <span>Add Member</span>
        </Button>
      </div>
    </div>
  );
};

export default MemberHeader;
