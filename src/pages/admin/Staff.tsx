
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserCheck, UserPlus, Settings, ClipboardList } from 'lucide-react';
import { Card } from '@/components/ui/card';
import StaffGrid from '@/components/admin/staff/StaffGrid';
import StaffRoleManagement from '@/components/admin/staff/StaffRoleManagement';
import StaffFunctionCard from '@/components/admin/staff/cards/StaffFunctionCard';
import AdminBreadcrumb from '@/components/admin/common/AdminBreadcrumb';
import { useStaffData } from '@/hooks/staff/useStaffData';

const Staff = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { staff, isLoading } = useStaffData();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <AdminBreadcrumb items={[{ label: 'Staff Management' }]} />
        <h2 className="text-3xl font-bold tracking-tight">Staff Management</h2>
        <p className="text-muted-foreground mt-2">
          Manage staff members, roles, permissions, and attendance across your organization.
        </p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto bg-muted/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-background py-3">
            <Users className="h-4 w-4 mr-2" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="data-[state=active]:bg-background py-3">
            <Settings className="h-4 w-4 mr-2" />
            <span>Roles</span>
          </TabsTrigger>
          <TabsTrigger value="trainers" className="data-[state=active]:bg-background py-3">
            <UserCheck className="h-4 w-4 mr-2" />
            <span>Trainers</span>
          </TabsTrigger>
          <TabsTrigger value="attendance" className="data-[state=active]:bg-background py-3">
            <ClipboardList className="h-4 w-4 mr-2" />
            <span>Attendance</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StaffFunctionCard 
              title="Staff Profiles" 
              subtitle="Manage staff member details and information" 
              link="#"
              icon={<Users className="h-5 w-5" />}
              implemented={true}
            />
            <StaffFunctionCard 
              title="Trainer Profiles" 
              subtitle="Manage trainer specialties, certifications, and availability"
              link="/admin/staff/trainers/profiles"
              icon={<UserCheck className="h-5 w-5" />}
              implemented={true}
            />
            <StaffFunctionCard 
              title="Staff Attendance" 
              subtitle="Track staff attendance, schedules, and time-off"
              link="/admin/staff/attendance"
              icon={<ClipboardList className="h-5 w-5" />}
              implemented={true}
            />
            <StaffFunctionCard 
              title="Add New Staff" 
              subtitle="Create profile for new staff member"
              link="#" 
              icon={<UserPlus className="h-5 w-5" />}
              implemented={false}
            />
          </div>
          
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Current Staff</h3>
              <StaffGrid staff={staff} />
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="roles">
          <StaffRoleManagement />
        </TabsContent>
        
        <TabsContent value="trainers">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">Trainers</h3>
                <p className="text-muted-foreground">Manage trainer profiles and certifications</p>
              </div>
              <StaffFunctionCard 
                title="Trainer Profiles" 
                subtitle="Detailed trainer management"
                link="/admin/staff/trainers/profiles"
                icon={<UserCheck className="h-5 w-5" />}
                implemented={true}
              />
            </div>
            
            <Card>
              <div className="p-6">
                {isLoading ? (
                  <p>Loading trainer data...</p>
                ) : (
                  <StaffGrid 
                    staff={staff.filter(member => member.role === 'trainer')} 
                  />
                )}
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="attendance">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">Staff Attendance</h3>
                <p className="text-muted-foreground">Track staff attendance, schedules, and time-off</p>
              </div>
              <StaffFunctionCard 
                title="Staff Attendance" 
                subtitle="Detailed attendance management"
                link="/admin/staff/attendance"
                icon={<ClipboardList className="h-5 w-5" />}
                implemented={true}
              />
            </div>
            
            <Card>
              <div className="p-6">
                <p className="text-center py-8 text-muted-foreground">
                  Navigate to Staff Attendance section for detailed attendance tracking.
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Staff;
