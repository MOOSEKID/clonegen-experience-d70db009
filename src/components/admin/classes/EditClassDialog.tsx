
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ClassType } from '@/types/classTypes';
import ClassFormFields from './ClassFormFields';
import { useClassForm } from '@/hooks/classes/useClassForm';

interface EditClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classData: ClassType | null;
  onUpdateClass: (updatedClass: ClassType) => void;
}

const EditClassDialog = ({ 
  open, 
  onOpenChange, 
  classData, 
  onUpdateClass 
}: EditClassDialogProps) => {
  const {
    formData,
    errors,
    handleChange,
    handleNumberChange,
    handleSelectChange,
    handleCheckboxChange,
    handleMultiSelectChange,
    handleSubmit
  } = useClassForm(
    classData, 
    (updatedData) => {
      onUpdateClass(updatedData);
      onOpenChange(false);
    },
    () => onOpenChange(false)
  );

  if (!formData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ClassFormFields 
            classData={formData}
            errors={errors}
            handleChange={handleChange}
            handleNumberChange={handleNumberChange}
            handleSelectChange={handleSelectChange}
            handleCheckboxChange={handleCheckboxChange}
            handleMultiSelectChange={handleMultiSelectChange}
          />
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Update Class</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClassDialog;
