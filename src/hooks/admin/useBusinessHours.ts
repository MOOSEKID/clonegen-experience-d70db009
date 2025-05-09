
import { useState, useEffect } from 'react';
import { useSettings, SaveState } from '@/hooks/admin/useSettings';
import { toast } from 'sonner';

export interface BusinessHoursData {
  id: string;
  day_of_week: string;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean | null;
  updated_at?: string;
}

export const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export function useBusinessHours() {
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
          } as any);
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

  return {
    formData,
    hasChanges,
    loading,
    error,
    saveState,
    handleToggleDay,
    handleTimeChange,
    saveChanges,
    resetChanges,
    refresh
  };
}
