
import { useState, useEffect } from 'react';
import TextElement from './elements/TextElement';
import ImageElement from './elements/ImageElement';
import VideoElement from './elements/VideoElement';
import ButtonElement from './elements/ButtonElement';
import { ContentElement } from './ContentEditor';

interface EditableElementProps {
  element: ContentElement;
  isEditing: boolean;
  onUpdate: (element: ContentElement) => void;
}

const EditableElement = ({ element, isEditing, onUpdate }: EditableElementProps) => {
  const [content, setContent] = useState(element.content);

  useEffect(() => {
    setContent(element.content);
  }, [element.content]);

  const renderElement = () => {
    const { type } = element;

    switch (type) {
      case 'text':
        return <TextElement element={element} isEditing={isEditing} onUpdate={onUpdate} />;
      case 'image':
        return <ImageElement element={element} isEditing={isEditing} onUpdate={onUpdate} />;
      case 'video':
        return <VideoElement element={element} isEditing={isEditing} onUpdate={onUpdate} />;
      case 'button':
        return <ButtonElement element={element} isEditing={isEditing} onUpdate={onUpdate} />;
      default:
        return <div>Unknown element type</div>;
    }
  };

  return renderElement();
};

export default EditableElement;
