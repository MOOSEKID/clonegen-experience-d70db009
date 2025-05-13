
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useStaffData } from '@/hooks/staff/useStaffData';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface StaffAttendanceRecord {
  id: string;
  staff_id: string;
  date: string;
  check_in_time: string | null;
  check_out_time: string | null;
  notes: string | null;
  full_name?: string; // Staff member name added when joined with staff data
}

const StaffAttendance: React.FC = () => {
  const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<StaffAttendanceRecord[]>([]);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');
  const { staff, isLoading: staffLoading } = useStaffData();
  const { toast } = useToast();

  // Fetch attendance records for the selected date
  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('staff_attendance')
          .select('*')
          .eq('date', date);
          
        if (error) throw error;
        
        // Join with staff data to get names
        const recordsWithNames = await Promise.all(
          (data || []).map(async (record) => {
            const { data: staffData } = await supabase
              .from('staff')
              .select('full_name')
              .eq('id', record.staff_id)
              .single();
              
            return {
              ...record,
              full_name: staffData?.full_name || 'Unknown'
            };
          })
        );
        
        setRecords(recordsWithNames);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
        toast({
          variant: "destructive",
          title: "Failed to load attendance records",
          description: "Please try refreshing the page."
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (date) {
      fetchAttendanceRecords();
    }
  }, [date, toast]);

  const handleCheckIn = async (staffId: string) => {
    try {
      const now = new Date().toISOString();
      
      // Check if record already exists for this staff member and date
      const { data: existingRecord } = await supabase
        .from('staff_attendance')
        .select('id')
        .eq('staff_id', staffId)
        .eq('date', date)
        .maybeSingle();
      
      if (existingRecord) {
        // Update existing record
        const { error } = await supabase
          .from('staff_attendance')
          .update({ check_in_time: now })
          .eq('id', existingRecord.id);
          
        if (error) throw error;
      } else {
        // Create new record
        const { error } = await supabase
          .from('staff_attendance')
          .insert({
            staff_id: staffId,
            date,
            check_in_time: now,
            notes: notes || null
          });
          
        if (error) throw error;
      }
      
      // Refresh records
      const { data, error } = await supabase
        .from('staff_attendance')
        .select('*')
        .eq('date', date);
        
      if (error) throw error;
      
      const recordsWithNames = await Promise.all(
        (data || []).map(async (record) => {
          const { data: staffData } = await supabase
            .from('staff')
            .select('full_name')
            .eq('id', record.staff_id)
            .single();
            
          return {
            ...record,
            full_name: staffData?.full_name || 'Unknown'
          };
        })
      );
      
      setRecords(recordsWithNames);
      setNotes('');
      setSelectedStaffId(null);
      
      toast({
        title: "Check-in recorded",
        description: "Staff member has been checked in successfully."
      });
    } catch (error) {
      console.error('Error checking in staff:', error);
      toast({
        variant: "destructive",
        title: "Check-in failed",
        description: "There was an error recording the check-in."
      });
    }
  };

  const handleCheckOut = async (staffId: string) => {
    try {
      const now = new Date().toISOString();
      
      // Find the record for this staff member
      const { data: existingRecord } = await supabase
        .from('staff_attendance')
        .select('id')
        .eq('staff_id', staffId)
        .eq('date', date)
        .maybeSingle();
      
      if (existingRecord) {
        // Update existing record with check out time
        const { error } = await supabase
          .from('staff_attendance')
          .update({ 
            check_out_time: now,
            notes: notes ? notes : undefined // Only update notes if provided
          })
          .eq('id', existingRecord.id);
          
        if (error) throw error;
        
        // Refresh records
        const { data, error: fetchError } = await supabase
          .from('staff_attendance')
          .select('*')
          .eq('date', date);
          
        if (fetchError) throw fetchError;
        
        const recordsWithNames = await Promise.all(
          (data || []).map(async (record) => {
            const { data: staffData } = await supabase
              .from('staff')
              .select('full_name')
              .eq('id', record.staff_id)
              .single();
              
            return {
              ...record,
              full_name: staffData?.full_name || 'Unknown'
            };
          })
        );
        
        setRecords(recordsWithNames);
        setNotes('');
        setSelectedStaffId(null);
        
        toast({
          title: "Check-out recorded",
          description: "Staff member has been checked out successfully."
        });
      } else {
        toast({
          variant: "destructive",
          title: "Check-out failed",
          description: "No check-in record found for this staff member today."
        });
      }
    } catch (error) {
      console.error('Error checking out staff:', error);
      toast({
        variant: "destructive",
        title: "Check-out failed",
        description: "There was an error recording the check-out."
      });
    }
  };

  const isCheckedIn = (staffId: string): boolean => {
    return records.some(record => 
      record.staff_id === staffId && 
      record.check_in_time !== null
    );
  };

  const isCheckedOut = (staffId: string): boolean => {
    return records.some(record => 
      record.staff_id === staffId && 
      record.check_out_time !== null
    );
  };

  const getAttendanceStatus = (staffId: string) => {
    const record = records.find(r => r.staff_id === staffId);
    if (!record) return "Not checked in";
    if (record.check_in_time && !record.check_out_time) return "Checked in";
    if (record.check_in_time && record.check_out_time) return "Checked out";
    return "Unknown";
  };

  if (staffLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Staff Attendance</h1>
          <p className="text-gray-500">Track and manage staff check-ins and check-outs</p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="date" className="sr-only">Select Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-40"
          />
          <Calendar className="h-4 w-4 text-gray-500" />
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserCheck className="h-5 w-5 mr-2" />
            Staff Attendance for {format(new Date(date), 'MMMM d, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedStaffId ? (
            <div className="space-y-4 mb-4 p-4 border rounded-md">
              <h3 className="font-medium">Add notes for {staff.find(s => s.id === selectedStaffId)?.full_name}</h3>
              <Textarea 
                placeholder="Add notes about this attendance record..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => {
                  setSelectedStaffId(null);
                  setNotes('');
                }}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    if (isCheckedIn(selectedStaffId) && !isCheckedOut(selectedStaffId)) {
                      handleCheckOut(selectedStaffId);
                    } else {
                      handleCheckIn(selectedStaffId);
                    }
                  }}
                >
                  {isCheckedIn(selectedStaffId) && !isCheckedOut(selectedStaffId) 
                    ? "Check Out" 
                    : "Check In"
                  }
                </Button>
              </div>
            </div>
          ) : null}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left border-b">
                  <th className="px-4 py-3">Staff Name</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Check In Time</th>
                  <th className="px-4 py-3">Check Out Time</th>
                  <th className="px-4 py-3">Notes</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((staffMember) => {
                  const record = records.find(r => r.staff_id === staffMember.id);
                  const status = getAttendanceStatus(staffMember.id);
                  
                  return (
                    <tr key={staffMember.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{staffMember.full_name}</td>
                      <td className="px-4 py-3">
                        {status === "Checked in" && (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Checked in
                          </span>
                        )}
                        {status === "Checked out" && (
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                            <XCircle className="h-3 w-3 mr-1" />
                            Checked out
                          </span>
                        )}
                        {status === "Not checked in" && (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                            Not checked in
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {record?.check_in_time 
                          ? format(new Date(record.check_in_time), 'h:mm a') 
                          : "-"
                        }
                      </td>
                      <td className="px-4 py-3">
                        {record?.check_out_time 
                          ? format(new Date(record.check_out_time), 'h:mm a')
                          : "-"
                        }
                      </td>
                      <td className="px-4 py-3">
                        {record?.notes || "-"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {isCheckedIn(staffMember.id) && !isCheckedOut(staffMember.id) ? (
                          <Button 
                            size="sm" 
                            onClick={() => {
                              setSelectedStaffId(staffMember.id);
                              setNotes(record?.notes || '');
                            }}
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            Check Out
                          </Button>
                        ) : !isCheckedIn(staffMember.id) ? (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => {
                              setSelectedStaffId(staffMember.id);
                              setNotes('');
                            }}
                          >
                            <UserCheck className="h-4 w-4 mr-2" />
                            Check In
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            disabled
                          >
                            Completed
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                
                {staff.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                      No staff members found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffAttendance;
