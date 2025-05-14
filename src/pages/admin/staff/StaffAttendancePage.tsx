
import React from 'react';
import StaffAttendance from '@/components/admin/staff/StaffAttendance';
import AdminBreadcrumb from '@/components/admin/common/AdminBreadcrumb';

const StaffAttendancePage = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <AdminBreadcrumb 
        items={[
          { label: 'Staff', href: '/admin/staff' },
          { label: 'Attendance' }
        ]} 
      />
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Staff Attendance</h2>
        <p className="text-muted-foreground mt-2">
          Track and manage attendance records for all staff members.
        </p>
      </div>
      <StaffAttendance />
    </div>
  );
};

export default StaffAttendancePage;
