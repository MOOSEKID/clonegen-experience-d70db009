
import { ContentElement, ElementProperties } from '../ContentEditor';

// Mapping for padding classes
const paddingClasses = {
  none: '',
  small: 'p-2',
  medium: 'p-4',
  large: 'p-6'
};

interface VideoElementProps {
  element: ContentElement;
  isEditing: boolean;
  onUpdate: (element: ContentElement) => void;
}

const VideoElement = ({ element, isEditing, onUpdate }: VideoElementProps) => {
  const { content, properties } = element;
  
  // Get padding class based on properties
  const paddingClass = paddingClasses[properties.padding as keyof typeof paddingClasses] || paddingClasses.medium;
  
  // Size classes
  const sizeClass = properties.size === 'small' 
    ? 'max-w-md' 
    : properties.size === 'medium'
      ? 'max-w-lg'
      : properties.size === 'large'
        ? 'max-w-2xl'
        : 'w-full';
        
  // Alignment classes
  const alignmentClass = properties.align === 'center' 
    ? 'mx-auto' 
    : properties.align === 'right' 
      ? 'ml-auto' 
      : '';
    
  // Handle URL change in edit mode
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...element,
      content: e.target.value
    });
  };
  
  // Extract video ID from YouTube or Vimeo URL
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      const videoId = (match && match[2].length === 11) ? match[2] : null;
      
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    // Vimeo
    if (url.includes('vimeo.com')) {
      const regExp = /^.*(vimeo.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
      const match = url.match(regExp);
      const videoId = match ? match[5] : null;
      
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }
    
    return url;
  };
  
  return (
    <div className={paddingClass}>
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={content}
            onChange={handleUrlChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="YouTube or Vimeo URL"
          />
          <p className="text-xs text-gray-500">
            Paste a YouTube or Vimeo video URL here
          </p>
        </div>
      ) : (
        <div className={`${sizeClass} ${alignmentClass} aspect-w-16 aspect-h-9`}>
          <iframe
            src={getEmbedUrl(content)}
            title="Video"
            allowFullScreen
            className="w-full h-full"
            style={{
              borderRadius: properties.borderRadius ? `${properties.borderRadius}px` : '0.25rem'
            }}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoElement;
