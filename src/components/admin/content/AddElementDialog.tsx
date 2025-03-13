
import { Plus, Type, Image as ImageIcon, Video, Box } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AddElementDialogProps {
  onAddElement: (type: string) => void;
}

const AddElementDialog = ({ onAddElement }: AddElementDialogProps) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add Content Element</DialogTitle>
        <DialogDescription>
          Choose the type of content element to add to your page.
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 py-4">
        <button
          onClick={() => onAddElement('text')}
          className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gym-orange transition-colors"
        >
          <Type className="h-8 w-8 text-gym-orange mb-2" />
          <span className="font-medium">Text Block</span>
        </button>
        <button
          onClick={() => onAddElement('image')}
          className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gym-orange transition-colors"
        >
          <ImageIcon className="h-8 w-8 text-gym-orange mb-2" />
          <span className="font-medium">Image</span>
        </button>
        <button
          onClick={() => onAddElement('video')}
          className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gym-orange transition-colors"
        >
          <Video className="h-8 w-8 text-gym-orange mb-2" />
          <span className="font-medium">Video</span>
        </button>
        <button
          onClick={() => onAddElement('button')}
          className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gym-orange transition-colors"
        >
          <Box className="h-8 w-8 text-gym-orange mb-2" />
          <span className="font-medium">Button</span>
        </button>
      </div>
    </DialogContent>
  );
};

export default AddElementDialog;
