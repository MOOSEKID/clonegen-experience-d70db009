
import ClassAttendanceChart from './ClassAttendanceChart';
import RecentActivities from './RecentActivities';

const AdditionalInsights = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ClassAttendanceChart />
      <RecentActivities />
    </div>
  );
};

export default AdditionalInsights;
