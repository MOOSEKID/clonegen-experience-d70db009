
import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Role } from '../UserPermissionsSettings';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

interface RolesTableProps {
  roles: Role[];
  onEditRole: (role: Role) => void;
  onDeleteRole: (role: Role) => void;
  onCreateRole: () => void;
}

const RolesTable: React.FC<RolesTableProps> = ({ roles, onEditRole, onDeleteRole, onCreateRole }) => {
  // Helper to format permissions for display
  const formatPermissions = (permissions: string[]): string => {
    if (permissions.length === 0) return 'No permissions';
    if (permissions.length <= 3) return permissions.join(', ');
    return `${permissions.slice(0, 2).join(', ')} and ${permissions.length - 2} more...`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">User Roles</h3>
        <Button onClick={onCreateRole} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Add Role</span>
        </Button>
      </div>
      
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Role Name</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell className="text-sm text-gray-500">
                  {formatPermissions(role.permissions)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditRole(role)}
                      aria-label={`Edit ${role.name} role`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteRole(role)}
                      aria-label={`Delete ${role.name} role`}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RolesTable;
