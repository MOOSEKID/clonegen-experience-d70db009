
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileEdit } from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  equipment: string;
  difficulty: string;
  mediaType: string;
  thumbnailUrl: string;
}

interface ExerciseGridProps {
  exercises: Exercise[];
}

const ExerciseGrid = ({ exercises }: ExerciseGridProps) => {
  if (exercises.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No exercises found matching your criteria.</p>
        <Button variant="outline" className="mt-4">
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {exercises.map(exercise => (
        <Card key={exercise.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="relative aspect-video bg-gray-100">
            <img 
              src={exercise.thumbnailUrl} 
              alt={exercise.name}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="pt-4">
            <h3 className="font-medium text-lg">{exercise.name}</h3>
            <div className="flex flex-wrap mt-2 gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {exercise.targetMuscle}
              </Badge>
              <Badge variant="outline" className="bg-gray-50">
                {exercise.equipment}
              </Badge>
              <Badge variant="outline" className={
                exercise.difficulty === 'Beginner' ? 'bg-green-50 text-green-700' :
                exercise.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-700' :
                'bg-red-50 text-red-700'
              }>
                {exercise.difficulty}
              </Badge>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" size="sm">
                <FileEdit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExerciseGrid;
