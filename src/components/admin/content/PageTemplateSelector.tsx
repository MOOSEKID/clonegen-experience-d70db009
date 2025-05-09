
import { useState } from "react";
import { Check } from "lucide-react";

interface PageTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

interface PageTemplateSelectorProps {
  onSelect: (template: PageTemplate) => void;
}

// Example predefined templates
const availableTemplates: PageTemplate[] = [
  {
    id: "classes-standard",
    name: "Classes - Standard",
    description: "Default layout with hero, class schedule, and CTA sections",
    thumbnail: "/images/templates/classes-standard.jpg"
  },
  {
    id: "classes-detailed",
    name: "Classes - Detailed",
    description: "Extended layout with hero, class schedule, trainer spotlight, and testimonials",
    thumbnail: "/images/templates/classes-detailed.jpg"
  },
  {
    id: "membership-standard",
    name: "Membership - Standard",
    description: "Default layout with hero, membership plans, and FAQ sections",
    thumbnail: "/images/templates/membership-standard.jpg"
  },
  {
    id: "membership-promo",
    name: "Membership - Promotional",
    description: "Extended layout with hero, membership plans, promo banner, and testimonials",
    thumbnail: "/images/templates/membership-promo.jpg"
  }
];

const PageTemplateSelector = ({ onSelect }: PageTemplateSelectorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const handleTemplateClick = (template: PageTemplate) => {
    setSelectedTemplate(template.id);
    onSelect(template);
  };
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Select a Page Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleTemplateClick(template)}
            className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
              selectedTemplate === template.id ? "ring-2 ring-gym-orange" : "hover:border-gym-orange"
            }`}
          >
            <div className="h-36 bg-gray-100 relative">
              {/* In a real app, this would be an actual template thumbnail image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Template Preview
              </div>
              
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-gym-orange text-white rounded-full p-1">
                  <Check size={16} />
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm">{template.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageTemplateSelector;
