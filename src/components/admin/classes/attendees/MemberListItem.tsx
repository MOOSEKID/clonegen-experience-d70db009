
import { MemberInfo } from '@/types/classTypes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface MemberListItemProps {
  member: MemberInfo;
  action: 'add' | 'remove';
  onAction: (memberId: number) => void;
  waitlistPosition?: number;
  classIsFull?: boolean;
}

const MemberListItem = ({ 
  member, 
  action, 
  onAction, 
  waitlistPosition, 
  classIsFull 
}: MemberListItemProps) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white border rounded-md">
      <div>
        <div className="font-medium flex items-center">
          {member.name}
          {waitlistPosition !== undefined && (
            <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 border-amber-200">
              #{waitlistPosition} in line
            </Badge>
          )}
        </div>
        <div className="text-sm text-gray-500">{member.email}</div>
      </div>
      {action === 'remove' ? (
        <Button 
          variant="ghost" 
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => onAction(member.id)}
        >
          <X size={16} />
          <span className="ml-1">Remove</span>
        </Button>
      ) : (
        <Button 
          variant="ghost" 
          size="sm"
          className="text-green-600 hover:text-green-800 hover:bg-green-50"
          onClick={() => onAction(member.id)}
        >
          <Plus size={16} />
          <span className="ml-1">{classIsFull ? 'Add to Waitlist' : 'Enroll'}</span>
        </Button>
      )}
    </div>
  );
};

export default MemberListItem;
