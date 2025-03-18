
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

interface PagePlaceholderProps {
  title?: string;
}

const PagePlaceholder: React.FC<PagePlaceholderProps> = ({ title }) => {
  const location = useLocation();
  const pageName = title || location.pathname.substring(1).replace(/-/g, ' ');
  const formattedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-12rem)]">
      <div className="max-w-4xl mx-auto bg-gym-darkblue p-8 rounded-lg shadow-lg border border-white/10">
        <h1 className="text-3xl font-bold text-white mb-6">{formattedPageName}</h1>
        <p className="text-white/80 mb-8">
          This page is currently under development. Our team is working on creating amazing content and features for you.
        </p>
        <Progress value={75} className="h-2 bg-gray-700" />
        <p className="text-white/60 mt-2 text-sm">Coming soon...</p>
        
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="bg-gym-dark p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-medium text-white mb-3">What to expect</h3>
            <ul className="list-disc list-inside text-white/70 space-y-2">
              <li>Detailed information</li>
              <li>Interactive features</li>
              <li>Personalized content</li>
              <li>Regular updates</li>
            </ul>
          </div>
          <div className="bg-gym-dark p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-medium text-white mb-3">In the meantime</h3>
            <p className="text-white/70">
              Feel free to explore other sections of our website or contact our team for any specific information you might need about {formattedPageName}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagePlaceholder;
