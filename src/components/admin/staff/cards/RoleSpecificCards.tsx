
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Users, Award, FileText } from 'lucide-react';
import PlaceholderSection from '@/components/admin/PlaceholderSection';

interface RoleSpecificCardsProps {
  role: 'trainer' | 'manager' | 'reception' | 'sales' | 'support' | 'wellness';
}

const RoleSpecificCards: React.FC<RoleSpecificCardsProps> = ({ role }) => {
  const navigate = useNavigate();
  
  // Cards for Trainers
  if (role === 'trainer') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        <PlaceholderSection
          title="Trainer Profiles"
          icon={<Users className="h-6 w-6 text-blue-600" />}
          description="View and manage all trainer profiles."
          ctaText="Manage Profiles"
          onClick={() => navigate('/admin/staff/trainers/profiles')}
          features={[
            "View profiles", 
            "Edit details", 
            "Add certifications", 
            "Manage schedule"
          ]}
          className="hover:scale-[1.02] transition-transform"
        />
        
        <PlaceholderSection
          title="Attendance Tracking"
          icon={<CalendarDays className="h-6 w-6 text-green-600" />}
          description="Track trainer attendance and check-ins."
          ctaText="View Attendance"
          onClick={() => navigate('/admin/staff/attendance')}
          features={[
            "Daily check-ins", 
            "Attendance reports", 
            "Schedule monitoring", 
            "Late alerts"
          ]}
          className="hover:scale-[1.02] transition-transform"
        />
        
        <PlaceholderSection
          title="Certifications"
          icon={<Award className="h-6 w-6 text-amber-600" />}
          description="Manage trainer certifications and qualifications."
          ctaText="Manage Certifications"
          onClick={() => navigate('/admin/staff/trainers/profiles')}
          features={[
            "View certifications", 
            "Upload documents", 
            "Track expiry dates", 
            "Verify credentials"
          ]}
          className="hover:scale-[1.02] transition-transform"
        />
        
        <PlaceholderSection
          title="Performance"
          icon={<FileText className="h-6 w-6 text-purple-600" />}
          description="Track trainer performance and client feedback."
          ctaText="View Performance"
          onClick={() => {}}
          features={[
            "Class attendance", 
            "Client retention", 
            "Satisfaction ratings", 
            "Upsell metrics"
          ]}
          className="hover:scale-[1.02] transition-transform"
          badge="Coming Soon"
        />
      </div>
    );
  }
  
  // Cards for Managers
  if (role === 'manager') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        <PlaceholderSection
          title="Manager Dashboard"
          icon={<Users className="h-6 w-6 text-blue-600" />}
          description="Access manager-specific tools and reports."
          ctaText="View Dashboard"
          onClick={() => {}}
          features={[
            "Financial overview", 
            "Staff management", 
            "Performance metrics", 
            "Business KPIs"
          ]}
          className="hover:scale-[1.02] transition-transform"
          badge="Coming Soon"
        />
        
        <PlaceholderSection
          title="Attendance Management"
          icon={<CalendarDays className="h-6 w-6 text-green-600" />}
          description="Monitor and manage staff attendance."
          ctaText="View Attendance"
          onClick={() => navigate('/admin/staff/attendance')}
          features={[
            "Staff check-ins", 
            "Attendance reports", 
            "Issue management", 
            "Time tracking"
          ]}
          className="hover:scale-[1.02] transition-transform"
        />
      </div>
    );
  }
  
  // Cards for Reception & Sales
  if (role === 'reception' || role === 'sales') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        <PlaceholderSection
          title="Front Desk Tools"
          icon={<Users className="h-6 w-6 text-blue-600" />}
          description="Access tools for member check-ins and management."
          ctaText="Access Tools"
          onClick={() => {}}
          features={[
            "Member check-in", 
            "Quick registration", 
            "Class schedules", 
            "Member search"
          ]}
          className="hover:scale-[1.02] transition-transform"
          badge="Coming Soon"
        />
        
        <PlaceholderSection
          title="Attendance Tracking"
          icon={<CalendarDays className="h-6 w-6 text-green-600" />}
          description="Track your attendance and check-ins."
          ctaText="View Attendance"
          onClick={() => navigate('/admin/staff/attendance')}
          features={[
            "Daily check-ins", 
            "Schedule tracking", 
            "Time management", 
            "Attendance history"
          ]}
          className="hover:scale-[1.02] transition-transform"
        />
      </div>
    );
  }
  
  // Cards for Support staff
  if (role === 'support') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        <PlaceholderSection
          title="Support Tools"
          icon={<Users className="h-6 w-6 text-blue-600" />}
          description="Access tools for facility maintenance and support."
          ctaText="Access Tools"
          onClick={() => {}}
          features={[
            "Maintenance requests", 
            "Equipment tracking", 
            "Cleaning schedules", 
            "Task assignments"
          ]}
          className="hover:scale-[1.02] transition-transform"
          badge="Coming Soon"
        />
        
        <PlaceholderSection
          title="Attendance Tracking"
          icon={<CalendarDays className="h-6 w-6 text-green-600" />}
          description="Track your attendance and check-ins."
          ctaText="View Attendance"
          onClick={() => navigate('/admin/staff/attendance')}
          features={[
            "Daily check-ins", 
            "Schedule tracking", 
            "Time management", 
            "Attendance history"
          ]}
          className="hover:scale-[1.02] transition-transform"
        />
      </div>
    );
  }
  
  // Default: empty div for any other role
  return <div></div>;
};

export default RoleSpecificCards;
