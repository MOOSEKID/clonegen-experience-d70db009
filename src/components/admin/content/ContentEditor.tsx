import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Trash, 
  GripVertical, 
  Edit, 
  Plus,
  Type, 
  Image as ImageIcon, 
  Video, 
  Box, 
  ArrowDown,
  ArrowUp,
  Copy,
  Eye
} from 'lucide-react';
import EditableElement from './EditableElement';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ElementProperties from './ElementProperties';
import { toast } from "sonner";

// Mock data for page content
import { pageContentData } from '@/data/cmsData';

interface ContentEditorProps {
  selectedPage: string;
  onContentChange: () => void;
  className?: string;
}

const ContentEditor = ({ selectedPage, onContentChange, className = '' }: ContentEditorProps) => {
  const [pageContent, setPageContent] = useState<any[]>([]);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  useEffect(() => {
    const content = pageContentData[selectedPage] || [];
    setPageContent(content);
    setSelectedElement(null);
  }, [selectedPage]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(pageContent);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setPageContent(items);
    onContentChange();
  };

  const handleDeleteElement = (index) => {
    const newContent = [...pageContent];
    newContent.splice(index, 1);
    setPageContent(newContent);
    setSelectedElement(null);
    onContentChange();
  };

  const handleDuplicateElement = (index) => {
    const newContent = [...pageContent];
    const duplicatedElement = { ...newContent[index], id: `${newContent[index].type}-${Date.now()}` };
    newContent.splice(index + 1, 0, duplicatedElement);
    setPageContent(newContent);
    onContentChange();
  };

  const handleMoveElement = (index, direction) => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === pageContent.length - 1)) {
      return;
    }
    
    const newContent = [...pageContent];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newContent[index], newContent[newIndex]] = [newContent[newIndex], newContent[index]];
    setPageContent(newContent);
    onContentChange();
  };

  const handleAddElement = (type) => {
    const newElement = {
      id: `${type}-${Date.now()}`,
      type,
      content: type === 'text' ? 'New Text Block' : '',
      properties: {
        align: 'left',
        size: 'medium',
        style: 'normal',
        color: '#000000',
        padding: 'medium',
      }
    };
    
    setPageContent([...pageContent, newElement]);
    setSelectedElement(newElement);
    onContentChange();
  };

  const handleUpdateElement = (element, index) => {
    const newContent = [...pageContent];
    newContent[index] = element;
    setPageContent(newContent);
    onContentChange();
  };

  const handleUpdateProperties = (properties) => {
    if (!selectedElement) return;
    
    const elementIndex = pageContent.findIndex(el => el.id === selectedElement.id);
    if (elementIndex === -1) return;
    
    const updatedElement = {
      ...selectedElement,
      properties: {
        ...selectedElement.properties,
        ...properties
      }
    };
    
    const newContent = [...pageContent];
    newContent[elementIndex] = updatedElement;
    
    setPageContent(newContent);
    setSelectedElement(updatedElement);
    onContentChange();
  };

  return (
    <div className={`flex flex-1 h-full ${className}`}>
      <div className={`flex-1 overflow-auto border-r border-gray-200 ${isPreviewMode ? 'bg-gray-50' : ''}`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">
            {isPreviewMode ? 'Content Preview' : 'Content Editor'}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="flex items-center space-x-1"
          >
            <Eye className="h-4 w-4 mr-1" />
            {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
          </Button>
        </div>
        
        <div className="p-4">
          {pageContent.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500 mb-4">No content elements yet</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Your First Element</Button>
                </DialogTrigger>
                <AddElementDialog onAddElement={handleAddElement} />
              </Dialog>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="content-elements">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {pageContent.map((element, index) => (
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
                                  onClick={() => handleDeleteElement(index)}
                                  className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                  title="Delete element"
                                >
                                  <Trash size={14} />
                                </button>
                                <button
                                  onClick={() => handleDuplicateElement(index)}
                                  className="bg-gray-500 text-white rounded-full p-1 hover:bg-gray-600 transition-colors"
                                  title="Duplicate element"
                                >
                                  <Copy size={14} />
                                </button>
                                <button
                                  onClick={() => handleMoveElement(index, 'up')}
                                  className={`bg-gray-500 text-white rounded-full p-1 hover:bg-gray-600 transition-colors ${index === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                  title="Move up"
                                  disabled={index === 0}
                                >
                                  <ArrowUp size={14} />
                                </button>
                                <button
                                  onClick={() => handleMoveElement(index, 'down')}
                                  className={`bg-gray-500 text-white rounded-full p-1 hover:bg-gray-600 transition-colors ${index === pageContent.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                  title="Move down"
                                  disabled={index === pageContent.length - 1}
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
                              onClick={() => !isPreviewMode && setSelectedElement(element)}
                            >
                              <EditableElement 
                                element={element} 
                                isEditing={!isPreviewMode} 
                                onUpdate={(updatedElement) => handleUpdateElement(updatedElement, index)}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
          
          {!isPreviewMode && pageContent.length > 0 && (
            <div className="mt-6 flex justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Element
                  </Button>
                </DialogTrigger>
                <AddElementDialog onAddElement={handleAddElement} />
              </Dialog>
            </div>
          )}
        </div>
      </div>
      
      {!isPreviewMode && (
        <div className="w-80 overflow-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Element Properties</h3>
          </div>
          <div className="p-4">
            {selectedElement ? (
              <ElementProperties 
                element={selectedElement} 
                onUpdate={handleUpdateProperties} 
              />
            ) : (
              <div className="text-center py-10 text-gray-500">
                <Box className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p>Select an element to edit its properties</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Dialog for adding new elements
const AddElementDialog = ({ onAddElement }) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add Content Element</DialogTitle>
        <DialogDescription>
          Choose the type of content element to add to your page.
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 py-4">
        <button
          onClick={() => onAddElement('text')}
          className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gym-orange transition-colors"
        >
          <Type className="h-8 w-8 text-gym-orange mb-2" />
          <span className="font-medium">Text Block</span>
        </button>
        <button
          onClick={() => onAddElement('image')}
          className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gym-orange transition-colors"
        >
          <ImageIcon className="h-8 w-8 text-gym-orange mb-2" />
          <span className="font-medium">Image</span>
        </button>
        <button
          onClick={() => onAddElement('video')}
          className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gym-orange transition-colors"
        >
          <Video className="h-8 w-8 text-gym-orange mb-2" />
          <span className="font-medium">Video</span>
        </button>
        <button
          onClick={() => onAddElement('button')}
          className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gym-orange transition-colors"
        >
          <Box className="h-8 w-8 text-gym-orange mb-2" />
          <span className="font-medium">Button</span>
        </button>
      </div>
    </DialogContent>
  );
};

export default ContentEditor;
