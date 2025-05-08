
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exercises, setExercises] = useState<any[]>([]);
  
  useEffect(() => {
    const loadExercises = async () => {
      try {
        // Simulating API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setExercises(mockExercises);
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading exercises:", err);
        setError("Failed to load exercises. Please try again.");
        setIsLoading(false);
      }
    };
    
    loadExercises();
  }, []);

  const filteredExercises = exercises.filter(exercise => {
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
    // This would trigger an API call in a real app
  };

  const handleAddExercise = () => {
    navigate('/admin/workouts/add-exercise');
  };

  const handleImportExercises = () => {
    toast.info("Import functionality would be implemented here");
  };

  const handleClearFilters = () => {
    setActiveTab('all');
    setSearchQuery('');
  };

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Exercise Library</h1>
            <p className="text-gray-500">Manage exercises with instructions and videos</p>
          </div>
        </div>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-center max-w-md">
              <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Exercises</h2>
              <p className="text-gray-500 mb-6">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Exercise Library</h1>
          <p className="text-gray-500">Manage exercises with instructions and videos</p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <Button onClick={handleAddExercise}>
            <Plus className="mr-2 h-4 w-4" /> Add Exercise
          </Button>
          <Button variant="outline" onClick={handleImportExercises}>
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
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <Skeleton className="h-[200px] w-full" />
                    <div className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <div className="flex flex-wrap mt-2 gap-2">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <div className="flex justify-between mt-4">
                        <Skeleton className="h-8 w-[70px]" />
                        <Skeleton className="h-8 w-[100px]" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {filteredExercises.length > 0 ? (
                  <ExerciseGrid exercises={filteredExercises} />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No exercises found matching your criteria.</p>
                    <Button variant="outline" className="mt-4" onClick={handleClearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseLibrary;
