
import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  // Sample events
  const events = [
    { date: new Date(2023, 5, 8), title: 'Yoga Class' },
    { date: new Date(2023, 5, 15), title: 'Personal Training' },
    { date: new Date(2023, 5, 23), title: 'Group Workout' },
  ];
  
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const hasEvent = (date: Date) => events.some(event => isSameDay(event.date, date));
  
  return (
    <div className="bg-gym-darkblue rounded-xl p-5 text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Schedule</h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={prevMonth}
            className="p-1 rounded-full hover:bg-gym-dark transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm">{format(currentDate, 'MMMM yyyy')}</span>
          <button 
            onClick={nextMonth}
            className="p-1 rounded-full hover:bg-gym-dark transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs text-gray-400 font-medium py-2">
            {day}
          </div>
        ))}
        
        {monthDays.map(day => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isSelectedDay = isSameDay(day, selectedDate);
          const dayHasEvent = hasEvent(day);
          const today = isToday(day);
          
          return (
            <button
              key={day.toISOString()}
              onClick={() => setSelectedDate(day)}
              className={cn(
                "relative h-9 w-full rounded-full flex items-center justify-center transition-colors text-sm font-medium",
                !isCurrentMonth && "text-gray-600",
                isCurrentMonth && !isSelectedDay && !today && "text-white",
                today && !isSelectedDay && "border border-gym-orange text-gym-orange",
                isSelectedDay && "bg-gym-orange text-white"
              )}
            >
              {format(day, 'd')}
              {dayHasEvent && !isSelectedDay && (
                <span className="absolute bottom-1 w-1 h-1 bg-gym-orange rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-4">
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white rounded-full px-4 py-1 text-sm font-medium">
            Activities
          </button>
          <button className="bg-gray-700 text-gray-300 rounded-full px-4 py-1 text-sm font-medium">
            Online
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
