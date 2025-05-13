
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Search, Download, Filter, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { useStaffData } from '@/hooks/staff/useStaffData';

interface StaffAttendanceRecord {
  id: string;
  staff_id: string;
  staff_name: string;
  staff_role: string;
  check_in_time: string | null;
  check_out_time: string | null;
  date: string;
  notes: string | null;
  source: 'manual' | 'biometric';
}

const StaffAttendance = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { staff, isLoading: isStaffLoading } = useStaffData();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [attendanceRecords, setAttendanceRecords] = useState<StaffAttendanceRecord[]>([]);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  // Fetch staff attendance data
  useEffect(() => {
    const fetchAttendanceData = async () => {
      // In a real implementation, this would fetch from the database
      setIsLoading(true);
      
      try {
        // Mock data - in production, replace with actual API call
        setTimeout(() => {
          const mockData: StaffAttendanceRecord[] = staff.map(staffMember => ({
            id: `attendance-${staffMember.id}`,
            staff_id: staffMember.id,
            staff_name: staffMember.full_name,
            staff_role: staffMember.role,
            check_in_time: Math.random() > 0.3 ? format(new Date().setHours(8, Math.floor(Math.random() * 30), 0), 'HH:mm:ss') : null,
            check_out_time: Math.random() > 0.5 ? format(new Date().setHours(17, Math.floor(Math.random() * 30), 0), 'HH:mm:ss') : null,
            date: dateFilter,
            notes: null,
            source: 'manual'
          }));
          
          setAttendanceRecords(mockData);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        toast({
          variant: "destructive",
          title: "Failed to load attendance data",
          description: "There was an error loading the attendance records."
        });
        setIsLoading(false);
      }
    };
    
    if (!isStaffLoading && staff.length > 0) {
      fetchAttendanceData();
    }
  }, [staff, isStaffLoading, dateFilter, toast]);

  // Handle check-in and check-out actions
  const handleCheckIn = async (staffId: string) => {
    setIsUpdating(staffId);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setAttendanceRecords(prev => 
        prev.map(record => 
          record.staff_id === staffId 
            ? { ...record, check_in_time: format(new Date(), 'HH:mm:ss'), source: 'manual' as const }
            : record
        )
      );
      
      toast({
        title: "Check-in recorded",
        description: `Staff member checked in at ${format(new Date(), 'HH:mm:ss')}`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Check-in failed",
        description: "There was an error recording the check-in."
      });
    } finally {
      setIsUpdating(null);
    }
  };
  
  const handleCheckOut = async (staffId: string) => {
    setIsUpdating(staffId);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setAttendanceRecords(prev => 
        prev.map(record => 
          record.staff_id === staffId 
            ? { ...record, check_out_time: format(new Date(), 'HH:mm:ss'), source: 'manual' as const }
            : record
        )
      );
      
      toast({
        title: "Check-out recorded",
        description: `Staff member checked out at ${format(new Date(), 'HH:mm:ss')}`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Check-out failed",
        description: "There was an error recording the check-out."
      });
    } finally {
      setIsUpdating(null);
    }
  };

  // Filter attendance records
  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.staff_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || record.staff_role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/admin/staff')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Staff
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Staff Attendance</h1>
            <p className="text-gray-500">Track and manage staff check-ins and check-outs</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Search Staff</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by name..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Date</label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="date"
                  className="pl-8"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Role Filter</label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="trainer">Trainers</SelectItem>
                  <SelectItem value="manager">Managers</SelectItem>
                  <SelectItem value="reception">Reception</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="outline" className="flex items-center">
              <Download className="mr-1 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setRoleFilter('all');
              setDateFilter(format(new Date(), 'yyyy-MM-dd'));
            }}>
              <Filter className="mr-1 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Records */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              <span className="ml-2 text-gray-500">Loading attendance data...</span>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">No attendance records found for the selected filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Staff Name</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Role</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Check In</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Check Out</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Source</th>
                    <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{record.staff_name}</td>
                      <td className="py-3 px-4 text-sm capitalize">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          record.staff_role === 'trainer' ? 'bg-blue-100 text-blue-800' :
                          record.staff_role === 'manager' ? 'bg-purple-100 text-purple-800' :
                          record.staff_role === 'reception' ? 'bg-amber-100 text-amber-800' :
                          record.staff_role === 'sales' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {record.staff_role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {record.check_in_time ? (
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-green-600" />
                            <span>{record.check_in_time}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">Not checked in</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {record.check_out_time ? (
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-red-600" />
                            <span>{record.check_out_time}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">Not checked out</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm capitalize">{record.source}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          {!record.check_in_time ? (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-green-600 border-green-200 hover:bg-green-50"
                              onClick={() => handleCheckIn(record.staff_id)}
                              disabled={isUpdating === record.staff_id}
                            >
                              {isUpdating === record.staff_id ? (
                                <Loader2 className="h-3 w-3 animate-spin mr-1" />
                              ) : (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              )}
                              Check In
                            </Button>
                          ) : !record.check_out_time ? (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleCheckOut(record.staff_id)}
                              disabled={isUpdating === record.staff_id}
                            >
                              {isUpdating === record.staff_id ? (
                                <Loader2 className="h-3 w-3 animate-spin mr-1" />
                              ) : (
                                <XCircle className="h-3 w-3 mr-1" />
                              )}
                              Check Out
                            </Button>
                          ) : (
                            <span className="text-sm text-green-600 flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </span>
                          )}
                        </div>
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
