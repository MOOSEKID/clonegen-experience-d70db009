
import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Member, MemberFormAction } from "@/types/memberTypes";
import { useAddMemberForm } from "@/hooks/members/useAddMemberForm";
import MemberDialogContent from "./dialog/MemberDialogContent";

interface AddMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (member: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction) => Promise<boolean> | boolean;
  isCreating?: boolean;
}

const AddMemberDialog = ({ isOpen, onClose, onAddMember, isCreating = false }: AddMemberDialogProps) => {
  const { form, isSubmitting, onSubmit } = useAddMemberForm(onAddMember, isCreating, isOpen);
  
  // Handle successful submission
  const handleSubmit = async (values: any) => {
    console.log("Dialog handling submit with values:", values);
    const success = await onSubmit(values);
    console.log("Submit result:", success);
    
    if (success) {
      // Close the dialog on successful submission
      onClose();
    }
    return success; // Make sure we return a value
  };

  React.useEffect(() => {
    console.log("Dialog open state changed to:", isOpen);
    // If dialog is closed, we don't need to do anything special
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      console.log("Dialog onOpenChange triggered:", open, "isSubmitting:", isSubmitting);
      if (!open && !isSubmitting) {
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        {isOpen && ( // Only render content when dialog is open
          <MemberDialogContent 
            form={form} 
            isSubmitting={isSubmitting || isCreating} 
            onClose={onClose} 
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;
