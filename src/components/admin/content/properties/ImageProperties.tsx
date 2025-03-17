
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { ContentElement, ElementProperties } from '@/types/content.types';
import SelectImageDialog from '../dialogs/SelectImageDialog';

interface ImagePropertiesProps {
  element: ContentElement;
  onUpdate: (properties: Partial<ElementProperties>) => void;
  onElementUpdate: (element: ContentElement) => void;
}

const ImageProperties = ({ element, onUpdate, onElementUpdate }: ImagePropertiesProps) => {
  const [isSelectImageOpen, setIsSelectImageOpen] = useState(false);
  const [altText, setAltText] = useState(element.alt || '');
  
  const handleSizeChange = (size: string) => {
    onUpdate({ size });
  };

  const handleAlignChange = (align: string) => {
    onUpdate({ align });
  };

  const handleSelectImage = (imageUrl: string) => {
    const updatedElement = {
      ...element,
      content: imageUrl
    };
    onElementUpdate(updatedElement);
    setIsSelectImageOpen(false);
  };

  const handleAltTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAltText = e.target.value;
    setAltText(newAltText);
    
    // Update the element with the new alt text
    const updatedElement = {
      ...element,
      alt: newAltText
    };
    onElementUpdate(updatedElement);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="block">Current Image</Label>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setIsSelectImageOpen(true)}
        >
          Change Image
        </Button>
      </div>
      
      {element.content && (
        <div className="mt-2 border border-gray-200 rounded-md p-2">
          <img 
            src={element.content} 
            alt={element.alt || "Preview"} 
            className="max-h-32 mx-auto object-contain"
          />
        </div>
      )}

      <div>
        <Label htmlFor="alt-text" className="block mb-2">Alt Text</Label>
        <Input
          id="alt-text"
          value={altText}
          onChange={handleAltTextChange}
          placeholder="Describe the image for accessibility"
        />
      </div>

      <div>
        <Label className="block mb-2">Image Size</Label>
        <RadioGroup
          defaultValue={element.properties.size}
          onValueChange={handleSizeChange}
          className="flex flex-wrap gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sm" id="size-sm" />
            <Label htmlFor="size-sm">Small</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="md" id="size-md" />
            <Label htmlFor="size-md">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lg" id="size-lg" />
            <Label htmlFor="size-lg">Large</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="full" id="size-full" />
            <Label htmlFor="size-full">Full Width</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="block mb-2">Image Alignment</Label>
        <RadioGroup
          defaultValue={element.properties.align}
          onValueChange={handleAlignChange}
          className="flex flex-wrap gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="left" id="align-left" />
            <Label htmlFor="align-left">Left</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="center" id="align-center" />
            <Label htmlFor="align-center">Center</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="right" id="align-right" />
            <Label htmlFor="align-right">Right</Label>
          </div>
        </RadioGroup>
      </div>

      {isSelectImageOpen && (
        <SelectImageDialog
          isOpen={isSelectImageOpen}
          onClose={() => setIsSelectImageOpen(false)}
          onSelectImage={handleSelectImage}
        />
      )}
    </div>
  );
};

export default ImageProperties;
