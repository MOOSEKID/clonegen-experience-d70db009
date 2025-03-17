
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Video } from 'lucide-react';

interface VideoElementProps {
  element: any;
  isEditing: boolean;
  onUpdate: (element: any) => void;
}

const VideoElement = ({ element, isEditing, onUpdate }: VideoElementProps) => {
  const { properties = {} } = element;
  const { align = 'left', padding = 'medium', autoplay = false, loop = false } = properties;
  
  // Determine padding class
  const paddingClass = {
    none: 'p-0',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
  }[padding] || 'p-4';

  // Construct iframe attributes based on properties
  const getIframeAttributes = () => {
    const baseAttributes = {
      className: "absolute top-0 left-0 w-full h-full rounded-md",
      src: element.content,
      title: "Video",
      frameBorder: "0",
      allow: "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    };
    
    // Add autoplay to allow attribute if enabled
    if (autoplay) {
      baseAttributes.allow = `${baseAttributes.allow}; autoplay`;
    }
    
    // Add additional attributes
    return {
      ...baseAttributes,
      allowFullScreen: true,
      autoPlay: autoplay,
      loop: loop,
    };
  };

  return (
    <div className={paddingClass}>
      {element.content ? (
        <div 
          className="relative pt-[56.25%]" 
          style={{ margin: align === 'center' ? '0 auto' : align === 'right' ? '0 0 0 auto' : '0' }}
        >
          <iframe
            {...getIframeAttributes()}
          ></iframe>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center text-gray-500">
          <Video className="mx-auto h-12 w-12 mb-2 opacity-50" />
          <p>Enter a video URL (YouTube, Vimeo)</p>
          {isEditing && (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="mt-4">
                  Add Video
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Video</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="video-url">Video URL (YouTube or Vimeo)</Label>
                  <Input 
                    id="video-url" 
                    placeholder="https://www.youtube.com/embed/..."
                    onChange={(e) => onUpdate({ ...element, content: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use embed URLs (e.g., https://www.youtube.com/embed/VIDEO_ID)
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
      {isEditing && element.content && (
        <div className="mt-2 flex justify-end space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Change Video
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Video</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="video-url">Video URL (YouTube or Vimeo)</Label>
                <Input 
                  id="video-url" 
                  placeholder="https://www.youtube.com/embed/..."
                  defaultValue={element.content}
                  onChange={(e) => onUpdate({ ...element, content: e.target.value })}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default VideoElement;
