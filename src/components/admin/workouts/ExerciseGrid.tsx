
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileEdit, Eye } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  equipment: string;
  difficulty: string;
  mediaType: string;
  thumbnailUrl: string;
  description?: string;
  instructions?: string;
}

interface ExerciseGridProps {
  exercises: Exercise[];
}

const ExerciseGrid = ({ exercises }: ExerciseGridProps) => {
  const navigate = useNavigate();
  const [viewingExercise, setViewingExercise] = useState<Exercise | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
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

  const handleViewDetails = (exercise: Exercise) => {
    setViewingExercise(exercise);
    setDialogOpen(true);
  };

  const handleEditExercise = (id: string) => {
    // In a real application, you'd navigate to the edit page with the exercise ID
    navigate(`/admin/workouts/add-exercise?edit=${id}`);
  };

  return (
    <>
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
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditExercise(exercise.id)}
                >
                  <FileEdit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleViewDetails(exercise)}
                >
                  <Eye className="h-4 w-4 mr-2" /> View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {viewingExercise && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{viewingExercise.name}</DialogTitle>
              <DialogDescription>Exercise details and instructions</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                <img 
                  src={viewingExercise.thumbnailUrl} 
                  alt={viewingExercise.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {viewingExercise.targetMuscle}
                </Badge>
                <Badge variant="outline" className="bg-gray-50">
                  {viewingExercise.equipment}
                </Badge>
                <Badge variant="outline" className={
                  viewingExercise.difficulty === 'Beginner' ? 'bg-green-50 text-green-700' :
                  viewingExercise.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-red-50 text-red-700'
                }>
                  {viewingExercise.difficulty}
                </Badge>
              </div>

              <div>
                <h3 className="font-medium mb-1">Description</h3>
                <p className="text-gray-600">
                  {viewingExercise.description || 'A compound movement targeting the chest, shoulders, and triceps.'}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-1">Instructions</h3>
                <ol className="list-decimal pl-5 space-y-1 text-gray-600">
                  {(viewingExercise.instructions || 
                   "1. Lie on a bench with feet flat on the floor.\n" +
                   "2. Grip the barbell slightly wider than shoulder width.\n" +
                   "3. Lower the bar to your chest.\n" +
                   "4. Press the bar back to the starting position."
                  ).split('\n').map((step, index) => (
                    <li key={index}>{step.replace(/^\d+\.\s/, '')}</li>
                  ))}
                </ol>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button 
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setDialogOpen(false);
                    handleEditExercise(viewingExercise.id);
                  }}
                >
                  Edit Exercise
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ExerciseGrid;
