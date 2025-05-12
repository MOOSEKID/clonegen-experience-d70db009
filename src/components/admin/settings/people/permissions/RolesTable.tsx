
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash, Plus, Users } from 'lucide-react';
import { Role } from '../UserPermissionsSettings';

interface RolesTableProps {
  roles: Role[];
  onEditRole: (role: Role) => void;
  onDeleteRole: (role: Role) => void;
  onCreateRole: () => void;
}

const RolesTable: React.FC<RolesTableProps> = ({ roles, onEditRole, onDeleteRole, onCreateRole }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-medium text-lg">User Roles</h3>
        <Button onClick={onCreateRole} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Role
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Role Name</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Permissions</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {roles.map(role => (
              <tr key={role.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{role.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {role.permissions.length} permissions granted
                </td>
                <td className="px-4 py-3 text-sm flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onEditRole(role)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600" onClick={() => onDeleteRole(role)}>
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesTable;
