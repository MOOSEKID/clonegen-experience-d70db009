
import { Dialog } from "@/components/ui/dialog";
import { ContentElement, ElementProperties } from '../ContentEditor';

// Mapping for padding classes
const paddingClasses = {
  none: '',
  small: 'p-2',
  medium: 'p-4',
  large: 'p-6'
};

interface ImageElementProps {
  element: ContentElement;
  isEditing: boolean;
  onUpdate: (element: ContentElement) => void;
}

const ImageElement = ({ element, isEditing, onUpdate }: ImageElementProps) => {
  const { content, properties, alt } = element;
  
  // Get padding class based on properties
  const paddingClass = paddingClasses[properties.padding as keyof typeof paddingClasses] || paddingClasses.medium;
  
  // Size classes
  const sizeClass = properties.size === 'small' 
    ? 'max-w-xs' 
    : properties.size === 'medium'
      ? 'max-w-md'
      : properties.size === 'large'
        ? 'max-w-lg'
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
  
  // Handle alt text change in edit mode
  const handleAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...element,
      alt: e.target.value
    });
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
            placeholder="Image URL"
          />
          <input
            type="text"
            value={alt || ''}
            onChange={handleAltChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Alt Text (for accessibility)"
          />
          <Dialog>
            {/* Media Library Dialog would go here */}
          </Dialog>
        </div>
      ) : (
        <img 
          src={content || '/placeholder.svg'} 
          alt={alt || 'Image'} 
          className={`${sizeClass} ${alignmentClass} rounded`}
          style={{
            borderRadius: properties.borderRadius ? `${properties.borderRadius}px` : '0.25rem'
          }}
        />
      )}
    </div>
  );
};

export default ImageElement;
