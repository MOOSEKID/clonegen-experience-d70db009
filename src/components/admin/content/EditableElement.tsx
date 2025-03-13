
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Pencil, Link, Image as ImageIcon, Video } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditableElementProps {
  element: any;
  isEditing: boolean;
  onUpdate: (element: any) => void;
}

const EditableElement = ({ element, isEditing, onUpdate }: EditableElementProps) => {
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [contentValue, setContentValue] = useState(element.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setContentValue(element.content);
  }, [element.content]);

  useEffect(() => {
    if (isEditingContent && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditingContent]);

  const handleSaveContent = () => {
    onUpdate({
      ...element,
      content: contentValue
    });
    setIsEditingContent(false);
  };

  const handleApplyLink = (url: string, text: string) => {
    onUpdate({
      ...element,
      content: text,
      link: url
    });
  };

  const renderElement = () => {
    const { type, properties = {} } = element;
    const { align = 'left', size = 'medium', style = 'normal', color = '#000000', padding = 'medium' } = properties;

    // Determine text size class
    const sizeClass = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
      xlarge: 'text-xl',
      '2xlarge': 'text-2xl',
      '3xlarge': 'text-3xl',
      '4xlarge': 'text-4xl',
    }[size] || 'text-base';

    // Determine text style class
    const styleClass = {
      normal: 'font-normal',
      bold: 'font-bold',
      italic: 'italic',
      'bold-italic': 'font-bold italic',
    }[style] || 'font-normal';

    // Determine padding class
    const paddingClass = {
      none: 'p-0',
      small: 'p-2',
      medium: 'p-4',
      large: 'p-6',
    }[padding] || 'p-4';

    // Common styles based on properties
    const commonStyles = {
      textAlign: align,
      color,
    };

    switch (type) {
      case 'text':
        if (isEditing && isEditingContent) {
          return (
            <div>
              <textarea
                ref={textareaRef}
                value={contentValue}
                onChange={(e) => setContentValue(e.target.value)}
                className="w-full min-h-[100px] p-2 border border-gray-300 rounded-md"
              />
              <div className="mt-2 flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditingContent(false)}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSaveContent}
                >
                  Save
                </Button>
              </div>
            </div>
          );
        }
        
        return (
          <div>
            <p 
              className={`${sizeClass} ${styleClass} ${paddingClass}`} 
              style={commonStyles}
              onClick={() => isEditing && setIsEditingContent(true)}
            >
              {element.content}
            </p>
            {isEditing && !isEditingContent && (
              <div className="mt-2 flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditingContent(true)}
                >
                  <Pencil className="h-3 w-3 mr-1" />
                  Edit Text
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Link className="h-3 w-3 mr-1" />
                      Add Link
                    </Button>
                  </DialogTrigger>
                  <LinkDialog element={element} onApply={handleApplyLink} />
                </Dialog>
              </div>
            )}
          </div>
        );

      case 'image':
        return (
          <div className={paddingClass}>
            {element.content ? (
              <img 
                src={element.content} 
                alt={element.alt || "Image"} 
                className="max-w-full h-auto rounded-md"
                style={{ margin: align === 'center' ? '0 auto' : align === 'right' ? '0 0 0 auto' : '0' }}
              />
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center text-gray-500">
                <ImageIcon className="mx-auto h-12 w-12 mb-2 opacity-50" />
                <p>Select an image from the media library</p>
                {isEditing && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="mt-4">
                        Select Image
                      </Button>
                    </DialogTrigger>
                    <SelectImageDialog 
                      onSelect={(url) => onUpdate({ ...element, content: url })} 
                    />
                  </Dialog>
                )}
              </div>
            )}
            {isEditing && element.content && (
              <div className="mt-2 flex justify-end space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Change Image
                    </Button>
                  </DialogTrigger>
                  <SelectImageDialog 
                    onSelect={(url) => onUpdate({ ...element, content: url })} 
                  />
                </Dialog>
              </div>
            )}
          </div>
        );

      case 'video':
        return (
          <div className={paddingClass}>
            {element.content ? (
              <div 
                className="relative pt-[56.25%]" 
                style={{ margin: align === 'center' ? '0 auto' : align === 'right' ? '0 0 0 auto' : '0' }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-md"
                  src={element.content}
                  title="Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
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

      case 'button':
        return (
          <div className={paddingClass} style={{ textAlign: align }}>
            <Button 
              className="bg-gym-orange hover:bg-gym-orange/90"
              onClick={() => element.link && window.open(element.link, '_blank')}
            >
              {element.content || 'Button Text'}
            </Button>
            {isEditing && (
              <div className="mt-2 flex justify-end space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Edit Button
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Button</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                      <div>
                        <Label htmlFor="button-text">Button Text</Label>
                        <Input 
                          id="button-text" 
                          placeholder="Click Here"
                          defaultValue={element.content}
                          onChange={(e) => onUpdate({ ...element, content: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="button-link">Button Link</Label>
                        <Input 
                          id="button-link" 
                          placeholder="https://example.com"
                          defaultValue={element.link}
                          onChange={(e) => onUpdate({ ...element, link: e.target.value })}
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        );

      default:
        return <div>Unknown element type</div>;
    }
  };

  return renderElement();
};

const LinkDialog = ({ element, onApply }) => {
  const [url, setUrl] = useState(element.link || '');
  const [text, setText] = useState(element.content || '');
  
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Link</DialogTitle>
      </DialogHeader>
      <div className="py-4 space-y-4">
        <div>
          <Label htmlFor="link-text">Link Text</Label>
          <Input 
            id="link-text" 
            placeholder="Click here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="link-url">URL</Label>
          <Input 
            id="link-url" 
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <Button 
          onClick={() => onApply(url, text)}
          className="w-full"
        >
          Apply Link
        </Button>
      </div>
    </DialogContent>
  );
};

// Mock dialog for selecting images - would connect to media library
const SelectImageDialog = ({ onSelect }) => {
  const sampleImages = [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2074&auto=format&fit=crop'
  ];
  
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Select Image</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 py-4">
        {sampleImages.map((image, index) => (
          <div 
            key={index}
            className="border rounded-md overflow-hidden cursor-pointer hover:border-gym-orange transition-colors"
            onClick={() => onSelect(image)}
          >
            <img src={image} alt={`Sample ${index + 1}`} className="w-full h-32 object-cover" />
          </div>
        ))}
      </div>
    </DialogContent>
  );
};

export default EditableElement;
