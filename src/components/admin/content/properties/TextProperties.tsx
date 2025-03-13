
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Type } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface TextPropertiesProps {
  properties: {
    align?: string;
    size?: string;
    style?: string;
    color?: string;
  };
  onUpdate: (properties: any) => void;
}

const TextProperties = ({ properties, onUpdate }: TextPropertiesProps) => {
  const { 
    align = 'left', 
    size = 'medium', 
    style = 'normal', 
    color = '#000000',
  } = properties;

  const handleAlignChange = (value) => {
    onUpdate({ align: value });
  };

  const handleStyleChange = (value) => {
    onUpdate({ style: value });
  };

  const handleSizeChange = (value) => {
    onUpdate({ size: value });
  };

  const handleColorChange = (e) => {
    onUpdate({ color: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="block mb-2">Text Alignment</Label>
        <div className="flex border rounded-md overflow-hidden">
          <button
            className={`flex-1 p-2 flex justify-center items-center ${align === 'left' ? 'bg-gray-100' : 'bg-white'}`}
            onClick={() => handleAlignChange('left')}
          >
            <AlignLeft size={16} />
          </button>
          <button
            className={`flex-1 p-2 flex justify-center items-center ${align === 'center' ? 'bg-gray-100' : 'bg-white'}`}
            onClick={() => handleAlignChange('center')}
          >
            <AlignCenter size={16} />
          </button>
          <button
            className={`flex-1 p-2 flex justify-center items-center ${align === 'right' ? 'bg-gray-100' : 'bg-white'}`}
            onClick={() => handleAlignChange('right')}
          >
            <AlignRight size={16} />
          </button>
        </div>
      </div>
      
      <div>
        <Label className="block mb-2">Text Style</Label>
        <div className="flex border rounded-md overflow-hidden">
          <button
            className={`flex-1 p-2 flex justify-center items-center ${style === 'normal' ? 'bg-gray-100' : 'bg-white'}`}
            onClick={() => handleStyleChange('normal')}
          >
            <Type size={16} />
          </button>
          <button
            className={`flex-1 p-2 flex justify-center items-center ${style === 'bold' ? 'bg-gray-100' : 'bg-white'}`}
            onClick={() => handleStyleChange('bold')}
          >
            <Bold size={16} />
          </button>
          <button
            className={`flex-1 p-2 flex justify-center items-center ${style === 'italic' ? 'bg-gray-100' : 'bg-white'}`}
            onClick={() => handleStyleChange('italic')}
          >
            <Italic size={16} />
          </button>
          <button
            className={`flex-1 p-2 flex justify-center items-center ${style === 'bold-italic' ? 'bg-gray-100' : 'bg-white'}`}
            onClick={() => handleStyleChange('bold-italic')}
          >
            <div className="flex">
              <Bold size={16} />
              <Italic size={16} />
            </div>
          </button>
        </div>
      </div>
      
      <div>
        <Label className="block mb-2">Text Size</Label>
        <RadioGroup 
          value={size} 
          onValueChange={handleSizeChange}
          className="grid grid-cols-2 gap-2"
        >
          <div className="flex items-center space-x-2 border rounded-md p-2">
            <RadioGroupItem value="small" id="size-small" />
            <Label htmlFor="size-small" className="text-sm cursor-pointer">Small</Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-2">
            <RadioGroupItem value="medium" id="size-medium" />
            <Label htmlFor="size-medium" className="cursor-pointer">Medium</Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-2">
            <RadioGroupItem value="large" id="size-large" />
            <Label htmlFor="size-large" className="text-lg cursor-pointer">Large</Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-2">
            <RadioGroupItem value="xlarge" id="size-xlarge" />
            <Label htmlFor="size-xlarge" className="text-xl cursor-pointer">X-Large</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div>
        <Label htmlFor="text-color" className="block mb-2">Text Color</Label>
        <div className="flex space-x-2">
          <div className="w-10 h-10 border rounded-md overflow-hidden">
            <input
              type="color"
              id="text-color"
              value={color}
              onChange={handleColorChange}
              className="w-12 h-12 cursor-pointer transform translate-x-[-2px] translate-y-[-2px]"
            />
          </div>
          <Input
            value={color}
            onChange={handleColorChange}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default TextProperties;
