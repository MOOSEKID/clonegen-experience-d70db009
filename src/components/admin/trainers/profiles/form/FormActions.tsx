
import React from "react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
  submitLabel?: string;
}

const FormActions: React.FC<FormActionsProps> = ({ onCancel, submitLabel = "Save Changes" }) => {
  return (
    <div className="flex justify-end space-x-2 pt-4">
      <Button variant="outline" onClick={onCancel} type="button">
        Cancel
      </Button>
      <Button type="submit" className="bg-gym-orange hover:bg-opacity-90">
        {submitLabel}
      </Button>
    </div>
  );
};

export default FormActions;
