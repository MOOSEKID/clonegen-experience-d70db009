
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Edit, Trash2, Users, Key } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Role } from '@/hooks/settings/useRolePermissions';
import RoleForm from './RoleForm';
import PermissionsTable from './PermissionsTable';

interface RoleCardProps {
  role: Role;
  onUpdate: (roleId: string, updates: Partial<Omit<Role, 'id'>>) => Promise<boolean>;
  onDelete: (roleId: string) => Promise<boolean>;
  onUpdatePermissions: (roleId: string, permissions: any[]) => Promise<boolean>;
  resources: { id: string; name: string }[];
  actions: { id: string; name: string }[];
}

const RoleCard: React.FC<RoleCardProps> = ({
  role,
  onUpdate,
  onDelete,
  onUpdatePermissions,
  resources,
  actions,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPermissions, setIsEditingPermissions] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditSubmit = async (data: { name: string; description: string }) => {
    setIsSubmitting(true);
    const success = await onUpdate(role.id, data);
    setIsSubmitting(false);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsSubmitting(true);
    const success = await onDelete(role.id);
    setIsSubmitting(false);
    if (success) {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSavePermissions = async (permissions: any[]) => {
    setIsSubmitting(true);
    const success = await onUpdatePermissions(role.id, permissions);
    setIsSubmitting(false);
    if (success) {
      setIsEditingPermissions(false);
    }
  };

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50 border-b pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>{role.name}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Role
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsAssignDialogOpen(true)}>
                  <Users className="mr-2 h-4 w-4" />
                  Assign Users
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                  <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                  Delete Role
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
          <CardDescription>{role.description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-sm flex items-center">
              <Key className="h-4 w-4 mr-2 text-muted-foreground" />
              Permissions
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingPermissions(!isEditingPermissions)}
            >
              {isEditingPermissions ? 'Cancel' : 'Edit Permissions'}
            </Button>
          </div>
          <PermissionsTable
            resources={resources}
            actions={actions}
            permissions={role.permissions}
            onSave={handleSavePermissions}
            onCancel={() => setIsEditingPermissions(false)}
            isEditing={isEditingPermissions}
          />
        </CardContent>
      </Card>

      {/* Edit Role Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Update the role name and description. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <RoleForm
            initialValues={role}
            onSubmit={handleEditSubmit}
            onCancel={() => setIsEditing(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the "{role.name}" role? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isSubmitting}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assign Users Dialog - placeholder for now */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Users to {role.name}</DialogTitle>
            <DialogDescription>
              Select users to assign to this role.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground text-center">
              User assignment functionality will be implemented in a future update.
            </p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setIsAssignDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RoleCard;
