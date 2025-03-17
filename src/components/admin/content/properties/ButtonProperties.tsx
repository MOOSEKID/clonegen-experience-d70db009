
import { ContentElement, ElementProperties } from '@/types/content.types';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ButtonPropertiesProps {
  element: ContentElement;
  onUpdate: (properties: Partial<ElementProperties>) => void;
}

const ButtonProperties = ({ element, onUpdate }: ButtonPropertiesProps) => {
  const handleColorChange = (color: string) => {
    onUpdate({ color });
  };

  const handleSizeChange = (size: string) => {
    onUpdate({ size });
  };

  const handleAlignChange = (align: string) => {
    onUpdate({ align });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="block mb-2">Button Color</Label>
        <RadioGroup
          defaultValue={element.properties.color}
          onValueChange={handleColorChange}
          className="flex flex-wrap gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="primary" id="color-primary" />
            <Label htmlFor="color-primary" className="text-primary">Primary</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="secondary" id="color-secondary" />
            <Label htmlFor="color-secondary" className="text-secondary">Secondary</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="accent" id="color-accent" />
            <Label htmlFor="color-accent" className="text-accent">Accent</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="destructive" id="color-destructive" />
            <Label htmlFor="color-destructive" className="text-destructive">Destructive</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="block mb-2">Button Size</Label>
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
        </RadioGroup>
      </div>

      <div>
        <Label className="block mb-2">Alignment</Label>
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
    </div>
  );
};

export default ButtonProperties;
