
import { MessageSquare, HelpCircle, MessageCircle } from 'lucide-react';
import PlaceholderSection from '@/components/admin/PlaceholderSection';

const AdminSupport = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Support</h1>
        <p className="text-gray-500">Manage member support and communication</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlaceholderSection
          title="Live Chat"
          icon={<MessageSquare className="h-6 w-6 text-gym-orange" />}
          description="Chat with members in real-time and provide instant support."
        />
        
        <PlaceholderSection
          title="Support Tickets"
          icon={<HelpCircle className="h-6 w-6 text-gym-orange" />}
          description="Manage support tickets, assign staff, and track resolution status."
        />
        
        <PlaceholderSection
          title="Feedback Management"
          icon={<MessageCircle className="h-6 w-6 text-gym-orange" />}
          description="Collect, respond to, and analyze member feedback and suggestions."
        />
      </div>
    </div>
  );
};

export default AdminSupport;
