
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const SettingsPage = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    app: true,
    sms: false,
    marketing: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    showProfilePublicly: true,
    shareWorkoutData: false,
    allowDataAnalysis: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleNotificationChange = (setting: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting as keyof typeof notificationSettings]
    });
  };

  const handlePrivacyChange = (setting: string) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: !privacySettings[setting as keyof typeof privacySettings]
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords don\'t match');
      return;
    }
    
    // Mock password change
    toast.success('Password updated successfully');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <div 
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer ${notificationSettings.email ? 'bg-gym-orange' : 'bg-gray-300'}`}
                onClick={() => handleNotificationChange('email')}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notificationSettings.email ? 'translate-x-5' : ''}`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span>App Notifications</span>
              <div 
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer ${notificationSettings.app ? 'bg-gym-orange' : 'bg-gray-300'}`}
                onClick={() => handleNotificationChange('app')}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notificationSettings.app ? 'translate-x-5' : ''}`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span>SMS Notifications</span>
              <div 
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer ${notificationSettings.sms ? 'bg-gym-orange' : 'bg-gray-300'}`}
                onClick={() => handleNotificationChange('sms')}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notificationSettings.sms ? 'translate-x-5' : ''}`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Marketing Communications</span>
              <div 
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer ${notificationSettings.marketing ? 'bg-gym-orange' : 'bg-gray-300'}`}
                onClick={() => handleNotificationChange('marketing')}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notificationSettings.marketing ? 'translate-x-5' : ''}`}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Show Profile Publicly</span>
              <div 
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer ${privacySettings.showProfilePublicly ? 'bg-gym-orange' : 'bg-gray-300'}`}
                onClick={() => handlePrivacyChange('showProfilePublicly')}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${privacySettings.showProfilePublicly ? 'translate-x-5' : ''}`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Share Workout Data</span>
              <div 
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer ${privacySettings.shareWorkoutData ? 'bg-gym-orange' : 'bg-gray-300'}`}
                onClick={() => handlePrivacyChange('shareWorkoutData')}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${privacySettings.shareWorkoutData ? 'translate-x-5' : ''}`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Allow Data Analysis</span>
              <div 
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer ${privacySettings.allowDataAnalysis ? 'bg-gym-orange' : 'bg-gray-300'}`}
                onClick={() => handlePrivacyChange('allowDataAnalysis')}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${privacySettings.allowDataAnalysis ? 'translate-x-5' : ''}`}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Change Password */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <Button type="submit">Update Password</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="bg-gym-orange hover:bg-gym-orange/90">
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
