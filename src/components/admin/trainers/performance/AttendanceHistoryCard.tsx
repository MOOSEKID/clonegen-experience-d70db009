
import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AttendanceRecord } from '@/hooks/trainers/performance/types';
import { fetchTrainerAttendance } from '@/hooks/trainers/attendance/attendanceService';

interface AttendanceHistoryCardProps {
  trainerId: string;
  limit?: number;
}

const AttendanceHistoryCard: React.FC<AttendanceHistoryCardProps> = ({ 
  trainerId, 
  limit = 5 
}) => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAttendance = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTrainerAttendance(trainerId, 'week');
        setAttendance(data.slice(0, limit));
      } catch (err) {
        console.error('Error loading attendance history:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (trainerId) {
      loadAttendance();
    }
  }, [trainerId, limit]);

  const formatTime = (isoString: string | undefined) => {
    if (!isoString) return '-';
    try {
      return format(parseISO(isoString), 'h:mm a');
    } catch (e) {
      return '-';
    }
  };

  const formatDate = (isoString: string) => {
    try {
      return format(parseISO(isoString), 'EEE, MMM d');
    } catch (e) {
      return '-';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-500">Present</Badge>;
      case 'late':
        return <Badge className="bg-yellow-500">Late</Badge>;
      case 'absent':
        return <Badge className="bg-red-500">Absent</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-4 text-center text-sm text-muted-foreground">Loading attendance...</div>
        ) : attendance.length === 0 ? (
          <div className="py-4 text-center text-sm text-muted-foreground">No recent attendance records found</div>
        ) : (
          <div className="space-y-4">
            {attendance.map((record) => (
              <div key={record.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium">{formatDate(record.check_in)}</p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>In: {formatTime(record.check_in)}</span>
                    <span>•</span>
                    <span>Out: {formatTime(record.check_out)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(record.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceHistoryCard;
