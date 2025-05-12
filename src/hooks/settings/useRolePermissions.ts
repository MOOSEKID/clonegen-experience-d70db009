
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface Permission {
  id: string;
  resource: string;
  action: 'view' | 'create' | 'edit' | 'delete';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  created_at?: string;
  updated_at?: string;
}

export const useRolePermissions = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  // Available system resources that can have permissions set
  const resources = [
    { id: 'members', name: 'Members' },
    { id: 'staff', name: 'Staff' },
    { id: 'classes', name: 'Classes' },
    { id: 'payments', name: 'Payments & Invoices' },
    { id: 'reports', name: 'Reports' },
    { id: 'settings', name: 'Settings' },
    { id: 'shop', name: 'Shop & Products' },
  ];

  // Available permission actions
  const actions = [
    { id: 'view', name: 'View' },
    { id: 'create', name: 'Create' },
    { id: 'edit', name: 'Edit' },
    { id: 'delete', name: 'Delete' },
  ];

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      // Mock data for now - in a real implementation, this would fetch from the database
      const { data, error } = await supabase
        .from('settings_roles')
        .select('*')
        .single();
      
      if (error) {
        console.log('No roles found or error fetching roles');
        setRoles([]);
      } else if (data) {
        // Parse the JSON roles from the database with proper type casting
        const parsedRoles = data.roles ? (JSON.parse(JSON.stringify(data.roles)) as Role[]) : [];
        setRoles(parsedRoles);
      } else {
        setRoles([]);
      }
    } catch (err) {
      console.error('Error fetching roles:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch roles'));
      setRoles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createRole = async (roleData: { name: string; description: string }) => {
    try {
      const newRole: Role = {
        ...roleData,
        id: crypto.randomUUID(),
        permissions: [],
      };
      
      // Add to local state first for immediate UI update
      setRoles(prevRoles => [...prevRoles, newRole]);
      
      // Update in database
      const { error } = await supabase
        .from('settings_roles')
        .upsert({ 
          id: crypto.randomUUID(), 
          roles: JSON.stringify([...roles, newRole]) 
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast({
        title: "Role created",
        description: `The role "${roleData.name}" has been created successfully.`,
      });
      
      return true;
    } catch (err) {
      console.error('Error creating role:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create role. Please try again.",
      });
      
      // Revert local state on error
      fetchRoles();
      return false;
    }
  };

  const updateRole = async (roleId: string, updates: Partial<Omit<Role, 'id'>>) => {
    try {
      // Update locally first
      const updatedRoles = roles.map(role => 
        role.id === roleId ? { ...role, ...updates } : role
      );
      
      setRoles(updatedRoles);
      
      // Update in database
      const { error } = await supabase
        .from('settings_roles')
        .update({ roles: JSON.stringify(updatedRoles) })
        .eq('id', roleId);
      
      if (error) throw error;
      
      toast({
        title: "Role updated",
        description: "Role has been updated successfully.",
      });
      
      return true;
    } catch (err) {
      console.error('Error updating role:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update role. Please try again.",
      });
      
      // Revert on error
      fetchRoles();
      return false;
    }
  };

  const deleteRole = async (roleId: string) => {
    try {
      // Remove from local state first
      const updatedRoles = roles.filter(role => role.id !== roleId);
      setRoles(updatedRoles);
      
      // Update in database
      const { error } = await supabase
        .from('settings_roles')
        .update({ roles: JSON.stringify(updatedRoles) })
        .eq('id', crypto.randomUUID());
      
      if (error) throw error;
      
      toast({
        title: "Role deleted",
        description: "Role has been deleted successfully.",
      });
      
      return true;
    } catch (err) {
      console.error('Error deleting role:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete role. Please try again.",
      });
      
      // Revert on error
      fetchRoles();
      return false;
    }
  };

  const updatePermissions = async (roleId: string, permissions: Permission[]) => {
    try {
      // Update locally first
      const updatedRoles = roles.map(role => 
        role.id === roleId ? { ...role, permissions } : role
      );
      
      setRoles(updatedRoles);
      
      // Update in database
      const { error } = await supabase
        .from('settings_roles')
        .update({ roles: JSON.stringify(updatedRoles) })
        .eq('id', crypto.randomUUID());
      
      if (error) throw error;
      
      toast({
        title: "Permissions updated",
        description: "Role permissions have been updated successfully.",
      });
      
      return true;
    } catch (err) {
      console.error('Error updating permissions:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update permissions. Please try again.",
      });
      
      // Revert on error
      fetchRoles();
      return false;
    }
  };

  return {
    roles,
    isLoading,
    error,
    resources,
    actions,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
    updatePermissions
  };
};
