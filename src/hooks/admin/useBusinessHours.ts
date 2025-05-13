
import { useState, useEffect } from 'react';
import { useSettings, SaveState } from '@/hooks/admin/useSettings';
import { toast } from 'sonner';
import { BusinessHour } from '@/hooks/trainers/types';
import { supabase } from '@/integrations/supabase/client';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: BusinessHour }>({});
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [saveState, setSaveState] = useState<SaveState>(SaveState.Idle);
  const [originalData, setOriginalData] = useState<BusinessHour[]>([]);

  // Fetch business hours from the database
  const fetchBusinessHours = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('settings_business_hours')
        .select('*')
        .order('day_of_week');

      if (fetchError) {
        console.error('Error fetching business hours:', fetchError);
        setError(new Error(fetchError.message));
        return;
      }

      // If no data exists, initialize with default values
      if (!data || data.length === 0) {
        await initializeDefaultBusinessHours();
        return fetchBusinessHours(); // Fetch again after initialization
      }

      setOriginalData(data as BusinessHour[]);
      
      const dataByDay = data.reduce((acc, setting) => {
        acc[setting.day_of_week] = setting;
        return acc;
      }, {} as { [key: string]: BusinessHour });
      
      setFormData(dataByDay);
    } catch (err: any) {
      console.error('Error in fetchBusinessHours:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Initialize default business hours if none exist
  const initializeDefaultBusinessHours = async () => {
    try {
      const defaultHours = daysOfWeek.map(day => ({
        day_of_week: day,
        is_closed: day === 'sunday', // Default closed on Sunday
        open_time: '06:00',
        close_time: '22:00' // 10 PM
      }));

      const { error } = await supabase
        .from('settings_business_hours')
        .insert(defaultHours);

      if (error) {
        console.error('Error initializing business hours:', error);
        setError(new Error(error.message));
      }
    } catch (err: any) {
      console.error('Error in initializeDefaultBusinessHours:', err);
      setError(err);
    }
  };
  
  // Fetch data on component mount
  useEffect(() => {
    fetchBusinessHours();
  }, []);
  
  // Check for changes between form data and original data
  useEffect(() => {
    if (originalData.length > 0 && Object.keys(formData).length > 0) {
      const changes = originalData.some(original => {
        const day = original.day_of_week;
        const currentData = formData[day];
        if (!currentData) return false;
        
        return (
          currentData.open_time !== original.open_time ||
          currentData.close_time !== original.close_time ||
          currentData.is_closed !== original.is_closed
        );
      });
      
      setHasChanges(changes);
    }
  }, [formData, originalData]);
  
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
      setSaveState(SaveState.Saving);
      
      // Save each record individually
      for (const day of daysOfWeek) {
        if (formData[day]) {
          const recordData = formData[day];
          const { error } = await supabase
            .from('settings_business_hours')
            .update({
              open_time: recordData.open_time,
              close_time: recordData.close_time,
              is_closed: recordData.is_closed,
              updated_at: new Date().toISOString()
            })
            .eq('id', recordData.id);

          if (error) {
            throw new Error(`Error updating ${day}: ${error.message}`);
          }
        }
      }
      
      setSaveState(SaveState.Saved);
      toast.success('Business hours saved successfully');
      
      // Refresh data
      fetchBusinessHours();
      
      // Reset state after a delay
      setTimeout(() => {
        setSaveState(SaveState.Idle);
      }, 2000);
    } catch (err: any) {
      setSaveState(SaveState.Error);
      toast.error('Failed to save business hours');
      console.error('Error saving business hours:', err);
      setError(err);
    }
  };
  
  const resetChanges = () => {
    if (originalData) {
      const dataByDay = originalData.reduce((acc, setting) => {
        acc[setting.day_of_week] = setting;
        return acc;
      }, {} as { [key: string]: BusinessHour });
      
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
    refresh: fetchBusinessHours
  };
}
