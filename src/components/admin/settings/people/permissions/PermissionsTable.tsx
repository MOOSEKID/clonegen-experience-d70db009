
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';
import { Permission } from '@/hooks/settings/useRolePermissions';

interface PermissionsTableProps {
  resources: { id: string; name: string }[];
  actions: { id: string; name: string }[];
  permissions: Permission[];
  onSave: (permissions: Permission[]) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const PermissionsTable: React.FC<PermissionsTableProps> = ({
  resources,
  actions,
  permissions,
  onSave,
  onCancel,
  isEditing,
}) => {
  const [editedPermissions, setEditedPermissions] = useState<Permission[]>(permissions);

  const handleCheckboxChange = (resource: string, action: string, checked: boolean) => {
    if (checked) {
      setEditedPermissions([
        ...editedPermissions,
        { id: `${resource}:${action}`, resource, action: action as 'view' | 'create' | 'edit' | 'delete' },
      ]);
    } else {
      setEditedPermissions(
        editedPermissions.filter(p => !(p.resource === resource && p.action === action))
      );
    }
  };

  const isPermissionGranted = (resource: string, action: string) => {
    return editedPermissions.some(p => p.resource === resource && p.action === action);
  };

  const handleSaveClick = () => {
    onSave(editedPermissions);
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Resource</TableHead>
            {actions.map((action) => (
              <TableHead key={action.id}>{action.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium">{resource.name}</TableCell>
              {actions.map((action) => (
                <TableCell key={action.id}>
                  <Checkbox
                    id={`${resource.id}:${action.id}`}
                    disabled={!isEditing}
                    checked={isPermissionGranted(resource.id, action.id)}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange(resource.id, action.id, checked === true)
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        {isEditing && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={actions.length + 1}>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline" 
                    size="sm" 
                    onClick={onCancel}
                  >
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                  <Button
                    variant="default" 
                    size="sm" 
                    onClick={handleSaveClick}
                  >
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
};

export default PermissionsTable;
