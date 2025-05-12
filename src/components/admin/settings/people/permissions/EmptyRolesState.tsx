
import React from 'react';
import { Shield, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyRolesStateProps {
  onCreateRole: () => void;
}

const EmptyRolesState: React.FC<EmptyRolesStateProps> = ({ onCreateRole }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 text-center flex flex-col items-center space-y-4">
      <Shield className="h-16 w-16 text-gray-300 mb-2" />
      <h3 className="text-xl font-medium text-gray-700">No Roles Created Yet</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-4">
        Create roles to manage permissions for different staff members. Each role can have specific access levels to different parts of the system.
      </p>
      <Button onClick={onCreateRole} className="mt-2">
        <Plus className="mr-2 h-4 w-4" />
        Create First Role
      </Button>
    </div>
  );
};

export default EmptyRolesState;
