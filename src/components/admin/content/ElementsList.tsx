
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
  viewMode?: 'desktop' | 'tablet' | 'mobile';
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
  onAddElement,
  viewMode = 'desktop'
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
              {pageContent.map((element, index) => {
                // Get responsive settings for current view mode
                const defaultSettings = {
                  fontSize: viewMode === 'mobile' ? 'small' : 'medium',
                  columns: viewMode === 'mobile' ? 1 : viewMode === 'tablet' ? 2 : 3,
                  visible: true
                };
                
                const responsiveSettings = element.properties?.responsiveSettings?.[viewMode] || defaultSettings;
                
                // Skip rendering elements that are hidden in the current view mode when in preview
                if (isPreviewMode && responsiveSettings.visible === false) {
                  return null;
                }
                
                return (
                  <ElementItem 
                    key={element.id}
                    element={{...element, currentViewSettings: responsiveSettings}}
                    index={index}
                    isPreviewMode={isPreviewMode}
                    selectedElement={selectedElement}
                    onDeleteElement={onDeleteElement}
                    onDuplicateElement={onDuplicateElement}
                    onMoveElement={onMoveElement}
                    onSelectElement={onSelectElement}
                    onUpdateElement={onUpdateElement}
                    totalElements={pageContent.length}
                    viewMode={viewMode}
                  />
                );
              })}
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
