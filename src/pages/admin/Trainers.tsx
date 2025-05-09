
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Award, Star, Calendar } from 'lucide-react';
import PlaceholderSection from '@/components/admin/PlaceholderSection';

const AdminTrainers = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Trainers</h1>
        <p className="text-gray-500">Manage your gym's trainers and instructors</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <PlaceholderSection
          title="Trainer Profiles"
          icon={<UserCheck className="h-6 w-6 text-gym-orange" />}
          description="Manage trainer profiles, certifications, specialties, and availability."
          ctaText="Manage Profiles"
          onClick={() => navigate('/admin/trainers/profiles')}
          features={[
            "View all trainers", 
            "Manage certifications", 
            "Update availability", 
            "Track specialties"
          ]}
          className="hover:scale-[1.02] transition-transform"
        />
        
        <PlaceholderSection
          title="Performance Tracking"
          icon={<Award className="h-6 w-6 text-gym-orange" />}
          description="Track trainer performance, class attendance, and client feedback."
          ctaText="View Performance"
          onClick={() => navigate('/admin/trainers/performance')}
          features={[
            "Track attendance", 
            "Monitor classes", 
            "Review metrics", 
            "Analyze feedback"
          ]}
          className="hover:scale-[1.02] transition-transform"
        />
        
        <PlaceholderSection
          title="Ratings & Reviews"
          icon={<Star className="h-6 w-6 text-gym-orange" />}
          description="View and respond to client ratings and reviews for trainers."
          ctaText="Manage Ratings"
          onClick={() => navigate('/admin/trainers/ratings')}
          features={[
            "Read client reviews", 
            "Respond to feedback", 
            "View ratings summary", 
            "Track improvements"
          ]}
          className="hover:scale-[1.02] transition-transform"
        />
        
        <PlaceholderSection
          title="Scheduling"
          icon={<Calendar className="h-6 w-6 text-gym-orange" />}
          description="Manage trainer schedules, class assignments, and time off requests."
          ctaText="Manage Schedule"
          onClick={() => navigate('/admin/trainers/scheduling')}
          features={[
            "Set availability", 
            "Manage sessions", 
            "Class assignments", 
            "Time off requests"
          ]}
          className="hover:scale-[1.02] transition-transform"
        />
      </div>
    </div>
  );
};

export default AdminTrainers;
