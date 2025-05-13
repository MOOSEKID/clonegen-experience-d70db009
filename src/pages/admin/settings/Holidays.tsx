
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Holiday {
  id: string;
  holiday_name: string;
  holiday_date: string;
}

const HolidaysPage: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  
  // Load holidays from the database
  useEffect(() => {
    const fetchHolidays = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('settings_business_holidays')
          .select('*')
          .order('holiday_date');
        
        if (error) throw error;
        
        if (data) {
          setHolidays(data as Holiday[]);
        }
      } catch (err) {
        console.error('Error fetching holidays:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch holidays'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHolidays();
  }, []);
  
  const addHoliday = async (name: string, date: string) => {
    try {
      const { data, error } = await supabase
        .from('settings_business_holidays')
        .insert([
          { holiday_name: name, holiday_date: date }
        ])
        .select();
        
      if (error) throw error;
      
      if (data) {
        setHolidays([...holidays, data[0] as Holiday]);
        toast({
          title: "Holiday added",
          description: `${name} (${date}) has been added to the calendar.`,
        });
      }
    } catch (err) {
      console.error('Error adding holiday:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add holiday. Please try again.",
      });
    }
  };
  
  const deleteHoliday = async (id: string) => {
    try {
      const { error } = await supabase
        .from('settings_business_holidays')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setHolidays(holidays.filter(h => h.id !== id));
      toast({
        title: "Holiday removed",
        description: "The holiday has been removed from the calendar.",
      });
    } catch (err) {
      console.error('Error deleting holiday:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove holiday. Please try again.",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Holidays & Closures</h1>
          <p className="text-muted-foreground">Manage gym holiday closures and special hours.</p>
        </div>
        <Button onClick={() => addHoliday('New Holiday', new Date().toISOString().split('T')[0])}>
          <Plus className="mr-2 h-4 w-4" /> Add Holiday
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Annual Calendar</CardTitle>
            <CardDescription>Visualize holidays throughout the year</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              className="border rounded-md p-4"
              disabled={(date) => date < new Date()}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Holidays</CardTitle>
            <CardDescription>Scheduled gym closures and special hours</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="py-8 text-center">Loading holidays...</div>
            ) : error ? (
              <div className="py-8 text-center text-destructive">Error loading holidays</div>
            ) : holidays.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">No holidays scheduled</div>
            ) : (
              <div className="space-y-4">
                {holidays.map(holiday => (
                  <div key={holiday.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">{holiday.holiday_name}</p>
                      <p className="text-sm text-muted-foreground">{holiday.holiday_date}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteHoliday(holiday.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HolidaysPage;
