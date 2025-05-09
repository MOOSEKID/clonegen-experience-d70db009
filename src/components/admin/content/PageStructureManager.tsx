
import { useState, useEffect } from 'react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import PageStructureEditor, { PageSection } from './PageStructureEditor';
import PageTemplateSelector from './PageTemplateSelector';
import SectionPropertiesPanel from './SectionPropertiesPanel';
import { getClassesPageTemplate } from './templates/ClassesPageTemplate';
import { getMembershipPageTemplate } from './templates/MembershipPageTemplate';
import { toast } from 'sonner';

interface PageStructureManagerProps {
  selectedPage: string;
  onSave: () => void;
}

const PageStructureManager = ({ selectedPage, onSave }: PageStructureManagerProps) => {
  const [pageSections, setPageSections] = useState<PageSection[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isNewPage, setIsNewPage] = useState(true);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch the existing structure from the database if it exists
    // For now, we'll default to empty and let the user select a template
    setPageSections([]);
    setSelectedSectionId(null);
    setIsNewPage(true);
    setShowPropertiesPanel(false);
  }, [selectedPage]);

  const handleTemplateSelect = (template: any) => {
    // Load template based on the selected page type
    let templateSections: PageSection[] = [];
    
    if (template.id.startsWith('classes')) {
      templateSections = getClassesPageTemplate();
    } else if (template.id.startsWith('membership')) {
      templateSections = getMembershipPageTemplate();
    }
    
    setPageSections(templateSections);
    setIsNewPage(false);
    toast.success(`Template "${template.name}" applied successfully`);
  };

  const handleSectionsChange = (newSections: PageSection[]) => {
    setPageSections(newSections);
  };

  const handleSaveStructure = () => {
    // In a real app, this would save to the database
    console.log('Saving page structure:', pageSections);
    toast.success("Page structure saved successfully");
    onSave();
  };

  const handleSectionSelect = (sectionId: string | null) => {
    setSelectedSectionId(sectionId);
    if (sectionId) {
      setShowPropertiesPanel(true);
    }
  };

  const selectedSection = selectedSectionId 
    ? pageSections.find(section => section.id === selectedSectionId) || null
    : null;

  const handleSectionUpdate = (updatedSection: PageSection) => {
    const newSections = pageSections.map(section => 
      section.id === updatedSection.id ? updatedSection : section
    );
    setPageSections(newSections);
  };
  
  const togglePropertiesPanel = () => {
    setShowPropertiesPanel(!showPropertiesPanel);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">
          {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} Page Structure
        </h2>
        
        <div className="flex items-center space-x-2">
          <div className="flex border rounded-md overflow-hidden mr-2">
            <Button
              variant="ghost"
              size="sm"
              className={`p-2 ${viewMode === 'desktop' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode('desktop')}
            >
              <Monitor className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:ml-2">Desktop</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`p-2 ${viewMode === 'tablet' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode('tablet')}
            >
              <Tablet className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:ml-2">Tablet</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`p-2 ${viewMode === 'mobile' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode('mobile')}
            >
              <Smartphone className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:ml-2">Mobile</span>
            </Button>
          </div>
          
          {selectedSection && (
            <Button 
              variant="outline"
              size="sm"
              onClick={togglePropertiesPanel}
              className="md:hidden"
            >
              {showPropertiesPanel ? "Hide Properties" : "Show Properties"}
            </Button>
          )}
          
          <Button onClick={handleSaveStructure}>Save Structure</Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden flex">
        <div className={`flex-1 overflow-auto p-4 ${showPropertiesPanel ? 'hidden md:block md:flex-1' : 'w-full'}`}>
          {isNewPage ? (
            <PageTemplateSelector onSelect={handleTemplateSelect} />
          ) : (
            <Tabs defaultValue="structure">
              <TabsList className="mb-4">
                <TabsTrigger value="structure">Page Structure</TabsTrigger>
                <TabsTrigger value="settings">Page Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="structure">
                <PageStructureEditor
                  pageSections={pageSections}
                  onSectionsChange={handleSectionsChange}
                  selectedSectionId={selectedSectionId}
                  onSelectSection={handleSectionSelect}
                  viewMode={viewMode}
                />
              </TabsContent>
              
              <TabsContent value="settings">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-4">Page Settings</h3>
                  <p className="text-gray-500">
                    Additional page settings like SEO, OpenGraph tags, etc. would go here.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
        
        {selectedSection && (showPropertiesPanel || window.innerWidth >= 768) && (
          <div className="w-full md:w-80 border-l overflow-auto bg-white md:flex flex-col">
            <div className="p-3 border-b flex justify-between items-center md:hidden">
              <h3 className="font-medium">Section Properties</h3>
              <Button variant="ghost" size="sm" onClick={togglePropertiesPanel}>
                Close
              </Button>
            </div>
            
            <SectionPropertiesPanel 
              section={selectedSection}
              onUpdate={handleSectionUpdate}
              viewMode={viewMode}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageStructureManager;
