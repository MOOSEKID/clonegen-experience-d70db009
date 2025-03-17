
import { ContentElement, ElementProperties } from '../ContentEditor';

// Mapping for padding classes
const paddingClasses = {
  none: '',
  small: 'p-2',
  medium: 'p-4',
  large: 'p-6'
};

interface ButtonElementProps {
  element: ContentElement;
  isEditing: boolean;
  onUpdate: (element: ContentElement) => void;
}

const ButtonElement = ({ element, isEditing, onUpdate }: ButtonElementProps) => {
  const { content, properties, link } = element;
  
  // Get padding class based on properties
  const paddingClass = paddingClasses[properties.padding as keyof typeof paddingClasses] || paddingClasses.medium;
  
  // Alignment classes
  const alignmentClass = properties.align === 'center' 
    ? 'flex justify-center' 
    : properties.align === 'right' 
      ? 'flex justify-end' 
      : '';
      
  // Button classes
  const buttonClasses = `
    inline-block px-4 py-2 rounded
    ${properties.size === 'small' ? 'text-sm' : ''}
    ${properties.size === 'large' ? 'text-lg px-6 py-3' : ''}
  `;
  
  // Button style
  const buttonStyle = {
    backgroundColor: properties.color || '#3B82F6',
    color: '#ffffff',
    borderRadius: properties.borderRadius ? `${properties.borderRadius}px` : '0.25rem'
  };
  
  // Handle content change in edit mode
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...element,
      content: e.target.value
    });
  };
  
  // Handle link change in edit mode
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...element,
      link: e.target.value
    });
  };
  
  return (
    <div className={`${paddingClass} ${alignmentClass}`}>
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={content}
            onChange={handleContentChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Button Text"
          />
          <input
            type="text"
            value={link || ''}
            onChange={handleLinkChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Button Link (URL)"
          />
        </div>
      ) : (
        <a 
          href={link || '#'} 
          className={buttonClasses}
          style={buttonStyle}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content || 'Button'}
        </a>
      )}
    </div>
  );
};

export default ButtonElement;
