
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ElementProperties } from '../ContentEditor';

interface TextPropertiesProps {
  properties: ElementProperties;
  onUpdate: (properties: ElementProperties) => void;
}

// Size options mapping for UI display
const sizeOptions = {
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
  xlarge: 'X-Large',
  '2xlarge': '2X-Large',
  '3xlarge': '3X-Large',
  '4xlarge': '4X-Large'
};

// Style options mapping for UI display
const styleOptions = {
  normal: 'Normal',
  bold: 'Bold',
  italic: 'Italic',
  'bold-italic': 'Bold Italic'
};

const TextProperties = ({ properties, onUpdate }: TextPropertiesProps) => {
  const handleSizeChange = (value: string) => {
    onUpdate({ size: value });
  };
  
  const handleStyleChange = (value: string) => {
    onUpdate({ style: value });
  };
  
  const handleAlignChange = (value: string) => {
    onUpdate({ align: value });
  };
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ color: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Text Size</Label>
        <Select value={properties.size || 'medium'} onValueChange={handleSizeChange}>
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(sizeOptions).map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Text Style</Label>
        <Select value={properties.style || 'normal'} onValueChange={handleStyleChange}>
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(styleOptions).map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Alignment</Label>
        <Select value={properties.align || 'left'} onValueChange={handleAlignChange}>
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
            <SelectItem value="justify">Justify</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Text Color</Label>
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
    </div>
  );
};

export default TextProperties;
