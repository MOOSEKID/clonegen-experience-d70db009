
import { useState } from 'react';

interface WorkoutProgram {
  id: string;
  name: string;
  level: string;
  category: string;
  duration: string;
  exercises: number;
  assignedTo: number;
}

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

export const levelBadgeColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-blue-100 text-blue-800',
  Advanced: 'bg-purple-100 text-purple-800'
};

export const useProgramManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all-categories');
  const [viewMembersDialogOpen, setViewMembersDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<{id: string, name: string} | null>(null);

  const filteredPrograms = mockWorkoutPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all-categories' || 
      program.category.toLowerCase() === selectedCategory.replace('-', ' ');
    
    return matchesSearch && matchesCategory;
  });

  const handleViewMembers = (programId: string, programName: string) => {
    setSelectedProgram({ id: programId, name: programName });
    setViewMembersDialogOpen(true);
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredPrograms,
    viewMembersDialogOpen,
    setViewMembersDialogOpen,
    selectedProgram,
    handleViewMembers,
    levelBadgeColors
  };
};
