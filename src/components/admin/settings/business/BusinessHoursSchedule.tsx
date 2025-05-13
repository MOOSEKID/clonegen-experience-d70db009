
import React from 'react';
import DayScheduleCard from './DayScheduleCard';
import { BusinessHour } from '@/hooks/trainers/types';

interface BusinessHoursScheduleProps {
  daysOfWeek: string[];
  formData: { [key: string]: BusinessHour };
  onToggleDay: (day: string, closed: boolean) => void;
  onTimeChange: (day: string, type: 'open_time' | 'close_time', value: string) => void;
}

const BusinessHoursSchedule: React.FC<BusinessHoursScheduleProps> = ({
  daysOfWeek,
  formData,
  onToggleDay,
  onTimeChange
}) => {
  return (
    <div className="grid gap-6">
      {daysOfWeek.map((day) => {
        const dayData = formData[day];
        if (!dayData) return null;
        
        return (
          <DayScheduleCard
            key={day}
            day={day}
            dayData={dayData}
            onToggleDay={onToggleDay}
            onTimeChange={onTimeChange}
          />
        );
      })}
    </div>
  );
};

export default BusinessHoursSchedule;
