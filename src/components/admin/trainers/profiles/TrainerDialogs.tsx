
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TrainerProfile } from '@/hooks/trainers/useTrainerProfiles';
import TrainerAddForm from '@/components/admin/trainers/profiles/TrainerAddForm';
import TrainerEditForm from '@/components/admin/trainers/profiles/TrainerEditForm';
import TrainerCertificationForm from '@/components/admin/trainers/profiles/TrainerCertificationForm';
import TrainerAvailabilityForm from '@/components/admin/trainers/profiles/TrainerAvailabilityForm';

interface TrainerDialogsProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (value: boolean) => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (value: boolean) => void;
  isCertDialogOpen: boolean;
  setIsCertDialogOpen: (value: boolean) => void;
  isAvailDialogOpen: boolean;
  setIsAvailDialogOpen: (value: boolean) => void;
  selectedTrainer: string | null;
  selectedTrainerData: TrainerProfile | null;
  onAddTrainerSubmit: (data: any) => Promise<void>;
  onUpdateTrainerSubmit: (id: string, data: any) => Promise<void>;
  onAddCertificationSubmit: (data: any) => Promise<void>;
  onAddAvailabilitySubmit: (data: any) => Promise<void>;
}

const TrainerDialogs = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  isEditDialogOpen,
  setIsEditDialogOpen,
  isCertDialogOpen,
  setIsCertDialogOpen,
  isAvailDialogOpen,
  setIsAvailDialogOpen,
  selectedTrainer,
  selectedTrainerData,
  onAddTrainerSubmit,
  onUpdateTrainerSubmit,
  onAddCertificationSubmit,
  onAddAvailabilitySubmit,
}: TrainerDialogsProps) => {
  return (
    <>
      {/* Add Trainer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Trainer</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[80vh]">
            <div className="p-1">
              <TrainerAddForm
                onSubmit={onAddTrainerSubmit}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Edit Trainer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Trainer</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[80vh]">
            <div className="p-1">
              {selectedTrainerData && (
                <TrainerEditForm
                  trainer={selectedTrainerData}
                  onSubmit={(id: string, data: any) => onUpdateTrainerSubmit(id, data)}
                  onCancel={() => setIsEditDialogOpen(false)}
                />
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Add Certification Dialog */}
      <Dialog open={isCertDialogOpen} onOpenChange={setIsCertDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Certification</DialogTitle>
          </DialogHeader>
          {selectedTrainer && (
            <TrainerCertificationForm
              trainerId={selectedTrainer}
              onSubmit={onAddCertificationSubmit}
              onCancel={() => setIsCertDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Add Availability Dialog */}
      <Dialog open={isAvailDialogOpen} onOpenChange={setIsAvailDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Availability</DialogTitle>
          </DialogHeader>
          {selectedTrainer && (
            <TrainerAvailabilityForm
              trainerId={selectedTrainer}
              onSubmit={onAddAvailabilitySubmit}
              onCancel={() => setIsAvailDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TrainerDialogs;
