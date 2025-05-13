
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, addDays, startOfWeek } from 'date-fns';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

import { supabase } from '@/integrations/supabase/client';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const TrainerCalendar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [trainerName, setTrainerName] = useState<string>('');
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<any[]>([]);

  // Fetch trainer info and events
  useEffect(() => {
    const fetchTrainerAndEvents = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Fetch trainer basic info to get name
        const { data: trainer, error: trainerError } = await supabase
          .from('trainers')
          .select('name')
          .eq('id', id)
          .single();
          
        if (trainerError) throw trainerError;
        
        setTrainerName(trainer.name);
        
        // In a real implementation, we would fetch events related to this trainer
        // For now, just setting mock data
        setEvents([
          { 
            id: 1, 
            title: 'Group Class: HIIT Training', 
            startTime: '08:00', 
            endTime: '09:00', 
            day: format(new Date(), 'EEEE') 
          },
          { 
            id: 2, 
            title: 'Personal Training: John Smith', 
            startTime: '10:30', 
            endTime: '11:30', 
            day: format(addDays(new Date(), 1), 'EEEE')
          },
        ]);
        
      } catch (err) {
        console.error('Error fetching trainer calendar:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch calendar data'));
        
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load trainer calendar. Please try again."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTrainerAndEvents();
  }, [id, toast]);

  // Generate days for week view
  const generateWeekDays = () => {
    const startDay = startOfWeek(currentDate);
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const day = addDays(startDay, i);
      days.push(day);
    }
    
    return days;
  };

  // Navigation functions
  const goToPrevious = () => {
    if (view === 'day') {
      setCurrentDate(prev => addDays(prev, -1));
    } else if (view === 'week') {
      setCurrentDate(prev => addDays(prev, -7));
    } else {
      // Handle month view
    }
  };

  const goToNext = () => {
    if (view === 'day') {
      setCurrentDate(prev => addDays(prev, 1));
    } else if (view === 'week') {
      setCurrentDate(prev => addDays(prev, 7));
    } else {
      // Handle month view
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const weekDays = generateWeekDays();

  return (
    <div className="space-y-6">
      {/* Header with breadcrumb */}
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
            <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
            <p className="text-gray-500">Schedule for {trainerName}</p>
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={goToPrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="font-medium">
            {view === 'day' && format(currentDate, 'MMMM d, yyyy')}
            {view === 'week' && (
              <>
                {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
              </>
            )}
          </div>
          
          <Button variant="outline" size="sm" onClick={goToNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
        </div>
        
        <Tabs value={view} onValueChange={(val: string) => setView(val as 'day' | 'week' | 'month')}>
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Calendar Grid */}
      <Card className="p-4">
        {view === 'week' ? (
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, idx) => (
              <div key={idx} className="border rounded-md p-2">
                <div className="text-center font-medium mb-2">{format(day, 'EEE')}</div>
                <div className="text-center text-sm text-muted-foreground mb-4">{format(day, 'MMM d')}</div>
                
                {/* Events */}
                <div className="space-y-2">
                  {events
                    .filter(event => event.day === format(day, 'EEEE'))
                    .map(event => (
                      <div 
                        key={event.id}
                        className="bg-blue-50 border-l-4 border-blue-500 p-2 rounded text-xs"
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-muted-foreground">{event.startTime} - {event.endTime}</div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              {view === 'day' ? 'Day' : 'Month'} view coming soon
            </p>
          </div>
        )}
      </Card>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>This is a simplified calendar view. In a complete implementation, you would see all classes, personal training sessions, and availability for this trainer.</p>
      </div>
    </div>
  );
};

export default TrainerCalendar;
