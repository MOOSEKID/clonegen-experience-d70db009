
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface SyncStaffProfilesButtonProps {
  className?: string;
}

const SyncStaffProfilesButton: React.FC<SyncStaffProfilesButtonProps> = ({ className }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSyncProfiles = async () => {
    setIsSyncing(true);
    
    try {
      // Get the current session
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) {
        throw new Error('Authentication required');
      }
      
      // Call the edge function
      const { data, error } = await supabase.functions.invoke('sync_missing_staff_profiles', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
        body: { role: 'trainer' }, // Default to trainer role for now
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Staff profile sync completed successfully',
        variant: 'default',
      });
      
    } catch (error) {
      console.error('Error syncing staff profiles:', error);
      toast({
        title: 'Error',
        description: 'Failed to sync staff profiles. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
  };
  
  return (
    <Button
      onClick={handleSyncProfiles}
      disabled={isSyncing}
      className={className}
      variant="outline"
    >
      <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
      {isSyncing ? 'Syncing...' : 'Sync Staff Profiles'}
    </Button>
  );
};

export default SyncStaffProfilesButton;
