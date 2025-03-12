
import { FileText, Image, Layout } from 'lucide-react';
import PlaceholderSection from '@/components/admin/PlaceholderSection';

const AdminContent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Content</h1>
        <p className="text-gray-500">Manage your gym's website content</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlaceholderSection
          title="Page Editor"
          icon={<Layout className="h-6 w-6 text-gym-orange" />}
          description="Edit website pages, sections, and navigation menus with a drag-and-drop interface."
        />
        
        <PlaceholderSection
          title="Blog Articles"
          icon={<FileText className="h-6 w-6 text-gym-orange" />}
          description="Create, edit, and publish blog articles and fitness content."
        />
        
        <PlaceholderSection
          title="Media Library"
          icon={<Image className="h-6 w-6 text-gym-orange" />}
          description="Upload and manage images, videos, and documents for your website."
        />
      </div>
    </div>
  );
};

export default AdminContent;
