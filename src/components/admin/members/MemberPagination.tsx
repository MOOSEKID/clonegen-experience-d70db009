
import { Button } from '@/components/Button';

interface MemberPaginationProps {
  filteredCount: number;
  totalCount: number;
}

const MemberPagination = ({ filteredCount, totalCount }: MemberPaginationProps) => {
  return (
    <div className="p-4 border-t border-gray-200 flex justify-between items-center">
      <div className="text-sm text-gray-500">
        Showing {filteredCount} of {totalCount} members
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button variant="outline" size="sm" disabled>
          Next
        </Button>
      </div>
    </div>
  );
};

export default MemberPagination;
