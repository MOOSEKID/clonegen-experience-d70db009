
import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { CalendarDays, Clock, UserCheck, RefreshCw, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useStaffData } from '@/hooks/staff/useStaffData';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Skeleton } from '@/components/ui/skeleton';

const StaffAttendance = () => {
  const { staff, isLoading: isStaffLoading } = useStaffData();
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAttendanceData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Try fetching from staff_attendance table first
      const { data: staffAttendance, error: staffAttendanceError } = await supabase
        .from('staff_attendance')
        .select('*')
        .order('date', { ascending: false })
        .limit(50);

      if (staffAttendanceError) {
        console.error('Error fetching from staff_attendance table:', staffAttendanceError);
        
        // Fallback: Try trainer_attendance if staff_attendance fails
        const { data: trainerAttendance, error: trainerAttendanceError } = await supabase
          .from('trainer_attendance')
          .select('*')
          .order('date', { ascending: false })
          .limit(50);

        if (trainerAttendanceError) {
          throw new Error(`Failed to fetch attendance data: ${trainerAttendanceError.message}`);
        }

        setAttendanceData(trainerAttendance || []);
      } else {
        setAttendanceData(staffAttendance || []);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error fetching attendance data';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Failed to load attendance data",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const getStaffName = (staffId: string) => {
    const staffMember = staff.find(s => s.id === staffId);
    return staffMember ? staffMember.full_name : 'Unknown Staff';
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return 'Not recorded';
    try {
      return format(parseISO(timeStr), 'h:mm a');
    } catch (e) {
      return 'Invalid time';
    }
  };

  const handleRefresh = () => {
    fetchAttendanceData();
  };

  if (isStaffLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div>Staff Attendance</div>
              <Button variant="outline" size="sm" disabled>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="ml-4 space-y-1">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-3 w-[150px]" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-3 w-[80px]" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div>Staff Attendance</div>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
              {isLoading ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">Error loading attendance data</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" text="Loading attendance data..." />
            </div>
          ) : attendanceData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CalendarDays className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <h3 className="text-lg font-medium mb-1">No attendance records found</h3>
              <p>Staff attendance records will appear here once recorded.</p>
            </div>
          ) : (
            <div className="divide-y">
              {attendanceData.map((record) => {
                // Handle staff_id from staff_attendance or trainer_id from trainer_attendance
                const staffId = record.staff_id || record.trainer_id;
                const isCheckedOut = Boolean(record.check_out_time);
                
                return (
                  <div key={record.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <UserCheck className={`h-5 w-5 mt-1 ${isCheckedOut ? 'text-green-600' : 'text-amber-500'}`} />
                        <div className="ml-3">
                          <p className="font-medium">{getStaffName(staffId)}</p>
                          <p className="text-sm text-gray-600">
                            {format(parseISO(record.date), 'MMMM d, yyyy')}
                          </p>
                          {record.notes && (
                            <p className="text-xs text-gray-500 mt-1 italic">{record.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm">
                          <Clock className="h-3.5 w-3.5 mr-1 text-green-600" />
                          <span>In: {formatTime(record.check_in_time)}</span>
                        </div>
                        <div className="flex items-center text-sm mt-1">
                          <Clock className="h-3.5 w-3.5 mr-1 text-red-600" />
                          <span>Out: {isCheckedOut ? formatTime(record.check_out_time) : 'Not checked out'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffAttendance;
