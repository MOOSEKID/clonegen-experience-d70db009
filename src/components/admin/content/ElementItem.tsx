
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Trash, 
  GripVertical, 
  Copy,
  ArrowDown,
  ArrowUp,
} from 'lucide-react';
import EditableElement from './EditableElement';

interface ElementItemProps {
  element: any;
  index: number;
  isPreviewMode: boolean;
  selectedElement: any;
  onDeleteElement: (index: number) => void;
  onDuplicateElement: (index: number) => void;
  onMoveElement: (index: number, direction: 'up' | 'down') => void;
  onSelectElement: (element: any) => void;
  onUpdateElement: (element: any, index: number) => void;
  totalElements: number;
}

const ElementItem = ({ 
  element, 
  index, 
  isPreviewMode, 
  selectedElement, 
  onDeleteElement, 
  onDuplicateElement, 
  onMoveElement, 
  onSelectElement, 
  onUpdateElement,
  totalElements 
}: ElementItemProps) => {
  return (
    <Draggable 
      key={element.id} 
      draggableId={element.id} 
      index={index}
      isDragDisabled={isPreviewMode}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`border ${selectedElement?.id === element.id && !isPreviewMode ? 'border-gym-orange' : 'border-gray-200'} 
            rounded-lg shadow-sm relative group ${isPreviewMode ? 'border-transparent shadow-none' : ''}`}
        >
          {!isPreviewMode && (
            <div className="absolute -top-3 -right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onDeleteElement(index)}
                className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                title="Delete element"
              >
                <Trash size={14} />
              </button>
              <button
                onClick={() => onDuplicateElement(index)}
                className="bg-gray-500 text-white rounded-full p-1 hover:bg-gray-600 transition-colors"
                title="Duplicate element"
              >
                <Copy size={14} />
              </button>
              <button
                onClick={() => onMoveElement(index, 'up')}
                className={`bg-gray-500 text-white rounded-full p-1 hover:bg-gray-600 transition-colors ${index === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="Move up"
                disabled={index === 0}
              >
                <ArrowUp size={14} />
              </button>
              <button
                onClick={() => onMoveElement(index, 'down')}
                className={`bg-gray-500 text-white rounded-full p-1 hover:bg-gray-600 transition-colors ${index === totalElements - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="Move down"
                disabled={index === totalElements - 1}
              >
                <ArrowDown size={14} />
              </button>
            </div>
          )}
          
          {!isPreviewMode && (
            <div
              {...provided.dragHandleProps}
              className="absolute top-2 left-2 cursor-grab text-gray-400 hover:text-gray-600 transition-colors"
            >
              <GripVertical size={16} />
            </div>
          )}
          
          <div 
            className={`p-6 pt-8 ${!isPreviewMode ? 'pl-10' : ''}`}
            onClick={() => !isPreviewMode && onSelectElement(element)}
          >
            <EditableElement 
              element={element} 
              isEditing={!isPreviewMode} 
              onUpdate={(updatedElement) => onUpdateElement(updatedElement, index)}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ElementItem;
