
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
  console.log("AddMemberDialog rendering. Props:", { isOpen, isCreating });
  
  const { form, isSubmitting, onSubmit } = useAddMemberForm(onAddMember, isCreating, isOpen);
  const [dialogError, setDialogError] = React.useState<string | null>(null);
  
  // Handle form submission with improved error handling
  const handleSubmit = async (values: any) => {
    console.log("Dialog handling submit with values:", values);
    setDialogError(null);
    
    try {
      const success = await onSubmit(values);
      console.log("Submit result:", success);
      
      if (success) {
        // Close the dialog on successful submission
        onClose();
        return true;
      } else {
        setDialogError("Failed to add member. Please try again.");
        return false;
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setDialogError(error instanceof Error ? error.message : "An unexpected error occurred");
      return false;
    }
  };

  // Reset error when dialog opens/closes
  React.useEffect(() => {
    console.log("AddMemberDialog useEffect triggered by isOpen change:", isOpen);
    setDialogError(null);
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
        {dialogError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {dialogError}
          </div>
        )}
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
