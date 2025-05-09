
import React from 'react';
import SettingsCard from '../SettingsCard';
import { useIsMobile } from '@/hooks/use-mobile';
import BusinessHoursSchedule from './BusinessHoursSchedule';
import BusinessHoursActions from './BusinessHoursActions';
import BusinessHoursLoading from './BusinessHoursLoading';
import BusinessHoursError from './BusinessHoursError';
import { useBusinessHours, daysOfWeek } from '@/hooks/admin/useBusinessHours';

const BusinessHoursSettings = () => {
  const isMobile = useIsMobile();
  const {
    formData,
    hasChanges,
    loading,
    error,
    saveState,
    handleToggleDay,
    handleTimeChange,
    saveChanges,
    resetChanges,
    refresh
  } = useBusinessHours();
  
  if (loading) {
    return <BusinessHoursLoading />;
  }
  
  if (error) {
    return <BusinessHoursError error={error} onRetry={refresh} />;
  }

  return (
    <SettingsCard 
      title="Business Hours" 
      description="Configure your gym's operating hours"
      saveState={saveState}
    >
      <div className="space-y-6">
        <BusinessHoursSchedule
          daysOfWeek={daysOfWeek}
          formData={formData}
          onToggleDay={handleToggleDay}
          onTimeChange={handleTimeChange}
        />
        
        <BusinessHoursActions 
          isMobile={isMobile}
          hasChanges={hasChanges}
          saveState={saveState}
          onReset={resetChanges}
          onSave={saveChanges}
        />
      </div>
    </SettingsCard>
  );
};

export default BusinessHoursSettings;
