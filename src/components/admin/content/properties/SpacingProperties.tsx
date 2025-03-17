
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { ContentElement, ElementProperties } from '@/types/content.types';

interface SpacingPropertiesProps {
  element: ContentElement;
  onUpdate: (properties: Partial<ElementProperties>) => void;
}

const SpacingProperties = ({ element, onUpdate }: SpacingPropertiesProps) => {
  const handlePaddingChange = (padding: string) => {
    onUpdate({ padding });
  };

  const handleMarginChange = (value: number[]) => {
    onUpdate({ margin: value[0] });
  };

  const handleBorderRadiusChange = (borderRadius: string) => {
    onUpdate({ borderRadius });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="block mb-2">Padding</Label>
        <RadioGroup
          defaultValue={element.properties.padding}
          onValueChange={handlePaddingChange}
          className="flex flex-wrap gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="padding-none" />
            <Label htmlFor="padding-none">None</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sm" id="padding-sm" />
            <Label htmlFor="padding-sm">Small</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="md" id="padding-md" />
            <Label htmlFor="padding-md">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lg" id="padding-lg" />
            <Label htmlFor="padding-lg">Large</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <Label>Margin</Label>
          <span className="text-sm text-muted-foreground">
            {element.properties.margin || 0}px
          </span>
        </div>
        <Slider
          defaultValue={[element.properties.margin || 0]}
          max={50}
          step={1}
          onValueChange={handleMarginChange}
        />
      </div>

      <div>
        <Label className="block mb-2">Border Radius</Label>
        <RadioGroup
          defaultValue={element.properties.borderRadius || 'none'}
          onValueChange={handleBorderRadiusChange}
          className="flex flex-wrap gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="radius-none" />
            <Label htmlFor="radius-none">None</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sm" id="radius-sm" />
            <Label htmlFor="radius-sm">Small</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="md" id="radius-md" />
            <Label htmlFor="radius-md">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lg" id="radius-lg" />
            <Label htmlFor="radius-lg">Large</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="full" id="radius-full" />
            <Label htmlFor="radius-full">Full</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default SpacingProperties;
