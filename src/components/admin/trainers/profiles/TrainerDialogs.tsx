import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { TrainerProfile } from "@/hooks/trainers/useTrainerProfiles";

interface TrainerDialogsProps {
  isAddOpen: boolean;
  setIsAddOpen: (open: boolean) => void;
  onAddSubmit: (data: Partial<TrainerProfile>) => void;
  onUpdateSubmit: (data: Partial<TrainerProfile>) => void;
  onDeleteSubmit: (id: string) => void;
}

const TrainerDialogs = ({
  isAddOpen,
  setIsAddOpen,
  onAddSubmit,
  onUpdateSubmit,
  onDeleteSubmit
}: TrainerDialogsProps) => {
  return (
    <>
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Trainer</DialogTitle>
            <DialogDescription>
              Enter the details for the new trainer.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Add trainer form would go here */}
            <p>Form implementation to be added</p>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Other dialogs like Edit and Delete would go here */}
    </>
  );
};

export default TrainerDialogs;
