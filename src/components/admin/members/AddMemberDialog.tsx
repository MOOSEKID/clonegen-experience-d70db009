
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
  
  // Handle form submission
  const handleSubmit = async (values: any) => {
    console.log("Dialog handling submit with values:", values);
    try {
      const success = await onSubmit(values);
      console.log("Submit result:", success);
      
      if (success) {
        // Close the dialog on successful submission
        onClose();
      }
      return success;
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      return false;
    }
  };

  // Log when dialog open state changes
  React.useEffect(() => {
    console.log("Dialog open state changed to:", isOpen);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      console.log("Dialog onOpenChange triggered:", open, "isSubmitting:", isSubmitting);
      // Only close if user is clicking to close and not submitting
      if (!open && !isSubmitting) {
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <MemberDialogContent 
          form={form} 
          isSubmitting={isSubmitting || isCreating} 
          onClose={onClose} 
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;
