
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useStaffOperations } from '@/hooks/staff/useStaffOperations';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useToast } from '@/components/ui/use-toast';
import AddStaffForm from '@/components/admin/staff/forms/AddStaffForm';
import { StaffProfile } from '@/hooks/trainers/types';

const AddStaffPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addStaffMember } = useStaffOperations();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Omit<StaffProfile, 'id' | 'certifications' | 'availability'>) => {
    setIsSubmitting(true);
    try {
      const result = await addStaffMember(data);
      toast({
        title: "Success",
        description: `${data.full_name} has been added to the staff.`,
      });
      navigate(`/admin/staff/${result.id}`);
    } catch (error) {
      console.error("Error adding staff member:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add staff member. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-800">Add New Staff Member</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Details</CardTitle>
        </CardHeader>
        <CardContent>
          {isSubmitting ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" text="Adding staff member..." />
            </div>
          ) : (
            <AddStaffForm onSubmit={handleSubmit} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddStaffPage;
