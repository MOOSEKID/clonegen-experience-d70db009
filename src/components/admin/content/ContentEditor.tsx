
import { useState, useEffect } from 'react';
import { Box } from 'lucide-react';
import ElementProperties from './ElementProperties';
import ContentEditorTools from './ContentEditorTools';
import ElementsList from './ElementsList';

// Mock data for page content
import { pageContentData } from '@/data/cmsData';

interface ContentEditorProps {
  selectedPage: string;
  onContentChange: () => void;
  className?: string;
}

// Type definitions for content elements
export interface ContentElement {
  id: string;
  type: string;
  content: string;
  properties: ElementProperties;
  alt?: string;
  link?: string;
}

export interface ElementProperties {
  align: string;
  size: string;
  style: string;
  color: string;
  padding: string;
  [key: string]: any;
}

const ContentEditor = ({ selectedPage, onContentChange, className = '' }: ContentEditorProps) => {
  const [pageContent, setPageContent] = useState<ContentElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<ContentElement | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  useEffect(() => {
    const content = (pageContentData as any)[selectedPage] || [];
    setPageContent(content);
    setSelectedElement(null);
  }, [selectedPage]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(pageContent);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setPageContent(items);
    onContentChange();
  };

  const handleDeleteElement = (index: number) => {
    const newContent = [...pageContent];
    newContent.splice(index, 1);
    setPageContent(newContent);
    setSelectedElement(null);
    onContentChange();
  };

  const handleDuplicateElement = (index: number) => {
    const newContent = [...pageContent];
    const duplicatedElement = { ...newContent[index], id: `${newContent[index].type}-${Date.now()}` };
    newContent.splice(index + 1, 0, duplicatedElement);
    setPageContent(newContent);
    onContentChange();
  };

  const handleMoveElement = (index: number, direction: 'up' | 'down') => {
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

  const handleAddElement = (type: string) => {
    const newElement: ContentElement = {
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

  const handleUpdateElement = (element: ContentElement, index: number) => {
    const newContent = [...pageContent];
    newContent[index] = element;
    setPageContent(newContent);
    onContentChange();
  };

  const handleUpdateProperties = (properties: ElementProperties) => {
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

  const handleTogglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <div className={`flex flex-1 h-full ${className}`}>
      <div className={`flex-1 overflow-auto border-r border-gray-200 ${isPreviewMode ? 'bg-gray-50' : ''}`}>
        <ContentEditorTools 
          isPreviewMode={isPreviewMode} 
          onTogglePreview={handleTogglePreviewMode} 
          onAddElement={handleAddElement} 
        />
        
        <div className="p-4">
          <ElementsList 
            pageContent={pageContent}
            isPreviewMode={isPreviewMode}
            selectedElement={selectedElement}
            onDragEnd={handleDragEnd}
            onDeleteElement={handleDeleteElement}
            onDuplicateElement={handleDuplicateElement}
            onMoveElement={handleMoveElement}
            onSelectElement={setSelectedElement}
            onUpdateElement={handleUpdateElement}
            onAddElement={handleAddElement}
          />
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

export default ContentEditor;
