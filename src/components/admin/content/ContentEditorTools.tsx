
import { Plus, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddElementDialog from './AddElementDialog';

interface ContentEditorToolsProps {
  isPreviewMode: boolean;
  onTogglePreview: () => void;
  onAddElement: (type: string) => void;
}

const ContentEditorTools = ({ 
  isPreviewMode, 
  onTogglePreview, 
  onAddElement 
}: ContentEditorToolsProps) => {
  return (
    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
      <h3 className="text-sm font-medium text-gray-700">
        {isPreviewMode ? 'Content Preview' : 'Content Editor'}
      </h3>
      <Button
        variant="outline"
        size="sm"
        onClick={onTogglePreview}
        className="flex items-center space-x-1"
      >
        <Eye className="h-4 w-4 mr-1" />
        {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
      </Button>
    </div>
  );
};

export const AddElementButton = ({ onAddElement }: { onAddElement: (type: string) => void }) => {
  return (
    <div className="mt-6 flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Element
          </Button>
        </DialogTrigger>
        <AddElementDialog onAddElement={onAddElement} />
      </Dialog>
    </div>
  );
};

export default ContentEditorTools;
