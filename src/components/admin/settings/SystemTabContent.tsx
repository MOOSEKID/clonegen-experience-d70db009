
import React from 'react';
import { Link } from 'react-router-dom';
import { Cog, Shield, Clock, CalendarDays, Layout, Share2 } from 'lucide-react';

const SystemTabContent = () => {
  const settingsCards = [
    {
      title: 'General',
      description: 'Basic settings like gym name, logo, and appearance.',
      icon: <Cog className="h-6 w-6 text-primary" />,
      path: '/admin/settings/general'
    },
    {
      title: 'Security',
      description: 'Configure password policies and authentication settings.',
      icon: <Shield className="h-6 w-6 text-primary" />,
      path: '/admin/settings/security'
    },
    {
      title: 'Business Hours',
      description: 'Set up operating hours for each day of the week.',
      icon: <Clock className="h-6 w-6 text-primary" />,
      path: '/admin/settings/business-hours'
    },
    {
      title: 'Holidays & Closures',
      description: 'Manage holidays and special closure days.',
      icon: <CalendarDays className="h-6 w-6 text-primary" />,
      path: '/admin/settings/holidays'
    },
    {
      title: 'Platform Settings',
      description: 'Enable or disable platform features and modules.',
      icon: <Layout className="h-6 w-6 text-primary" />,
      path: '/admin/settings/platform'
    },
    {
      title: 'Integrations',
      description: 'Connect with external services like payment processors.',
      icon: <Share2 className="h-6 w-6 text-primary" />,
      path: '/admin/settings/integrations'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {settingsCards.map((card, index) => (
        <Link 
          key={index} 
          to={card.path}
          className="group border rounded-lg p-6 hover:border-primary hover:shadow-md transition-all"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-3">
              {card.icon}
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {card.title}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm">{card.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SystemTabContent;
