
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Member } from '@/types/memberTypes';
import { mockMembers } from '@/data/memberData';

// Fall back to mock data instead of using Supabase
export const useSupabaseMemberData = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Load mock members data on component mount
  useEffect(() => {
    const loadMembers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Use mock data instead of fetching from Supabase
        console.log('Loading mock members data:', mockMembers);
        // Small delay to simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));
        setMembers(mockMembers);
      } catch (error) {
        console.error('Error loading members:', error);
        setError(error instanceof Error ? error : new Error('Failed to load members'));
        toast.error('Failed to load members');
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
    
    // Mock subscription - just set to true
    setIsSubscribed(true);
    
    return () => {
      console.log('Cleaning up subscription');
    };
  }, []);

  return {
    members,
    isLoading,
    error,
    isSubscribed,
    setMembers
  };
};
