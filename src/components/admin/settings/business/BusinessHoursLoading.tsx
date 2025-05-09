
import SettingsCard from '../SettingsCard';

const BusinessHoursLoading = () => {
  return (
    <SettingsCard title="Business Hours" description="Loading...">
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gym-orange"></div>
      </div>
    </SettingsCard>
  );
};

export default BusinessHoursLoading;
