
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ElementItem from './ElementItem';
import EmptyContentState from './EmptyContentState';
import { AddElementButton } from './ContentEditorTools';

interface ElementsListProps {
  pageContent: any[];
  isPreviewMode: boolean;
  selectedElement: any;
  onDragEnd: (result: any) => void;
  onDeleteElement: (index: number) => void;
  onDuplicateElement: (index: number) => void;
  onMoveElement: (index: number, direction: 'up' | 'down') => void;
  onSelectElement: (element: any) => void;
  onUpdateElement: (element: any, index: number) => void;
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
          {(provided) => (
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
                  isPreviewMode={isPreviewMode}
                  selectedElement={selectedElement}
                  onDeleteElement={onDeleteElement}
                  onDuplicateElement={onDuplicateElement}
                  onMoveElement={onMoveElement}
                  onSelectElement={onSelectElement}
                  onUpdateElement={onUpdateElement}
                  totalElements={pageContent.length}
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
