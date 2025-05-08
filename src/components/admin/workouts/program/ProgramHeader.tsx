
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProgramHeaderProps {
  onCreateProgram: () => void;
}

const ProgramHeader = ({ onCreateProgram }: ProgramHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Workout Programs</h1>
        <p className="text-gray-500">Create and manage workout programs for members</p>
      </div>
      
      <Button onClick={onCreateProgram}>
        <Plus className="mr-2 h-4 w-4" /> Create Program
      </Button>
    </div>
  );
};

export default ProgramHeader;
