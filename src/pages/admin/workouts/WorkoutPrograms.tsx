
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, FileEdit, Trash2 } from 'lucide-react';

const mockWorkoutPrograms = [
  { 
    id: '1', 
    name: 'Beginner Strength Training', 
    level: 'Beginner',
    category: 'Strength',
    duration: '4 weeks',
    exercises: 12,
    assignedTo: 34
  },
  { 
    id: '2', 
    name: 'Advanced HIIT', 
    level: 'Advanced',
    category: 'Cardio',
    duration: '6 weeks',
    exercises: 20,
    assignedTo: 16
  },
  { 
    id: '3', 
    name: 'Weight Loss Program', 
    level: 'Intermediate',
    category: 'Weight Loss',
    duration: '8 weeks',
    exercises: 18,
    assignedTo: 45
  },
  { 
    id: '4', 
    name: 'Senior Mobility & Strength', 
    level: 'Beginner',
    category: 'Mobility',
    duration: '12 weeks',
    exercises: 15,
    assignedTo: 28
  }
];

const levelBadgeColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-blue-100 text-blue-800',
  Advanced: 'bg-purple-100 text-purple-800'
};

const WorkoutPrograms = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Workout Programs</h1>
          <p className="text-gray-500">Create and manage workout programs for members</p>
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Program
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-64 md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search programs..."
                className="pl-8"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select defaultValue="all-categories">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="weight-loss">Weight Loss</SelectItem>
                  <SelectItem value="mobility">Mobility</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
                {mockWorkoutPrograms.map(program => (
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
                    <TableCell>{program.assignedTo} members</TableCell>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutPrograms;
