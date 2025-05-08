
import { useState, useEffect } from 'react';
import { Box, Monitor, Smartphone, Tablet } from 'lucide-react';
import ElementProperties from './ElementProperties';
import ContentEditorTools from './ContentEditorTools';
import ElementsList from './ElementsList';
import { toast } from "sonner";
import PageSelector from './PageSelector';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { pages as pageComponents } from '@/data/pageComponentsData'; 

// Mock data for page content
import { pageContentData } from '@/data/cmsData';

interface ContentEditorProps {
  selectedPage: string;
  onContentChange: () => void;
  className?: string;
  showPreview?: boolean;
}

const ContentEditor = ({ 
  selectedPage, 
  onContentChange, 
  className = '',
  showPreview = false
}: ContentEditorProps) => {
  const [pageContent, setPageContent] = useState<any[]>([]);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);
  const [isPropertiesPanelOpen, setIsPropertiesPanelOpen] = useState(true);
  const [propertiesSheetOpen, setPropertiesSheetOpen] = useState(false);
  
  useEffect(() => {
    // Load page content, including predefined components for the page type
    const content = pageContentData[selectedPage] || [];
    
    // If content is empty and we have predefined components for this page, load them
    if (content.length === 0 && pageComponents[selectedPage]) {
      setPageContent(pageComponents[selectedPage]);
    } else {
      setPageContent(content);
    }
    
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
    toast.success("Element duplicated successfully");
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
        responsiveSettings: {
          desktop: { fontSize: 'medium', columns: 3, visible: true },
          tablet: { fontSize: 'medium', columns: 2, visible: true },
          mobile: { fontSize: 'small', columns: 1, visible: true }
        }
      }
    };
    
    setPageContent([...pageContent, newElement]);
    setSelectedElement(newElement);
    onContentChange();
    toast.success(`New ${type} element added`);
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

  const handleTogglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const togglePropertiesPanel = () => {
    setIsPropertiesPanelOpen(!isPropertiesPanelOpen);
  };
  
  const handleImportLiveLayout = () => {
    // In a real app, this would fetch the live layout from the server
    // For now, we'll simulate it with toast message
    toast.success("Live layout imported into editor");
    
    // Get default components for this page type if available
    if (pageComponents[selectedPage]) {
      setPageContent(pageComponents[selectedPage]);
      onContentChange();
    }
  };

  return (
    <div className={`flex flex-col md:flex-row h-full ${className}`}>
      {/* Mobile/Tablet Controls */}
      <div className="md:hidden flex justify-between items-center p-2 border-b">
        <PageSelector 
          selectedPage={selectedPage} 
          onSelectPage={() => {}} // This is handled at a higher level
          isMobileSidebarOpen={true}
        />
        
        {selectedElement && (
          <Sheet open={propertiesSheetOpen} onOpenChange={setPropertiesSheetOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
              >
                Edit Properties
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <div className="h-full overflow-auto">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Element Properties</h3>
                {selectedElement && (
                  <ElementProperties 
                    element={selectedElement} 
                    onUpdate={handleUpdateProperties}
                    viewMode={viewMode} 
                  />
                )}
              </div>
              <div className="mt-4">
                <SheetClose asChild>
                  <Button className="w-full">Done</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
      
      {/* Responsive Layout Structure */}
      <div className="flex flex-1 overflow-hidden">
        {/* Page Selector - only shown on desktop */}
        <PageSelector 
          selectedPage={selectedPage} 
          onSelectPage={() => {}} // This is handled at a higher level 
          isMobileSidebarOpen={isMobileSidebarOpen}
          className="hidden md:block"
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Content Editor Tools */}
          <ContentEditorTools 
            isPreviewMode={isPreviewMode} 
            onTogglePreview={handleTogglePreviewMode} 
            onAddElement={handleAddElement}
            viewMode={viewMode}
            onChangeViewMode={setViewMode}
            onImportLiveLayout={handleImportLiveLayout}
          />
          
          {/* Main Content Area */}
          <div className="flex-1 overflow-auto p-4">
            <div className={`mx-auto transition-all ${
              viewMode === 'mobile' ? 'max-w-sm' : 
              viewMode === 'tablet' ? 'max-w-2xl' : 
              'max-w-6xl'
            }`}>
              <ElementsList 
                pageContent={pageContent}
                isPreviewMode={isPreviewMode}
                selectedElement={selectedElement}
                onDragEnd={handleDragEnd}
                onDeleteElement={handleDeleteElement}
                onDuplicateElement={handleDuplicateElement}
                onMoveElement={handleMoveElement}
                onSelectElement={(element) => {
                  setSelectedElement(element);
                  // On mobile, open properties sheet when selecting an element
                  if (window.innerWidth < 768) {
                    setPropertiesSheetOpen(true);
                  }
                }}
                onUpdateElement={handleUpdateElement}
                onAddElement={handleAddElement}
                viewMode={viewMode}
              />
            </div>
          </div>
        </div>
        
        {/* Properties Panel - Desktop only */}
        {!isPreviewMode && (
          <div className={`
            ${!isPropertiesPanelOpen && 'hidden'} 
            w-80 overflow-auto border-l border-gray-200 flex-shrink-0
            absolute md:relative right-0 top-0 bottom-0 bg-white z-10 md:z-0
            md:block ${!selectedElement && 'md:hidden'}
          `}>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-700">Element Properties</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden" 
                onClick={togglePropertiesPanel}
              >
                Close
              </Button>
            </div>
            <div className="p-4">
              {selectedElement ? (
                <ElementProperties 
                  element={selectedElement} 
                  onUpdate={handleUpdateProperties}
                  viewMode={viewMode} 
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
    </div>
  );
};

export default ContentEditor;
