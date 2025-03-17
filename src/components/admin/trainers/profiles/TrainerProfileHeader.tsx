
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface TrainerProfileHeaderProps {
  onAddTrainer: () => void;
}

const TrainerProfileHeader = ({ onAddTrainer }: TrainerProfileHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <h1 className="text-3xl font-bold">Trainer Profiles</h1>
      <Button onClick={onAddTrainer} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Add New Trainer
      </Button>
    </div>
  );
};

export default TrainerProfileHeader;
