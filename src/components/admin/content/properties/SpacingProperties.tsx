
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

interface SpacingPropertiesProps {
  properties: {
    padding?: string;
    backgroundColor?: string;
  };
  onUpdate: (properties: any) => void;
}

const SpacingProperties = ({ properties, onUpdate }: SpacingPropertiesProps) => {
  const { 
    padding = 'medium',
    backgroundColor = 'transparent'
  } = properties;

  const handlePaddingChange = (value) => {
    onUpdate({ padding: value });
  };

  const handleBackgroundColorChange = (e) => {
    onUpdate({ backgroundColor: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="block mb-2">Element Padding</Label>
        <RadioGroup 
          value={padding} 
          onValueChange={handlePaddingChange}
          className="grid grid-cols-2 gap-2"
        >
          <div className="flex items-center space-x-2 border rounded-md p-2">
            <RadioGroupItem value="none" id="padding-none" />
            <Label htmlFor="padding-none" className="cursor-pointer">None</Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-2">
            <RadioGroupItem value="small" id="padding-small" />
            <Label htmlFor="padding-small" className="cursor-pointer">Small</Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-2">
            <RadioGroupItem value="medium" id="padding-medium" />
            <Label htmlFor="padding-medium" className="cursor-pointer">Medium</Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-2">
            <RadioGroupItem value="large" id="padding-large" />
            <Label htmlFor="padding-large" className="cursor-pointer">Large</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div>
        <Label htmlFor="bg-color" className="block mb-2">Background Color</Label>
        <div className="flex space-x-2">
          <div className="w-10 h-10 border rounded-md overflow-hidden">
            <input
              type="color"
              id="bg-color"
              value={backgroundColor === 'transparent' ? '#ffffff' : backgroundColor}
              onChange={handleBackgroundColorChange}
              className="w-12 h-12 cursor-pointer transform translate-x-[-2px] translate-y-[-2px]"
            />
          </div>
          <Input
            value={backgroundColor}
            onChange={handleBackgroundColorChange}
            className="flex-1"
          />
        </div>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="transparent-bg"
            checked={backgroundColor === 'transparent'}
            onChange={(e) => onUpdate({ backgroundColor: e.target.checked ? 'transparent' : '#ffffff' })}
            className="mr-2"
          />
          <Label htmlFor="transparent-bg" className="text-sm cursor-pointer">Transparent background</Label>
        </div>
      </div>
    </div>
  );
};

export default SpacingProperties;
