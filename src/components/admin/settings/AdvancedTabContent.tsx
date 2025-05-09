
import React from 'react';
import { Download, Zap, TestTube, MessageSquare } from 'lucide-react';
import SettingsCard from './SettingsCard';

const AdvancedTabContent = () => {
  const advancedCards = [
    {
      title: "Reports & Exports",
      description: "Set scheduled exports (email, storage)",
      icon: <Download className="h-10 w-10 text-gray-400" />,
      link: "/admin/settings/reports"
    },
    {
      title: "Automation Rules",
      description: "Trigger-based logic (e.g. 'new member → send email')",
      icon: <Zap className="h-10 w-10 text-gray-400" />,
      link: "/admin/settings/automations"
    },
    {
      title: "Test Account Settings",
      description: "Control test environment, user access",
      icon: <TestTube className="h-10 w-10 text-gray-400" />,
      link: "/admin/settings/test-mode"
    },
    {
      title: "Custom Messages",
      description: "Add motivational popups or app banners",
      icon: <MessageSquare className="h-10 w-10 text-gray-400" />,
      link: "/admin/settings/messages"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {advancedCards.map((card, index) => (
        <SettingsCard 
          key={index}
          title={card.title}
          description={card.description}
          link={card.link}
        >
          <div className="flex flex-col items-center justify-center py-6">
            {card.icon}
            <p className="mt-4 text-sm text-gray-500">Click to manage</p>
          </div>
        </SettingsCard>
      ))}
    </div>
  );
};

export default AdvancedTabContent;
