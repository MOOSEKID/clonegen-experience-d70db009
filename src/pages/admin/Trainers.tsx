
import { useNavigate } from 'react-router-dom';
import { UserCheck, Award, Star } from 'lucide-react';
import PlaceholderSection from '@/components/admin/PlaceholderSection';

const AdminTrainers = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Trainers</h1>
        <p className="text-gray-500">Manage your gym's trainers and instructors</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlaceholderSection
          title="Trainer Profiles"
          icon={<UserCheck className="h-6 w-6 text-gym-orange" />}
          description="Manage trainer profiles, certifications, specialties, and availability."
          onClick={() => navigate('/admin/trainers/profiles')}
        />
        
        <PlaceholderSection
          title="Performance Tracking"
          icon={<Award className="h-6 w-6 text-gym-orange" />}
          description="Track trainer performance, class attendance, and client feedback."
          onClick={() => navigate('/admin/trainers/performance')}
        />
        
        <PlaceholderSection
          title="Ratings & Reviews"
          icon={<Star className="h-6 w-6 text-gym-orange" />}
          description="View and respond to client ratings and reviews for trainers."
          onClick={() => navigate('/admin/trainers/ratings')}
        />
      </div>
    </div>
  );
};

export default AdminTrainers;
