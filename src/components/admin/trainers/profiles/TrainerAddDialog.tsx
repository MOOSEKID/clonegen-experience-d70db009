
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import TrainerAddForm from './TrainerAddForm';
import { TrainerProfile } from './TrainerProfileType';

interface TrainerAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<TrainerProfile, 'id'>) => Promise<void>;
  initialData?: TrainerProfile;
  isEdit?: boolean;
}

const TrainerAddDialog: React.FC<TrainerAddDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEdit = false
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Trainer' : 'Add New Trainer'}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="p-1">
            <TrainerAddForm
              onSubmit={onSubmit}
              initialData={initialData}
              isEdit={isEdit}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TrainerAddDialog;
