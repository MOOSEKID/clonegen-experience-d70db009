
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  Mail,
  Phone,
  Calendar,
  Award,
  Clock,
  Users
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';

import { useStaffData } from '@/hooks/staff/useStaffData';
import { useStaffOperations } from '@/hooks/staff/useStaffOperations';
import StaffProfileForm from '@/components/admin/staff/StaffProfileForm';
import StaffCertificationsTab from '@/components/admin/staff/StaffCertificationsTab';
import StaffAvailabilityTab from '@/components/admin/staff/StaffAvailabilityTab';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { StaffProfile } from '@/hooks/trainers/types';

const StaffProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { staff, isLoading, error } = useStaffData();
  const { updateStaffMember, deleteStaffMember } = useStaffOperations();
  const [staffMember, setStaffMember] = useState<StaffProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Find the staff member with the matching id
  useEffect(() => {
    if (!isLoading && id) {
      const foundStaff = staff.find(s => s.id === id);
      if (foundStaff) {
        setStaffMember(foundStaff);
      } else {
        toast({
          variant: 'destructive',
          title: 'Staff not found',
          description: 'The requested staff member could not be found.',
        });
        navigate('/admin/staff');
      }
    }
  }, [id, staff, isLoading, navigate, toast]);

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

  if (!staffMember) {
    return (
      <div className="p-4 bg-amber-50 text-amber-600 rounded-md">
        <h3 className="text-lg font-medium">Staff not found</h3>
        <p>The requested staff member could not be found.</p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={() => navigate('/admin/staff')}
        >
          Back to Staff
        </Button>
      </div>
    );
  }

  const handleSave = async (updatedStaff: Partial<StaffProfile>) => {
    try {
      setIsSaving(true);
      await updateStaffMember(staffMember.id, updatedStaff);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Staff profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating staff:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update staff profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteStaffMember(staffMember.id);
      toast({
        title: "Staff deleted",
        description: `${staffMember.full_name} has been deleted successfully.`,
      });
      navigate('/admin/staff');
    } catch (error) {
      console.error("Error deleting staff:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete staff member. Please try again.",
      });
    }
  };

  const getRoleLabel = (role: string): string => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Header with breadcrumb */}
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
            <h1 className="text-2xl font-bold text-gray-800">{staffMember.full_name}</h1>
            <p className="text-gray-500">{getRoleLabel(staffMember.role)} • {staffMember.status}</p>
          </div>
        </div>

        <div className="space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={() => document.getElementById('staff-form')?.dispatchEvent(new Event('submit', { bubbles: true }))}
                disabled={isSaving}
                className="flex items-center"
              >
                {isSaving ? <LoadingSpinner size="sm" className="mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Button
                onClick={() => setIsEditing(true)}
              >
                <Save className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Overview Cards */}
      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">{staffMember.email || "Not provided"}</CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Phone
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">{staffMember.phone || "Not provided"}</CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Hire Date
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {staffMember.hire_date 
                ? format(new Date(staffMember.hire_date), 'MMM d, yyyy')
                : "Not provided"}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Access Level
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {staffMember.access_level?.charAt(0).toUpperCase() + staffMember.access_level?.slice(1)}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Form or Tabs */}
      {isEditing ? (
        <Card>
          <CardContent className="p-6">
            <StaffProfileForm 
              staffMember={staffMember} 
              onSubmit={handleSave} 
            />
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-3 w-[400px]">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            {staffMember.role === 'trainer' && (
              <>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </>
            )}
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Staff Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {staffMember.bio && (
                  <div>
                    <h3 className="text-sm font-medium mb-1">Biography</h3>
                    <p className="text-gray-600">{staffMember.bio}</p>
                  </div>
                )}
                
                {staffMember.specialties && staffMember.specialties.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-1">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {staffMember.specialties.map((specialty, i) => (
                        <div 
                          key={i}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {staffMember.role === 'trainer' && (
            <>
              <TabsContent value="certifications" className="mt-6">
                <StaffCertificationsTab staffMember={staffMember} />
              </TabsContent>
              
              <TabsContent value="availability" className="mt-6">
                <StaffAvailabilityTab staffMember={staffMember} />
              </TabsContent>
            </>
          )}
        </Tabs>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Staff Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {staffMember.full_name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StaffProfilePage;
