
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Plus, EyeOff, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pageSectionsData } from '@/data/cmsData';
import { SectionTemplate, SectionTemplateMapping } from '@/types/content.types';

interface SitePreviewProps {
  selectedPage: string;
  onAddSection: (sectionTemplate: SectionTemplate) => void;
  onSettingsChange?: () => void;
}

const SitePreview = ({ selectedPage, onAddSection, onSettingsChange }: SitePreviewProps) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [sections, setSections] = useState<SectionTemplate[]>([]);
  
  useEffect(() => {
    // Type assertion to SectionTemplateMapping
    const sectionData = (pageSectionsData as SectionTemplateMapping)[selectedPage] || [];
    setSections(sectionData);
  }, [selectedPage]);

  const toggleSection = (sectionId: string) => {
    setExpanded(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleAddSection = (template: SectionTemplate) => {
    onAddSection(template);
  };

  return (
    <div className="border rounded-md bg-white overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
        <h3 className="font-medium text-sm">Page Sections</h3>
        {onSettingsChange && (
          <Button variant="outline" size="sm" onClick={onSettingsChange}>
            Settings
          </Button>
        )}
      </div>
      
      <div className="p-4">
        <ul className="space-y-2 mb-4">
          {sections.map((item: SectionTemplate, index: number) => (
            <li 
              key={item.id} 
              className="border rounded-md overflow-hidden"
            >
              <div 
                className="flex justify-between items-center px-3 py-2 bg-gray-50 cursor-pointer"
                onClick={() => toggleSection(item.id)}
              >
                <span className="font-medium text-sm">{item.name}</span>
                <div className="flex items-center space-x-2">
                  <button
                    className="p-1 hover:bg-gray-200 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Copy section logic would go here
                      console.log('Copy section:', item.id);
                    }}
                  >
                    <Copy size={14} />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-200 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Toggle visibility logic would go here
                      console.log('Toggle visibility:', item.id);
                    }}
                  >
                    <EyeOff size={14} />
                  </button>
                  {expanded.includes(item.id) ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
              </div>
              
              {expanded.includes(item.id) && (
                <div className="p-3 text-sm">
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <div className="flex justify-end space-x-2 mt-3">
                    <Button variant="outline" size="sm">
                      Edit Section
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        
        <div className="mt-6">
          <h4 className="font-medium text-sm mb-3">Add New Section</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {getAvailableSectionTemplates(selectedPage).map((section: SectionTemplate) => (
              <Button
                key={section.id}
                variant="outline"
                size="sm"
                className="justify-start"
                onClick={() => handleAddSection(section)}
              >
                <Plus size={14} className="mr-2" />
                {section.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get available section templates
const getAvailableSectionTemplates = (pageId: string): SectionTemplate[] => {
  const commonSections: SectionTemplate[] = [
    { id: 'header', name: 'Header Section', description: 'Page header with title and subtitle' },
    { id: 'text', name: 'Text Section', description: 'Simple text content section' },
    { id: 'image-text', name: 'Image with Text', description: 'Image with accompanying text' }
  ];
  
  const pageSections: { [key: string]: SectionTemplate[] } = {
    home: [
      { id: 'hero', name: 'Hero Banner', description: 'Large hero section with background image' },
      { id: 'features', name: 'Features Grid', description: 'Grid of feature cards' }
    ],
    'about-us': [
      { id: 'team', name: 'Team Members', description: 'Team member profiles' },
      { id: 'history', name: 'Company History', description: 'Timeline of company milestones' }
    ],
    services: [
      { id: 'services-grid', name: 'Services Grid', description: 'Grid of available services' },
      { id: 'pricing', name: 'Pricing Table', description: 'Service pricing information' }
    ],
    'contact-us': [
      { id: 'contact-form', name: 'Contact Form', description: 'Form for customer inquiries' },
      { id: 'map', name: 'Location Map', description: 'Map showing business location' }
    ]
  };
  
  return [...commonSections, ...(pageSections[pageId] || [])];
};

export default SitePreview;
