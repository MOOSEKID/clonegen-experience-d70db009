
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ExerciseSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

const ExerciseSearch = ({ searchQuery, onSearchChange, onSearchSubmit }: ExerciseSearchProps) => {
  return (
    <form onSubmit={onSearchSubmit} className="flex space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search exercises..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
};

export default ExerciseSearch;
