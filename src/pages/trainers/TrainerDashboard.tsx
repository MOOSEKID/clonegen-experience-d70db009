
import React from 'react';
import { Helmet } from 'react-helmet';
import AssignedClasses from '@/components/trainers/AssignedClasses';
import ProfileEditor from '@/components/trainers/ProfileEditor';
import PerformanceMetrics from '@/components/trainers/PerformanceMetrics';

const TrainerDashboard = () => {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <Helmet>
        <title>Trainer Dashboard | Uptown Gym</title>
      </Helmet>
      
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Trainer Dashboard</h1>
        <p className="text-gray-500">Manage your profile, classes, and track your performance</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProfileEditor />
          <AssignedClasses />
        </div>
        <div>
          <PerformanceMetrics />
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
