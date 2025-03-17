
import { Label } from "@/components/ui/label";
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface ImagePropertiesProps {
  element: any;
  properties: {
    align?: string;
  };
  onUpdate: (properties: any) => void;
}

const ImageProperties = ({ element, properties, onUpdate }: ImagePropertiesProps) => {
  const { align = 'left' } = properties;

  const handleAlignChange = (value) => {
    onUpdate({ align: value });
  };

  return (
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
};

export default ImageProperties;
