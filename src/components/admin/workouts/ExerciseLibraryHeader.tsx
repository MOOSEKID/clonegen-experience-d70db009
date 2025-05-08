
import React from 'react';
import { Plus, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ExerciseLibraryHeaderProps {
  onImportExercises: () => void;
}

const ExerciseLibraryHeader = ({ onImportExercises }: ExerciseLibraryHeaderProps) => {
  const navigate = useNavigate();

  const handleAddExercise = () => {
    navigate('/admin/workouts/add-exercise');
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Exercise Library</h1>
        <p className="text-gray-500">Manage exercises with instructions and videos</p>
      </div>
      
      <div className="flex flex-wrap gap-3 w-full md:w-auto">
        <Button onClick={handleAddExercise}>
          <Plus className="mr-2 h-4 w-4" /> Add Exercise
        </Button>
        <Button variant="outline" onClick={onImportExercises}>
          <UploadCloud className="mr-2 h-4 w-4" /> Import Exercises
        </Button>
      </div>
    </div>
  );
};

export default ExerciseLibraryHeader;
