
import { useState, useEffect } from 'react';
import { componentSectionMap, getSectionPreviewData } from '@/utils/componentMapping';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Laptop, Smartphone, ExternalLink } from 'lucide-react';

interface SitePreviewProps {
  selectedPage: string;
}

const SitePreview = ({ selectedPage }: SitePreviewProps) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const pageSections = componentSectionMap[selectedPage] || [];

  useEffect(() => {
    // Set the first section as selected by default if available
    if (pageSections.length > 0 && !selectedSection) {
      setSelectedSection(pageSections[0].id);
    }
    
    // In a real application, this would generate an actual preview URL
    setPreviewUrl(`/preview/${selectedPage}`);
  }, [selectedPage, pageSections, selectedSection]);

  const handleSectionChange = (sectionId: string) => {
    setSelectedSection(sectionId);
  };

  const renderSectionPreview = () => {
    if (!selectedSection) return null;
    
    // Get preview data for the selected section
    const previewData = getSectionPreviewData(selectedPage, selectedSection);
    
    // Render a placeholder preview - in a real application, this would render actual components
    return (
      <div className="border rounded-lg p-4 bg-gray-50 min-h-[300px] overflow-hidden">
        <div className="text-center text-gray-500">
          <p className="mb-2">Preview of {selectedPage}/{selectedSection}</p>
          <div className="aspect-video bg-white border shadow-sm rounded-md mx-auto max-w-xl flex items-center justify-center p-4">
            <div className="space-y-4 w-full max-w-md">
              {previewData.slice(0, 3).map((item, index) => (
                <div key={index} className="space-y-2">
                  {item.type === 'text' && (
                    <div 
                      className="p-2 border border-dashed border-gray-300 rounded" 
                      style={{ 
                        textAlign: item.properties?.align || 'left',
                        fontWeight: item.properties?.style === 'bold' ? 'bold' : 'normal',
                        fontStyle: item.properties?.style === 'italic' ? 'italic' : 'normal',
                      }}
                    >
                      {item.content}
                    </div>
                  )}
                  {item.type === 'image' && (
                    <div className="p-2 border border-dashed border-gray-300 rounded">
                      <img 
                        src={item.content} 
                        alt="Preview" 
                        className="max-h-32 mx-auto" 
                        style={{ 
                          margin: item.properties?.align === 'center' ? '0 auto' : 
                                 item.properties?.align === 'right' ? '0 0 0 auto' : '0' 
                        }}
                      />
                    </div>
                  )}
                  {item.type === 'button' && (
                    <div 
                      className="p-2 border border-dashed border-gray-300 rounded"
                      style={{ 
                        textAlign: item.properties?.align || 'left',
                      }}
                    >
                      <button className="bg-gym-orange text-white px-4 py-2 rounded">
                        {item.content || 'Button'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {previewData.length === 0 && (
                <div className="text-center p-6">
                  <p>No content elements for this section yet.</p>
                  <p className="text-sm text-gray-400">Add elements in the content editor</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Website Preview</h3>
        <div className="flex space-x-2">
          <div className="border rounded-md flex">
            <button 
              className={`p-2 ${viewMode === 'desktop' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode('desktop')}
              title="Desktop preview"
            >
              <Laptop size={16} />
            </button>
            <button
              className={`p-2 ${viewMode === 'mobile' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode('mobile')}
              title="Mobile preview"
            >
              <Smartphone size={16} />
            </button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => window.open(previewUrl, '_blank')}
          >
            <ExternalLink size={14} />
            Full Preview
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue={pageSections[0]?.id} value={selectedSection || ''}>
        <TabsList className="w-full mb-4">
          {pageSections.map(section => (
            <TabsTrigger 
              key={section.id} 
              value={section.id}
              onClick={() => handleSectionChange(section.id)}
              className="flex-1"
            >
              {section.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {pageSections.map(section => (
          <TabsContent key={section.id} value={section.id}>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">{section.description}</p>
              {renderSectionPreview()}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SitePreview;
