
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface ExerciseTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

const ExerciseTabs = ({ activeTab, onTabChange, children }: ExerciseTabsProps) => {
  return (
    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={onTabChange}>
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="chest">Chest</TabsTrigger>
          <TabsTrigger value="back">Back</TabsTrigger>
          <TabsTrigger value="legs">Legs</TabsTrigger>
          <TabsTrigger value="shoulders">Shoulders</TabsTrigger>
          <TabsTrigger value="arms">Arms</TabsTrigger>
          <TabsTrigger value="core">Core</TabsTrigger>
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

export default ExerciseTabs;
