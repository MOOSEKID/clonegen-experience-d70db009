
import MembershipChart from './MembershipChart';
import RevenueChart from './RevenueChart';

const ChartsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MembershipChart />
      <RevenueChart />
    </div>
  );
};

export default ChartsSection;
