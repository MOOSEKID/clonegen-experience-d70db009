
import { useState, useMemo, useEffect } from 'react';
import { useSettings, SaveState } from '@/hooks/admin/useSettings';
import SettingsCard from '../SettingsCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Save, RotateCcw, AlertCircle, Trash2, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface HolidayData {
  id: string;
  holiday_name: string;
  holiday_date: string;
  updated_at?: string;
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
  const [newHoliday, setNewHoliday] = useState<{ name: string, date: Date | undefined }>({
    name: '',
    date: undefined
  });
  const [dialogOpen, setDialogOpen] = useState(false);
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
  
  const handleAddHoliday = () => {
    if (!newHoliday.name || !newHoliday.date) {
      toast.error('Please provide both a name and date for the holiday');
      return;
    }
    
    const newHolidayItem: HolidayData = {
      id: `temp-${Date.now()}`, // Temporary ID, will be replaced on save
      holiday_name: newHoliday.name,
      holiday_date: format(newHoliday.date, 'yyyy-MM-dd')
    };
    
    setHolidays([...holidays, newHolidayItem]);
    setNewHoliday({ name: '', date: undefined });
    setDialogOpen(false);
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
          await updateSettings(newHolidayData as any);
        } else {
          // Update existing holiday
          const originalHoliday = settings?.find(s => s.id === holiday.id);
          
          if (originalHoliday) {
            if (
              originalHoliday.holiday_name !== holiday.holiday_name ||
              originalHoliday.holiday_date !== holiday.holiday_date
            ) {
              await updateSettings({
                id: holiday.id,
                holiday_name: holiday.holiday_name,
                holiday_date: holiday.holiday_date,
              });
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
            await updateSettings({ id: settingHoliday.id });
          }
        }
      }
      
      toast.success('Holidays saved successfully');
      // Refresh to get updated data from server
      refresh();
    } catch (err) {
      toast.error('Failed to save holidays');
      console.error('Error saving holidays:', err);
    }
  };
  
  if (loading) {
    return (
      <SettingsCard title="Holidays & Special Closures" description="Loading...">
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gym-orange"></div>
        </div>
      </SettingsCard>
    );
  }
  
  if (error) {
    return (
      <SettingsCard 
        title="Holidays & Special Closures" 
        description="Error loading holidays"
        saveState={SaveState.Error}
      >
        <div className="p-4 bg-red-50 text-red-800 rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Failed to load holidays</p>
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
      title="Holidays & Special Closures" 
      description="Manage the days when your gym will be closed"
      saveState={saveState}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Holidays</h3>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Holiday
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Holiday</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="holiday-name">Holiday Name</Label>
                  <Input
                    id="holiday-name"
                    placeholder="e.g. Christmas Day"
                    value={newHoliday.name}
                    onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Holiday Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newHoliday.date ? format(newHoliday.date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newHoliday.date}
                        onSelect={(date) => setNewHoliday({ ...newHoliday, date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button onClick={handleAddHoliday}>
                    Add Holiday
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {formattedHolidays.length === 0 ? (
          <div className="border rounded-md p-8 text-center">
            <p className="text-muted-foreground">No holidays have been added yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {formattedHolidays.map((holiday) => (
              <div 
                key={holiday.id} 
                className="flex justify-between items-center border rounded-md p-4"
              >
                <div>
                  <h4 className="font-medium">{holiday.holiday_name}</h4>
                  <p className="text-sm text-muted-foreground">{holiday.formattedDate}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleRemoveHoliday(holiday.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
        
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

export default HolidaysSettings;
