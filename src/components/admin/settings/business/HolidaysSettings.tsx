
import { useState, useMemo, useEffect } from 'react';
import { useSettings, SaveState } from '@/hooks/admin/useSettings';
import SettingsCard from '../SettingsCard';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import HolidaysList from './HolidaysList';
import AddHolidayDialog from './AddHolidayDialog';
import BusinessHoursActions from './BusinessHoursActions';
import BusinessHoursLoading from './BusinessHoursLoading';
import BusinessHoursError from './BusinessHoursError';

interface HolidayData {
  id: string;
  holiday_name: string;
  holiday_date: string;
  updated_at?: string;
}

interface FormattedHoliday extends HolidayData {
  formattedDate: string;
}

const HolidaysSettings = () => {
  const isMobile = useIsMobile();
  
  const { 
    data: settings, 
    loading, 
    error, 
    updateSettings, 
    saveState,
    refresh
  } = useSettings<HolidayData[]>({ 
    tableName: 'settings_business_holidays' 
  });
  
  const [holidays, setHolidays] = useState<HolidayData[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Format holidays for display
  const formattedHolidays = useMemo(() => {
    return holidays.map(holiday => ({
      ...holiday,
      formattedDate: format(new Date(holiday.holiday_date), 'MMMM d, yyyy')
    }));
  }, [holidays]);

  // Initialize holidays from settings
  useEffect(() => {
    if (settings) {
      setHolidays(settings);
    }
  }, [settings]);
  
  // Check for changes
  useEffect(() => {
    if (!settings || !holidays) return;
    
    // Check if the number of holidays has changed
    if (settings.length !== holidays.length) {
      setHasChanges(true);
      return;
    }
    
    // Compare each holiday
    const hasModifications = holidays.some(holiday => {
      const originalHoliday = settings.find(s => s.id === holiday.id);
      
      if (!originalHoliday) return true;
      
      return (
        originalHoliday.holiday_name !== holiday.holiday_name ||
        originalHoliday.holiday_date !== holiday.holiday_date
      );
    });
    
    setHasChanges(hasModifications);
  }, [settings, holidays]);
  
  const handleAddHoliday = (name: string, date: Date) => {
    const newHolidayItem: HolidayData = {
      id: `temp-${Date.now()}`, // Temporary ID, will be replaced on save
      holiday_name: name,
      holiday_date: format(date, 'yyyy-MM-dd')
    };
    
    setHolidays([...holidays, newHolidayItem]);
  };
  
  const handleRemoveHoliday = (id: string) => {
    setHolidays(holidays.filter(holiday => holiday.id !== id));
  };
  
  const resetChanges = () => {
    if (settings) {
      setHolidays(settings);
      toast.info('Changes have been reset');
    }
  };
  
  const saveChanges = async () => {
    try {
      // For each holiday, determine if it's new or edited
      for (const holiday of holidays) {
        const isNewHoliday = holiday.id.startsWith('temp-');
        
        if (isNewHoliday) {
          // Create new holiday (omit the temporary ID)
          const { id, ...newHolidayData } = holiday;
          // Need to cast to any here because updateSettings expects a single object, not an array
          await updateSettings(newHolidayData as any);
        } else {
          // Update existing holiday
          const originalHoliday = settings?.find(s => s.id === holiday.id);
          
          if (originalHoliday) {
            if (
              originalHoliday.holiday_name !== holiday.holiday_name ||
              originalHoliday.holiday_date !== holiday.holiday_date
            ) {
              // Need to cast to any here because updateSettings expects a single object, not an array
              await updateSettings({
                id: holiday.id,
                holiday_name: holiday.holiday_name,
                holiday_date: holiday.holiday_date,
              } as any);
            }
          }
        }
      }
      
      // Handle deleted holidays (in settings but not in holidays)
      if (settings) {
        for (const settingHoliday of settings) {
          const stillExists = holidays.some(h => h.id === settingHoliday.id);
          
          if (!stillExists) {
            // Delete this holiday
            // Need to cast to any here because updateSettings expects a single object, not an array
            await updateSettings({ id: settingHoliday.id } as any);
          }
        }
      }
      
      toast.success('Holidays saved successfully');
      // Refresh to get updated data from server
      refresh();
    } catch (err: any) {
      toast.error('Failed to save holidays');
      console.error('Error saving holidays:', err);
    }
  };
  
  if (loading) {
    return <BusinessHoursLoading />;
  }
  
  if (error) {
    return <BusinessHoursError error={error} onRetry={refresh} />;
  }
  
  return (
    <SettingsCard 
      title="Holidays & Special Closures" 
      description="Manage the days when your gym will be closed"
      saveState={saveState}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Holidays</h3>
          <AddHolidayDialog onAddHoliday={handleAddHoliday} />
        </div>
        
        <HolidaysList 
          holidays={formattedHolidays}
          onRemoveHoliday={handleRemoveHoliday}
        />
        
        <BusinessHoursActions
          isMobile={isMobile}
          hasChanges={hasChanges}
          saveState={saveState}
          onReset={resetChanges}
          onSave={saveChanges}
        />
      </div>
    </SettingsCard>
  );
};

export default HolidaysSettings;
