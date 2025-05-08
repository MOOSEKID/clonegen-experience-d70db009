
import { useState, useEffect } from 'react';
import { useSettings, SaveState } from '@/hooks/admin/useSettings';
import SettingsCard from '../SettingsCard';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, X } from 'lucide-react';
import { format } from 'date-fns';

interface BusinessHour {
  id: string;
  day_of_week: string;
  open_time: string;
  close_time: string;
  is_closed: boolean;
}

interface Holiday {
  id: string;
  holiday_name: string;
  holiday_date: string;
}

const BusinessHoursSettings = () => {
  // Business hours state
  const [businessHours, setBusinessHours] = useState<BusinessHour[]>([]);
  const [loadingHours, setLoadingHours] = useState(true);
  const [savingHours, setSavingHours] = useState<Record<string, SaveState>>({});
  
  // Holidays state
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loadingHolidays, setLoadingHolidays] = useState(true);
  const [newHoliday, setNewHoliday] = useState<{name: string, date: string}>({name: '', date: ''});
  const [savingHoliday, setSavingHoliday] = useState(false);

  // Fetch business hours
  useEffect(() => {
    const fetchBusinessHours = async () => {
      setLoadingHours(true);
      const { data, error } = await supabase
        .from('settings_business_hours')
        .select('*')
        .order('day_of_week', { ascending: true });
        
      if (error) {
        console.error('Error fetching business hours:', error);
        toast.error('Failed to load business hours');
        setLoadingHours(false);
        return;
      }
      
      if (data) {
        setBusinessHours(data);
      }
      setLoadingHours(false);
    };
    
    fetchBusinessHours();
  }, []);

  // Fetch holidays
  useEffect(() => {
    const fetchHolidays = async () => {
      setLoadingHolidays(true);
      const { data, error } = await supabase
        .from('settings_business_holidays')
        .select('*')
        .order('holiday_date', { ascending: true });
        
      if (error) {
        console.error('Error fetching holidays:', error);
        toast.error('Failed to load holidays');
        setLoadingHolidays(false);
        return;
      }
      
      if (data) {
        setHolidays(data);
      }
      setLoadingHolidays(false);
    };
    
    fetchHolidays();
  }, []);
  
  // Update business hour
  const updateBusinessHour = async (id: string, field: string, value: any) => {
    setSavingHours(prev => ({ ...prev, [id]: SaveState.Saving }));
    
    try {
      const { error } = await supabase
        .from('settings_business_hours')
        .update({ [field]: value })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setBusinessHours(prev => 
        prev.map(hour => 
          hour.id === id ? { ...hour, [field]: value } : hour
        )
      );
      
      setSavingHours(prev => ({ ...prev, [id]: SaveState.Saved }));
      
      // Reset status after delay
      setTimeout(() => {
        setSavingHours(prev => ({ ...prev, [id]: SaveState.Idle }));
      }, 2000);
      
    } catch (error: any) {
      console.error('Error updating business hour:', error);
      toast.error('Failed to update business hours');
      setSavingHours(prev => ({ ...prev, [id]: SaveState.Error }));
    }
  };
  
  // Add new holiday
  const addHoliday = async () => {
    if (!newHoliday.name || !newHoliday.date) {
      toast.error('Please enter both holiday name and date');
      return;
    }
    
    setSavingHoliday(true);
    
    try {
      const { data, error } = await supabase
        .from('settings_business_holidays')
        .insert({
          holiday_name: newHoliday.name,
          holiday_date: newHoliday.date
        })
        .select();
        
      if (error) throw error;
      
      if (data && data[0]) {
        setHolidays(prev => [...prev, data[0]]);
        setNewHoliday({ name: '', date: '' });
        toast.success('Holiday added successfully');
      }
      
    } catch (error: any) {
      console.error('Error adding holiday:', error);
      toast.error('Failed to add holiday');
    } finally {
      setSavingHoliday(false);
    }
  };
  
  // Delete holiday
  const deleteHoliday = async (id: string) => {
    try {
      const { error } = await supabase
        .from('settings_business_holidays')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setHolidays(prev => prev.filter(holiday => holiday.id !== id));
      toast.success('Holiday removed successfully');
      
    } catch (error: any) {
      console.error('Error deleting holiday:', error);
      toast.error('Failed to remove holiday');
    }
  };
  
  // Get save state for a specific business hour
  const getSaveState = (id: string): SaveState => {
    return savingHours[id] || SaveState.Idle;
  };
  
  // Show day name in proper format
  const formatDayName = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };
  
  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const sortedBusinessHours = [...businessHours].sort((a, b) => {
    return daysOrder.indexOf(a.day_of_week) - daysOrder.indexOf(b.day_of_week);
  });

  return (
    <div className="space-y-6">
      <SettingsCard 
        title="Business Hours" 
        description="Set your gym's opening hours for each day of the week"
      >
        {loadingHours ? (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gym-orange"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedBusinessHours.map(hour => (
              <div key={hour.id} className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-32 font-medium">{formatDayName(hour.day_of_week)}</div>
                  
                  <Switch
                    checked={!hour.is_closed}
                    onCheckedChange={(checked) => {
                      updateBusinessHour(hour.id, 'is_closed', !checked);
                    }}
                  />
                  
                  <span className={hour.is_closed ? "text-red-500" : "text-green-500"}>
                    {hour.is_closed ? "Closed" : "Open"}
                  </span>
                </div>
                
                {!hour.is_closed && (
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="time"
                        value={hour.open_time}
                        onChange={(e) => updateBusinessHour(hour.id, 'open_time', e.target.value)}
                        className="w-32"
                      />
                      <span>to</span>
                      <Input 
                        type="time"
                        value={hour.close_time}
                        onChange={(e) => updateBusinessHour(hour.id, 'close_time', e.target.value)}
                        className="w-32"
                      />
                    </div>
                  </div>
                )}
                
                <div className="w-6">
                  {getSaveState(hour.id) === SaveState.Saving && (
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gym-orange"></div>
                  )}
                  {getSaveState(hour.id) === SaveState.Saved && (
                    <div className="text-green-500">✓</div>
                  )}
                  {getSaveState(hour.id) === SaveState.Error && (
                    <div className="text-red-500">!</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </SettingsCard>
      
      <SettingsCard 
        title="Holidays & Special Closures" 
        description="Set special holidays and closures"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="holiday_name">Holiday Name</Label>
                <Input
                  id="holiday_name"
                  value={newHoliday.name}
                  onChange={(e) => setNewHoliday(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. New Year's Day"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="holiday_date">Date</Label>
                <Input
                  id="holiday_date"
                  type="date"
                  value={newHoliday.date}
                  onChange={(e) => setNewHoliday(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <Button 
                onClick={addHoliday} 
                disabled={savingHoliday || !newHoliday.name || !newHoliday.date}
                className="flex-shrink-0"
              >
                {savingHoliday ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current"></div>
                ) : (
                  <>
                    <Plus className="mr-1 h-4 w-4" /> Add Holiday
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Upcoming Holidays</h3>
            {loadingHolidays ? (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gym-orange"></div>
              </div>
            ) : holidays.length > 0 ? (
              <div className="space-y-2">
                {holidays.map(holiday => (
                  <div key={holiday.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">{holiday.holiday_name}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(holiday.holiday_date).toLocaleDateString()}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteHoliday(holiday.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                No holidays added yet
              </div>
            )}
          </div>
        </div>
      </SettingsCard>
    </div>
  );
};

export default BusinessHoursSettings;
