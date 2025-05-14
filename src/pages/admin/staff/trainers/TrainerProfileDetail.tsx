
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trash2, Mail, Phone, Calendar as CalendarIcon, Award, Clock } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/button';
import AdminBreadcrumb from '@/components/admin/common/AdminBreadcrumb';

// Import our components
import ProfileHeader from './components/ProfileHeader';
import InfoCards from './components/InfoCards';
import ProfileTab from './components/ProfileTab';
import CertificationsTab from './components/CertificationsTab';
import AvailabilityTab from './components/AvailabilityTab';
import CalendarTab from './components/CalendarTab';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';
import { useTrainerDetail } from './hooks/useTrainerDetail';

const TrainerProfileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    trainer, 
    isLoading, 
    error, 
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDelete 
  } = useTrainerDetail(id);

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
    <div className="space-y-6 animate-fade-in">
      {/* Header with breadcrumb */}
      <div>
        <AdminBreadcrumb 
          items={[
            { label: 'Staff', href: '/admin/staff' },
            { label: 'Trainers', href: '/admin/staff/trainers/profiles' },
            { label: trainer.full_name || 'Trainer Profile' }
          ]} 
        />
      </div>

      <ProfileHeader 
        trainer={trainer} 
        onDelete={() => setIsDeleteDialogOpen(true)} 
      />

      {/* Trainer Info Overview */}
      <InfoCards trainer={trainer} />

      {/* Profile Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="profile" className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="certifications" className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            Certifications
          </TabsTrigger>
          <TabsTrigger value="availability" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Availability
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            Calendar
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <ProfileTab trainer={trainer} />
        </TabsContent>
        
        <TabsContent value="certifications" className="mt-6">
          <CertificationsTab 
            trainer={trainer} 
            onAddCertification={() => {}} 
          />
        </TabsContent>
        
        <TabsContent value="availability" className="mt-6">
          <AvailabilityTab 
            trainer={trainer} 
            onAddAvailability={() => {}} 
          />
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-6">
          <CalendarTab events={[]} />
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        trainerName={trainer.full_name}
      />
    </div>
  );
};

export default TrainerProfileDetail;
