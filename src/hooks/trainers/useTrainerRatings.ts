
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface TrainerRating {
  id: string;
  trainer_id: string;
  member_id: string;
  member_name?: string;
  rating: number;
  review: string | null;
  trainer_response: string | null;
  is_flagged: boolean;
  created_at: string;
  updated_at: string;
}

export interface RatingSummary {
  averageRating: number;
  totalRatings: number;
  ratingDistribution: { [key: number]: number };
}

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
    const fetchRatings = async () => {
      if (!trainerId) {
        setRatings([]);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      
      try {
        // Fetch trainer ratings with member names
        const { data, error } = await supabase
          .from('trainer_ratings')
          .select(`
            *,
            members(first_name, last_name)
          `)
          .eq('trainer_id', trainerId)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        // Process data to include member names
        const processedData = data.map(item => ({
          ...item,
          member_name: item.members ? 
            `${item.members.first_name} ${item.members.last_name}` : 
            'Anonymous Member'
        }));
        
        setRatings(processedData);
        
        // Calculate summary statistics
        if (processedData.length > 0) {
          const totalRatings = processedData.length;
          const ratingSum = processedData.reduce((sum, item) => sum + item.rating, 0);
          const avgRating = ratingSum / totalRatings;
          
          // Count ratings by star level
          const distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
          processedData.forEach(item => {
            if (distribution[item.rating] !== undefined) {
              distribution[item.rating]++;
            }
          });
          
          setSummary({
            averageRating: parseFloat(avgRating.toFixed(1)),
            totalRatings,
            ratingDistribution: distribution
          });
        } else {
          setSummary({
            averageRating: 0,
            totalRatings: 0,
            ratingDistribution: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
          });
        }
      } catch (err) {
        console.error('Error fetching trainer ratings:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch trainer ratings'));
        
        // For development, use mock data if error occurs
        const mockRatings = Array(5).fill(0).map((_, i) => ({
          id: `mock-${i}`,
          trainer_id: trainerId,
          member_id: `member-${i}`,
          member_name: `Test Member ${i + 1}`,
          rating: Math.floor(Math.random() * 5) + 1,
          review: i % 2 === 0 ? `This is a test review ${i + 1}` : null,
          trainer_response: i === 0 ? 'Thank you for your feedback!' : null,
          is_flagged: i === 3, // One flagged review
          created_at: new Date(Date.now() - i * 86400000).toISOString(),
          updated_at: new Date(Date.now() - i * 86400000).toISOString()
        }));
        
        setRatings(mockRatings);
        
        // Mock summary
        setSummary({
          averageRating: 4.2,
          totalRatings: mockRatings.length,
          ratingDistribution: {1: 1, 2: 0, 3: 1, 4: 1, 5: 2}
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRatings();
    
    // Set up real-time subscription if trainerId exists
    if (trainerId) {
      const subscription = supabase
        .channel('trainer-ratings-changes')
        .on('postgres_changes', { 
            event: '*', 
            schema: 'public', 
            table: 'trainer_ratings',
            filter: `trainer_id=eq.${trainerId}`
        }, () => {
          fetchRatings();
        })
        .subscribe();
        
      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [trainerId]);
  
  // Add a rating
  const addRating = async (data: Omit<TrainerRating, 'id' | 'created_at' | 'updated_at' | 'is_flagged' | 'member_name'>) => {
    try {
      const { data: result, error } = await supabase
        .from('trainer_ratings')
        .insert(data)
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Rating submitted",
        description: "Your rating has been submitted successfully.",
      });
      
      return result;
    } catch (err) {
      console.error('Error adding rating:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit rating. Please try again.",
      });
      throw err;
    }
  };
  
  // Update a rating (trainer response or flag)
  const updateRating = async (id: string, data: Partial<TrainerRating>) => {
    try {
      const { error } = await supabase
        .from('trainer_ratings')
        .update(data)
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Rating updated",
        description: "The rating has been updated successfully.",
      });
      
      return true;
    } catch (err) {
      console.error('Error updating rating:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update rating. Please try again.",
      });
      throw err;
    }
  };
  
  // Flag a review as inappropriate
  const flagRating = async (id: string) => {
    return updateRating(id, { is_flagged: true });
  };
  
  // Add trainer response to a review
  const respondToRating = async (id: string, response: string) => {
    return updateRating(id, { trainer_response: response });
  };
  
  return {
    ratings,
    summary,
    isLoading,
    error,
    addRating,
    updateRating,
    flagRating,
    respondToRating
  };
};
