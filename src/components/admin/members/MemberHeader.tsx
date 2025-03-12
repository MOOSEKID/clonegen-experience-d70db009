
import { Plus, Upload, Download } from 'lucide-react';
import { Button } from '@/components/Button';

const MemberHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Members</h1>
        <p className="text-gray-500">Manage your gym members</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button size="sm" variant="outline" className="gap-2">
          <Upload size={16} />
          <span>Import</span>
        </Button>
        <Button size="sm" variant="outline" className="gap-2">
          <Download size={16} />
          <span>Export</span>
        </Button>
        <Button size="sm" className="gap-2">
          <Plus size={16} />
          <span>Add Member</span>
        </Button>
      </div>
    </div>
  );
};

export default MemberHeader;
