
import { useState } from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addDays, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ClassType } from '@/hooks/useClassesData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import EditClassDialog from './EditClassDialog';

interface ClassesCalendarProps {
  classes: ClassType[];
}

const ClassesCalendar = ({ classes }: ClassesCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null);
  
  const timeSlots = Array.from({ length: 14 }, (_, i) => i + 6); // 6 AM to 7 PM
  
  // Calculate the start of the week (Sunday) and end of the week (Saturday)
  const startDate = startOfWeek(currentDate);
  const endDate = endOfWeek(currentDate);
  
  // Generate an array of dates for the current week
  const weekDays = eachDayOfInterval({ start: startDate, end: endDate });
  
  const previousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };
  
  const nextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Helper functions
  const getDayName = (date: Date) => format(date, 'EEE');
  const getDayNumber = (date: Date) => format(date, 'd');
  
  const getClassesByDayAndTime = (day: string, time: number) => {
    return classes.filter(c => {
      const classDay = c.day.toLowerCase();
      const dayMatch = classDay === day.toLowerCase();
      const classHour = parseInt(c.time.split(':')[0]);
      const timeMatch = classHour === time;
      return dayMatch && timeMatch;
    });
  };
  
  const getClassTypeColor = (type: string) => {
    switch (type) {
      case 'yoga':
        return 'bg-green-500 hover:bg-green-600';
      case 'hiit':
        return 'bg-red-500 hover:bg-red-600';
      case 'strength':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'cardio':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'pilates':
        return 'bg-purple-500 hover:bg-purple-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  
  return (
    <>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={previousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={nextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm font-medium">
          {format(startDate, 'MMMM d')} - {format(endDate, 'MMMM d, yyyy')}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Calendar Header */}
          <div className="grid grid-cols-8 border-b">
            <div className="p-2 border-r text-center font-medium text-gray-500 text-sm">
              Time
            </div>
            {weekDays.map((day, index) => (
              <div 
                key={index} 
                className={cn(
                  "p-2 text-center font-medium border-r last:border-r-0",
                  isSameDay(day, new Date()) ? "bg-blue-50" : ""
                )}
              >
                <div className="text-gray-500">{getDayName(day)}</div>
                <div className={cn(
                  "inline-flex items-center justify-center w-8 h-8 rounded-full",
                  isSameDay(day, new Date()) ? "bg-gym-orange text-white" : ""
                )}>
                  {getDayNumber(day)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Time Slots */}
          <div>
            {timeSlots.map((hour) => (
              <div key={hour} className="grid grid-cols-8 border-b last:border-b-0">
                <div className="p-2 border-r text-center text-sm text-gray-500">
                  {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                </div>
                
                {weekDays.map((day, dayIndex) => {
                  const dayName = format(day, 'EEEE');
                  const classesAtThisTime = getClassesByDayAndTime(dayName, hour);
                  
                  return (
                    <div 
                      key={dayIndex} 
                      className={cn(
                        "p-1 border-r last:border-r-0 min-h-[80px]",
                        isSameDay(day, new Date()) ? "bg-blue-50" : ""
                      )}
                    >
                      <div className="space-y-1">
                        {classesAtThisTime.map((classItem) => (
                          <button
                            key={classItem.id}
                            onClick={() => setSelectedClass(classItem)}
                            className={cn(
                              "w-full text-left p-1 rounded text-white text-xs font-medium",
                              getClassTypeColor(classItem.type)
                            )}
                          >
                            <div className="font-bold truncate">{classItem.name}</div>
                            <div className="flex justify-between">
                              <span>{classItem.trainer}</span>
                              <span>{classItem.enrolled}/{classItem.capacity}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {selectedClass && (
        <EditClassDialog
          open={!!selectedClass}
          classData={selectedClass}
          onOpenChange={(open) => {
            if (!open) setSelectedClass(null);
          }}
          onUpdateClass={() => {
            setSelectedClass(null);
          }}
        />
      )}
    </>
  );
};

export default ClassesCalendar;
