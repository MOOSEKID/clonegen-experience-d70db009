
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ClassType } from '@/hooks/useClassesData';
import ClassFormFields from './ClassFormFields';
import { getDefaultClassData } from '@/utils/classFormUtils';

interface AddClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddClass: (newClass: Omit<ClassType, 'id'>) => void;
}

const AddClassDialog = ({ open, onOpenChange, onAddClass }: AddClassDialogProps) => {
  const [classData, setClassData] = useState<Omit<ClassType, 'id'>>(getDefaultClassData());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClassData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      setClassData(prev => ({
        ...prev,
        [name]: numValue
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setClassData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddClass(classData);
    onOpenChange(false);
    // Reset form
    setClassData(getDefaultClassData());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ClassFormFields 
            classData={classData}
            handleChange={handleChange}
            handleNumberChange={handleNumberChange}
            handleSelectChange={handleSelectChange}
          />
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Class</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClassDialog;
