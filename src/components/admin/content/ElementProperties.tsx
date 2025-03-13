
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextProperties from "./properties/TextProperties";
import ImageProperties from "./properties/ImageProperties";
import VideoProperties from "./properties/VideoProperties";
import ButtonProperties from "./properties/ButtonProperties";
import SpacingProperties from "./properties/SpacingProperties";

interface ElementPropertiesProps {
  element: any;
  onUpdate: (properties: any) => void;
}

const ElementProperties = ({ element, onUpdate }: ElementPropertiesProps) => {
  const { type, properties = {} } = element;
  
  const handleUpdate = (newProperties) => {
    onUpdate({ ...properties, ...newProperties });
  };

  return (
    <Tabs defaultValue="style">
      <TabsList className="w-full">
        <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
        <TabsTrigger value="spacing" className="flex-1">Spacing</TabsTrigger>
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
    </Tabs>
  );
};

export default ElementProperties;
