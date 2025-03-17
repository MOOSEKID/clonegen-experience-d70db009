
import { useState } from 'react';
import { ContentElement, ElementProperties as ElementPropsType } from '@/types/content.types';
import ButtonProperties from './properties/ButtonProperties';
import ImageProperties from './properties/ImageProperties';
import TextProperties from './properties/TextProperties';
import VideoProperties from './properties/VideoProperties';
import SpacingProperties from './properties/SpacingProperties';

interface ElementPropertiesProps {
  element: ContentElement;
  onUpdate: (updatedElement: ContentElement) => void;
}

const ElementProperties = ({ element, onUpdate }: ElementPropertiesProps) => {
  const [localElement, setLocalElement] = useState<ContentElement>(element);

  const updateProperties = (newProps: Partial<ElementPropsType>) => {
    const updatedElement = {
      ...localElement,
      properties: {
        ...localElement.properties,
        ...newProps
      }
    };
    
    setLocalElement(updatedElement);
    onUpdate(updatedElement);
  };

  return (
    <div className="p-4 border border-gray-200 rounded-md">
      <h3 className="text-lg font-medium mb-4">Properties</h3>
      
      {element.type === 'text' && (
        <TextProperties element={element} onUpdate={updateProperties} />
      )}
      
      {element.type === 'image' && (
        <ImageProperties element={element} onUpdate={updateProperties} onElementUpdate={onUpdate} />
      )}
      
      {element.type === 'button' && (
        <ButtonProperties element={element} onUpdate={updateProperties} />
      )}
      
      {element.type === 'video' && (
        <VideoProperties element={element} onUpdate={updateProperties} onElementUpdate={onUpdate} />
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <SpacingProperties element={element} onUpdate={updateProperties} />
      </div>
    </div>
  );
};

export default ElementProperties;
