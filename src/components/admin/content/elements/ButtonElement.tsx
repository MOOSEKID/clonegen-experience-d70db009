
import { ElementProperties } from '@/types/content.types';

interface ButtonElementProps {
  content: string;
  properties: ElementProperties;
  link?: string;
  isEditing: boolean;
}

const ButtonElement = ({ content, properties, link, isEditing }: ButtonElementProps) => {
  const getVariantClass = () => {
    switch (properties.color) {
      case 'primary': return 'bg-primary text-primary-foreground hover:bg-primary/90';
      case 'secondary': return 'bg-secondary text-secondary-foreground hover:bg-secondary/90';
      case 'accent': return 'bg-accent text-accent-foreground hover:bg-accent/90';
      case 'destructive': return 'bg-destructive text-destructive-foreground hover:bg-destructive/90';
      default: return 'bg-primary text-primary-foreground hover:bg-primary/90';
    }
  };

  const getSizeClass = () => {
    switch (properties.size) {
      case 'sm': return 'h-8 px-3 text-xs';
      case 'lg': return 'h-11 px-8 text-base';
      default: return 'h-10 px-4 py-2';
    }
  };

  const getAlignClass = () => {
    switch (properties.align) {
      case 'left': return 'mr-auto';
      case 'center': return 'mx-auto';
      case 'right': return 'ml-auto';
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

  const ButtonContent = () => (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${getVariantClass()} ${getSizeClass()}`}
    >
      {content}
    </button>
  );

  return (
    <div className={`${getPaddingClass()} flex`}>
      <div className={`${getAlignClass()}`}>
        {isEditing || !link ? (
          <ButtonContent />
        ) : (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <ButtonContent />
          </a>
        )}
      </div>
    </div>
  );
};

export default ButtonElement;
