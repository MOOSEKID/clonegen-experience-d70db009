
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface EditableElementProps {
  element: any;
  isEditing: boolean;
  onUpdate: (element: any) => void;
  viewMode?: 'desktop' | 'tablet' | 'mobile';
}

const EditableElement = ({ element, isEditing, onUpdate, viewMode = 'desktop' }: EditableElementProps) => {
  const [isEditingText, setIsEditingText] = useState(false);
  const { type, content, properties = {}, responsiveSettings = {} } = element;
  
  // Get responsive font size
  const fontSize = responsiveSettings?.fontSize || 'medium';
  const fontSizeClass = fontSize === 'small' ? 'text-sm' : fontSize === 'large' ? 'text-xl' : 'text-base';

  const handleTextClick = () => {
    if (isEditing && type === 'text') {
      setIsEditingText(true);
    }
  };

  const handleTextChange = (e) => {
    onUpdate({ ...element, content: e.target.value });
  };

  const handleTextBlur = () => {
    setIsEditingText(false);
  };

  const getResponsiveStyle = () => {
    // Get align from properties
    const { align = 'left', backgroundColor = 'transparent', padding = 'medium' } = properties;
    
    // Get padding values
    const paddingClass = 
      padding === 'none' ? 'p-0' : 
      padding === 'small' ? 'p-2' : 
      padding === 'large' ? 'p-8' : 
      'p-4';

    return {
      textAlign: align,
      backgroundColor,
      padding: '',
      className: `${paddingClass} ${fontSizeClass}`
    };
  };

  const responsiveStyle = getResponsiveStyle();

  const renderElementContent = () => {
    switch (type) {
      case 'text':
        if (isEditingText) {
          return (
            <Input
              defaultValue={content}
              onChange={handleTextChange}
              onBlur={handleTextBlur}
              autoFocus
              className="w-full"
            />
          );
        }
        return (
          <div
            className={cn(
              "w-full outline-none",
              responsiveStyle.className
            )}
            style={{ 
              textAlign: responsiveStyle.textAlign as any,
              backgroundColor: responsiveStyle.backgroundColor
            }}
            onClick={handleTextClick}
          >
            {content}
          </div>
        );

      case 'image':
        return (
          <div
            className={cn(
              "w-full", 
              responsiveStyle.className,
              properties.align === 'center' ? 'text-center' : 
              properties.align === 'right' ? 'text-right' : 'text-left'
            )}
            style={{ backgroundColor: responsiveStyle.backgroundColor }}
          >
            <img 
              src={content || "https://placehold.co/600x400/e0e0e0/6b7280?text=Select+an+image"}
              alt={element.alt || "Content image"}
              className="max-w-full max-h-96 inline-block"
            />
          </div>
        );

      case 'video':
        return (
          <div
            className={cn(
              "w-full",
              responsiveStyle.className,
              properties.align === 'center' ? 'text-center' : 
              properties.align === 'right' ? 'text-right' : 'text-left'
            )}
            style={{ backgroundColor: responsiveStyle.backgroundColor }}
          >
            {content ? (
              <video 
                controls 
                className="max-w-full max-h-96 inline-block"
                autoPlay={properties.autoplay}
                loop={properties.loop}
              >
                <source src={content} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full aspect-video bg-gray-200 flex items-center justify-center text-gray-500">
                {isEditing ? "Click to select a video" : "Video placeholder"}
              </div>
            )}
          </div>
        );

      case 'button':
        return (
          <div
            className={cn(
              "w-full",
              responsiveStyle.className,
              properties.align === 'center' ? 'text-center' : 
              properties.align === 'right' ? 'text-right' : 'text-left'
            )}
            style={{ backgroundColor: responsiveStyle.backgroundColor }}
          >
            <button 
              className={`bg-gym-orange text-white px-4 py-2 rounded ${fontSizeClass}`}
            >
              {content || "Button"}
            </button>
          </div>
        );

      default:
        return <div>Unknown element type</div>;
    }
  };

  return renderElementContent();
};

export default EditableElement;
