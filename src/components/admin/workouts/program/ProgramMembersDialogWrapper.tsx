
import React from 'react';
import ProgramMembersDialog from '@/components/admin/workouts/ProgramMembersDialog';

interface ProgramMembersDialogWrapperProps {
  selectedProgram: { id: string, name: string } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProgramMembersDialogWrapper = ({
  selectedProgram,
  open,
  onOpenChange
}: ProgramMembersDialogWrapperProps) => {
  if (!selectedProgram) return null;
  
  return (
    <ProgramMembersDialog 
      programId={selectedProgram.id}
      programName={selectedProgram.name}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
};

export default ProgramMembersDialogWrapper;
