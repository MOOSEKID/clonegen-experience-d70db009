
import { useState } from 'react';

// Sample exercise data structure
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

export const useExercises = () => {
  const [exercises] = useState<Exercise[]>([
    {
      id: '1',
      name: 'Barbell Bench Press',
      targetMuscle: 'Chest',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      isPremium: false,
      imageUrl: 'https://via.placeholder.com/300x200?text=Bench+Press'
    },
    {
      id: '2',
      name: 'Pull-ups',
      targetMuscle: 'Back',
      equipment: 'Pull-up Bar',
      difficulty: 'Intermediate',
      isPremium: false,
      imageUrl: 'https://via.placeholder.com/300x200?text=Pull-ups'
    },
    {
      id: '3',
      name: 'Barbell Squat',
      targetMuscle: 'Legs',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      isPremium: false,
      imageUrl: 'https://via.placeholder.com/300x200?text=Squat'
    },
    {
      id: '4',
      name: 'Dumbbell Shoulder Press',
      targetMuscle: 'Shoulders',
      equipment: 'Dumbbells',
      difficulty: 'Intermediate',
      isPremium: false,
      imageUrl: 'https://via.placeholder.com/300x200?text=Shoulder+Press'
    },
    {
      id: '5',
      name: 'Advanced Form: Front Squat',
      targetMuscle: 'Legs',
      equipment: 'Barbell',
      difficulty: 'Advanced',
      isPremium: true,
      videoUrl: 'https://example.com/front-squat-video'
    },
    {
      id: '6',
      name: 'Advanced Form: Clean and Jerk',
      targetMuscle: 'Full Body',
      equipment: 'Barbell',
      difficulty: 'Advanced',
      isPremium: true,
      videoUrl: 'https://example.com/clean-jerk-video'
    }
  ]);

  // In a real application, we would have additional functionality here
  // such as fetching from an API, filtering, etc.

  return {
    exercises,
    // Future methods could include:
    // addExercise, updateExercise, deleteExercise, etc.
  };
};
