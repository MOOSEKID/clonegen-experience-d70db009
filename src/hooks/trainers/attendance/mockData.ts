
import { TrainerAttendanceRecord } from './types';

export const generateMockAttendance = (trainerId: string): TrainerAttendanceRecord[] => {
  const mockRecords: TrainerAttendanceRecord[] = [];
  const now = new Date();
  
  // Generate records for the past week
  for (let i = 0; i < 7; i++) {
    const recordDate = new Date();
    recordDate.setDate(now.getDate() - i);
    const dateStr = recordDate.toISOString().split('T')[0];
    
    // For weekdays (1-5), create check-in and check-out
    // For weekends (0, 6), only create records sometimes
    const isWeekend = recordDate.getDay() === 0 || recordDate.getDay() === 6;
    
    if (!isWeekend || Math.random() > 0.5) {
      // Create base time for the day
      const checkInHour = 8 + Math.floor(Math.random() * 2); // 8-9 AM
      const checkOutHour = 16 + Math.floor(Math.random() * 3); // 4-6 PM
      
      const checkInTime = new Date(recordDate);
      checkInTime.setHours(checkInHour, Math.floor(Math.random() * 60), 0);
      
      const checkOutTime = new Date(recordDate);
      checkOutTime.setHours(checkOutHour, Math.floor(Math.random() * 60), 0);
      
      mockRecords.push({
        id: `mock-${i}`,
        trainer_id: trainerId,
        date: dateStr,
        check_in_time: checkInTime.toISOString(),
        check_out_time: checkOutTime.toISOString(),
        notes: i % 3 === 0 ? "Regular shift" : null,
        created_at: recordDate.toISOString(),
        updated_at: recordDate.toISOString(),
        trainer_name: "Mock Trainer"
      });
    }
  }
  
  return mockRecords;
};
