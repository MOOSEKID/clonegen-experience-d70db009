
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ContentElement, ElementProperties } from '@/types/content.types';

interface VideoPropertiesProps {
  element: ContentElement;
  onUpdate: (properties: Partial<ElementProperties>) => void;
  onElementUpdate: (element: ContentElement) => void;
}

const VideoProperties = ({ element, onUpdate, onElementUpdate }: VideoPropertiesProps) => {
  const [videoUrl, setVideoUrl] = useState(element.videoUrl || '');
  
  const handleSizeChange = (size: string) => {
    onUpdate({ size });
  };

  const handleAlignChange = (align: string) => {
    onUpdate({ align });
  };

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setVideoUrl(newUrl);
    
    // Update the element with the new video URL
    const updatedElement = {
      ...element,
      videoUrl: newUrl
    };
    onElementUpdate(updatedElement);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="video-url" className="block mb-2">Video URL</Label>
        <Input
          id="video-url"
          value={videoUrl}
          onChange={handleVideoUrlChange}
          placeholder="Enter YouTube or Vimeo URL"
        />
      </div>

      <div>
        <Label className="block mb-2">Video Size</Label>
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
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="full" id="size-full" />
            <Label htmlFor="size-full">Full Width</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="block mb-2">Video Alignment</Label>
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

export default VideoProperties;
