
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type RoleOption = {
  value: string;
  label: string;
};

const roles: RoleOption[] = [
  { value: 'trainer', label: 'Trainer' },
  { value: 'manager', label: 'Manager' },
  { value: 'reception', label: 'Reception' },
  { value: 'support', label: 'Support' }
];

const SyncStaffProfilesButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("trainer");
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
        body: JSON.stringify({ role: selectedRole }), 
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Failed to sync ${selectedRole} profiles`);
      }

      toast({
        title: "Success",
        description: `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} profile sync completed successfully.`,
      });

      // Log the action in the audit log
      const { error: auditError } = await supabase
        .from('admin_audit_logs')
        .insert({
          admin_id: sessionData.session.user.id,
          action: "sync_profiles",
          details: { 
            role_synced: selectedRole, 
            triggered_by: sessionData.session.user.id 
          }
        });

      if (auditError) {
        console.error('Error logging audit action:', auditError);
      }

      // Optionally reload the page to show updated profiles
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error) {
      console.error('Sync error:', error);
      toast({
        title: "Error",
        description: error.message || `Failed to sync ${selectedRole} profiles. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select 
        value={selectedRole} 
        onValueChange={setSelectedRole}
        disabled={isLoading}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map(role => (
            <SelectItem key={role.value} value={role.value}>
              {role.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button 
        variant="outline" 
        onClick={handleSync} 
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        {isLoading ? 'Syncing...' : 'Sync Staff Profiles'}
      </Button>
    </div>
  );
};

export default SyncStaffProfilesButton;
