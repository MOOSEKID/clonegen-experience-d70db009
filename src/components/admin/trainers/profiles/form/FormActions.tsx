
import React from "react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ onCancel }) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button variant="outline" type="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">Save Changes</Button>
    </div>
  );
};

export default FormActions;
