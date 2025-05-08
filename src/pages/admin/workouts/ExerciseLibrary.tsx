
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import ExerciseSearch from '@/components/admin/workouts/ExerciseSearch';
import ExerciseTabs from '@/components/admin/workouts/ExerciseTabs';
import ExerciseGrid from '@/components/admin/workouts/ExerciseGrid';

const mockExercises = [
  {
    id: '1',
    name: 'Barbell Bench Press',
    targetMuscle: 'Chest',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    mediaType: 'video',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Bench+Press'
  },
  {
    id: '2',
    name: 'Pull-ups',
    targetMuscle: 'Back',
    equipment: 'Pull-up Bar',
    difficulty: 'Intermediate',
    mediaType: 'video',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Pull-ups'
  },
  {
    id: '3',
    name: 'Barbell Squat',
    targetMuscle: 'Legs',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    mediaType: 'video',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Squat'
  },
  {
    id: '4',
    name: 'Dumbbell Shoulder Press',
    targetMuscle: 'Shoulders',
    equipment: 'Dumbbells',
    difficulty: 'Intermediate',
    mediaType: 'video',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Shoulder+Press'
  },
  {
    id: '5',
    name: 'Deadlift',
    targetMuscle: 'Back',
    equipment: 'Barbell',
    difficulty: 'Advanced',
    mediaType: 'video',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Deadlift'
  },
  {
    id: '6',
    name: 'Bicep Curls',
    targetMuscle: 'Arms',
    equipment: 'Dumbbells',
    difficulty: 'Beginner',
    mediaType: 'video',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Bicep+Curls'
  }
];

const ExerciseLibrary = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredExercises = mockExercises.filter(exercise => {
    // Filter by tab
    if (activeTab !== 'all' && exercise.targetMuscle.toLowerCase() !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !exercise.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleSearchSubmit = () => {
    console.log("Search submitted for:", searchQuery);
    // In a real app, this might trigger an API call
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Exercise Library</h1>
          <p className="text-gray-500">Manage exercises with instructions and videos</p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Exercise
          </Button>
          <Button variant="outline">
            <UploadCloud className="mr-2 h-4 w-4" /> Import Exercises
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <ExerciseSearch 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearchSubmit}
          />

          <ExerciseTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          <TabsContent value={activeTab} className="mt-0">
            <ExerciseGrid exercises={filteredExercises} />
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseLibrary;
