
import ClassAttendanceChart from './ClassAttendanceChart';
import RecentActivities from './RecentActivities';

// Export the data for use in export functionality
export const classAttendanceData = [
  { name: 'Yoga', value: 30 },
  { name: 'HIIT', value: 25 },
  { name: 'Cardio', value: 20 },
  { name: 'Weight', value: 15 },
  { name: 'Zumba', value: 10 },
];

const AdditionalInsights = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ClassAttendanceChart data={classAttendanceData} />
      <RecentActivities />
    </div>
  );
};

export default AdditionalInsights;
