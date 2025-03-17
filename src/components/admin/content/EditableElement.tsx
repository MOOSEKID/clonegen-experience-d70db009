
import TextElement from './elements/TextElement';
import ImageElement from './elements/ImageElement';
import ButtonElement from './elements/ButtonElement';
import VideoElement from './elements/VideoElement';
import { ContentElement } from '@/types/content.types';

interface EditableElementProps {
  element: ContentElement;
  isEditing: boolean;
  onUpdate: (updatedElement: ContentElement) => void;
}

const EditableElement = ({ element, isEditing, onUpdate }: EditableElementProps) => {
  const handleContentChange = (contentValue: string) => {
    const updatedElement = {
      ...element,
      content: contentValue
    };
    onUpdate(updatedElement);
  };

  switch (element.type) {
    case 'text':
      return (
        <TextElement
          content={element.content}
          properties={element.properties}
          isEditing={isEditing}
          onChange={handleContentChange}
        />
      );
    case 'image':
      return (
        <ImageElement
          content={element.content}
          properties={element.properties}
          alt={element.alt}
          isEditing={isEditing}
        />
      );
    case 'button':
      return (
        <ButtonElement
          content={element.content}
          properties={element.properties}
          link={element.link}
          isEditing={isEditing}
        />
      );
    case 'video':
      return (
        <VideoElement
          content={element.content}
          properties={element.properties}
          videoUrl={element.videoUrl}
          isEditing={isEditing}
        />
      );
    default:
      return <div>Unknown element type: {element.type}</div>;
  }
};

export default EditableElement;
