
import { Label } from "@/components/ui/label";
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

interface VideoPropertiesProps {
  properties: {
    align?: string;
    autoplay?: boolean;
    loop?: boolean;
  };
  onUpdate: (properties: any) => void;
}

const VideoProperties = ({ properties, onUpdate }: VideoPropertiesProps) => {
  const { align = 'left', autoplay = false, loop = false } = properties;

  const handleAlignChange = (value) => {
    onUpdate({ ...properties, align: value });
  };

  const handleAutoplayChange = (checked: boolean) => {
    onUpdate({ ...properties, autoplay: checked });
  };

  const handleLoopChange = (checked: boolean) => {
    onUpdate({ ...properties, loop: checked });
  };

  return (
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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="autoplay-toggle" className="cursor-pointer">Autoplay Video</Label>
          <Switch 
            id="autoplay-toggle"
            checked={autoplay}
            onCheckedChange={handleAutoplayChange}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="loop-checkbox" 
            checked={loop}
            onCheckedChange={handleLoopChange}
          />
          <Label 
            htmlFor="loop-checkbox" 
            className="text-sm cursor-pointer"
          >
            Loop video playback
          </Label>
        </div>
      </div>
    </div>
  );
};

export default VideoProperties;
