import { useState } from 'react';
import { Edit, Trash2, MoreVertical, Users } from 'lucide-react';
import { ClassType, MemberInfo } from '@/hooks/useClassesData';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import EditClassDialog from './EditClassDialog';
import ManageAttendeesDialog from './ManageAttendeesDialog';

interface ClassesTableProps {
  classes: ClassType[];
  isLoading: boolean;
  onEdit: (updatedClass: ClassType) => void;
  onDelete: (classId: number) => void;
  onBookClass: (classId: number, member: MemberInfo) => void;
  onCancelBooking: (classId: number, memberId: number) => void;
}

const ClassesTable = ({ 
  classes, 
  isLoading, 
  onEdit, 
  onDelete,
  onBookClass,
  onCancelBooking
}: ClassesTableProps) => {
  const [editingClass, setEditingClass] = useState<ClassType | null>(null);
  const [managingAttendees, setManagingAttendees] = useState<ClassType | null>(null);

  const getClassTypeColor = (type: string) => {
    switch (type) {
      case 'yoga':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'hiit':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'strength':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cardio':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'pilates':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAvailabilityLabel = (classItem: ClassType) => {
    const availableSpots = classItem.capacity - classItem.enrolled;
    if (availableSpots <= 0 && classItem.waitlist > 0) {
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
          Waitlist ({classItem.waitlist})
        </Badge>
      );
    } else if (availableSpots <= 0) {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
          Full
        </Badge>
      );
    } else if (availableSpots <= 3) {
      return (
        <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
          Almost Full ({availableSpots})
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
          Available ({availableSpots})
        </Badge>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="w-full h-12" />
          ))}
        </div>
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No classes found. Try changing your filters or add a new class.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Trainer</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell className="font-medium">{classItem.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getClassTypeColor(classItem.type)}>
                    {classItem.type.charAt(0).toUpperCase() + classItem.type.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{classItem.trainer}</TableCell>
                <TableCell>{classItem.day}</TableCell>
                <TableCell>
                  {classItem.time} ({classItem.duration} min)
                </TableCell>
                <TableCell>{classItem.room}</TableCell>
                <TableCell>
                  {classItem.enrolled}/{classItem.capacity}
                </TableCell>
                <TableCell>
                  {getAvailabilityLabel(classItem)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 focus:outline-none">
                        <MoreVertical className="h-4 w-4 mx-auto" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => setManagingAttendees(classItem)}
                        className="cursor-pointer"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        <span>Manage Attendees</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setEditingClass(classItem)}
                        className="cursor-pointer"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(classItem.id)}
                        className="cursor-pointer text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingClass && (
        <EditClassDialog 
          open={!!editingClass}
          classData={editingClass}
          onOpenChange={(open) => {
            if (!open) setEditingClass(null);
          }}
          onUpdateClass={(updatedClass) => {
            onEdit(updatedClass);
            setEditingClass(null);
          }}
        />
      )}

      {managingAttendees && (
        <ManageAttendeesDialog
          open={!!managingAttendees}
          classData={managingAttendees}
          onOpenChange={(open) => {
            if (!open) setManagingAttendees(null);
          }}
          onBookClass={onBookClass}
          onCancelBooking={onCancelBooking}
        />
      )}
    </>
  );
};

export default ClassesTable;
