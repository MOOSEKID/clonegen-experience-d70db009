
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Role } from '../UserPermissionsSettings';

interface PermissionGroup {
  name: string;
  permissions: {
    id: string;
    label: string;
  }[];
}

// Define permission groups
const permissionGroups: PermissionGroup[] = [
  {
    name: "Members",
    permissions: [
      { id: "view_members", label: "View members" },
      { id: "edit_members", label: "Edit members" },
      { id: "delete_members", label: "Delete members" },
      { id: "add_members", label: "Add members" }
    ]
  },
  {
    name: "Payments",
    permissions: [
      { id: "view_payments", label: "View payments" },
      { id: "manage_plans", label: "Manage plans" },
      { id: "issue_refunds", label: "Issue refunds" },
      { id: "view_reports", label: "View financial reports" }
    ]
  },
  {
    name: "Content",
    permissions: [
      { id: "view_content", label: "View content" },
      { id: "publish_blogs", label: "Publish blogs" },
      { id: "edit_pages", label: "Edit pages" },
      { id: "manage_media", label: "Manage media" }
    ]
  },
  {
    name: "Settings",
    permissions: [
      { id: "view_settings", label: "View settings" },
      { id: "change_permissions", label: "Change permissions" },
      { id: "update_config", label: "Update configuration" },
      { id: "manage_integrations", label: "Manage integrations" }
    ]
  },
];

interface CreateEditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (role: Role) => void;
  role: Role | null;
  existingRoles: Role[];
}

const CreateEditRoleModal: React.FC<CreateEditRoleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  role,
  existingRoles
}) => {
  const [name, setName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [nameError, setNameError] = useState('');

  // Initialize form when editing
  useEffect(() => {
    if (role) {
      setName(role.name);
      setSelectedPermissions(role.permissions);
    } else {
      setName('');
      setSelectedPermissions([]);
    }
    setNameError('');
  }, [role, isOpen]);

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions(current => 
      current.includes(permissionId)
        ? current.filter(id => id !== permissionId)
        : [...current, permissionId]
    );
  };

  const handleSubmit = () => {
    // Validate name
    if (!name.trim()) {
      setNameError('Role name is required');
      return;
    }

    // Check for duplicate names (when creating or renaming)
    const isDuplicate = existingRoles.some(
      r => r.name.toLowerCase() === name.toLowerCase() && r.id !== (role?.id || '')
    );

    if (isDuplicate) {
      setNameError('A role with this name already exists');
      return;
    }

    // Save role
    onSave({
      id: role?.id || '',
      name: name.trim(),
      permissions: selectedPermissions
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{role ? 'Edit Role' : 'Create New Role'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Role name input */}
          <div className="space-y-2">
            <Label htmlFor="roleName">Role Name</Label>
            <Input
              id="roleName"
              value={name}
              onChange={e => {
                setName(e.target.value);
                setNameError('');
              }}
              placeholder="Enter role name"
              className={nameError ? 'border-red-500' : ''}
            />
            {nameError && <p className="text-sm text-red-500">{nameError}</p>}
          </div>
          
          {/* Permissions section */}
          <div className="space-y-4">
            <Label>Permissions</Label>
            
            {permissionGroups.map((group) => (
              <fieldset key={group.name} className="space-y-2 border rounded-md p-4">
                <legend className="text-sm font-medium px-2">{group.name}</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {group.permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={permission.id}
                        checked={selectedPermissions.includes(permission.id)}
                        onCheckedChange={() => handlePermissionToggle(permission.id)}
                      />
                      <Label
                        htmlFor={permission.id}
                        className="text-sm cursor-pointer"
                      >
                        {permission.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {role ? 'Update Role' : 'Create Role'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditRoleModal;
