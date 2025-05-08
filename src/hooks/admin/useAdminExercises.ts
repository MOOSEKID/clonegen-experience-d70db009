
import { useState, useEffect } from 'react';

export interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  equipment: string;
  difficulty: string;
  mediaType: string;
  thumbnailUrl: string;
}

export const useAdminExercises = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadExercises = async () => {
      try {
        // Simulating API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in a real application, this would be fetched from an API
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

  const handleClearFilters = () => {
    setActiveTab('all');
    setSearchQuery('');
  };

  return {
    isLoading,
    error,
    exercises,
    filteredExercises,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    handleClearFilters
  };
};
