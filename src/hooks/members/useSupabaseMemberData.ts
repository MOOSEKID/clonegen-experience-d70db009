
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Member } from '@/types/memberTypes';
import { fetchMembers } from '@/services/memberService';

export const useSupabaseMemberData = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load members from Supabase on component mount
  useEffect(() => {
    const loadMembers = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMembers();
        console.log('Members loaded successfully:', data);
        setMembers(data);
      } catch (error) {
        console.error('Error loading members:', error);
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
        // Refresh the members list when changes occur
        const data = await fetchMembers();
        setMembers(data);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    members,
    isLoading,
    setMembers
  };
};
