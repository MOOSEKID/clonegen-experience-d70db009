
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageIcon } from 'lucide-react';
import SelectImageDialog from '../dialogs/SelectImageDialog';

interface ImageElementProps {
  element: any;
  isEditing: boolean;
  onUpdate: (element: any) => void;
}

const ImageElement = ({ element, isEditing, onUpdate }: ImageElementProps) => {
  const { properties = {} } = element;
  const { align = 'left', padding = 'medium' } = properties;
  
  // Determine padding class
  const paddingClass = {
    none: 'p-0',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
  }[padding] || 'p-4';

  return (
    <div className={paddingClass}>
      {element.content ? (
        <img 
          src={element.content} 
          alt={element.alt || "Image"} 
          className="max-w-full h-auto rounded-md"
          style={{ margin: align === 'center' ? '0 auto' : align === 'right' ? '0 0 0 auto' : '0' }}
        />
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center text-gray-500">
          <ImageIcon className="mx-auto h-12 w-12 mb-2 opacity-50" />
          <p>Select an image from the media library</p>
          {isEditing && (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="mt-4">
                  Select Image
                </Button>
              </DialogTrigger>
              <SelectImageDialog 
                onSelect={(url) => onUpdate({ ...element, content: url })} 
              />
            </Dialog>
          )}
        </div>
      )}
      {isEditing && element.content && (
        <div className="mt-2 flex justify-end space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Change Image
              </Button>
            </DialogTrigger>
            <SelectImageDialog 
              onSelect={(url) => onUpdate({ ...element, content: url })} 
            />
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default ImageElement;
