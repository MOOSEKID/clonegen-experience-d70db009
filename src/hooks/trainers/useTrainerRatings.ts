
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface TrainerRating {
  id: string;
  trainer_id: string;
  member_id: string;
  member_name?: string;
  rating: number;
  review?: string | null;
  trainer_response?: string | null;
  is_flagged: boolean;
  created_at: string;
  updated_at: string;
}

export const useTrainerRatings = (trainerId?: string) => {
  const [ratings, setRatings] = useState<TrainerRating[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRatings = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('trainer_ratings')
        .select(`
          *,
          members:member_id (name)
        `)
        .order('created_at', { ascending: false });
      
      if (trainerId) {
        query = query.eq('trainer_id', trainerId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;

      // Format the data to include member_name
      const formattedData = (data || []).map(item => ({
        ...item,
        member_name: item.members?.name || 'Unknown Member'
      }));
      
      setRatings(formattedData);
      
      // Calculate average rating
      if (formattedData.length > 0) {
        const sum = formattedData.reduce((acc, curr) => acc + curr.rating, 0);
        setAverageRating(parseFloat((sum / formattedData.length).toFixed(1)));
      }
    } catch (err) {
      console.error('Error fetching ratings:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch ratings'));
      toast.error('Failed to load ratings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();

    // Set up real-time listener for rating changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trainer_ratings'
        },
        () => {
          fetchRatings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [trainerId]);

  const addRating = async (newRating: Omit<TrainerRating, 'id' | 'created_at' | 'updated_at' | 'is_flagged' | 'member_name'>) => {
    try {
      const { error } = await supabase
        .from('trainer_ratings')
        .insert({
          ...newRating,
          is_flagged: false
        });
      
      if (error) throw error;
      
      toast.success('Rating submitted successfully');
      await fetchRatings();
    } catch (err) {
      console.error('Error adding rating:', err);
      toast.error('Failed to submit rating');
      throw err;
    }
  };

  const respondToRating = async (ratingId: string, response: string) => {
    try {
      const { error } = await supabase
        .from('trainer_ratings')
        .update({ trainer_response: response })
        .eq('id', ratingId);
      
      if (error) throw error;
      
      toast.success('Response submitted successfully');
      await fetchRatings();
    } catch (err) {
      console.error('Error responding to rating:', err);
      toast.error('Failed to submit response');
      throw err;
    }
  };

  const flagRating = async (ratingId: string, flagged: boolean) => {
    try {
      const { error } = await supabase
        .from('trainer_ratings')
        .update({ is_flagged: flagged })
        .eq('id', ratingId);
      
      if (error) throw error;
      
      toast.success(flagged ? 'Review flagged successfully' : 'Flag removed successfully');
      await fetchRatings();
    } catch (err) {
      console.error('Error flagging rating:', err);
      toast.error(flagged ? 'Failed to flag review' : 'Failed to remove flag');
      throw err;
    }
  };

  const deleteRating = async (ratingId: string) => {
    try {
      const { error } = await supabase
        .from('trainer_ratings')
        .delete()
        .eq('id', ratingId);
      
      if (error) throw error;
      
      toast.success('Rating deleted successfully');
      await fetchRatings();
    } catch (err) {
      console.error('Error deleting rating:', err);
      toast.error('Failed to delete rating');
      throw err;
    }
  };

  return {
    ratings,
    averageRating,
    isLoading,
    error,
    addRating,
    respondToRating,
    flagRating,
    deleteRating
  };
};
