
import { useEffect, useState } from 'react';
import ReportCard from '../ReportCard';

interface TrainerEffectivenessProps {
  fromDate?: Date;
  toDate?: Date;
  trainers?: {id: string, label: string}[];
}

const TrainerEffectiveness = ({ fromDate, toDate, trainers }: TrainerEffectivenessProps) => {
  return (
    <div className="space-y-6">
      <ReportCard 
        title="Trainer Effectiveness" 
        description="Coming soon"
        allowDownload={false}
      >
        <div className="h-60 flex items-center justify-center">
          <p className="text-gray-500">Trainer effectiveness feature is under development</p>
        </div>
      </ReportCard>
    </div>
  );
};

export default TrainerEffectiveness;
