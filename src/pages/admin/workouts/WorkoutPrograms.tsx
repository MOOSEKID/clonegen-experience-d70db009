
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import ProgramHeader from '@/components/admin/workouts/program/ProgramHeader';
import ProgramFilters from '@/components/admin/workouts/program/ProgramFilters';
import ProgramTable from '@/components/admin/workouts/program/ProgramTable';
import ProgramMembersDialogWrapper from '@/components/admin/workouts/program/ProgramMembersDialogWrapper';
import { useProgramManagement, levelBadgeColors } from '@/hooks/admin/useProgramManagement';

const WorkoutPrograms = () => {
  const navigate = useNavigate();
  const { 
    searchTerm, 
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredPrograms,
    viewMembersDialogOpen,
    setViewMembersDialogOpen,
    selectedProgram,
    handleViewMembers
  } = useProgramManagement();

  const handleCreateProgram = () => {
    navigate('/admin/workouts/create-program');
  };

  return (
    <div className="space-y-6">
      <ProgramHeader onCreateProgram={handleCreateProgram} />
      
      <Card>
        <CardHeader className="pb-3">
          <ProgramFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </CardHeader>
        <CardContent>
          <ProgramTable 
            programs={filteredPrograms} 
            onViewMembers={handleViewMembers} 
            levelBadgeColors={levelBadgeColors}
          />
        </CardContent>
      </Card>

      <ProgramMembersDialogWrapper
        selectedProgram={selectedProgram}
        open={viewMembersDialogOpen}
        onOpenChange={setViewMembersDialogOpen}
      />
    </div>
  );
};

export default WorkoutPrograms;
