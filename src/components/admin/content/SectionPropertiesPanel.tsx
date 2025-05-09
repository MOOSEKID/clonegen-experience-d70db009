
import { useState } from 'react';
import { PageSection } from './PageStructureEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface SectionPropertiesPanelProps {
  section: PageSection | null;
  onUpdate: (updatedSection: PageSection) => void;
  viewMode: 'desktop' | 'tablet' | 'mobile';
}

const SectionPropertiesPanel = ({ section, onUpdate, viewMode }: SectionPropertiesPanelProps) => {
  const [localSection, setLocalSection] = useState<PageSection | null>(section);
  
  if (!section || !localSection) {
    return (
      <div className="flex items-center justify-center h-full text-center p-8 text-gray-500">
        <div>
          <p className="mb-2">Select a section to edit its properties</p>
          <p className="text-sm text-gray-400">Click on any section in the page structure to edit</p>
        </div>
      </div>
    );
  }
  
  const handleInputChange = (field: string, value: any) => {
    const updatedSection = {
      ...localSection,
      [field]: value
    };
    setLocalSection(updatedSection);
    onUpdate(updatedSection);
  };
  
  const handleContentChange = (field: string, value: any) => {
    const updatedSection = {
      ...localSection,
      content: {
        ...localSection.content,
        [field]: value
      }
    };
    setLocalSection(updatedSection);
    onUpdate(updatedSection);
  };

  return (
    <div className="p-4 h-full overflow-auto">
      <h3 className="text-lg font-medium mb-4">{section.title} Properties</h3>
      
      <Accordion type="single" collapsible defaultValue="basic" className="w-full">
        <AccordionItem value="basic">
          <AccordionTrigger>Basic Information</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="section-title">Section Title</Label>
              <Input
                id="section-title"
                value={localSection.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                disabled={section.isRequired}
              />
              <p className="text-xs text-gray-500">Internal title visible only in the editor</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="section-description">Description</Label>
              <Textarea
                id="section-description"
                value={localSection.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={2}
                className="resize-none"
              />
              <p className="text-xs text-gray-500">Internal description visible only in the editor</p>
            </div>
            
            {!section.isRequired && (
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="section-hidden"
                  checked={!localSection.isHidden}
                  onCheckedChange={(checked) => handleInputChange('isHidden', !checked)}
                />
                <Label htmlFor="section-hidden">Section Visible</Label>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
        
        {section.content && section.content.title && (
          <AccordionItem value="content">
            <AccordionTrigger>Content Settings</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="content-title">Display Title</Label>
                <Input
                  id="content-title"
                  value={localSection.content?.title || ''}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                />
                <p className="text-xs text-gray-500">Visible heading in the actual page</p>
              </div>
              
              {section.content && section.content.description && (
                <div className="space-y-2">
                  <Label htmlFor="content-description">Display Description</Label>
                  <Textarea
                    id="content-description"
                    value={localSection.content?.description || ''}
                    onChange={(e) => handleContentChange('description', e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>
              )}
              
              {section.content && section.content.buttonText && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="button-text">Button Text</Label>
                    <Input
                      id="button-text"
                      value={localSection.content?.buttonText || ''}
                      onChange={(e) => handleContentChange('buttonText', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="button-link">Button Link</Label>
                    <Input
                      id="button-link"
                      value={localSection.content?.buttonLink || ''}
                      onChange={(e) => handleContentChange('buttonLink', e.target.value)}
                    />
                  </div>
                </>
              )}
            </AccordionContent>
          </AccordionItem>
        )}
        
        <AccordionItem value="responsive">
          <AccordionTrigger>Responsive Settings</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="p-3 bg-gray-50 border rounded-md">
              <p className="font-medium text-sm mb-2">Currently Editing: {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} View</p>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="responsive-visible"
                  checked={true}
                  onCheckedChange={() => {}}
                />
                <Label htmlFor="responsive-visible">Visible on {viewMode}</Label>
              </div>
              
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-gray-500">
                  Adjust settings specific to {viewMode} view here. 
                  Toggle the device buttons above to configure each device view separately.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SectionPropertiesPanel;
