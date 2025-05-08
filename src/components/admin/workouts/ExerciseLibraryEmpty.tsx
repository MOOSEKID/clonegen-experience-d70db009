
import React from 'react';
import { Button } from '@/components/ui/button';

interface ExerciseLibraryEmptyProps {
  onClearFilters: () => void;
}

const ExerciseLibraryEmpty = ({ onClearFilters }: ExerciseLibraryEmptyProps) => {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500">No exercises found matching your criteria.</p>
      <Button variant="outline" className="mt-4" onClick={onClearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

export default ExerciseLibraryEmpty;
