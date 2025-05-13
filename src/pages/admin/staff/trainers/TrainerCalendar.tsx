
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

import { addDays, format, startOfWeek, endOfWeek, addWeeks, subWeeks, isWithinInterval, isSameDay } from 'date-fns';

interface TrainerDetail {
  id: string;
  name: string;
  photo_url?: string;
}

interface AvailabilitySlot {
  id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

interface ClassSession {
  id: string;
  name: string;
  start_time: string;
  end_time: string;
  location?: string;
  type?: string;
}

const TrainerCalendar = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [trainer, setTrainer] = useState<TrainerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [classes, setClasses] = useState<ClassSession[]>([]);
  
  // Get days of current week
  const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(selectedDate, { weekStartsOn: 1 });
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));
  
  const dayOfWeekMap: { [key: number]: string } = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
  };

  // Hours of the day for the calendar
  const hours = Array.from({ length: 14 }, (_, i) => i + 6); // 6am to 8pm

  // Fetch trainer details
  useEffect(() => {
    const fetchTrainerData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // Fetch trainer details
        const { data, error } = await supabase
          .from('trainers')
          .select('id, name, profilepicture')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setTrainer({
            id: data.id,
            name: data.name,
            photo_url: data.profilepicture
          });
          
          // Fetch trainer availability
          const { data: availData, error: availError } = await supabase
            .from('trainer_availability')
            .select('*')
            .eq('trainer_id', id);
            
          if (availError) throw availError;
          setAvailability(availData || []);
          
          // Fetch classes assigned to trainer
          const { data: classData, error: classError } = await supabase
            .from('classes')
            .select('id, name, start_time, end_time, location, class_type')
            .eq('trainer_id', id);
            
          if (classError) throw classError;
          setClasses(classData || []);
        }
      } catch (error) {
        console.error('Error fetching trainer calendar data:', error);
        toast({
          variant: "destructive",
          title: "Failed to load calendar",
          description: "Please try again or contact support."
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrainerData();
  }, [id, toast]);

  // Navigate weeks
  const goToPreviousWeek = () => {
    setSelectedDate(subWeeks(selectedDate, 1));
  };

  const goToNextWeek = () => {
    setSelectedDate(addWeeks(selectedDate, 1));
  };

  // Check if a time slot has availability
  const hasAvailabilityAtTime = (day: Date, hour: number) => {
    const dayName = dayOfWeekMap[day.getDay()].toLowerCase();
    
    return availability.some(slot => {
      if (slot.day_of_week.toLowerCase() !== dayName) return false;
      
      // Parse start and end times
      const [startHour, startMinute] = slot.start_time.split(':').map(Number);
      const [endHour, endMinute] = slot.end_time.split(':').map(Number);
      
      // Check if hour falls within availability
      return hour >= startHour && hour < endHour;
    });
  };

  // Check if a time slot has a class
  const classAtTimeSlot = (day: Date, hour: number) => {
    return classes.filter(cls => {
      if (!cls.start_time) return false;
      
      const classDate = new Date(cls.start_time);
      const classEndDate = new Date(cls.end_time);
      
      // Check if class is on the same day
      if (!isSameDay(classDate, day)) return false;
      
      // Check if hour falls within class time
      const classStartHour = classDate.getHours();
      const classEndHour = classEndDate.getHours();
      
      return hour >= classStartHour && hour < classEndHour;
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-6 w-1" />
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  if (!trainer) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(`/admin/staff/trainers/${id}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Trainer Profile
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{trainer.name}'s Calendar</h1>
            <p className="text-gray-500">View and manage schedule, availability, and classes</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Tabs value={view} onValueChange={(v) => setView(v as 'day' | 'week' | 'month')}>
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Select
            value={format(selectedDate, 'yyyy-MM-dd')}
            onValueChange={(value) => setSelectedDate(new Date(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                {format(selectedDate, 'MMMM d, yyyy')}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 14 }, (_, i) => {
                const date = addDays(new Date(), i - 7);
                return (
                  <SelectItem key={i} value={format(date, 'yyyy-MM-dd')}>
                    {format(date, 'MMMM d, yyyy')}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
            Today
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-8 border-b">
            {/* Time column header */}
            <div className="border-r py-2 px-2 text-xs text-gray-500 text-center">
              Time
            </div>
            
            {/* Day columns headers */}
            {daysOfWeek.map((day, i) => (
              <div
                key={i}
                className={`py-2 text-center ${
                  isSameDay(day, new Date()) ? 'bg-blue-50' : ''
                }`}
              >
                <div className="font-medium">{format(day, 'EEE')}</div>
                <div className="text-sm text-gray-500">{format(day, 'd MMM')}</div>
              </div>
            ))}
          </div>
          
          <div className="h-[600px] overflow-y-auto">
            {/* Time slots */}
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-8 border-b">
                {/* Time column */}
                <div className="border-r py-4 px-2 text-xs text-gray-500 text-center">
                  {hour % 12 || 12}{hour >= 12 ? 'pm' : 'am'}
                </div>
                
                {/* Day columns */}
                {daysOfWeek.map((day, dayIndex) => {
                  const dayClasses = classAtTimeSlot(day, hour);
                  const isAvailable = hasAvailabilityAtTime(day, hour);
                  
                  return (
                    <div
                      key={dayIndex}
                      className={`border-r py-2 px-1 min-h-[80px] ${
                        isSameDay(day, new Date()) ? 'bg-blue-50' : ''
                      } ${isAvailable ? 'bg-green-50/50' : ''}`}
                    >
                      {isAvailable && dayClasses.length === 0 && (
                        <div className="text-xs text-green-600 flex items-center">
                          <CalendarIcon className="h-3 w-3 mr-1" /> Available
                        </div>
                      )}
                      
                      {dayClasses.map((cls) => (
                        <div
                          key={cls.id}
                          className="bg-blue-100 p-1 text-xs rounded mb-1 border-l-4 border-blue-500"
                        >
                          <div className="font-medium truncate">{cls.name}</div>
                          <div className="text-gray-600 truncate">{cls.location}</div>
                          <Badge variant="outline" className="mt-1 bg-white">
                            {cls.type || 'Class'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-50 border border-green-200 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Available Time</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Scheduled Class</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-50 border border-blue-200 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Today</span>
        </div>
      </div>
    </div>
  );
};

export default TrainerCalendar;
