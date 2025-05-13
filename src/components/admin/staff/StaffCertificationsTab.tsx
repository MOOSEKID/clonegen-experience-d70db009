
import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Award, Calendar, ExternalLink, Check, X, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useStaffOperations } from '@/hooks/staff/useStaffOperations';
import { StaffProfile, StaffCertification } from '@/hooks/trainers/types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import StaffCertificationForm from './forms/StaffCertificationForm';

interface StaffCertificationsTabProps {
  staffMember: StaffProfile;
}

const StaffCertificationsTab: React.FC<StaffCertificationsTabProps> = ({ staffMember }) => {
  const { addCertification, deleteCertification } = useStaffOperations();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDeleteCertification = async (certId: string) => {
    setIsDeleting(certId);
    try {
      await deleteCertification(certId);
    } catch (error) {
      console.error("Failed to delete certification:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleAddCertification = async (certification: Omit<StaffCertification, 'id'>) => {
    try {
      await addCertification(certification);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Failed to add certification:", error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Award className="h-5 w-5 mr-2" />
          Certifications
        </CardTitle>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          variant="outline"
          size="sm"
          className="flex items-center"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </CardHeader>
      <CardContent>
        {staffMember.certifications?.length ? (
          <div className="space-y-4">
            {staffMember.certifications.map((cert) => (
              <div key={cert.id} className="border rounded-md p-4 relative">
                <div className="absolute top-3 right-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full"
                    onClick={() => handleDeleteCertification(cert.id)}
                    disabled={isDeleting === cert.id}
                  >
                    {isDeleting === cert.id ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <Trash2 className="h-4 w-4 text-red-500" />
                    )}
                  </Button>
                </div>
                
                <h3 className="font-medium text-lg">{cert.certification_name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{cert.issuing_organization}</p>

                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">
                      {cert.issue_date ? format(new Date(cert.issue_date), 'MMM d, yyyy') : 'Not provided'}
                    </span>
                  </div>
                  
                  {cert.expiry_date && (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500">Expires:</span>
                      <span className="text-sm ml-1">
                        {format(new Date(cert.expiry_date), 'MMM d, yyyy')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <Badge variant={cert.verified ? "success" : "outline"}>
                    {cert.verified ? (
                      <><Check className="h-3 w-3 mr-1" /> Verified</>
                    ) : (
                      <><X className="h-3 w-3 mr-1" /> Not Verified</>
                    )}
                  </Badge>
                  
                  {cert.certification_file && (
                    <a 
                      href={cert.certification_file} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-600 hover:underline"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Certificate
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center gap-2">
            <Award className="h-10 w-10 text-muted-foreground/50" />
            <h3 className="font-medium text-muted-foreground">No Certifications</h3>
            <p className="text-sm text-muted-foreground/70">
              No certifications have been added yet for this staff member.
            </p>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              variant="outline"
              className="mt-2"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </div>
        )}
      </CardContent>

      {/* Add Certification Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Certification</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <StaffCertificationForm 
              staffId={staffMember.id}
              onSubmit={handleAddCertification}
            />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default StaffCertificationsTab;
