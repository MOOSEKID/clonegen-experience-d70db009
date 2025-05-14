
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dumbbell, Clock, Star, Lock } from 'lucide-react';

interface WorkoutProgram {
  id: string;
  name: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: string;
  category: string;
  isPremium: boolean;
  imageUrl?: string;
}

interface WorkoutProgramCardProps {
  program: WorkoutProgram;
  hasPremiumAccess: boolean;
}

const WorkoutProgramCard = ({ program, hasPremiumAccess }: WorkoutProgramCardProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isLocked = program.isPremium && !hasPremiumAccess;

  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow ${isLocked ? 'opacity-80' : ''}`}>
      {program.imageUrl ? (
        <div className="h-48 w-full bg-gray-200 relative">
          <img 
            src={program.imageUrl} 
            alt={program.name} 
            className="h-full w-full object-cover" 
          />
          {program.isPremium && (
            <Badge className="absolute top-2 right-2 bg-gym-orange text-white">
              Premium
            </Badge>
          )}
        </div>
      ) : (
        <div className="h-32 bg-gradient-to-r from-gray-800 to-gym-dark flex items-center justify-center relative">
          <Dumbbell className="text-white h-12 w-12 opacity-50" />
          {program.isPremium && (
            <Badge className="absolute top-2 right-2 bg-gym-orange text-white">
              Premium
            </Badge>
          )}
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{program.name}</CardTitle>
        </div>
        <CardDescription>{program.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-gym-orange" />
            <span className={`px-2 py-0.5 rounded-full text-xs ${getLevelColor(program.level)}`}>
              {program.level}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gym-orange" />
            <span>{program.durationMinutes}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        {isLocked ? (
          <Button variant="outline" className="w-full" disabled>
            <Lock className="mr-2 h-4 w-4" /> Requires Premium
          </Button>
        ) : (
          <Button className="w-full">Start Workout</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WorkoutProgramCard;
