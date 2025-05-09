
import { useState, useEffect } from 'react';
import { useSettings, SaveState } from '@/hooks/admin/useSettings';
import SettingsCard from '../SettingsCard';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save, RotateCcw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BusinessHoursData {
  id: string;
  day_of_week: string;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean | null;
  updated_at?: string;
}

const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const timeOptions = Array.from({ length: 24 * 4 }).map((_, index) => {
  const hour = Math.floor(index / 4);
  const minute = (index % 4) * 15;
  const hourFormatted = hour.toString().padStart(2, '0');
  const minuteFormatted = minute.toString().padStart(2, '0');
  return `${hourFormatted}:${minuteFormatted}`;
});

const BusinessHoursSettings = () => {
  const isMobile = useIsMobile();
  
  const { 
    data: settings, 
    loading, 
    error, 
    updateSettings, 
    saveState,
    refresh
  } = useSettings<BusinessHoursData[]>({ 
    tableName: 'settings_business_hours' 
  });
  
  const [formData, setFormData] = useState<{ [key: string]: BusinessHoursData }>({});
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Initialize form data from settings
  useEffect(() => {
    if (settings) {
      const dataByDay = settings.reduce((acc, setting) => {
        acc[setting.day_of_week] = setting;
        return acc;
      }, {} as { [key: string]: BusinessHoursData });
      
      setFormData(dataByDay);
    }
  }, [settings]);
  
  // Check for changes between form data and original settings
  useEffect(() => {
    if (settings && formData) {
      const changes = settings.some(setting => {
        const day = setting.day_of_week;
        const currentData = formData[day];
        if (!currentData) return false;
        
        return (
          currentData.open_time !== setting.open_time ||
          currentData.close_time !== setting.close_time ||
          currentData.is_closed !== setting.is_closed
        );
      });
      
      setHasChanges(changes);
    }
  }, [formData, settings]);
  
  const handleToggleDay = (day: string, closed: boolean) => {
    setFormData(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        is_closed: closed
      }
    }));
  };
  
  const handleTimeChange = (day: string, type: 'open_time' | 'close_time', value: string) => {
    setFormData(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value
      }
    }));
  };
  
  const saveChanges = async () => {
    try {
      // Save each record individually
      for (const day of daysOfWeek) {
        if (formData[day]) {
          const recordData = formData[day];
          await updateSettings({
            id: recordData.id,
            open_time: recordData.open_time,
            close_time: recordData.close_time,
            is_closed: recordData.is_closed
          });
        }
      }
      
      toast.success('Business hours saved successfully');
    } catch (err) {
      toast.error('Failed to save business hours');
      console.error('Error saving business hours:', err);
    }
  };
  
  const resetChanges = () => {
    if (settings) {
      const dataByDay = settings.reduce((acc, setting) => {
        acc[setting.day_of_week] = setting;
        return acc;
      }, {} as { [key: string]: BusinessHoursData });
      
      setFormData(dataByDay);
      toast.info('Changes have been reset');
    }
  };
  
  if (loading) {
    return (
      <SettingsCard title="Business Hours" description="Loading...">
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gym-orange"></div>
        </div>
      </SettingsCard>
    );
  }
  
  if (error || !settings) {
    return (
      <SettingsCard 
        title="Business Hours" 
        description="Error loading business hours"
        saveState={SaveState.Error}
      >
        <div className="p-4 bg-red-50 text-red-800 rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Failed to load business hours</p>
            <p className="text-sm mt-1">{error?.message || 'Unknown error'}</p>
            <Button 
              onClick={() => refresh()} 
              variant="outline"
              size="sm"
              className="mt-3"
            >
              Retry
            </Button>
          </div>
        </div>
      </SettingsCard>
    );
  }

  return (
    <SettingsCard 
      title="Business Hours" 
      description="Configure your gym's operating hours"
      saveState={saveState}
    >
      <div className="space-y-6">
        <div className="grid gap-6">
          {daysOfWeek.map((day) => {
            const dayData = formData[day];
            if (!dayData) return null;
            
            return (
              <div key={day} className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold capitalize">{day}</h3>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`closed-${day}`}>Closed</Label>
                    <Switch
                      id={`closed-${day}`}
                      checked={dayData.is_closed || false}
                      onCheckedChange={(checked) => handleToggleDay(day, checked)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`open-${day}`}>Opening Time</Label>
                    <Select
                      disabled={dayData.is_closed}
                      value={dayData.open_time || ''}
                      onValueChange={(value) => handleTimeChange(day, 'open_time', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select opening time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={`${day}-open-${time}`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`close-${day}`}>Closing Time</Label>
                    <Select
                      disabled={dayData.is_closed}
                      value={dayData.close_time || ''}
                      onValueChange={(value) => handleTimeChange(day, 'close_time', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select closing time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={`${day}-close-${time}`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className={`flex gap-2 justify-end mt-6 ${isMobile ? 'sticky bottom-4 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md z-10' : ''}`}>
          <Button
            type="button"
            variant="outline"
            onClick={resetChanges}
            disabled={!hasChanges || saveState === SaveState.Saving}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          
          <Button
            type="button"
            disabled={!hasChanges || saveState === SaveState.Saving}
            onClick={saveChanges}
          >
            {saveState === SaveState.Saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>
    </SettingsCard>
  );
};

export default BusinessHoursSettings;
