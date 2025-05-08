
import React, { ReactNode } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ExerciseTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  children: ReactNode;
}

const ExerciseTabs = ({ activeTab, onTabChange, children }: ExerciseTabsProps) => {
  return (
    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={onTabChange} className="w-full">
      <div className="flex justify-between items-center mb-6">
        <TabsList className="mb-0 w-full overflow-x-auto flex-nowrap grid-cols-7 sm:grid md:max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="chest">Chest</TabsTrigger>
          <TabsTrigger value="back">Back</TabsTrigger>
          <TabsTrigger value="legs">Legs</TabsTrigger>
          <TabsTrigger value="shoulders">Shoulders</TabsTrigger>
          <TabsTrigger value="arms">Arms</TabsTrigger>
          <TabsTrigger value="core">Core</TabsTrigger>
        </TabsList>
        
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      {children}
    </Tabs>
  );
};

export default ExerciseTabs;
