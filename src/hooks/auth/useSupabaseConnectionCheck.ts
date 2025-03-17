
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface UseSupabaseConnectionCheckResult {
  fallbackMode: boolean;
  isCheckingConnection: boolean;
}

/**
 * Hook to check if Supabase is reachable and set fallback mode if needed
 */
export const useSupabaseConnectionCheck = (): UseSupabaseConnectionCheckResult => {
  const [fallbackMode, setFallbackMode] = useState(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState(true);

  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        console.log('Checking Supabase connection...');
        setIsCheckingConnection(true);
        
        const { data, error } = await supabase.from('profiles').select('count').limit(1);
        
        if (error) {
          console.error('Supabase connection error:', error);
          setFallbackMode(true);
          toast.warning('Using test authentication mode - Supabase is unreachable');
        } else {
          console.log('Supabase connection successful');
          setFallbackMode(false);
        }
      } catch (error) {
        console.error('Failed to connect to Supabase:', error);
        setFallbackMode(true);
        toast.warning('Using test authentication mode - Supabase is unreachable');
      } finally {
        setIsCheckingConnection(false);
      }
    };
    
    checkSupabaseConnection();
  }, []);

  return { fallbackMode, isCheckingConnection };
};

export default useSupabaseConnectionCheck;
