
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Lock, Info } from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isPremium: boolean;
  imageUrl?: string;
  videoUrl?: string;
}

interface ExerciseCardProps {
  exercise: Exercise;
  hasPremiumAccess: boolean;
}

const ExerciseCard = ({ exercise, hasPremiumAccess }: ExerciseCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isLocked = exercise.isPremium && !hasPremiumAccess;

  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow ${isLocked ? 'opacity-80' : ''}`}>
      <div className="relative">
        {exercise.imageUrl ? (
          <div className="h-48 w-full bg-gray-200 relative">
            <img 
              src={exercise.imageUrl} 
              alt={exercise.name} 
              className="h-full w-full object-cover" 
            />
            {exercise.isPremium && (
              <Badge className="absolute top-2 right-2 bg-gym-orange text-white">
                Premium
              </Badge>
            )}
          </div>
        ) : (
          <div className="h-32 bg-gradient-to-r from-gym-dark to-gray-800 flex items-center justify-center relative">
            <div className="rounded-full bg-white/20 p-3">
              <Play className="text-white h-6 w-6" />
            </div>
            {exercise.isPremium && (
              <Badge className="absolute top-2 right-2 bg-gym-orange text-white">
                Premium
              </Badge>
            )}
          </div>
        )}

        {isLocked && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <Lock className="h-8 w-8 text-white" />
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-lg">{exercise.name}</CardTitle>
        <CardDescription>
          <Badge variant="outline" className="mr-1">{exercise.targetMuscle}</Badge>
          <Badge variant="outline">{exercise.equipment}</Badge>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(exercise.difficulty)}`}>
            {exercise.difficulty}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        {isLocked ? (
          <Button variant="outline" className="w-full" disabled>
            <Lock className="mr-2 h-4 w-4" /> Premium Exercise
          </Button>
        ) : (
          <Button className="w-full">
            <Info className="mr-2 h-4 w-4" /> View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
