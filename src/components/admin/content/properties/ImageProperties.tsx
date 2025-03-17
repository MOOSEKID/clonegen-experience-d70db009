
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ElementProperties, ContentElement } from '../ContentEditor';

interface ImagePropertiesProps {
  element: ContentElement;
  properties: ElementProperties;
  onUpdate: (properties: ElementProperties) => void;
}

const ImageProperties = ({ element, properties, onUpdate }: ImagePropertiesProps) => {
  const handleSizeChange = (value: string) => {
    onUpdate({ size: value });
  };
  
  const handleAlignChange = (value: string) => {
    onUpdate({ align: value });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <Label>Image Source (URL)</Label>
        <Input 
          type="text" 
          value={element.content || ''} 
          onChange={(e) => onUpdate({ content: e.target.value })}
          className="mt-1.5"
          placeholder="Enter image URL or select from media library"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              Select from Media Library
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
      
      <div>
        <Label>Alt Text</Label>
        <Input 
          type="text" 
          value={element.alt || ''} 
          onChange={(e) => onUpdate({ alt: e.target.value })}
          className="mt-1.5"
          placeholder="Describe the image for accessibility"
        />
      </div>
      
      <div>
        <Label>Size</Label>
        <Select 
          value={properties.size || 'medium'} 
          onValueChange={handleSizeChange}
        >
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
            <SelectItem value="full">Full Width</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Alignment</Label>
        <Select 
          value={properties.align || 'left'} 
          onValueChange={handleAlignChange}
        >
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ImageProperties;
