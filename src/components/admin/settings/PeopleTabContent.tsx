
import React from 'react';
import { Shield, User, BarChart, Bell, FileText } from 'lucide-react';
import SettingsCard from './SettingsCard';

const PeopleTabContent = () => {
  const peopleCards = [
    {
      title: "User Permissions",
      description: "Manage roles, access levels",
      icon: <Shield className="h-10 w-10 text-gray-400" />,
      link: "/admin/settings/user-permissions"
    },
    {
      title: "Default Member Settings",
      description: "Set default plans, auto-renew, welcome flows",
      icon: <User className="h-10 w-10 text-gray-400" />,
      link: "/admin/settings/member-defaults"
    },
    {
      title: "Company Automation",
      description: "Control attendance exports, invoice schedules",
      icon: <BarChart className="h-10 w-10 text-gray-400" />,
      link: "/admin/settings/company-automation"
    },
    {
      title: "Notification Settings",
      description: "Email/SMS template editor and toggles",
      icon: <Bell className="h-10 w-10 text-gray-400" />,
      link: "/admin/settings/notifications"
    },
    {
      title: "Invoice Templates",
      description: "Customize PDF layout, logo, disclaimers",
      icon: <FileText className="h-10 w-10 text-gray-400" />,
      link: "/admin/settings/invoice-templates"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {peopleCards.map((card, index) => (
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

export default PeopleTabContent;
