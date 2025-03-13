
import { Users, DollarSign, Calendar, Clock } from 'lucide-react';
import StatCard from './StatCard';

const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Members"
        value="1,287"
        change={{
          value: 12,
          isPositive: true,
          text: "from last month",
        }}
        icon={Users}
        iconBgColor="bg-purple-100"
        iconColor="text-purple-600"
      />

      <StatCard
        title="Monthly Revenue"
        value="$25,698"
        change={{
          value: 8.2,
          isPositive: true,
          text: "from last month",
        }}
        icon={DollarSign}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
      />

      <StatCard
        title="Class Bookings"
        value="548"
        change={{
          value: 5.3,
          isPositive: true,
          text: "from last week",
        }}
        icon={Calendar}
        iconBgColor="bg-cyan-100"
        iconColor="text-cyan-600"
      />

      <StatCard
        title="Daily Check-ins"
        value="142"
        change={{
          value: 3.1,
          isPositive: false,
          text: "from yesterday",
        }}
        icon={Clock}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
      />
    </div>
  );
};

export default StatsSection;
