
import MembershipChart from './MembershipChart';
import RevenueChart from './RevenueChart';

// Define the data outside so it can be exported
export const membershipData = [
  { name: 'Jan', members: 400 },
  { name: 'Feb', members: 500 },
  { name: 'Mar', members: 600 },
  { name: 'Apr', members: 700 },
  { name: 'May', members: 800 },
  { name: 'Jun', members: 950 },
];

export const revenueData = [
  { name: 'Jan', revenue: 12000 },
  { name: 'Feb', revenue: 15000 },
  { name: 'Mar', revenue: 18000 },
  { name: 'Apr', revenue: 20000 },
  { name: 'May', revenue: 22000 },
  { name: 'Jun', revenue: 25000 },
];

const ChartsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MembershipChart data={membershipData} />
      <RevenueChart data={revenueData} />
    </div>
  );
};

export default ChartsSection;
