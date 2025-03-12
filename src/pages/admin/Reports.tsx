
import { BarChart2, PieChart, TrendingUp } from 'lucide-react';
import PlaceholderSection from '@/components/admin/PlaceholderSection';

const AdminReports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <p className="text-gray-500">View analytics and generate reports</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlaceholderSection
          title="Financial Reports"
          icon={<BarChart2 className="h-6 w-6 text-gym-orange" />}
          description="Generate revenue reports, expense analysis, and financial forecasts."
        />
        
        <PlaceholderSection
          title="Membership Analytics"
          icon={<PieChart className="h-6 w-6 text-gym-orange" />}
          description="Analyze membership trends, churn rates, and demographic insights."
        />
        
        <PlaceholderSection
          title="Performance Metrics"
          icon={<TrendingUp className="h-6 w-6 text-gym-orange" />}
          description="Track key performance indicators and growth metrics for your gym."
        />
      </div>
    </div>
  );
};

export default AdminReports;
