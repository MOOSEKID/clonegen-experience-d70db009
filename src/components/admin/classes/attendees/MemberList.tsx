
import { MemberInfo } from '@/types/classTypes';
import MemberListItem from './MemberListItem';

interface MemberListProps {
  members: MemberInfo[];
  action: 'add' | 'remove';
  onAction: (memberId: number) => void;
  emptyMessage: string;
  searchTerm: string;
  isWaitlist?: boolean;
  classIsFull?: boolean;
}

const MemberList = ({ 
  members, 
  action, 
  onAction, 
  emptyMessage, 
  searchTerm, 
  isWaitlist = false,
  classIsFull = false
}: MemberListProps) => {
  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredMembers.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[300px] overflow-y-auto">
      {filteredMembers.map((member, index) => (
        <MemberListItem 
          key={member.id} 
          member={member} 
          action={action}
          onAction={onAction}
          waitlistPosition={isWaitlist ? index + 1 : undefined}
          classIsFull={classIsFull}
        />
      ))}
    </div>
  );
};

export default MemberList;
