import React from 'react';
import AssignedClasses from '@/components/trainers/AssignedClasses';
import ProfileEditor from '@/components/trainers/ProfileEditor';
import PerformanceMetrics from '@/components/trainers/PerformanceMetrics';

const TrainerDashboard = () => {
  return (
    <div>
      <h1>Trainer Dashboard</h1>
      <p>Manage your assigned classes and profile here.</p>
      <AssignedClasses />
      <ProfileEditor />
      <PerformanceMetrics />
    </div>
  );
};

export default TrainerDashboard;
