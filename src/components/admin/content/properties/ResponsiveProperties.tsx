
import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface ResponsivePropertiesProps {
  properties: any;
  elementType: string;
  currentDevice: 'desktop' | 'tablet' | 'mobile';
  onUpdate: (deviceType: 'desktop' | 'tablet' | 'mobile', settings: any) => void;
}

const ResponsiveProperties = ({ 
  properties, 
  elementType,
  currentDevice, 
  onUpdate 
}: ResponsivePropertiesProps) => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>(currentDevice);
  
  const responsiveSettings = properties.responsiveSettings || {
    desktop: { fontSize: 'medium', columns: 3 },
    tablet: { fontSize: 'medium', columns: 2 },
    mobile: { fontSize: 'small', columns: 1 }
  };

  const deviceSettings = responsiveSettings[selectedDevice];
  
  const handleFontSizeChange = (value: string) => {
    onUpdate(selectedDevice, { fontSize: value });
  };

  const handleColumnsChange = (value: number) => {
    onUpdate(selectedDevice, { columns: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="block mb-2">Device Settings</Label>
        <Tabs 
          defaultValue={selectedDevice} 
          value={selectedDevice} 
          onValueChange={(value) => setSelectedDevice(value as 'desktop' | 'tablet' | 'mobile')}
        >
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="desktop" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span className="hidden sm:inline">Desktop</span>
            </TabsTrigger>
            <TabsTrigger value="tablet" className="flex items-center gap-2">
              <Tablet className="h-4 w-4" />
              <span className="hidden sm:inline">Tablet</span>
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <span className="hidden sm:inline">Mobile</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Device specific content */}
          <TabsContent value="desktop" className="pt-4">
            <DeviceSettings 
              settings={responsiveSettings.desktop} 
              elementType={elementType}
              onFontSizeChange={handleFontSizeChange}
              onColumnsChange={handleColumnsChange}
              maxColumns={4}
            />
          </TabsContent>
          
          <TabsContent value="tablet" className="pt-4">
            <DeviceSettings 
              settings={responsiveSettings.tablet} 
              elementType={elementType}
              onFontSizeChange={handleFontSizeChange}
              onColumnsChange={handleColumnsChange}
              maxColumns={3}
            />
          </TabsContent>
          
          <TabsContent value="mobile" className="pt-4">
            <DeviceSettings 
              settings={responsiveSettings.mobile} 
              elementType={elementType}
              onFontSizeChange={handleFontSizeChange}
              onColumnsChange={handleColumnsChange}
              maxColumns={2}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface DeviceSettingsProps {
  settings: {
    fontSize: string;
    columns: number;
  };
  elementType: string;
  onFontSizeChange: (value: string) => void;
  onColumnsChange: (value: number) => void;
  maxColumns: number;
}

const DeviceSettings = ({ 
  settings, 
  elementType,
  onFontSizeChange, 
  onColumnsChange,
  maxColumns
}: DeviceSettingsProps) => {
  const showFontSize = elementType === 'text' || elementType === 'button';
  const showColumns = elementType !== 'button';
  
  return (
    <div className="space-y-6">
      {showFontSize && (
        <div>
          <Label className="block mb-2">Font Size</Label>
          <RadioGroup 
            value={settings.fontSize} 
            onValueChange={onFontSizeChange}
            className="grid grid-cols-3 gap-2"
          >
            <div className="flex items-center space-x-2 border rounded-md p-2">
              <RadioGroupItem value="small" id={`font-small-${elementType}`} />
              <Label htmlFor={`font-small-${elementType}`} className="cursor-pointer">Small</Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-2">
              <RadioGroupItem value="medium" id={`font-medium-${elementType}`} />
              <Label htmlFor={`font-medium-${elementType}`} className="cursor-pointer">Medium</Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-2">
              <RadioGroupItem value="large" id={`font-large-${elementType}`} />
              <Label htmlFor={`font-large-${elementType}`} className="cursor-pointer">Large</Label>
            </div>
          </RadioGroup>
        </div>
      )}
      
      {showColumns && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Columns: {settings.columns}</Label>
          </div>
          <Slider
            value={[settings.columns]}
            min={1}
            max={maxColumns}
            step={1}
            onValueChange={(value) => onColumnsChange(value[0])}
          />
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>1</span>
            <span>{maxColumns}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveProperties;
