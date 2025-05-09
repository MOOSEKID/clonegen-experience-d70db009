
import React, { useState, useEffect } from 'react';
import { useSettings, SaveState } from '@/hooks/admin/useSettings';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { Shield } from 'lucide-react';
import RolesTable from './permissions/RolesTable';
import EmptyRolesState from './permissions/EmptyRolesState';
import CreateEditRoleModal from './permissions/CreateEditRoleModal';
import DeleteRoleConfirmation from './permissions/DeleteRoleConfirmation';
import LoadingState from './permissions/LoadingState';

// Types for our component
export type Permission = string;

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
};

export type RolesData = {
  roles: Role[];
};

const UserPermissionsSettings = () => {
  // Fetch roles data from settings table
  const { data, loading, error, updateSettings, saveState } = useSettings<{ id: string; roles: Role[] }>({
    tableName: 'settings_roles',
  });

  // UI state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  // Get roles array from data or default to empty array
  const roles = data?.roles || [];

  // Handle create/edit role
  const handleSaveRole = async (role: Role) => {
    try {
      const isEditing = !!role.id;
      const updatedRoles = isEditing
        ? roles.map(r => (r.id === role.id ? role : r))
        : [...roles, { ...role, id: crypto.randomUUID() }];

      await updateSettings({ roles: updatedRoles });
      
      setIsCreateModalOpen(false);
      setEditingRole(null);
      
      toast.success(isEditing ? 'Role updated successfully' : 'Role created successfully');
    } catch (err) {
      console.error('Error saving role:', err);
      toast.error('Failed to save role');
    }
  };

  // Handle delete role
  const handleDeleteRole = async () => {
    if (!roleToDelete) return;
    
    try {
      const updatedRoles = roles.filter(r => r.id !== roleToDelete.id);
      await updateSettings({ roles: updatedRoles });
      
      setIsDeleteModalOpen(false);
      setRoleToDelete(null);
      
      toast.success('Role deleted successfully');
    } catch (err) {
      console.error('Error deleting role:', err);
      toast.error('Failed to delete role');
    }
  };

  // Handle edit role
  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setIsCreateModalOpen(true);
  };

  // Handle delete role click
  const handleDeleteClick = (role: Role) => {
    setRoleToDelete(role);
    setIsDeleteModalOpen(true);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Error Loading User Permissions</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      {/* Show empty state or roles table */}
      {roles.length === 0 ? (
        <EmptyRolesState onCreateRole={() => setIsCreateModalOpen(true)} />
      ) : (
        <RolesTable 
          roles={roles}
          onEditRole={handleEditRole}
          onDeleteRole={handleDeleteClick}
          onCreateRole={() => {
            setEditingRole(null);
            setIsCreateModalOpen(true);
          }}
        />
      )}
      
      {/* Create/Edit Role Modal */}
      <CreateEditRoleModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingRole(null);
        }}
        onSave={handleSaveRole}
        role={editingRole}
        existingRoles={roles}
      />
      
      {/* Delete Confirmation Modal */}
      <DeleteRoleConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setRoleToDelete(null);
        }}
        onConfirm={handleDeleteRole}
        role={roleToDelete}
      />
    </div>
  );
};

export default UserPermissionsSettings;
