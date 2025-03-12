
import { Settings, Clock, Shield } from 'lucide-react';
import PlaceholderSection from '@/components/admin/PlaceholderSection';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500">Configure your gym's system settings</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlaceholderSection
          title="General Settings"
          icon={<Settings className="h-6 w-6 text-gym-orange" />}
          description="Configure gym branding, contact information, and system preferences."
        />
        
        <PlaceholderSection
          title="Business Hours"
          icon={<Clock className="h-6 w-6 text-gym-orange" />}
          description="Set gym opening hours, holidays, and special schedules."
        />
        
        <PlaceholderSection
          title="User Permissions"
          icon={<Shield className="h-6 w-6 text-gym-orange" />}
          description="Manage staff access levels, roles, and permissions for the admin system."
        />
      </div>
    </div>
  );
};

export default AdminSettings;
