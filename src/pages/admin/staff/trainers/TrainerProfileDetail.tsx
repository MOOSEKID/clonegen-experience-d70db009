
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { useTrainerProfiles } from '@/hooks/trainers/useTrainerProfiles';

const TrainerProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const { trainers, isLoading } = useTrainerProfiles();
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    if (!isLoading && trainers.length > 0) {
      const foundTrainer = trainers.find(t => t.id === id);
      if (foundTrainer) {
        setTrainer(foundTrainer);
      } else {
        toast({
          variant: "destructive",
          title: "Trainer not found",
          description: "Could not find the requested trainer profile."
        });
        navigate('/admin/staff/trainers/profiles');
      }
    }
  }, [id, trainers, isLoading, navigate, toast]);

  if (isLoading) {
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
          <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          <Button onClick={() => navigate(`/admin/staff/${trainer.id}/edit`)}>Edit Profile</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border">
              {trainer.photo_url ? (
                <img src={trainer.photo_url} alt={trainer.full_name} />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500 text-lg">
                  {trainer.full_name?.charAt(0)}
                </div>
              )}
            </Avatar>
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
                {/* Bio Section */}
                <div>
                  <h3 className="text-lg font-medium mb-2">About</h3>
                  <p className="text-gray-600">{trainer.bio || 'No biography provided'}</p>
                </div>

                {/* Specialties Section */}
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

                {/* Basic Info Section */}
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
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="certifications" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Certifications</h3>
                <Button size="sm" onClick={() => navigate(`/admin/staff/${trainer.id}/add-certification`)}>
                  Add Certification
                </Button>
              </div>
              
              {trainer.certifications?.length > 0 ? (
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
                          <Badge variant={cert.verified ? "default" : "outline"}>
                            {cert.verified ? "Verified" : "Unverified"}
                          </Badge>
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
                <Button size="sm" onClick={() => navigate(`/admin/staff/${trainer.id}/add-availability`)}>
                  Add Availability
                </Button>
              </div>
              
              {trainer.availability?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trainer.availability.map((avail) => (
                    <Card key={avail.id} className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{avail.day_of_week}</h4>
                            <p className="text-sm text-muted-foreground">
                              {avail.start_time} - {avail.end_time}
                            </p>
                          </div>
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
        </TabsContent>
        
        <TabsContent value="notes" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Admin Notes</h3>
                <Button size="sm" onClick={() => {}}>Add Note</Button>
              </div>
              
              <div className="text-center py-8 text-gray-500">
                <p>No notes have been added yet.</p>
                <p className="text-sm mt-2">Notes are only visible to administrators.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainerProfileDetail;
