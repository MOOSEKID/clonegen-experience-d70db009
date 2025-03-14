
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Member } from '@/types/memberTypes';
import { fetchMembers } from '@/services/memberService';

export const useSupabaseMemberData = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Load members from Supabase on component mount
  useEffect(() => {
    const loadMembers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMembers();
        console.log('Members loaded successfully:', data);
        setMembers(data);
      } catch (error) {
        console.error('Error loading members:', error);
        setError(error instanceof Error ? error : new Error('Failed to load members'));
        toast.error('Failed to load members');
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('public:members')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'members' 
      }, async (payload) => {
        console.log('Real-time update received:', payload);
        try {
          // Refresh the members list when changes occur
          const data = await fetchMembers();
          console.log('Members refreshed after real-time update:', data);
          setMembers(data);
        } catch (refreshError) {
          console.error('Error refreshing members after real-time update:', refreshError);
          // Don't show toast here to avoid spamming user with errors
        }
      })
      .subscribe((status) => {
        console.log('Supabase channel status:', status);
        setIsSubscribed(status === 'SUBSCRIBED');
      });

    return () => {
      console.log('Cleaning up Supabase channel subscription');
      supabase.removeChannel(channel);
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
