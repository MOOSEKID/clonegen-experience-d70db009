
import { supabase, getTable } from '@/integrations/supabase/client';
import { TrainerRating, RatingSummary, RatingServiceResult } from './types';
import { generateMockRatings, calculateMockSummary } from './mockData';
import { useToast } from '@/components/ui/use-toast';

export const fetchTrainerRatings = async (trainerId?: string): Promise<{
  ratings: TrainerRating[];
  summary: RatingSummary;
}> => {
  if (!trainerId) {
    return {
      ratings: [],
      summary: {
        averageRating: 0,
        totalRatings: 0,
        ratingDistribution: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
      }
    };
  }
  
  try {
    // Fetch trainer ratings
    const { data, error } = await getTable('trainer_ratings')
      .select('*')
      .eq('trainer_id', trainerId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    if (data && data.length > 0) {
      const ratings = data as unknown as TrainerRating[];
      
      // Calculate summary statistics
      const totalRatings = data.length;
      const ratingSum = data.reduce((sum, item: any) => sum + (item.rating || 0), 0);
      const avgRating = ratingSum / totalRatings;
      
      // Count ratings by star level
      const distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
      data.forEach((item: any) => {
        const rating = item.rating || 0;
        if (rating >= 1 && rating <= 5) {
          distribution[rating as keyof typeof distribution]++;
        }
      });
      
      const summary = {
        averageRating: parseFloat(avgRating.toFixed(1)),
        totalRatings,
        ratingDistribution: distribution
      };
      
      return { ratings, summary };
    } else {
      // For development, use mock data if no data is returned
      const mockRatings = generateMockRatings(trainerId);
      
      // Mock summary
      const mockSummary = calculateMockSummary(mockRatings);
      
      return { ratings: mockRatings, summary: mockSummary };
    }
  } catch (err) {
    console.error('Error fetching trainer ratings:', err);
    
    // For development, use mock data if error occurs
    const mockRatings = generateMockRatings(trainerId);
    
    // Mock summary
    const mockSummary = calculateMockSummary(mockRatings);
    
    return { ratings: mockRatings, summary: mockSummary };
  }
};

export const addRating = async (
  data: Omit<TrainerRating, 'id' | 'created_at' | 'updated_at' | 'is_flagged' | 'member_name'>
): Promise<RatingServiceResult> => {
  try {
    const { data: result, error } = await getTable('trainer_ratings')
      .insert(data as any)
      .select()
      .single();
      
    if (error) throw error;
    
    return {
      success: true,
      data: result as unknown as TrainerRating,
      message: "Rating submitted successfully."
    };
  } catch (err) {
    console.error('Error adding rating:', err);
    return {
      success: false,
      error: err instanceof Error ? err : new Error('Failed to submit rating'),
      message: "Failed to submit rating. Please try again."
    };
  }
};

export const updateRating = async (
  id: string,
  data: Partial<TrainerRating>
): Promise<RatingServiceResult> => {
  try {
    const { error } = await getTable('trainer_ratings')
      .update(data as any)
      .eq('id', id);
      
    if (error) throw error;
    
    return {
      success: true,
      message: "Rating updated successfully."
    };
  } catch (err) {
    console.error('Error updating rating:', err);
    return {
      success: false,
      error: err instanceof Error ? err : new Error('Failed to update rating'),
      message: "Failed to update rating. Please try again."
    };
  }
};

export const flagRating = async (id: string): Promise<RatingServiceResult> => {
  return updateRating(id, { is_flagged: true });
};

export const respondToRating = async (id: string, response: string): Promise<RatingServiceResult> => {
  return updateRating(id, { trainer_response: response });
};

export const subscribeToRatingChanges = (trainerId: string, callback: () => void) => {
  return supabase
    .channel('trainer-ratings-changes')
    .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'trainer_ratings',
        filter: `trainer_id=eq.${trainerId}`
    }, callback)
    .subscribe();
};
