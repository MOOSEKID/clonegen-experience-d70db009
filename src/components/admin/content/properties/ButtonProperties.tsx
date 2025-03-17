
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ElementProperties } from '@/types/content.types';

interface ButtonPropertiesProps {
  properties: ElementProperties;
  onUpdate: (properties: Partial<ElementProperties>) => void;
}

const ButtonProperties = ({ properties, onUpdate }: ButtonPropertiesProps) => {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ color: e.target.value });
  };
  
  const handleSizeChange = (value: string) => {
    onUpdate({ size: value });
  };
  
  const handleAlignChange = (value: string) => {
    onUpdate({ align: value });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <Label>Button Color</Label>
        <div className="flex mt-1.5">
          <Input 
            type="color" 
            value={properties.color || '#000000'} 
            onChange={handleColorChange}
            className="w-12 h-8 p-1"
          />
          <Input 
            type="text" 
            value={properties.color || '#000000'} 
            onChange={handleColorChange}
            className="flex-1 ml-2"
          />
        </div>
      </div>
      
      <div>
        <Label>Button Size</Label>
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

export default ButtonProperties;
