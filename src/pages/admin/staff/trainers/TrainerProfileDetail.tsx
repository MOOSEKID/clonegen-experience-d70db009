
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Pencil, Trash2, Plus, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { StaffProfile } from '@/hooks/trainers/types';
import { useTrainerFileUpload } from '@/hooks/trainers/useTrainerFileUpload';
import TrainerCertificationForm from '@/components/admin/trainers/profiles/TrainerCertificationForm';
import TrainerAvailabilityForm from '@/components/admin/trainers/profiles/TrainerAvailabilityForm';

const TrainerProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [trainer, setTrainer] = useState<StaffProfile | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableTrainer, setEditableTrainer] = useState<Partial<StaffProfile>>({});
  const [newSpecialty, setNewSpecialty] = useState('');
  const { uploadFile, isUploading } = useTrainerFileUpload();

  // Dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCertificateDialogOpen, setIsCertificateDialogOpen] = useState(false);
  const [isAvailabilityDialogOpen, setIsAvailabilityDialogOpen] = useState(false);
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Fetch trainer data
  useEffect(() => {
    const fetchTrainerData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('trainers')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          // Fetch certifications
          const { data: certData, error: certError } = await supabase
            .from('trainer_certifications')
            .select('*')
            .eq('trainer_id', id);
            
          if (certError) throw certError;
          
          // Fetch availability
          const { data: availData, error: availError } = await supabase
            .from('trainer_availability')
            .select('*')
            .eq('trainer_id', id);
            
          if (availError) throw availError;
          
          // Transform to StaffProfile type
          const transformedTrainer: StaffProfile = {
            id: data.id,
            full_name: data.name,
            email: data.email,
            phone: data.phone,
            role: 'trainer',
            photo_url: data.profilepicture,
            status: data.status,
            specialties: data.specialization || [],
            bio: data.bio,
            hire_date: data.hiredate,
            experience_years: data.experience_years,
            experience_level: data.experience_level,
            certifications: certData || [],
            availability: availData || []
          };
          
          setTrainer(transformedTrainer);
          setEditableTrainer({ ...transformedTrainer });
        }
      } catch (error) {
        console.error('Error fetching trainer data:', error);
        toast({
          variant: "destructive",
          title: "Failed to load trainer profile",
          description: "Please try again or contact support."
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrainerData();
  }, [id, toast]);

  // Update trainer details
  const handleSaveProfile = async () => {
    if (!trainer || !editableTrainer) return;
    
    try {
      // Transform back to database structure
      const updates = {
        name: editableTrainer.full_name,
        email: editableTrainer.email,
        phone: editableTrainer.phone,
        bio: editableTrainer.bio,
        status: editableTrainer.status,
        specialization: editableTrainer.specialties,
        experience_years: editableTrainer.experience_years,
        experience_level: editableTrainer.experience_level,
        hiredate: editableTrainer.hire_date
      };
      
      const { error } = await supabase
        .from('trainers')
        .update(updates)
        .eq('id', trainer.id);
        
      if (error) throw error;
      
      setTrainer({
        ...trainer,
        ...editableTrainer
      });
      setIsEditMode(false);
      
      toast({
        title: "Profile updated",
        description: "Trainer profile has been updated successfully."
      });
    } catch (error) {
      console.error('Error updating trainer:', error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "There was an error updating the trainer profile."
      });
    }
  };

  // Delete trainer
  const handleDeleteTrainer = async () => {
    if (!trainer) return;
    
    try {
      const { error } = await supabase
        .from('trainers')
        .delete()
        .eq('id', trainer.id);
        
      if (error) throw error;
      
      toast({
        title: "Trainer deleted",
        description: "Trainer has been deleted successfully."
      });
      
      navigate('/admin/staff/trainers/profiles');
    } catch (error) {
      console.error('Error deleting trainer:', error);
      toast({
        variant: "destructive",
        title: "Deletion failed",
        description: "There was an error deleting the trainer."
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  // Add specialty
  const handleAddSpecialty = () => {
    if (!newSpecialty.trim() || !editableTrainer) return;
    
    const currentSpecialties = editableTrainer.specialties || [];
    if (currentSpecialties.includes(newSpecialty)) {
      toast({
        variant: "destructive",
        title: "Duplicate specialty",
        description: "This specialty already exists."
      });
      return;
    }
    
    setEditableTrainer({
      ...editableTrainer,
      specialties: [...currentSpecialties, newSpecialty]
    });
    setNewSpecialty('');
  };

  // Remove specialty
  const handleRemoveSpecialty = (specialty: string) => {
    if (!editableTrainer || !editableTrainer.specialties) return;
    
    setEditableTrainer({
      ...editableTrainer,
      specialties: editableTrainer.specialties.filter(s => s !== specialty)
    });
  };

  // Add certification
  const handleAddCertification = async (data: any) => {
    if (!trainer) return;
    
    try {
      const { error } = await supabase
        .from('trainer_certifications')
        .insert({
          trainer_id: trainer.id,
          certification_name: data.certification_name,
          issuing_organization: data.issuing_organization,
          issue_date: data.issue_date || null,
          expiry_date: data.expiry_date || null,
        });
        
      if (error) throw error;
      
      // Refresh certifications
      const { data: certData, error: certError } = await supabase
        .from('trainer_certifications')
        .select('*')
        .eq('trainer_id', trainer.id);
        
      if (certError) throw certError;
      
      setTrainer({
        ...trainer,
        certifications: certData || []
      });
      
      setIsCertificateDialogOpen(false);
      toast({
        title: "Certification added",
        description: "The certification has been added successfully."
      });
    } catch (error) {
      console.error('Error adding certification:', error);
      toast({
        variant: "destructive",
        title: "Failed to add certification",
        description: "There was an error adding the certification."
      });
    }
  };

  // Delete certification
  const handleDeleteCertification = async (certId: string) => {
    if (!trainer) return;
    
    try {
      const { error } = await supabase
        .from('trainer_certifications')
        .delete()
        .eq('id', certId);
        
      if (error) throw error;
      
      // Update local state
      setTrainer({
        ...trainer,
        certifications: trainer.certifications?.filter(cert => cert.id !== certId) || []
      });
      
      toast({
        title: "Certification removed",
        description: "The certification has been removed successfully."
      });
    } catch (error) {
      console.error('Error deleting certification:', error);
      toast({
        variant: "destructive",
        title: "Failed to delete certification",
        description: "There was an error removing the certification."
      });
    }
  };

  // Add availability
  const handleAddAvailability = async (data: any) => {
    if (!trainer) return;
    
    try {
      const { error } = await supabase
        .from('trainer_availability')
        .insert({
          trainer_id: trainer.id,
          day_of_week: data.day_of_week,
          start_time: data.start_time,
          end_time: data.end_time
        });
        
      if (error) throw error;
      
      // Refresh availability
      const { data: availData, error: availError } = await supabase
        .from('trainer_availability')
        .select('*')
        .eq('trainer_id', trainer.id);
        
      if (availError) throw availError;
      
      setTrainer({
        ...trainer,
        availability: availData || []
      });
      
      setIsAvailabilityDialogOpen(false);
      toast({
        title: "Availability added",
        description: "The availability has been added successfully."
      });
    } catch (error) {
      console.error('Error adding availability:', error);
      toast({
        variant: "destructive",
        title: "Failed to add availability",
        description: "There was an error adding the availability."
      });
    }
  };

  // Delete availability
  const handleDeleteAvailability = async (availId: string) => {
    if (!trainer) return;
    
    try {
      const { error } = await supabase
        .from('trainer_availability')
        .delete()
        .eq('id', availId);
        
      if (error) throw error;
      
      // Update local state
      setTrainer({
        ...trainer,
        availability: trainer.availability?.filter(avail => avail.id !== availId) || []
      });
      
      toast({
        title: "Availability removed",
        description: "The availability has been removed successfully."
      });
    } catch (error) {
      console.error('Error deleting availability:', error);
      toast({
        variant: "destructive",
        title: "Failed to delete availability",
        description: "There was an error removing the availability."
      });
    }
  };

  // Update profile photo
  const handleProfilePhotoUpload = async () => {
    if (!trainer || !selectedFile) return;
    
    try {
      const photoUrl = await uploadFile(selectedFile, trainer.id, 'profile_picture');
      if (!photoUrl) throw new Error('Failed to upload photo');
      
      const { error } = await supabase
        .from('trainers')
        .update({ profilepicture: photoUrl })
        .eq('id', trainer.id);
        
      if (error) throw error;
      
      setTrainer({
        ...trainer,
        photo_url: photoUrl
      });
      
      setEditableTrainer({
        ...editableTrainer,
        photo_url: photoUrl
      });
      
      setIsPhotoDialogOpen(false);
      setSelectedFile(null);
      
      toast({
        title: "Photo updated",
        description: "Profile photo has been updated successfully."
      });
    } catch (error) {
      console.error('Error updating profile photo:', error);
      toast({
        variant: "destructive",
        title: "Failed to update photo",
        description: "There was an error updating the profile photo."
      });
    }
  };

  // Toggle certification verification
  const handleToggleCertificationVerified = async (certId: string, isVerified: boolean) => {
    if (!trainer) return;
    
    try {
      const { error } = await supabase
        .from('trainer_certifications')
        .update({ verified: !isVerified })
        .eq('id', certId);
        
      if (error) throw error;
      
      // Update local state
      setTrainer({
        ...trainer,
        certifications: trainer.certifications?.map(cert => 
          cert.id === certId ? { ...cert, verified: !isVerified } : cert
        ) || []
      });
      
      toast({
        title: isVerified ? "Certification unverified" : "Certification verified",
        description: `The certification has been ${isVerified ? 'unverified' : 'verified'} successfully.`
      });
    } catch (error) {
      console.error('Error updating certification verification:', error);
      toast({
        variant: "destructive",
        title: "Failed to update certification",
        description: "There was an error updating the certification verification status."
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-6 w-1" />
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!trainer) return null;

  // Format day of week for display
  const formatDayOfWeek = (day: string) => {
    const days: Record<string, string> = {
      'monday': 'Monday',
      'tuesday': 'Tuesday',
      'wednesday': 'Wednesday',
      'thursday': 'Thursday',
      'friday': 'Friday',
      'saturday': 'Saturday',
      'sunday': 'Sunday'
    };
    return days[day.toLowerCase()] || day;
  };

  // Format time for display
  const formatTime = (time: string) => {
    if (!time) return '';
    
    try {
      // Handle different time formats
      let formattedTime = time;
      
      // If time is in 24-hour format (HH:MM), convert to 12-hour format
      if (/^\d{2}:\d{2}$/.test(time)) {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        formattedTime = `${hour12}:${minutes} ${ampm}`;
      }
      
      return formattedTime;
    } catch (error) {
      console.error('Error formatting time:', error);
      return time;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/admin/staff/trainers/profiles')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Trainer Profiles
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{trainer.full_name}</h1>
            <p className="text-gray-500">Trainer Profile Details</p>
          </div>
        </div>
        <div className="flex space-x-2">
          {isEditMode ? (
            <>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditMode(false);
                  setEditableTrainer({...trainer});
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveProfile}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Button onClick={() => setIsEditMode(true)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-16 w-16 border">
                {trainer.photo_url ? (
                  <img src={trainer.photo_url} alt={trainer.full_name} />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500 text-lg">
                    {trainer.full_name?.charAt(0)}
                  </div>
                )}
              </Avatar>
              {isEditMode && (
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white shadow-md hover:bg-gray-100"
                  onClick={() => setIsPhotoDialogOpen(true)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{trainer.full_name}</h2>
              <div className="flex flex-wrap gap-2 mt-1">
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  Trainer
                </Badge>
                <Badge variant="outline" className={trainer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {trainer.status || 'Unknown'}
                </Badge>
              </div>
              <div className="flex flex-col mt-2 text-sm">
                <span>{trainer.email}</span>
                <span>{trainer.phone}</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {isEditMode ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input 
                          id="full_name" 
                          value={editableTrainer.full_name || ''} 
                          onChange={(e) => setEditableTrainer({...editableTrainer, full_name: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={editableTrainer.email || ''} 
                          onChange={(e) => setEditableTrainer({...editableTrainer, email: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          value={editableTrainer.phone || ''} 
                          onChange={(e) => setEditableTrainer({...editableTrainer, phone: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select 
                          value={editableTrainer.status || 'Active'}
                          onValueChange={(value) => setEditableTrainer({...editableTrainer, status: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="On Leave">On Leave</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="experience_level">Experience Level</Label>
                        <Select 
                          value={editableTrainer.experience_level || 'Beginner'}
                          onValueChange={(value) => setEditableTrainer({...editableTrainer, experience_level: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Expert">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="experience_years">Years of Experience</Label>
                        <Input 
                          id="experience_years" 
                          type="number"
                          min="0"
                          value={editableTrainer.experience_years || 0} 
                          onChange={(e) => setEditableTrainer({...editableTrainer, experience_years: parseInt(e.target.value)})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="hire_date">Hire Date</Label>
                        <Input 
                          id="hire_date" 
                          type="date"
                          value={editableTrainer.hire_date || ''} 
                          onChange={(e) => setEditableTrainer({...editableTrainer, hire_date: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biography</Label>
                      <Textarea 
                        id="bio" 
                        rows={5}
                        value={editableTrainer.bio || ''} 
                        onChange={(e) => setEditableTrainer({...editableTrainer, bio: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Specialties</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {editableTrainer.specialties?.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="px-2 py-1">
                            {specialty}
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => handleRemoveSpecialty(specialty)}
                              className="ml-1 p-0 h-4 w-4"
                            >
                              <XCircle className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Input
                          value={newSpecialty}
                          onChange={(e) => setNewSpecialty(e.target.value)}
                          placeholder="Add a specialty"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={handleAddSpecialty}
                          size="sm"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="text-lg font-medium mb-2">About</h3>
                      <p className="text-gray-600">{trainer.bio || 'No biography provided'}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Specialties</h3>
                      <div className="flex flex-wrap gap-2">
                        {trainer.specialties?.length > 0 ? (
                          trainer.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary">
                              {specialty}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-gray-500">No specialties listed</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Employment Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Hire Date</p>
                          <p>{trainer.hire_date || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <p>{trainer.status || 'Unknown'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Experience</p>
                          <p>{trainer.experience_years ? `${trainer.experience_years} years` : 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Experience Level</p>
                          <p>{trainer.experience_level || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p>{trainer.email || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p>{trainer.phone || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="certifications" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Certifications</h3>
                <Button size="sm" onClick={() => setIsCertificateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Certification
                </Button>
              </div>
              
              {trainer.certifications && trainer.certifications.length > 0 ? (
                <div className="space-y-4">
                  {trainer.certifications.map((cert) => (
                    <Card key={cert.id} className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{cert.certification_name}</h4>
                            <p className="text-sm text-muted-foreground">{cert.issuing_organization}</p>
                            <div className="flex gap-x-4 mt-1 text-xs">
                              <span>Issued: {cert.issue_date ? new Date(cert.issue_date).toLocaleDateString() : 'N/A'}</span>
                              <span>Expires: {cert.expiry_date ? new Date(cert.expiry_date).toLocaleDateString() : 'N/A'}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <Badge 
                              variant={cert.verified ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => handleToggleCertificationVerified(cert.id, !!cert.verified)}
                            >
                              {cert.verified ? (
                                <><CheckCircle className="h-3 w-3 mr-1" /> Verified</>
                              ) : (
                                "Unverified"
                              )}
                            </Badge>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => handleDeleteCertification(cert.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No certifications have been added yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Weekly Availability</h3>
                <Button size="sm" onClick={() => setIsAvailabilityDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Availability
                </Button>
              </div>
              
              {trainer.availability && trainer.availability.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trainer.availability.map((avail) => (
                    <Card key={avail.id} className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{formatDayOfWeek(avail.day_of_week)}</h4>
                            <p className="text-sm text-muted-foreground">
                              {formatTime(avail.start_time)} - {formatTime(avail.end_time)}
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleDeleteAvailability(avail.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No availability has been set yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>
                View and manage this trainer's schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                onClick={() => navigate(`/admin/staff/trainers/${trainer.id}/calendar`)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Open Calendar View
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Admin Notes</h3>
                <Button size="sm" onClick={() => {}}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Note
                </Button>
              </div>
              
              <div className="text-center py-8 text-gray-500">
                <p>No notes have been added yet.</p>
                <p className="text-sm mt-2">Notes are only visible to administrators.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Trainer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {trainer.full_name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteTrainer}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Certificate Dialog */}
      <Dialog open={isCertificateDialogOpen} onOpenChange={setIsCertificateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Certification</DialogTitle>
          </DialogHeader>
          <TrainerCertificationForm 
            trainerId={trainer.id}
            onSubmit={handleAddCertification}
            onCancel={() => setIsCertificateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Availability Dialog */}
      <Dialog open={isAvailabilityDialogOpen} onOpenChange={setIsAvailabilityDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Availability</DialogTitle>
          </DialogHeader>
          <TrainerAvailabilityForm 
            trainerId={trainer.id}
            onSubmit={handleAddAvailability}
            onCancel={() => setIsAvailabilityDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Profile Photo Dialog */}
      <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile Photo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="profile-photo">Select a new profile photo</Label>
            <Input 
              id="profile-photo" 
              type="file" 
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
            />
            {selectedFile && (
              <div className="text-sm">Selected: {selectedFile.name}</div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsPhotoDialogOpen(false);
              setSelectedFile(null);
            }}>
              Cancel
            </Button>
            <Button 
              onClick={handleProfilePhotoUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Photo'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainerProfileDetail;
