
import React from 'react';
import { Building, Lock, Clock, CalendarDays, Store, DollarSign } from 'lucide-react';
import SettingsCard from './SettingsCard';

const SystemTabContent = () => {
  const systemCards = [
    {
      title: "General Settings",
      description: "Branding, contact info, language, appearance",
      icon: <Building className="h-10 w-10 text-gray-400" />,
      link: "/admin/settings/general",
      status: null
    },
    {
      title: "Security Settings",
      description: "Password policy, 2FA, session limits",
      icon: <Lock className="h-10 w-10 text-gray-400" />,
      link: "/admin/settings/security",
      status: "2FA: Enabled"
    },
    {
      title: "Business Hours",
      description: "Open/close hours for each day",
      icon: <Clock className="h-10 w-10 text-gray-400" />,
      link: "/admin/settings/business-hours"
    },
    {
      title: "Holidays & Closures",
      description: "Configure holiday calendar and special hours",
      icon: <CalendarDays className="h-10 w-10 text-gray-400" />,
      link: "/admin/settings/holidays"
    },
    {
      title: "Platform Settings",
      description: "Toggle modules like Shop, Trainers, Support",
      icon: <Store className="h-10 w-10 text-gray-400" />,
      link: "/admin/settings/platform"
    },
    {
      title: "Integrations",
      description: "API keys (Stripe, MTN, Twilio, etc.)",
      icon: <DollarSign className="h-10 w-10 text-gray-400" />,
      link: "/admin/settings/integrations"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {systemCards.map((card, index) => (
        <SettingsCard 
          key={index}
          title={card.title}
          description={card.description}
          link={card.link}
          status={card.status}
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

export default SystemTabContent;
