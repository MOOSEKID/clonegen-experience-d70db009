
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckIn, CheckOut, Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { useStaffData } from '@/hooks/staff/useStaffData';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const StaffAttendance: React.FC = () => {
  const { staff, isLoading: isStaffLoading } = useStaffData();
  const [attendance, setAttendance] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7); // Last 7 days by default
    return date;
  });
  const [endDate, setEndDate] = useState(new Date());

  // Find the current user's staff record
  const currentStaffMember = staff.find(s => s.id === user?.id);

  useEffect(() => {
    const fetchAttendance = async () => {
      setIsLoading(true);
      try {
        // Format dates for query
        const startDateStr = startDate.toISOString().split('T')[0];
        const endDateStr = endDate.toISOString().split('T')[0];
        
        // Fetch attendance records for the selected date range
        const { data, error } = await supabase
          .from('staff_attendance')
          .select('*')
          .gte('date', startDateStr)
          .lte('date', endDateStr)
          .order('date', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        // Get staff IDs to fetch names
        const staffIds = [...new Set(data.map(record => record.staff_id))];
        const staffMap: Record<string, string> = {};
        
        if (staffIds.length > 0) {
          const { data: staffData } = await supabase
            .from('staff')
            .select('id, full_name')
            .in('id', staffIds);
            
          if (staffData) {
            staffData.forEach(s => {
              staffMap[s.id] = s.full_name;
            });
          }
        }
        
        // Add staff names to records
        const attendanceWithNames = data.map(record => ({
          ...record,
          staff_name: staffMap[record.staff_id] || 'Unknown'
        }));
        
        setAttendance(attendanceWithNames);
      } catch (err) {
        console.error('Error fetching attendance:', err);
        toast({
          title: 'Error',
          description: 'Failed to load attendance records',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAttendance();
  }, [startDate, endDate, toast]);

  const handleCheckIn = async () => {
    if (!currentStaffMember?.id) {
      toast({
        title: 'Error',
        description: 'Could not identify your staff profile',
        variant: 'destructive'
      });
      return;
    }
    
    setLoadingAction('checkin');
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Check if already checked in today
      const { data: existingRecord } = await supabase
        .from('staff_attendance')
        .select('*')
        .eq('staff_id', currentStaffMember.id)
        .eq('date', today)
        .maybeSingle();
        
      if (existingRecord?.check_in_time) {
        toast({
          title: 'Already checked in',
          description: `You already checked in at ${new Date(existingRecord.check_in_time).toLocaleTimeString()}`,
        });
        return;
      }
      
      const checkInTime = new Date().toISOString();
      
      if (existingRecord) {
        // Update existing record
        await supabase
          .from('staff_attendance')
          .update({ 
            check_in_time: checkInTime
          })
          .eq('id', existingRecord.id);
      } else {
        // Create new record
        await supabase
          .from('staff_attendance')
          .insert({
            staff_id: currentStaffMember.id,
            date: today,
            check_in_time: checkInTime
          });
      }
      
      toast({
        title: 'Checked in successfully',
        description: `Check-in time: ${new Date(checkInTime).toLocaleTimeString()}`
      });
      
      // Refresh attendance data
      const { data } = await supabase
        .from('staff_attendance')
        .select('*')
        .order('date', { ascending: false });
        
      setAttendance(data || []);
      
    } catch (err) {
      console.error('Check-in error:', err);
      toast({
        title: 'Error',
        description: 'Failed to record check-in',
        variant: 'destructive'
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleCheckOut = async () => {
    if (!currentStaffMember?.id) {
      toast({
        title: 'Error',
        description: 'Could not identify your staff profile',
        variant: 'destructive'
      });
      return;
    }
    
    setLoadingAction('checkout');
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Find today's record
      const { data: todayRecord } = await supabase
        .from('staff_attendance')
        .select('*')
        .eq('staff_id', currentStaffMember.id)
        .eq('date', today)
        .maybeSingle();
        
      if (!todayRecord) {
        toast({
          title: 'Not checked in',
          description: 'You need to check in first before checking out',
          variant: 'destructive'
        });
        return;
      }
      
      if (todayRecord.check_out_time) {
        toast({
          title: 'Already checked out',
          description: `You already checked out at ${new Date(todayRecord.check_out_time).toLocaleTimeString()}`,
        });
        return;
      }
      
      const checkOutTime = new Date().toISOString();
      
      await supabase
        .from('staff_attendance')
        .update({ 
          check_out_time: checkOutTime
        })
        .eq('id', todayRecord.id);
      
      toast({
        title: 'Checked out successfully',
        description: `Check-out time: ${new Date(checkOutTime).toLocaleTimeString()}`
      });
      
      // Refresh attendance data
      const { data } = await supabase
        .from('staff_attendance')
        .select('*')
        .order('date', { ascending: false });
        
      setAttendance(data || []);
      
    } catch (err) {
      console.error('Check-out error:', err);
      toast({
        title: 'Error',
        description: 'Failed to record check-out',
        variant: 'destructive'
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const formatDateTime = (dateTimeStr: string | null) => {
    if (!dateTimeStr) return 'N/A';
    return new Date(dateTimeStr).toLocaleTimeString();
  };

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), 'PPP');
  };

  const calculateDuration = (checkIn: string | null, checkOut: string | null) => {
    if (!checkIn || !checkOut) return 'N/A';
    
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    const durationMs = end - start;
    
    // Convert to hours and minutes
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  if (isStaffLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-[100px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Staff Attendance</h1>
      
      {currentStaffMember && (
        <Card>
          <CardHeader>
            <CardTitle>Check-in / Check-out</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleCheckIn}
                disabled={loadingAction === 'checkin'}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckIn className="mr-2 h-4 w-4" />
                {loadingAction === 'checkin' ? 'Processing...' : 'Check In'}
              </Button>
              
              <Button 
                onClick={handleCheckOut}
                disabled={loadingAction === 'checkout'}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <CheckOut className="mr-2 h-4 w-4" />
                {loadingAction === 'checkout' ? 'Processing...' : 'Check Out'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span>Attendance Records</span>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <input
                  type="date"
                  value={startDate.toISOString().split('T')[0]}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                />
                <span>to</span>
                <input
                  type="date"
                  value={endDate.toISOString().split('T')[0]}
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : attendance.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No attendance records found for the selected period.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Staff Member</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{formatDate(record.date)}</TableCell>
                    <TableCell>{record.staff_name}</TableCell>
                    <TableCell>{formatDateTime(record.check_in_time)}</TableCell>
                    <TableCell>{formatDateTime(record.check_out_time)}</TableCell>
                    <TableCell>{calculateDuration(record.check_in_time, record.check_out_time)}</TableCell>
                    <TableCell>{record.notes || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffAttendance;
