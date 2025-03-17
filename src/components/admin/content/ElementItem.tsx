
import { Draggable } from 'react-beautiful-dnd';
import EditableElement from './EditableElement';
import ElementActions from './ElementActions';
import { ContentElement } from '@/types/content.types';

interface ElementItemProps {
  element: ContentElement;
  index: number;
  selectedElementId: string | null;
  isEditing: boolean;
  onSelect: (element: ContentElement) => void;
  onDelete: (index: number) => void;
  onDuplicate: (index: number) => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
  onUpdate: (element: ContentElement, index: number) => void;
}

const ElementItem = ({
  element,
  index,
  selectedElementId,
  isEditing,
  onSelect,
  onDelete,
  onDuplicate,
  onMove,
  onUpdate
}: ElementItemProps) => {
  const isSelected = selectedElementId === element.id;
  
  const handleSelectElement = () => {
    onSelect(element);
  };
  
  const handleUpdateElement = (updatedElement: ContentElement) => {
    onUpdate(updatedElement, index);
  };

  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided: any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`relative mb-4 border ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} rounded-md overflow-hidden`}
        >
          <div
            className="cursor-pointer"
            onClick={handleSelectElement}
          >
            <div 
              {...provided.dragHandleProps}
              className="px-3 py-2 bg-gray-50 border-b border-gray-200 flex justify-between items-center"
            >
              <span className="text-sm font-medium text-gray-700">
                {element.type.charAt(0).toUpperCase() + element.type.slice(1)}
              </span>
              <ElementActions 
                index={index}
                onDelete={() => onDelete(index)}
                onDuplicate={() => onDuplicate(index)}
                onMoveUp={() => onMove(index, 'up')}
                onMoveDown={() => onMove(index, 'down')}
              />
            </div>
            <div className="p-4">
              <EditableElement
                element={element}
                isEditing={isEditing}
                onUpdate={handleUpdateElement}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ElementItem;
