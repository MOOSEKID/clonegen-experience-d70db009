
import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Member, MemberFormAction } from "@/types/memberTypes";
import { useAddMemberForm } from "@/hooks/members/useAddMemberForm";
import MemberDialogContent from "./dialog/MemberDialogContent";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/ui/error-boundary";

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
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
      return false;
    }
  };

  // Reset error when dialog opens/closes
  React.useEffect(() => {
    console.log("AddMemberDialog useEffect triggered by isOpen change:", isOpen);
    if (isOpen) {
      console.log("Dialog opened - resetting error state");
      setDialogError(null);
    }
  }, [isOpen]);

  // Add error boundary to catch unhandled errors
  React.useEffect(() => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Check if this is a React error
      const errorString = args.join(' ');
      if (errorString.includes('React') || errorString.includes('Error')) {
        setDialogError("An error occurred in the form. Check console for details.");
      }
      originalConsoleError(...args);
    };
    
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  // Error handler for the ErrorBoundary
  const handleError = (error: Error) => {
    console.error("ErrorBoundary caught error:", error);
    setDialogError(error.message || "An unexpected error occurred in the form");
    toast.error(error.message || "An unexpected error occurred in the form");
  };

  // Memoize dialog content to prevent unnecessary re-renders
  const dialogContent = React.useMemo(() => {
    return (
      <MemberDialogContent 
        form={form} 
        isSubmitting={isSubmitting || isCreating} 
        onClose={onClose} 
        onSubmit={handleSubmit}
      />
    );
  }, [form, isSubmitting, isCreating, onClose, handleSubmit]);

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
        <ErrorBoundary onError={handleError} fallback={
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <h3 className="text-lg font-medium text-red-800 mb-2">Something went wrong</h3>
            <p className="text-red-600 mb-4">There was an error loading the member form. Please try again.</p>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Reload Page
              </button>
            </div>
          </div>
        }>
          {dialogContent}
        </ErrorBoundary>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;
