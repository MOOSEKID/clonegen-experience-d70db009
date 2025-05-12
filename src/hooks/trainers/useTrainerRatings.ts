
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface TrainerRating {
  id: string;
  trainer_id: string;
  member_id: string;
  member_name: string;
  rating: number;
  review?: string | null;
  trainer_response?: string | null;
  is_flagged?: boolean;
  is_published?: boolean;
  created_at: string;
  updated_at: string;
}

export interface RatingSummary {
  averageRating: number;
  totalRatings: number;
  ratingDistribution: {
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
  };
}

export const useTrainerRatings = (trainerId?: string) => {
  const [ratings, setRatings] = useState<TrainerRating[]>([]);
  const [summary, setSummary] = useState<RatingSummary>({
    averageRating: 0,
    totalRatings: 0,
    ratingDistribution: {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    if (trainerId) {
      fetchRatings();
    } else {
      setIsLoading(false);
    }
  }, [trainerId]);
  
  const fetchRatings = async () => {
    if (!trainerId) return;
    
    setIsLoading(true);
    
    try {
      // Simulate fetching from DB - would be a real fetch in production
      // This is mocked data for the demo
      
      // Give it a delay to simulate a network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockRatings: TrainerRating[] = [
        {
          id: '1',
          trainer_id: trainerId,
          member_id: 'mem1',
          member_name: 'Alex Johnson',
          rating: 5,
          review: 'John is an amazing trainer! He helped me achieve my fitness goals within just 3 months. Highly recommended.',
          created_at: '2023-01-15T10:30:00Z',
          updated_at: '2023-01-15T10:30:00Z'
        },
        {
          id: '2',
          trainer_id: trainerId,
          member_id: 'mem2',
          member_name: 'Sarah Miller',
          rating: 4,
          review: 'Very knowledgeable and professional. Helped me improve my form significantly.',
          trainer_response: 'Thank you Sarah! It\'s been great working with you on your form and technique.',
          created_at: '2023-02-20T15:45:00Z',
          updated_at: '2023-02-21T09:15:00Z'
        },
        {
          id: '3',
          trainer_id: trainerId,
          member_id: 'mem3',
          member_name: 'Michael Brown',
          rating: 5,
          review: 'Best trainer I\'ve ever had. Really understands how to customize workouts for individual needs.',
          created_at: '2023-03-05T11:20:00Z',
          updated_at: '2023-03-05T11:20:00Z'
        }
      ];
      
      // Calculate summary
      const mockSummary: RatingSummary = {
        averageRating: 4.7,
        totalRatings: 3,
        ratingDistribution: {
          '1': 0,
          '2': 0, 
          '3': 0,
          '4': 1,
          '5': 2
        }
      };
      
      setRatings(mockRatings);
      setSummary(mockSummary);
    } catch (error) {
      console.error('Error fetching ratings:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch trainer ratings."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const addRating = async (ratingData: {
    trainer_id: string;
    member_id: string;
    rating: number;
    review?: string | null;
  }) => {
    try {
      // Would actually save to DB in production
      const newRating: TrainerRating = {
        id: `new-${Date.now()}`,
        trainer_id: ratingData.trainer_id,
        member_id: ratingData.member_id,
        member_name: 'Current User', // Would be fetched from auth context
        rating: ratingData.rating,
        review: ratingData.review,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Update state
      setRatings(prev => [newRating, ...prev]);
      
      // Update summary
      const newTotal = summary.totalRatings + 1;
      const newAvg = ((summary.averageRating * summary.totalRatings) + ratingData.rating) / newTotal;
      const newDist = {...summary.ratingDistribution};
      // Convert number to string key
      const ratingKey = String(ratingData.rating) as keyof typeof newDist;
      newDist[ratingKey] += 1;
      
      setSummary({
        averageRating: parseFloat(newAvg.toFixed(1)),
        totalRatings: newTotal,
        ratingDistribution: newDist
      });
      
      toast({
        title: "Rating submitted",
        description: "Thank you for your feedback!"
      });
      
      return newRating;
    } catch (error) {
      console.error('Error adding rating:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit rating. Please try again."
      });
      throw error;
    }
  };
  
  const respondToRating = async (ratingId: string, response: string) => {
    try {
      // Update state first for optimistic UI
      setRatings(prev => prev.map(rating => 
        rating.id === ratingId 
          ? { ...rating, trainer_response: response, updated_at: new Date().toISOString() }
          : rating
      ));
      
      // Would update in DB in production
      
      toast({
        title: "Response saved",
        description: "Your response has been saved successfully."
      });
      
      return true;
    } catch (error) {
      console.error('Error responding to rating:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save response. Please try again."
      });
      
      // Revert state on error
      fetchRatings();
      return false;
    }
  };
  
  const flagRating = async (ratingId: string) => {
    try {
      // Update state first for optimistic UI
      setRatings(prev => prev.map(rating => 
        rating.id === ratingId 
          ? { ...rating, is_flagged: true, updated_at: new Date().toISOString() }
          : rating
      ));
      
      // Would update in DB in production
      
      toast({
        title: "Rating flagged",
        description: "This rating has been flagged for review."
      });
      
      return true;
    } catch (error) {
      console.error('Error flagging rating:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to flag rating. Please try again."
      });
      
      // Revert state on error
      fetchRatings();
      return false;
    }
  };
  
  return {
    ratings,
    summary,
    isLoading,
    addRating,
    respondToRating,
    flagRating,
    fetchRatings
  };
};
