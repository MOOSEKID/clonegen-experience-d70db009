
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, CheckSquare, XSquare, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useStaffData } from '@/hooks/staff/useStaffData';
import { useStaffAttendance } from '@/hooks/staff/useStaffAttendance';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { StaffProfile } from '@/hooks/trainers/types';

const StaffAttendance = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [activeStaff, setActiveStaff] = useState<StaffProfile[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const { staff, isLoading: isLoadingStaff } = useStaffData();
  const { 
    isLoading: isLoadingAttendance, 
    fetchAttendanceByDate,
    checkIn,
    checkOut 
  } = useStaffAttendance();
  
  // Fetch attendance records for the current date
  useEffect(() => {
    if (date) {
      const loadAttendance = async () => {
        try {
          const records = await fetchAttendanceByDate(date);
          setAttendanceRecords(records);
          
          // Filter staff who haven't checked in yet
          if (staff.length > 0) {
            const checkedInStaffIds = records.map((record) => record.staff_id);
            const notCheckedInStaff = staff.filter(
              (s) => !checkedInStaffIds.includes(s.id) && s.status === 'Active'
            );
            setActiveStaff(notCheckedInStaff);
          }
        } catch (error) {
          console.error('Error loading attendance:', error);
        }
      };
      
      loadAttendance();
    }
  }, [date, staff, fetchAttendanceByDate, refreshTrigger]);

  const handleCheckIn = async (staffMember: StaffProfile) => {
    try {
      await checkIn(staffMember.id, staffMember.full_name, [staffMember.role]);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error checking in:', error);
    }
  };

  const handleCheckOut = async (attendanceId: string, staffName: string) => {
    try {
      await checkOut(attendanceId, staffName);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  const formatTime = (isoString: string) => {
    if (!isoString) return '—';
    return format(new Date(isoString), 'h:mm a');
  };

  if (isLoadingStaff) {
    return (
      <div className="flex justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Staff Attendance</h2>
          <p className="text-gray-500">Track staff check-ins and check-outs</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setDate(new Date().toISOString().split('T')[0])}>
            Today
          </Button>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Available Staff
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeStaff.length === 0 ? (
            <p className="text-center text-gray-500 py-4">All staff members have checked in today.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeStaff.map((staffMember) => (
                <Card key={staffMember.id}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{staffMember.full_name}</p>
                      <p className="text-sm text-gray-500 capitalize">{staffMember.role}</p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleCheckIn(staffMember)}
                      className="flex items-center gap-1"
                      disabled={isLoadingAttendance}
                    >
                      <CheckSquare className="h-4 w-4" />
                      Check In
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingAttendance ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="md" />
            </div>
          ) : attendanceRecords.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No attendance records found for this date.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left font-medium text-gray-700">Staff</th>
                    <th className="p-3 text-left font-medium text-gray-700">Role</th>
                    <th className="p-3 text-left font-medium text-gray-700">Check In</th>
                    <th className="p-3 text-left font-medium text-gray-700">Check Out</th>
                    <th className="p-3 text-left font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record) => (
                    <tr key={record.id} className="border-t hover:bg-gray-50">
                      <td className="p-3 font-medium">{record.full_name}</td>
                      <td className="p-3 capitalize">{record.roles ? record.roles.join(', ') : '—'}</td>
                      <td className="p-3">
                        <div className="flex items-center text-green-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatTime(record.sign_in_time)}
                        </div>
                      </td>
                      <td className="p-3">
                        {record.sign_out_time ? (
                          <div className="flex items-center text-amber-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatTime(record.sign_out_time)}
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="p-3">
                        {!record.sign_out_time && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                            onClick={() => handleCheckOut(record.id, record.full_name)}
                            disabled={isLoadingAttendance}
                          >
                            <XSquare className="h-4 w-4" />
                            Check Out
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffAttendance;
