
import { ElementProperties } from '@/types/content.types';

interface ImageElementProps {
  content: string;
  properties: ElementProperties;
  alt?: string;
  isEditing: boolean;
}

const ImageElement = ({ content, properties, alt, isEditing }: ImageElementProps) => {
  const getSizeClass = () => {
    switch (properties.size) {
      case 'sm': return 'max-w-[200px]';
      case 'md': return 'max-w-[400px]';
      case 'lg': return 'max-w-[600px]';
      case 'full': return 'w-full';
      default: return 'max-w-[400px]';
    }
  };

  const getAlignClass = () => {
    switch (properties.align) {
      case 'left': return 'mr-auto';
      case 'center': return 'mx-auto';
      case 'right': return 'ml-auto';
      default: return 'mx-auto';
    }
  };

  const getPaddingClass = () => {
    switch (properties.padding) {
      case 'sm': return 'p-2';
      case 'md': return 'p-4';
      case 'lg': return 'p-6';
      default: return '';
    }
  };

  return (
    <div className={`${getPaddingClass()}`}>
      <img
        src={content}
        alt={alt || "Image"}
        className={`${getSizeClass()} ${getAlignClass()} block object-contain ${isEditing ? 'border border-dashed border-gray-300' : ''}`}
      />
    </div>
  );
};

export default ImageElement;
