
import { Plus, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { exportToPDF } from '@/utils/exportUtils';
import { Member } from '@/hooks/useMembers';

interface MemberHeaderProps {
  selectedCount?: number;
  onAddMember: () => void;
  onImport: () => void;
  members: Member[];
}

const MemberHeader = ({ selectedCount = 0, onAddMember, onImport, members = [] }: MemberHeaderProps) => {
  const handleExport = () => {
    if (!members || members.length === 0) {
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
          onClick={onImport}
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
          onClick={onAddMember}
        >
          <Plus size={16} />
          <span>Add Member</span>
        </Button>
      </div>
    </div>
  );
};

export default MemberHeader;
