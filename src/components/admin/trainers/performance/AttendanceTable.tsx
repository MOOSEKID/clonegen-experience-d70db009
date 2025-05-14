
import React from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export interface ClassSession {
  id: string;
  date: string;
  class_name: string;
  time: string;
  durationMinutes: number;
  attendees: number;
  capacity: number;
  status: 'completed' | 'canceled' | 'no-show';
}

export interface AttendanceTableProps {
  trainerName: string;
  sessions: ClassSession[];
  isLoading: boolean;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ 
  trainerName, 
  sessions, 
  isLoading 
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        );
      case 'canceled':
        return (
          <Badge variant="destructive">
            Canceled
          </Badge>
        );
      case 'no-show':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            No-show
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Class Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No recent sessions found for {trainerName}.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Attendees</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map(session => (
                  <TableRow key={session.id}>
                    <TableCell>
                      {format(new Date(session.date), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="font-medium">
                      {session.class_name}
                    </TableCell>
                    <TableCell>
                      {session.time} ({session.durationMinutes} min)
                    </TableCell>
                    <TableCell>
                      {session.attendees}/{session.capacity}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(session.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceTable;
