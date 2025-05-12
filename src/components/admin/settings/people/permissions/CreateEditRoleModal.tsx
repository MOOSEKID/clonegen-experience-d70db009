
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Role } from '../UserPermissionsSettings';

interface CreateEditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (role: Role) => void;
  role: Role | null;
  existingRoles: Role[];
}

// Available permissions by module
const permissionGroups = [
  {
    name: 'Members',
    permissions: ['view_members', 'create_members', 'edit_members', 'delete_members']
  },
  {
    name: 'Classes',
    permissions: ['view_classes', 'create_classes', 'edit_classes', 'delete_classes']
  },
  {
    name: 'Trainers',
    permissions: ['view_trainers', 'create_trainers', 'edit_trainers', 'delete_trainers']
  },
  {
    name: 'Shop',
    permissions: ['view_products', 'create_products', 'edit_products', 'delete_products', 'process_sales']
  },
  {
    name: 'Reports',
    permissions: ['view_reports', 'export_reports']
  },
  {
    name: 'Settings',
    permissions: ['view_settings', 'edit_settings']
  }
];

const CreateEditRoleModal: React.FC<CreateEditRoleModalProps> = ({ isOpen, onClose, onSave, role, existingRoles }) => {
  const [name, setName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('Members');
  const [nameError, setNameError] = useState('');

  // Initialize form when editing a role
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

  const handleTogglePermission = (permission: string) => {
    setSelectedPermissions(prev => {
      if (prev.includes(permission)) {
        return prev.filter(p => p !== permission);
      } else {
        return [...prev, permission];
      }
    });
  };

  const handleSave = () => {
    // Validate name
    if (!name.trim()) {
      setNameError('Role name is required');
      return;
    }

    // Check for duplicate name when creating new role
    if (!role?.id && existingRoles.some(r => r.name.toLowerCase() === name.toLowerCase())) {
      setNameError('A role with this name already exists');
      return;
    }

    onSave({
      id: role?.id || '',
      name: name.trim(),
      permissions: selectedPermissions
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{role ? 'Edit Role' : 'Create New Role'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="role-name">Role Name</Label>
            <Input
              id="role-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError('');
              }}
              placeholder="Enter role name"
              className={nameError ? 'border-red-500' : ''}
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
          </div>
          
          <div className="space-y-2">
            <Label>Permissions</Label>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                {permissionGroups.slice(0, 6).map(group => (
                  <TabsTrigger key={group.name} value={group.name}>
                    {group.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {permissionGroups.map(group => (
                <TabsContent key={group.name} value={group.name} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {group.permissions.map(permission => (
                      <div key={permission} className="flex items-center space-x-2">
                        <Checkbox
                          id={permission}
                          checked={selectedPermissions.includes(permission)}
                          onCheckedChange={() => handleTogglePermission(permission)}
                        />
                        <label
                          htmlFor={permission}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {permission.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </label>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>{role ? 'Update Role' : 'Create Role'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditRoleModal;
