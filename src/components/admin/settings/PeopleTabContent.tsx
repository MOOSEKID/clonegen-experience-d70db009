
import React from 'react';
import { Shield, User, BarChart, Bell, FileText } from 'lucide-react';
import UserPermissionsSettings from './people/UserPermissionsSettings';
import DefaultMemberSettings from './people/DefaultMemberSettings';
import CompanyAutomationSettings from './people/CompanyAutomationSettings';
import NotificationSettings from './people/NotificationSettings';
import InvoiceTemplatesSettings from './people/InvoiceTemplatesSettings';

const PeopleTabContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UserPermissionsSettings />
      <DefaultMemberSettings />
      <CompanyAutomationSettings />
      <NotificationSettings />
      <InvoiceTemplatesSettings />
    </div>
  );
};

export default PeopleTabContent;
