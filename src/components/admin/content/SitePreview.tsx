
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { pageContentData } from '@/data/cmsData';
import { PageContentMapping } from '@/types/content.types';

interface SitePreviewProps {
  selectedPage: string;
  onAddSection?: (page: string) => void;
}

const SitePreview = ({ selectedPage, onAddSection }: SitePreviewProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Get content for the selected page
  const contentData = pageContentData as PageContentMapping;
  const pageContent = contentData[selectedPage] || [];

  // Ensure page content is an array
  const content = Array.isArray(pageContent) ? pageContent : [];

  return (
    <div className="site-preview h-[calc(100vh-13rem)] overflow-auto border border-gray-200 rounded-md">
      <div className="p-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Website Preview</h3>
      </div>
      
      {content.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <p className="text-muted-foreground mb-4">No content available for this page.</p>
          {onAddSection && (
            <button
              onClick={() => onAddSection(selectedPage)}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Add Content
            </button>
          )}
        </div>
      ) : (
        <Tabs defaultValue="page" className="w-full">
          <div className="px-4 pt-4 pb-2 border-b">
            <TabsList>
              <TabsTrigger value="page">Page View</TabsTrigger>
              <TabsTrigger value="sections">Sections</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="page" className="p-4">
            <div className="space-y-8">
              {content.map((item) => (
                <div 
                  key={item.id} 
                  className="preview-section border border-gray-200 p-4 rounded-md"
                >
                  <h3 className="text-sm font-medium text-gray-700 mb-4 pb-2 border-b">
                    {item.name}
                  </h3>
                  
                  <div className="preview-content">
                    {/* Content would be rendered here based on section type */}
                    <p className="text-muted-foreground text-sm italic">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sections" className="divide-y">
            {content.map((section) => (
              <div 
                key={section.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${activeSection === section.id ? 'bg-blue-50' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <h4 className="font-medium">{section.name}</h4>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            ))}
            
            {onAddSection && (
              <div className="p-4">
                <button
                  onClick={() => onAddSection(selectedPage)}
                  className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
                >
                  + Add Section
                </button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default SitePreview;
