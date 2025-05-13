
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  ArrowLeft,
  Save,
  Trash2,
  Mail,
  Phone,
  Calendar as CalendarIcon,
  Award,
  Clock
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';

import { supabase } from '@/integrations/supabase/client';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { StaffProfile, StaffCertification, StaffAvailability } from '@/hooks/trainers/types';
import { convertTrainerCertToStaffCert, convertTrainerAvailabilityToStaffAvailability } from '@/hooks/trainers/adapters';

// Simplified calendar component for the trainer calendar tab
const TrainerCalendar = ({ events }: { events: any[] }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  return (
    <div className="p-4 border rounded-md">
      <h3 className="font-medium mb-2">Trainer Calendar</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <div className="flex-1">
          <p className="text-muted-foreground text-sm mb-4">
            {events && events.length > 0 ? 'Scheduled events:' : 'No events scheduled for selected date'}
          </p>
          {events && events.length > 0 && (
            <ul className="divide-y">
              {events.map((event, idx) => (
                <li key={idx} className="py-2">
                  {event.title} - {event.date}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const TrainerProfileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [trainer, setTrainer] = useState<StaffProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Fetch trainer details
  useEffect(() => {
    const fetchTrainer = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Fetch trainer basic info
        const { data: trainerData, error: trainerError } = await supabase
          .from('trainers')
          .select('*')
          .eq('id', id)
          .single();
          
        if (trainerError) throw trainerError;
        
        // Fetch certifications
        const { data: certifications, error: certError } = await supabase
          .from('trainer_certifications')
          .select('*')
          .eq('trainer_id', id);
          
        if (certError) throw certError;
        
        // Fetch availability
        const { data: availability, error: availError } = await supabase
          .from('trainer_availability')
          .select('*')
          .eq('trainer_id', id);
          
        if (availError) throw availError;

        // Map trainer data to StaffProfile format
        const staffProfile: StaffProfile = {
          id: trainerData.id,
          full_name: trainerData.name,
          email: trainerData.email,
          phone: trainerData.phone,
          role: 'trainer',
          photo_url: trainerData.profilepicture,
          status: trainerData.status,
          specialties: trainerData.specialization || [],
          bio: trainerData.bio,
          hire_date: trainerData.hiredate,
          // Safely handle potentially missing experience fields with defaults
          experience_years: typeof trainerData.experience_years === 'number' ? Number(trainerData.experience_years) : undefined,
          experience_level: trainerData.experience_level || undefined,
          // Convert certifications and availability to StaffProfile format
          certifications: certifications.map(cert => ({
            ...convertTrainerCertToStaffCert(cert),
            staff_id: cert.trainer_id
          })) as StaffCertification[],
          availability: availability.map(avail => ({
            ...convertTrainerAvailabilityToStaffAvailability(avail),
            staff_id: avail.trainer_id
          })) as StaffAvailability[]
        };
        
        setTrainer(staffProfile);
      } catch (err) {
        console.error('Error fetching trainer details:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch trainer details'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTrainer();
  }, [id]);

  const handleSave = async (updatedTrainer: Partial<StaffProfile>) => {
    if (!trainer) return;
    
    try {
      // Update the trainer in Supabase
      const { error } = await supabase
        .from('trainers')
        .update({
          name: updatedTrainer.full_name,
          email: updatedTrainer.email,
          phone: updatedTrainer.phone,
          bio: updatedTrainer.bio,
          profilepicture: updatedTrainer.photo_url,
          specialization: updatedTrainer.specialties,
          status: updatedTrainer.status,
          experience_years: updatedTrainer.experience_years,
          experience_level: updatedTrainer.experience_level
        })
        .eq('id', trainer.id);
        
      if (error) throw error;
      
      // Update local state
      setTrainer(prev => prev ? { ...prev, ...updatedTrainer } : null);
      setIsEditing(false);
      
      toast({
        title: "Success",
        description: "Trainer profile updated successfully."
      });
    } catch (err) {
      console.error('Error updating trainer:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update trainer. Please try again."
      });
    }
  };

  const handleDelete = async () => {
    if (!trainer) return;
    
    try {
      const { error } = await supabase
        .from('trainers')
        .delete()
        .eq('id', trainer.id);
        
      if (error) throw error;
      
      toast({
        title: "Trainer deleted",
        description: "Trainer has been removed successfully."
      });
      
      navigate('/admin/staff/trainers/profiles');
    } catch (err) {
      console.error('Error deleting trainer:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete trainer. Please try again."
      });
    }
  };

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
        <h3 className="text-lg font-medium">Error loading trainer data</h3>
        <p>{error.message}</p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={() => navigate('/admin/staff/trainers/profiles')}
        >
          Back to Trainers
        </Button>
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="p-4 bg-amber-50 text-amber-600 rounded-md">
        <h3 className="text-lg font-medium">Trainer not found</h3>
        <p>The requested trainer could not be found.</p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={() => navigate('/admin/staff/trainers/profiles')}
        >
          Back to Trainers
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/admin/staff/trainers/profiles')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Trainers
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{trainer.full_name}</h1>
            <p className="text-gray-500">Trainer • {trainer.status}</p>
          </div>
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button
            onClick={() => navigate(`/admin/staff/trainers/${trainer.id}/calendar`)}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
        </div>
      </div>

      {/* Trainer Info Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">{trainer.email || "Not provided"}</CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              Phone
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">{trainer.phone || "Not provided"}</CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Hire Date
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {trainer.hire_date 
              ? format(new Date(trainer.hire_date), 'MMM d, yyyy')
              : "Not provided"}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Award className="h-4 w-4 mr-2" />
              Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {trainer.experience_years ? `${trainer.experience_years} years` : "Not specified"} 
            {trainer.experience_level && ` • ${trainer.experience_level}`}
          </CardContent>
        </Card>
      </div>

      {/* Profile Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Trainer Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {trainer.bio && (
                <div>
                  <h3 className="text-sm font-medium mb-1">Biography</h3>
                  <p className="text-gray-600">{trainer.bio}</p>
                </div>
              )}
              
              {trainer.specialties && trainer.specialties.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-1">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {trainer.specialties.map((specialty, i) => (
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
        
        <TabsContent value="certifications" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Certifications</CardTitle>
              <Button variant="outline" size="sm">Add Certification</Button>
            </CardHeader>
            <CardContent>
              {trainer.certifications && trainer.certifications.length > 0 ? (
                <div className="divide-y">
                  {trainer.certifications.map((cert, idx) => (
                    <div key={idx} className="py-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{cert.certification_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {cert.issuing_organization || 'No issuing organization'} •
                          {cert.issue_date && ` Issued: ${format(new Date(cert.issue_date), 'MMM d, yyyy')}`}
                          {cert.expiry_date && ` • Expires: ${format(new Date(cert.expiry_date), 'MMM d, yyyy')}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${cert.verified ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                          {cert.verified ? 'Verified' : 'Unverified'}
                        </span>
                        {cert.certification_file && (
                          <Button variant="ghost" size="sm">View</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">No certifications found</p>
                  <Button variant="outline" size="sm" className="mt-2">Add First Certification</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="availability" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Weekly Availability</CardTitle>
              <Button variant="outline" size="sm">Add Time Slot</Button>
            </CardHeader>
            <CardContent>
              {trainer.availability && trainer.availability.length > 0 ? (
                <div className="divide-y">
                  {trainer.availability.map((slot, idx) => (
                    <div key={idx} className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium capitalize">{slot.day_of_week}</span>
                      </div>
                      <div>
                        {slot.start_time} - {slot.end_time}
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">No availability slots defined</p>
                  <Button variant="outline" size="sm" className="mt-2">Set Availability</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Trainer Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <TrainerCalendar events={[]} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Trainer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {trainer.full_name}? This action cannot be undone.
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

export default TrainerProfileDetail;
