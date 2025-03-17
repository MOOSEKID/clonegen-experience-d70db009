
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface MemberSearchProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MemberSearch = ({ searchTerm, onSearchChange }: MemberSearchProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        className="pl-10 w-full"
        placeholder="Search members..."
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default MemberSearch;
