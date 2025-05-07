
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

const Schedule = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Example scheduled classes for the current day
  const scheduledClasses = [
    {
      id: 1,
      name: "HIIT Training",
      instructor: "Sarah Johnson",
      time: "10:00 AM - 11:00 AM",
      location: "Studio A"
    },
    {
      id: 2,
      name: "Yoga Flow",
      instructor: "Michael Chen",
      time: "2:00 PM - 3:00 PM",
      location: "Studio B"
    },
    {
      id: 3,
      name: "Personal Training",
      instructor: "David Wilson",
      time: "4:30 PM - 5:30 PM",
      location: "Training Zone"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Your Schedule</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {scheduledClasses.length > 0 ? (
              <div className="space-y-4">
                {scheduledClasses.map((cls) => (
                  <div key={cls.id} className="flex flex-col p-4 bg-gym-dark rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">{cls.name}</h3>
                      <span className="bg-gym-orange text-white text-xs px-2 py-1 rounded">Booked</span>
                    </div>
                    <p className="text-gray-300">{cls.time}</p>
                    <p className="text-gray-400 text-sm">Instructor: {cls.instructor}</p>
                    <p className="text-gray-400 text-sm">Location: {cls.location}</p>
                    <div className="flex gap-2 mt-3">
                      <button className="text-xs border border-gray-600 hover:border-gray-400 px-2 py-1 rounded">
                        Cancel
                      </button>
                      <button className="text-xs border border-gray-600 hover:border-gray-400 px-2 py-1 rounded">
                        Reschedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>No classes scheduled for this day</p>
                <button className="mt-4 bg-gym-orange text-white px-4 py-2 rounded hover:bg-gym-orange/90">
                  Book a Class
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Spin Class", date: "Tomorrow", time: "9:00 AM" },
              { name: "Strength Training", date: "Friday, May 10", time: "11:00 AM" },
              { name: "Swimming", date: "Monday, May 13", time: "5:00 PM" },
            ].map((cls, i) => (
              <div key={i} className="flex justify-between items-center p-4 border-b border-gray-700 last:border-0">
                <div>
                  <h3 className="font-medium">{cls.name}</h3>
                  <p className="text-sm text-gray-400">{cls.date} at {cls.time}</p>
                </div>
                <div>
                  <button className="text-sm text-gym-orange hover:underline">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Schedule;
