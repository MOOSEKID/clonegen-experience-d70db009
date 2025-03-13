
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Bold, 
  Italic, 
  Type,
  Maximize,
  Minimize
} from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ElementPropertiesProps {
  element: any;
  onUpdate: (properties: any) => void;
}

const ElementProperties = ({ element, onUpdate }: ElementPropertiesProps) => {
  const { type, properties = {} } = element;
  const { 
    align = 'left', 
    size = 'medium', 
    style = 'normal', 
    color = '#000000',
    padding = 'medium',
    backgroundColor = 'transparent'
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

  const handlePaddingChange = (value) => {
    onUpdate({ padding: value });
  };

  const handleColorChange = (e) => {
    onUpdate({ color: e.target.value });
  };

  const handleBackgroundColorChange = (e) => {
    onUpdate({ backgroundColor: e.target.value });
  };

  // Different property sets based on element type
  const renderTextProperties = () => (
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

  const renderImageProperties = () => (
    <div className="space-y-6">
      <div>
        <Label className="block mb-2">Image Alignment</Label>
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
        <Label htmlFor="alt-text" className="block mb-2">Alt Text (for accessibility)</Label>
        <Input
          id="alt-text"
          value={element.alt || ''}
          onChange={(e) => onUpdate({ alt: e.target.value })}
          placeholder="Describe the image for screen readers"
        />
        <p className="text-xs text-gray-500 mt-1">
          Helps with SEO and makes your site more accessible
        </p>
      </div>
    </div>
  );

  const renderVideoProperties = () => (
    <div className="space-y-6">
      <div>
        <Label className="block mb-2">Video Alignment</Label>
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
    </div>
  );

  const renderButtonProperties = () => (
    <div className="space-y-6">
      <div>
        <Label className="block mb-2">Button Alignment</Label>
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
    </div>
  );

  const renderSpacingProperties = () => (
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

  return (
    <Tabs defaultValue="style">
      <TabsList className="w-full">
        <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
        <TabsTrigger value="spacing" className="flex-1">Spacing</TabsTrigger>
      </TabsList>
      <TabsContent value="style" className="space-y-6 py-4">
        {type === 'text' && renderTextProperties()}
        {type === 'image' && renderImageProperties()}
        {type === 'video' && renderVideoProperties()}
        {type === 'button' && renderButtonProperties()}
      </TabsContent>
      <TabsContent value="spacing" className="space-y-6 py-4">
        {renderSpacingProperties()}
      </TabsContent>
    </Tabs>
  );
};

export default ElementProperties;
