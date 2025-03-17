
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ElementItem from './ElementItem';
import EmptyContentState from './EmptyContentState';
import { AddElementButton } from './ContentEditorTools';
import { ContentElement } from '@/types/content.types';

interface ElementsListProps {
  pageContent: ContentElement[];
  isPreviewMode: boolean;
  selectedElement: ContentElement | null;
  onDragEnd: (result: any) => void;
  onDeleteElement: (index: number) => void;
  onDuplicateElement: (index: number) => void;
  onMoveElement: (index: number, direction: 'up' | 'down') => void;
  onSelectElement: (element: ContentElement | null) => void;
  onUpdateElement: (element: ContentElement, index: number) => void;
  onAddElement: (type: string) => void;
}

const ElementsList = ({ 
  pageContent, 
  isPreviewMode, 
  selectedElement,
  onDragEnd,
  onDeleteElement,
  onDuplicateElement,
  onMoveElement,
  onSelectElement,
  onUpdateElement,
  onAddElement
}: ElementsListProps) => {
  if (pageContent.length === 0) {
    return <EmptyContentState onAddElement={onAddElement} />;
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="content-elements">
          {(provided: any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {pageContent.map((element, index) => (
                <ElementItem 
                  key={element.id}
                  element={element}
                  index={index}
                  selectedElementId={selectedElement?.id || null}
                  isEditing={!isPreviewMode}
                  onSelect={onSelectElement}
                  onDelete={onDeleteElement}
                  onDuplicate={onDuplicateElement}
                  onMove={onMoveElement}
                  onUpdate={onUpdateElement}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      {!isPreviewMode && pageContent.length > 0 && (
        <AddElementButton onAddElement={onAddElement} />
      )}
    </>
  );
};

export default ElementsList;
