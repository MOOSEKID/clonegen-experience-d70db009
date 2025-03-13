
import { Plus, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { exportToPDF } from '@/utils/exportUtils';

interface MemberHeaderProps {
  selectedCount?: number;
  onAddMember?: () => void;
  members?: any[];
}

const MemberHeader = ({ selectedCount = 0, onAddMember, members = [] }: MemberHeaderProps) => {
  const handleImport = () => {
    // In a real app, this would open a file upload dialog
    toast.info('Import functionality coming soon');
  };

  const handleExport = () => {
    if (!members || members.length === 0) {
      toast.error('No members to export');
      return;
    }

    // Export members data to PDF
    const columns = [
      { label: 'Name', key: 'name' },
      { label: 'Email', key: 'email' },
      { label: 'Phone', key: 'phone' },
      { label: 'Membership', key: 'membershipType' },
      { label: 'Status', key: 'status' }
    ];

    exportToPDF('Members List', members, columns);
    toast.success('Members exported to PDF');
  };

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
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={handleImport}
        >
          <Upload size={16} />
          <span>Import</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={handleExport}
        >
          <Download size={16} />
          <span>Export</span>
        </Button>
        <Button 
          size="sm" 
          className="gap-2 bg-gym-orange hover:bg-gym-orange/90"
          onClick={() => {
            if (onAddMember) {
              onAddMember();
            } else {
              toast.info('Add member functionality coming soon');
            }
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
