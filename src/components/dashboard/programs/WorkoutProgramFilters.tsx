
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface WorkoutProgramFiltersProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

const WorkoutProgramFilters: React.FC<WorkoutProgramFiltersProps> = ({
  activeTab,
  onTabChange,
  children
}) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange}>
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="all">All Programs</TabsTrigger>
          <TabsTrigger value="strength">Strength</TabsTrigger>
          <TabsTrigger value="cardio">Cardio</TabsTrigger>
          <TabsTrigger value="weight-loss">Weight Loss</TabsTrigger>
          <TabsTrigger value="ai">AI Generated</TabsTrigger>
        </TabsList>
        
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>
      
      <TabsContent value={activeTab} className="mt-0">
        {children}
      </TabsContent>
    </Tabs>
  );
};

export default WorkoutProgramFilters;
