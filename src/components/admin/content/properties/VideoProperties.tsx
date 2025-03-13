
import { Label } from "@/components/ui/label";
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface VideoPropertiesProps {
  properties: {
    align?: string;
  };
  onUpdate: (properties: any) => void;
}

const VideoProperties = ({ properties, onUpdate }: VideoPropertiesProps) => {
  const { align = 'left' } = properties;

  const handleAlignChange = (value) => {
    onUpdate({ align: value });
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
    </div>
  );
};

export default VideoProperties;
