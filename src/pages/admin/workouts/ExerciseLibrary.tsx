
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, UploadCloud } from 'lucide-react';

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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search exercises..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 w-full overflow-x-auto flex-nowrap grid-cols-7 sm:grid md:max-w-md">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="chest">Chest</TabsTrigger>
              <TabsTrigger value="back">Back</TabsTrigger>
              <TabsTrigger value="legs">Legs</TabsTrigger>
              <TabsTrigger value="shoulders">Shoulders</TabsTrigger>
              <TabsTrigger value="arms">Arms</TabsTrigger>
              <TabsTrigger value="core">Core</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              {filteredExercises.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredExercises.map(exercise => (
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
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button size="sm">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No exercises found matching your criteria.</p>
                  <Button variant="outline" className="mt-4">
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseLibrary;
