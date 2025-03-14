
import React, { useState } from 'react';
import { Award, UserCheck, Star, Plus, Search, MoreVertical, Trash2, Edit, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useSupabaseTrainerData, Trainer } from '@/hooks/trainers/useSupabaseTrainerData';
import { toast } from 'sonner';

const AdminTrainers = () => {
  const { trainers, isLoading, deleteTrainer } = useSupabaseTrainerData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddTrainer, setShowAddTrainer] = useState(false);

  const filteredTrainers = trainers.filter(trainer => 
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (trainer.specialization && 
      trainer.specialization.some(s => 
        s.toLowerCase().includes(searchTerm.toLowerCase())
      ))
  );

  const handleDeleteTrainer = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete trainer ${name}?`)) {
      try {
        await deleteTrainer(id);
      } catch (error) {
        console.error('Error in delete handler:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Trainers</h1>
          <p className="text-gray-500">Manage your gym's trainers and instructors</p>
        </div>
        <Button 
          onClick={() => setShowAddTrainer(true)} 
          className="bg-gym-orange hover:bg-gym-orange/90"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Trainer
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Trainer Directory</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search trainers..." 
                className="pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>
            View and manage your training staff
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trainer</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrainers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No trainers found. Try a different search or add a new trainer.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTrainers.map((trainer) => (
                      <TableRow key={trainer.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={trainer.profilepicture || ''} alt={trainer.name} />
                              <AvatarFallback className="bg-gym-orange text-white">
                                {trainer.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{trainer.name}</div>
                              <div className="text-sm text-muted-foreground">{trainer.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {trainer.specialization?.map((spec, i) => (
                              <Badge key={i} variant="outline" className="bg-gray-100">
                                {spec}
                              </Badge>
                            ))}
                            {!trainer.specialization?.length && (
                              <span className="text-muted-foreground text-sm">General</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              trainer.status === 'Active' 
                                ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                            }
                          >
                            {trainer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                onClick={() => toast.info('Edit trainer functionality coming soon')}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteTrainer(trainer.id, trainer.name)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="h-5 w-5 text-gym-orange mr-2" />
              Trainer Profiles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Manage trainer profiles, certifications, specialties, and availability.
            </p>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => toast.info('Feature coming soon')}>
                Manage Profiles
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 text-gym-orange mr-2" />
              Performance Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Track trainer performance, class attendance, and client feedback.
            </p>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => toast.info('Feature coming soon')}>
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 text-gym-orange mr-2" />
              Ratings & Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              View and respond to client ratings and reviews for trainers.
            </p>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => toast.info('Feature coming soon')}>
                Manage Reviews
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminTrainers;
