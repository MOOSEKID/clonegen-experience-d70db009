
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, ChangeEvent } from 'react';

interface MemberSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const MemberSearch = ({ searchTerm, onSearchChange }: MemberSearchProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search members..."
        className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gym-orange focus:border-transparent"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default MemberSearch;
