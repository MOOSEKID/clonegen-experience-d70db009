
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

interface CalendarTabProps {
  events: any[];
}

const CalendarTab: React.FC<CalendarTabProps> = ({ events }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trainer Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 border rounded-md">
          <h3 className="font-medium mb-2">Trainer Calendar</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="flex-1">
              <p className="text-muted-foreground text-sm mb-4">
                {events && events.length > 0 ? 'Scheduled events:' : 'No events scheduled for selected date'}
              </p>
              {events && events.length > 0 && (
                <ul className="divide-y">
                  {events.map((event, idx) => (
                    <li key={idx} className="py-2">
                      {event.title} - {event.date}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarTab;
