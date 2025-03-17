
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ElementProperties } from '@/types/content.types';

interface VideoPropertiesProps {
  properties: ElementProperties;
  onUpdate: (properties: Partial<ElementProperties>) => void;
}

const VideoProperties = ({ properties, onUpdate }: VideoPropertiesProps) => {
  const handleSizeChange = (value: string) => {
    onUpdate({ size: value });
  };
  
  const handleAlignChange = (value: string) => {
    onUpdate({ align: value });
  };

  const handleVideoUrlChange = (value: string) => {
    onUpdate({ videoUrl: value });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <Label>Video URL</Label>
        <Input 
          type="text" 
          value={properties.videoUrl || ''} 
          onChange={(e) => handleVideoUrlChange(e.target.value)}
          className="mt-1.5"
          placeholder="YouTube or Vimeo URL"
        />
        <p className="text-xs text-gray-500 mt-1">
          Supports YouTube and Vimeo videos
        </p>
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

export default VideoProperties;
