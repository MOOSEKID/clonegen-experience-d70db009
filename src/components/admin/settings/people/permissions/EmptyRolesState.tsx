
import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield } from 'lucide-react';

interface EmptyRolesStateProps {
  onCreateRole: () => void;
}

const EmptyRolesState: React.FC<EmptyRolesStateProps> = ({ onCreateRole }) => {
  return (
    <div className="bg-gray-50 rounded-lg border border-dashed border-gray-300 p-8 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="bg-gray-100 p-3 rounded-full">
          <Shield className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium">No User Roles Defined</h3>
        <p className="text-gray-500 max-w-md">
          Create your first role to start managing permissions. Define who can access what in your gym management system.
        </p>
        <Button onClick={onCreateRole} className="mt-4">
          Create First Role
        </Button>
      </div>
    </div>
  );
};

export default EmptyRolesState;
