
import { Button } from '@/components/ui/button';

interface MemberBulkActionsProps {
  selectedMembers: string[]; // Changed from string[] to maintain consistency
  onBulkAction: (action: string) => void;
}

const MemberBulkActions = ({ selectedMembers, onBulkAction }: MemberBulkActionsProps) => {
  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => {
          const bulkMenu = document.getElementById('bulk-actions-dropdown');
          if (bulkMenu) {
            bulkMenu.classList.toggle('hidden');
          }
        }}
        className={`${selectedMembers.length > 0 ? 'text-orange-500 border-orange-500' : ''}`}
      >
        Bulk Actions
      </Button>
      
      <div id="bulk-actions-dropdown" className="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
        <div className="py-1">
          <button 
            className="block px-4 py-2 text-sm w-full text-left text-green-600 hover:bg-gray-100"
            onClick={() => onBulkAction('activate')}
          >
            Activate Members
          </button>
          <button 
            className="block px-4 py-2 text-sm w-full text-left text-red-600 hover:bg-gray-100"
            onClick={() => onBulkAction('deactivate')}
          >
            Deactivate Members
          </button>
          <hr className="my-1 border-gray-200" />
          <button 
            className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
            onClick={() => onBulkAction('export')}
          >
            Export Members
          </button>
          <button 
            className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
            onClick={() => onBulkAction('email')}
          >
            Send Email Reminder
          </button>
          <button 
            className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
            onClick={() => onBulkAction('sms')}
          >
            Send SMS Reminder
          </button>
          <hr className="my-1 border-gray-200" />
          <button 
            className="block px-4 py-2 text-sm w-full text-left text-red-600 hover:bg-gray-100"
            onClick={() => onBulkAction('delete')}
          >
            Delete Members
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberBulkActions;
