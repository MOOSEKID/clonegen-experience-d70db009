
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextProperties from "./properties/TextProperties";
import ImageProperties from "./properties/ImageProperties";
import VideoProperties from "./properties/VideoProperties";
import ButtonProperties from "./properties/ButtonProperties";
import SpacingProperties from "./properties/SpacingProperties";
import ResponsiveProperties from "./properties/ResponsiveProperties";

interface ElementPropertiesProps {
  element: any;
  onUpdate: (properties: any) => void;
  viewMode?: 'desktop' | 'tablet' | 'mobile';
}

const ElementProperties = ({ element, onUpdate, viewMode = 'desktop' }: ElementPropertiesProps) => {
  const { type, properties = {} } = element;
  
  const handleUpdate = (newProperties) => {
    onUpdate({ ...properties, ...newProperties });
  };

  const handleResponsiveUpdate = (deviceType: 'desktop' | 'tablet' | 'mobile', settings: any) => {
    const currentResponsiveSettings = properties.responsiveSettings || {
      desktop: { fontSize: 'medium', columns: 3 },
      tablet: { fontSize: 'medium', columns: 2 },
      mobile: { fontSize: 'small', columns: 1 }
    };

    onUpdate({
      responsiveSettings: {
        ...currentResponsiveSettings,
        [deviceType]: {
          ...currentResponsiveSettings[deviceType],
          ...settings
        }
      }
    });
  };

  return (
    <Tabs defaultValue="style">
      <TabsList className="w-full">
        <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
        <TabsTrigger value="spacing" className="flex-1">Spacing</TabsTrigger>
        <TabsTrigger value="responsive" className="flex-1">Responsive</TabsTrigger>
      </TabsList>
      
      <TabsContent value="style" className="space-y-6 py-4">
        {type === 'text' && <TextProperties properties={properties} onUpdate={handleUpdate} />}
        {type === 'image' && <ImageProperties element={element} properties={properties} onUpdate={handleUpdate} />}
        {type === 'video' && <VideoProperties properties={properties} onUpdate={handleUpdate} />}
        {type === 'button' && <ButtonProperties properties={properties} onUpdate={handleUpdate} />}
      </TabsContent>
      
      <TabsContent value="spacing" className="space-y-6 py-4">
        <SpacingProperties properties={properties} onUpdate={handleUpdate} />
      </TabsContent>
      
      <TabsContent value="responsive" className="space-y-6 py-4">
        <ResponsiveProperties 
          properties={properties} 
          elementType={type}
          currentDevice={viewMode}
          onUpdate={handleResponsiveUpdate} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default ElementProperties;
