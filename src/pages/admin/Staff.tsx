
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Users, Briefcase, DollarSign, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStaffData } from '@/hooks/staff/useStaffData';
import StaffGrid from '@/components/admin/staff/StaffGrid';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const StaffPage = () => {
  const navigate = useNavigate();
  const { staff, isLoading, error, getStaffByRole } = useStaffData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        <h3 className="text-lg font-medium">Error loading staff data</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
          <p className="text-gray-500">Manage all gym staff members and their roles</p>
        </div>
        <Button 
          onClick={() => navigate('/admin/staff/add')}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Staff Member
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all">All Staff ({staff.length})</TabsTrigger>
          <TabsTrigger value="managers">Managers ({getStaffByRole('manager').length})</TabsTrigger>
          <TabsTrigger value="trainers">Trainers ({getStaffByRole('trainer').length})</TabsTrigger>
          <TabsTrigger value="reception">Reception & Sales ({getStaffByRole('reception').length + getStaffByRole('sales').length})</TabsTrigger>
          <TabsTrigger value="support">Support Staff ({getStaffByRole('support').length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <StaffGrid staff={staff} />
        </TabsContent>
        
        <TabsContent value="managers">
          <div className="flex items-start mb-4">
            <Briefcase className="h-5 w-5 text-blue-600 mr-2 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Managers</h2>
              <p className="text-sm text-gray-500">Branch leads, admin staff, and management team</p>
            </div>
          </div>
          <StaffGrid staff={getStaffByRole('manager')} />
        </TabsContent>
        
        <TabsContent value="trainers">
          <div className="flex items-start mb-4">
            <Users className="h-5 w-5 text-green-600 mr-2 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Trainers</h2>
              <p className="text-sm text-gray-500">Fitness professionals and class instructors</p>
            </div>
          </div>
          <StaffGrid staff={getStaffByRole('trainer')} />
        </TabsContent>
        
        <TabsContent value="reception">
          <div className="flex items-start mb-4">
            <DollarSign className="h-5 w-5 text-amber-600 mr-2 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Reception & Sales</h2>
              <p className="text-sm text-gray-500">Front desk staff and membership consultants</p>
            </div>
          </div>
          <StaffGrid staff={[...getStaffByRole('reception'), ...getStaffByRole('sales')]} />
        </TabsContent>
        
        <TabsContent value="support">
          <div className="flex items-start mb-4">
            <Smile className="h-5 w-5 text-purple-600 mr-2 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Support Staff</h2>
              <p className="text-sm text-gray-500">Maintenance, security, and other support personnel</p>
            </div>
          </div>
          <StaffGrid staff={getStaffByRole('support')} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffPage;
