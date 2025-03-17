
import { useState, useEffect } from 'react';
import { TrainerRating, RatingSummary } from './types';
import { 
  fetchTrainerRatings, 
  addRating,
  updateRating,
  flagRating,
  respondToRating,
  subscribeToRatingChanges
} from './ratingService';
import { useToast } from '@/components/ui/use-toast';

export const useTrainerRatings = (trainerId?: string) => {
  const [ratings, setRatings] = useState<TrainerRating[]>([]);
  const [summary, setSummary] = useState<RatingSummary>({
    averageRating: 0,
    totalRatings: 0,
    ratingDistribution: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadRatings = async () => {
      if (!trainerId) {
        setRatings([]);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      
      try {
        const { ratings: fetchedRatings, summary: fetchedSummary } = await fetchTrainerRatings(trainerId);
        setRatings(fetchedRatings);
        setSummary(fetchedSummary);
      } catch (err) {
        console.error('Error in useTrainerRatings:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch trainer ratings'));
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRatings();
    
    // Set up real-time subscription if trainerId exists
    if (trainerId) {
      const subscription = subscribeToRatingChanges(trainerId, loadRatings);
        
      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [trainerId]);
  
  // Add a rating
  const handleAddRating = async (data: Omit<TrainerRating, 'id' | 'created_at' | 'updated_at' | 'is_flagged' | 'member_name'>) => {
    const result = await addRating(data);
    
    if (result.success) {
      toast({
        title: "Rating submitted",
        description: result.message,
      });
      return result.data;
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
      });
      throw result.error;
    }
  };
  
  // Update a rating (trainer response or flag)
  const handleUpdateRating = async (id: string, data: Partial<TrainerRating>) => {
    const result = await updateRating(id, data);
    
    if (result.success) {
      toast({
        title: "Rating updated",
        description: result.message,
      });
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
      });
      throw result.error;
    }
  };
  
  // Flag a review as inappropriate
  const handleFlagRating = async (id: string) => {
    const result = await flagRating(id);
    
    if (result.success) {
      toast({
        title: "Review flagged",
        description: "The review has been flagged for moderation.",
      });
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
      });
      throw result.error;
    }
  };
  
  // Add trainer response to a review
  const handleRespondToRating = async (id: string, response: string) => {
    const result = await respondToRating(id, response);
    
    if (result.success) {
      toast({
        title: "Response added",
        description: "Your response has been added to the review.",
      });
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
      });
      throw result.error;
    }
  };
  
  return {
    ratings,
    summary,
    isLoading,
    error,
    addRating: handleAddRating,
    updateRating: handleUpdateRating,
    flagRating: handleFlagRating,
    respondToRating: handleRespondToRating
  };
};
