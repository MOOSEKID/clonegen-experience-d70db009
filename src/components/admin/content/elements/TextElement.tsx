
import { ContentElement, ElementProperties } from '../ContentEditor';

// Size mapping to tailwind classes
const sizeClasses = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
  xlarge: 'text-xl',
  '2xlarge': 'text-2xl',
  '3xlarge': 'text-3xl',
  '4xlarge': 'text-4xl'
};

// Style mapping to tailwind classes
const styleClasses = {
  normal: '',
  bold: 'font-bold',
  italic: 'italic',
  'bold-italic': 'font-bold italic'
};

// Padding mapping to tailwind classes
const paddingClasses = {
  none: '',
  small: 'p-2',
  medium: 'p-4',
  large: 'p-6'
};

interface TextElementProps {
  element: ContentElement;
  isEditing: boolean;
  onUpdate: (element: ContentElement) => void;
}

const TextElement = ({ element, isEditing, onUpdate }: TextElementProps) => {
  const { content, properties } = element;
  
  // Get size class based on properties
  const sizeClass = sizeClasses[properties.size as keyof typeof sizeClasses] || sizeClasses.medium;
  
  // Get style class based on properties
  const styleClass = styleClasses[properties.style as keyof typeof styleClasses] || styleClasses.normal;
  
  // Get padding class based on properties
  const paddingClass = paddingClasses[properties.padding as keyof typeof paddingClasses] || paddingClasses.medium;
  
  // Get alignment class based on properties
  const alignClass = properties.align === 'center' 
    ? 'text-center' 
    : properties.align === 'right' 
      ? 'text-right' 
      : properties.align === 'justify' 
        ? 'text-justify' 
        : 'text-left';
  
  // Handle content change in edit mode
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({
      ...element,
      content: e.target.value
    });
  };
  
  return (
    <div className={paddingClass}>
      {isEditing ? (
        <textarea
          value={content}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded min-h-[100px]"
          placeholder="Enter text content here..."
        />
      ) : (
        <p 
          className={`${sizeClass} ${styleClass} ${alignClass}`}
          style={{ color: properties.color || '#000000' }}
        >
          {content || 'Text content goes here'}
        </p>
      )}
    </div>
  );
};

export default TextElement;
