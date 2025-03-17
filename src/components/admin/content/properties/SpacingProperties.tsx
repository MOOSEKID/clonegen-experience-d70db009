
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ElementProperties } from '../ContentEditor';

interface SpacingPropertiesProps {
  properties: ElementProperties;
  onUpdate: (properties: ElementProperties) => void;
}

const SpacingProperties = ({ properties, onUpdate }: SpacingPropertiesProps) => {
  const handlePaddingChange = (value: string) => {
    onUpdate({ padding: value });
  };
  
  const handleMarginChange = (value: number[]) => {
    onUpdate({ margin: value[0] });
  };
  
  const handleBorderRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ borderRadius: e.target.value });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <Label>Padding</Label>
        <Select 
          value={properties.padding || 'medium'} 
          onValueChange={handlePaddingChange}
        >
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select padding" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Margin (px)</Label>
        <div className="pt-5">
          <Slider
            defaultValue={[properties.margin || 0]}
            max={100}
            step={1}
            onValueChange={handleMarginChange}
          />
        </div>
        <div className="text-xs text-right mt-1 text-gray-500">
          {properties.margin || 0}px
        </div>
      </div>
      
      <div>
        <Label>Border Radius (px)</Label>
        <div className="pt-5">
          <Slider
            defaultValue={[parseInt(properties.borderRadius) || 0]}
            max={50}
            step={1}
            onValueChange={(value) => onUpdate({ borderRadius: value[0].toString() })}
          />
        </div>
        <div className="text-xs text-right mt-1 text-gray-500">
          {properties.borderRadius || 0}px
        </div>
      </div>
    </div>
  );
};

export default SpacingProperties;
