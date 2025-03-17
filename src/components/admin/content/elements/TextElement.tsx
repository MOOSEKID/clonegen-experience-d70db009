
import { ElementProperties } from '@/types/content.types';

interface TextElementProps {
  content: string;
  properties: ElementProperties;
  isEditing: boolean;
  onChange?: (content: string) => void;
}

const TextElement = ({ content, properties, isEditing, onChange }: TextElementProps) => {
  const getSizeClass = () => {
    switch (properties.size) {
      case 'sm': return 'text-sm';
      case 'lg': return 'text-lg';
      case 'xl': return 'text-xl';
      default: return 'text-base';
    }
  };

  const getStyleClass = () => {
    switch (properties.style) {
      case 'bold': return 'font-bold';
      case 'italic': return 'italic';
      case 'underline': return 'underline';
      default: return '';
    }
  };

  const getAlignClass = () => {
    switch (properties.align) {
      case 'left': return 'text-left';
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  const getColorClass = () => {
    switch (properties.color) {
      case 'primary': return 'text-primary';
      case 'secondary': return 'text-secondary';
      case 'muted': return 'text-muted-foreground';
      default: return '';
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

  const handleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    if (onChange && isEditing) {
      onChange(e.currentTarget.textContent || '');
    }
  };

  return (
    <div
      className={`${getSizeClass()} ${getStyleClass()} ${getAlignClass()} ${getColorClass()} ${getPaddingClass()}`}
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
      onBlur={handleChange}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};

export default TextElement;
