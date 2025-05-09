
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ArrowDown, ArrowUp, Eye, EyeOff, Trash, Plus, Settings } from 'lucide-react';
import { ContentSectionWrapper, SectionType, DynamicSectionPlaceholder } from './ContentSectionTypes';
import { Button } from "@/components/ui/button";

// Define section interfaces
export interface PageSection {
  id: string;
  type: SectionType;
  title: string;
  description?: string;
  content?: any;
  isHidden?: boolean;
  isRequired?: boolean;
  dynamicDataSource?: string;
}

interface PageStructureEditorProps {
  pageSections: PageSection[];
  onSectionsChange: (sections: PageSection[]) => void;
  selectedSectionId: string | null;
  onSelectSection: (sectionId: string | null) => void;
  viewMode: 'desktop' | 'tablet' | 'mobile';
}

const PageStructureEditor = ({
  pageSections,
  onSectionsChange,
  selectedSectionId,
  onSelectSection,
  viewMode
}: PageStructureEditorProps) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    // Don't allow reordering of dynamic sections
    const sourceSection = pageSections[result.source.index];
    if (sourceSection.type === SectionType.DYNAMIC && sourceSection.isRequired) {
      return;
    }
    
    const items = Array.from(pageSections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onSectionsChange(items);
  };
  
  const toggleSectionVisibility = (index: number) => {
    const newSections = [...pageSections];
    newSections[index] = {
      ...newSections[index],
      isHidden: !newSections[index].isHidden
    };
    onSectionsChange(newSections);
  };
  
  const deleteSection = (index: number) => {
    const newSections = [...pageSections];
    // Don't delete required sections
    if (newSections[index].isRequired) return;
    
    newSections.splice(index, 1);
    onSectionsChange(newSections);
  };
  
  const renderSectionContent = (section: PageSection) => {
    if (section.type === SectionType.DYNAMIC) {
      return (
        <DynamicSectionPlaceholder 
          title={section.dynamicDataSource || "Dynamic Content"} 
          message="This section displays data from the admin panel. Content will render based on the available data."
        />
      );
    }
    
    // For editable sections, render a placeholder or the actual content
    return (
      <div className="min-h-20 bg-gray-50 border border-dashed border-gray-300 rounded flex items-center justify-center">
        <p className="text-gray-500 text-sm">
          {section.content || "Click to edit this section"}
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Page Structure</h3>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Section
        </Button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="page-sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {pageSections.map((section, index) => (
                <Draggable 
                  key={section.id} 
                  draggableId={section.id} 
                  index={index}
                  isDragDisabled={section.type === SectionType.DYNAMIC && section.isRequired}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ContentSectionWrapper
                        type={section.type}
                        title={section.title}
                        description={section.description}
                        isSelected={selectedSectionId === section.id}
                        onSelect={() => onSelectSection(section.id)}
                        canReorder={!(section.type === SectionType.DYNAMIC && section.isRequired)}
                        className={section.isHidden ? "opacity-50" : ""}
                      >
                        {renderSectionContent(section)}
                        
                        <div className="flex justify-end mt-2 gap-2">
                          {section.type !== SectionType.DYNAMIC && (
                            <Button variant="outline" size="sm">
                              <Settings className="h-3 w-3 mr-1" /> Configure
                            </Button>
                          )}
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toggleSectionVisibility(index)}
                          >
                            {section.isHidden ? (
                              <><Eye className="h-3 w-3 mr-1" /> Show</>
                            ) : (
                              <><EyeOff className="h-3 w-3 mr-1" /> Hide</>
                            )}
                          </Button>
                          
                          {!section.isRequired && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-500 hover:bg-red-50"
                              onClick={() => deleteSection(index)}
                            >
                              <Trash className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </ContentSectionWrapper>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PageStructureEditor;
