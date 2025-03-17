
import React, { useState, useEffect } from 'react';
import { useTrainerAttendance } from '@/hooks/trainers/attendance/useTrainerAttendance';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ClockIcon, LogInIcon, LogOutIcon } from 'lucide-react';

interface AttendanceCheckInOutProps {
  trainerId: string;
  trainerName: string;
}

const AttendanceCheckInOut: React.FC<AttendanceCheckInOutProps> = ({ trainerId, trainerName }) => {
  const { records, isLoading, checkIn, checkOut } = useTrainerAttendance(trainerId);
  const [notes, setNotes] = useState('');
  const [todayRecord, setTodayRecord] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (records.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      const record = records.find(r => r.date.split('T')[0] === today);
      setTodayRecord(record || null);
    }
  }, [records]);

  const handleCheckIn = async () => {
    const result = await checkIn(trainerId, notes);
    if (result) {
      setNotes('');
      setTodayRecord(result);
    }
  };

  const handleCheckOut = async () => {
    const result = await checkOut(trainerId, notes);
    if (result) {
      setNotes('');
      setTodayRecord(result);
    }
  };

  const formatTime = (timeStr: string | null) => {
    if (!timeStr) return '-';
    return format(new Date(timeStr), 'h:mm a');
  };

  return (
    <Card className="shadow-md overflow-hidden">
      <CardHeader className="bg-gray-50 pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Trainer Attendance</span>
          <span className="text-sm font-normal text-muted-foreground">
            {format(currentTime, 'EEEE, MMM d, yyyy')}
          </span>
        </CardTitle>
        <CardDescription>
          Record daily check-in and check-out times
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="font-medium">{trainerName}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>Current time: {format(currentTime, 'h:mm:ss a')}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {todayRecord?.check_in_time && (
                <span className="text-sm text-muted-foreground">
                  Check in: {formatTime(todayRecord.check_in_time)}
                </span>
              )}
              
              {todayRecord?.check_out_time && (
                <span className="text-sm text-muted-foreground">
                  Check out: {formatTime(todayRecord.check_out_time)}
                </span>
              )}
            </div>
          </div>
          
          <Textarea
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="h-20"
          />
          
          <div className="flex gap-2">
            <Button
              onClick={handleCheckIn}
              disabled={!!todayRecord?.check_in_time}
              className="flex-1"
            >
              <LogInIcon className="h-4 w-4 mr-2" />
              Check In
            </Button>
            
            <Button
              onClick={handleCheckOut}
              disabled={!todayRecord?.check_in_time || !!todayRecord?.check_out_time}
              variant={todayRecord?.check_in_time ? "default" : "outline"}
              className="flex-1"
            >
              <LogOutIcon className="h-4 w-4 mr-2" />
              Check Out
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceCheckInOut;
