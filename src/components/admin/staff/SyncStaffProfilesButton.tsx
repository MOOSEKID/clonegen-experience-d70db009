
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw } from 'lucide-react';

const SyncStaffProfilesButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSync = async () => {
    setIsLoading(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to perform this action.",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch('https://qrjwfiurwvcsyrcpewsj.supabase.co/functions/v1/sync_missing_staff_profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionData.session.access_token}`,
        },
        body: JSON.stringify({ role: 'trainer' }), // Currently focusing on trainers
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to sync staff profiles');
      }

      toast({
        title: "Success",
        description: "Staff profile sync completed successfully.",
      });

      // Optionally reload the page to show updated profiles
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error) {
      console.error('Sync error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to sync staff profiles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleSync} 
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
      {isLoading ? 'Syncing...' : 'Sync Staff Profiles'}
    </Button>
  );
};

export default SyncStaffProfilesButton;
