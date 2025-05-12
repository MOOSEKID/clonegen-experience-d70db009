
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRolePermissions } from '@/hooks/settings/useRolePermissions';
import LoadingState from './permissions/LoadingState';
import EmptyRolesState from './permissions/EmptyRolesState';
import RoleForm from './permissions/RoleForm';
import RoleCard from './permissions/RoleCard';

const PermissionsSettings = () => {
  const {
    roles,
    isLoading,
    error,
    resources,
    actions,
    createRole,
    updateRole,
    deleteRole,
    updatePermissions,
  } = useRolePermissions();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateRole = async (data: { name: string; description: string }) => {
    setIsSubmitting(true);
    const success = await createRole(data);
    setIsSubmitting(false);
    if (success) {
      setIsCreateDialogOpen(false);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (roles.length === 0) {
    return <EmptyRolesState onCreateRole={() => setIsCreateDialogOpen(true)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">User Roles & Permissions</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            onUpdate={updateRole}
            onDelete={deleteRole}
            onUpdatePermissions={updatePermissions}
            resources={resources}
            actions={actions}
          />
        ))}
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>
              Add a new role to define what users in this role can access and modify.
            </DialogDescription>
          </DialogHeader>
          <RoleForm
            onSubmit={handleCreateRole}
            onCancel={() => setIsCreateDialogOpen(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PermissionsSettings;
