
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TrainerProfileTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TrainerProfileTabs = ({ activeTab, onTabChange }: TrainerProfileTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <TabsList className="flex">
        <TabsTrigger value="all">All Trainers</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="inactive">Inactive</TabsTrigger>
        <TabsTrigger value="on leave">On Leave</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TrainerProfileTabs;
