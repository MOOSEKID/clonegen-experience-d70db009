
import React from 'react';
import { Link } from 'react-router-dom';
import SettingsCard from './SettingsCard';
import { Settings, TestTube, Bot, FileBarChart, Database } from 'lucide-react';

const AdvancedTabContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <SettingsCard
        title="Automation Rules"
        description="Configure automated actions based on triggers"
        icon={<Bot className="h-5 w-5" />}
        link="/admin/settings/automation-rules"
      >
        <div className="flex items-center justify-center py-4 text-muted-foreground">
          <Bot className="h-10 w-10 opacity-70" />
        </div>
      </SettingsCard>
      
      <SettingsCard
        title="Test Accounts"
        description="Manage test accounts for development"
        icon={<TestTube className="h-5 w-5" />}
        link="/admin/settings/test-accounts"
      >
        <div className="flex items-center justify-center py-4 text-muted-foreground">
          <TestTube className="h-10 w-10 opacity-70" />
        </div>
      </SettingsCard>
      
      <SettingsCard
        title="Reports & Exports"
        description="Configure report generation and export formats"
        icon={<FileBarChart className="h-5 w-5" />}
        link="/admin/settings/reports-exports"
      >
        <div className="flex items-center justify-center py-4 text-muted-foreground">
          <FileBarChart className="h-10 w-10 opacity-70" />
        </div>
      </SettingsCard>
      
      <SettingsCard
        title="Custom Messages"
        description="Configure system messages and notifications"
        icon={<Settings className="h-5 w-5" />}
        link="/admin/settings/custom-messages"
      >
        <div className="flex items-center justify-center py-4 text-muted-foreground">
          <Settings className="h-10 w-10 opacity-70" />
        </div>
      </SettingsCard>

      <SettingsCard
        title="CMS"
        description="Manage website content, pages, and navigation"
        icon={<Database className="h-5 w-5" />}
        link="/admin/settings/cms"
      >
        <div className="flex items-center justify-center py-4 text-muted-foreground">
          <Database className="h-10 w-10 opacity-70" />
        </div>
      </SettingsCard>
    </div>
  );
};

export default AdvancedTabContent;
