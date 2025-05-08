
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileEdit, Trash2, Users } from 'lucide-react';

interface ProgramData {
  id: string;
  name: string;
  level: string;
  category: string;
  duration: string;
  exercises: number;
  assignedTo: number;
}

interface ProgramTableProps {
  programs: ProgramData[];
  onViewMembers: (programId: string, programName: string) => void;
  levelBadgeColors: Record<string, string>;
}

const ProgramTable = ({ programs, onViewMembers, levelBadgeColors }: ProgramTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Program Name</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Exercises</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programs.map(program => (
            <TableRow key={program.id}>
              <TableCell className="font-medium">{program.name}</TableCell>
              <TableCell>
                <Badge variant="outline" className={levelBadgeColors[program.level as keyof typeof levelBadgeColors]}>
                  {program.level}
                </Badge>
              </TableCell>
              <TableCell>{program.category}</TableCell>
              <TableCell>{program.duration}</TableCell>
              <TableCell>{program.exercises}</TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => onViewMembers(program.id, program.name)}
                >
                  <Users className="h-3.5 w-3.5" />
                  {program.assignedTo} members
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <FileEdit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProgramTable;
