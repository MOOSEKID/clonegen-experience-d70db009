
import MemberSearch from './MemberSearch';
import MemberFilters from './MemberFilters';

interface MembersToolbarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedMembers: number[];
}

const MembersToolbar = ({ 
  searchTerm, 
  onSearchChange, 
  selectedMembers 
}: MembersToolbarProps) => {
  return (
    <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
      <MemberSearch searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <MemberFilters selectedMembers={selectedMembers} />
    </div>
  );
};

export default MembersToolbar;
