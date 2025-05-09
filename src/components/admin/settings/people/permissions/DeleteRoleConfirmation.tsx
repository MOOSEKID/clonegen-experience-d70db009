
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Role } from '../UserPermissionsSettings';

interface DeleteRoleConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  role: Role | null;
}

const DeleteRoleConfirmation: React.FC<DeleteRoleConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  role
}) => {
  if (!role) return null;
  
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Role: {role.name}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this role? This action cannot be undone.
            <p className="mt-2 text-yellow-600 font-medium">
              Warning: If this role is assigned to any users, they will lose these permissions.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteRoleConfirmation;
