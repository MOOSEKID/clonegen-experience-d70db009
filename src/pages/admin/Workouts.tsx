
import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Clipboard, 
  Target, 
  Plus, 
  Search, 
  FilterX,
  MoreVertical,
  Edit,
  Trash2,
  Calendar,
  ClipboardList
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useSupabaseWorkoutData } from '@/hooks/workouts/useSupabaseWorkoutData';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const AdminWorkouts = () => {
  const { 
    workoutPrograms, 
    isLoading, 
    getProgramExercises, 
    deleteWorkoutProgram 
  } = useSupabaseWorkoutData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
  const [programExercises, setProgramExercises] = useState([]);

  const filteredPrograms = workoutPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (program.description && program.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDifficulty = selectedDifficulty ? 
      program.difficulty_level === selectedDifficulty : true;
    
    return matchesSearch && matchesDifficulty;
  });

  const loadProgramExercises = async (programId: string) => {
    const exercises = await getProgramExercises(programId);
    setProgramExercises(exercises);
  };

  const handleExpandProgram = (programId: string) => {
    if (expandedProgram === programId) {
      setExpandedProgram(null);
      setProgramExercises([]);
    } else {
      setExpandedProgram(programId);
      loadProgramExercises(programId);
    }
  };

  const handleDeleteProgram = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the workout program "${name}"?`)) {
      await deleteWorkoutProgram(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Workouts</h1>
          <p className="text-gray-500">Create and manage workout programs for members</p>
        </div>
        <Button 
          className="bg-gym-orange hover:bg-gym-orange/90"
          onClick={() => toast.info('Create workout program functionality coming soon')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Program
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Workout Programs</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search programs..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {selectedDifficulty || "All Levels"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedDifficulty(null)}>
                    <FilterX className="mr-2 h-4 w-4" />
                    All Levels
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDifficulty('Beginner')}>
                    Beginner
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDifficulty('Intermediate')}>
                    Intermediate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDifficulty('Advanced')}>
                    Advanced
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 w-full">
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/4 mt-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPrograms.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clipboard className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium">No workout programs found</h3>
              <p className="mt-1">Try changing your search or create a new program.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPrograms.map((program) => (
                <Card key={program.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div 
                      className="p-4 cursor-pointer hover:bg-gray-50" 
                      onClick={() => handleExpandProgram(program.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{program.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{program.description}</p>
                          <div className="flex gap-2 mt-2">
                            {program.difficulty_level && (
                              <Badge variant="outline" className="bg-gray-100">
                                {program.difficulty_level}
                              </Badge>
                            )}
                            {program.duration_weeks && (
                              <Badge variant="outline" className="bg-gray-100">
                                {program.duration_weeks} {program.duration_weeks === 1 ? 'week' : 'weeks'}
                              </Badge>
                            )}
                            <Badge variant="outline" className="bg-gray-100">
                              {program.exercise_count} {program.exercise_count === 1 ? 'exercise' : 'exercises'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Button variant="ghost" size="icon" onClick={(e) => {
                            e.stopPropagation();
                            toast.info('Edit program functionality coming soon');
                          }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProgram(program.id, program.name);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
                        <span>Created by: {program.creator_name}</span>
                        {program.created_at && (
                          <span>
                            {format(new Date(program.created_at), 'MMM d, yyyy')}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {expandedProgram === program.id && (
                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <h4 className="text-sm font-medium mb-3">Exercises</h4>
                        {programExercises.length === 0 ? (
                          <p className="text-sm text-muted-foreground py-2">
                            No exercises added to this program yet.
                          </p>
                        ) : (
                          <div className="divide-y divide-gray-200">
                            {programExercises.map((item) => (
                              <div key={item.id} className="py-2">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h5 className="font-medium">{item.exercise?.name}</h5>
                                    <div className="text-sm text-muted-foreground">
                                      {item.sets && item.reps && (
                                        <span className="mr-3">{item.sets} sets × {item.reps} reps</span>
                                      )}
                                      {item.week_number && item.day_number && (
                                        <span>Week {item.week_number}, Day {item.day_number}</span>
                                      )}
                                    </div>
                                  </div>
                                  {item.exercise?.muscle_group && (
                                    <Badge variant="outline">
                                      {item.exercise.muscle_group}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="mt-4 flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => toast.info('Add exercise functionality coming soon')}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Exercise
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clipboard className="h-5 w-5 text-gym-orange mr-2" />
              Exercise Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Manage a comprehensive library of exercises with instructions and videos.
            </p>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => toast.info('Feature coming soon')}>
                Manage Exercises
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Dumbbell className="h-5 w-5 text-gym-orange mr-2" />
              Program Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Create reusable workout templates that can be assigned to multiple members.
            </p>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => toast.info('Feature coming soon')}>
                Manage Templates
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 text-gym-orange mr-2" />
              Progress Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Track member progress on assigned workout programs and fitness goals.
            </p>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => toast.info('Feature coming soon')}>
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminWorkouts;
