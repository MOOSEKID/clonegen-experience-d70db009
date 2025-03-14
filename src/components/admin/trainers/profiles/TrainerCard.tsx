
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pencil, Trash2, Phone, Mail, Award, Calendar, Clock } from 'lucide-react';
import { TrainerProfile } from '@/hooks/trainers/useTrainerProfiles';
import TrainerEditForm from './TrainerEditForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface TrainerCardProps {
  trainer: TrainerProfile;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, updates: Partial<Omit<TrainerProfile, 'id' | 'certifications' | 'availability'>>) => Promise<void>;
  onDeleteCertification: (id: string) => Promise<void>;
  onDeleteAvailability: (id: string) => Promise<void>;
}

const TrainerCard = ({
  trainer,
  onDelete,
  onUpdate,
  onDeleteCertification,
  onDeleteAvailability
}: TrainerCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const nameInitials = trainer.name
    .split(' ')
    .slice(0, 2)
    .map(n => n.charAt(0))
    .join('');

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader className="relative pb-2">
          <div className="flex items-start justify-between">
            <Avatar className="h-16 w-16 mb-2">
              {trainer.profile_picture ? (
                <AvatarImage src={trainer.profile_picture} alt={trainer.name} />
              ) : (
                <AvatarFallback className="bg-gym-orange text-white text-lg">
                  {nameInitials}
                </AvatarFallback>
              )}
            </Avatar>
            <Badge variant={trainer.status === 'Active' ? 'default' : 'destructive'}>
              {trainer.status || 'Active'}
            </Badge>
          </div>
          <CardTitle className="text-lg font-bold">{trainer.name}</CardTitle>
          <CardDescription className="flex flex-wrap gap-1 mt-1">
            {trainer.specialization?.map((spec, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100">
                {spec}
              </Badge>
            ))}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{trainer.email}</span>
              </div>
              {trainer.phone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{trainer.phone}</span>
                </div>
              )}
              {trainer.hire_date && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Hired: {new Date(trainer.hire_date).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {trainer.bio && (
              <div className="mt-3">
                <p className="text-sm text-gray-600">{trainer.bio}</p>
              </div>
            )}

            <Accordion type="single" collapsible className="w-full">
              {trainer.certifications && trainer.certifications.length > 0 && (
                <AccordionItem value="certifications">
                  <AccordionTrigger className="text-sm font-medium py-2">
                    Certifications ({trainer.certifications.length})
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {trainer.certifications.map((cert) => (
                        <div key={cert.id} className="bg-gray-50 p-2 rounded-md relative">
                          <div className="flex items-start">
                            <Award className="h-4 w-4 text-gym-orange mr-2 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{cert.certification_name}</p>
                              <p className="text-xs text-gray-500">{cert.issuing_organization}</p>
                              {cert.issue_date && (
                                <p className="text-xs text-gray-500">
                                  Issued: {new Date(cert.issue_date).toLocaleDateString()}
                                  {cert.expiry_date && ` | Expires: ${new Date(cert.expiry_date).toLocaleDateString()}`}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 absolute top-1 right-1"
                              onClick={() => onDeleteCertification(cert.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {trainer.availability && trainer.availability.length > 0 && (
                <AccordionItem value="availability">
                  <AccordionTrigger className="text-sm font-medium py-2">
                    Availability ({trainer.availability.length})
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {trainer.availability.map((avail) => (
                        <div key={avail.id} className="bg-gray-50 p-2 rounded-md relative">
                          <div className="flex items-start">
                            <Clock className="h-4 w-4 text-gym-orange mr-2 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{avail.day_of_week}</p>
                              <p className="text-xs text-gray-500">
                                {avail.start_time.substring(0, 5)} - {avail.end_time.substring(0, 5)}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 absolute top-1 right-1"
                              onClick={() => onDeleteAvailability(avail.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pt-2">
          <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setIsDeleteModalOpen(true)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </CardFooter>
      </Card>

      {/* Edit Trainer Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Trainer - {trainer.name}</DialogTitle>
          </DialogHeader>
          <TrainerEditForm 
            trainer={trainer} 
            onSave={async (updates) => {
              await onUpdate(trainer.id, updates);
              setIsEditModalOpen(false);
            }}
            onCancel={() => setIsEditModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {trainer.name}'s profile and all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                await onDelete(trainer.id);
                setIsDeleteModalOpen(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TrainerCard;
