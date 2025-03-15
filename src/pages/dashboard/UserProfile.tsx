
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    memberSince: '',
    membershipType: '',
    profileImage: ''
  });

  useEffect(() => {
    // Mock data for demonstration
    setProfile({
      fullName: localStorage.getItem('userName') || 'John Doe',
      email: user?.email || localStorage.getItem('userEmail') || 'john.doe@example.com',
      phoneNumber: '+1 (555) 123-4567',
      address: '123 Fitness St, Workout City, WC 12345',
      memberSince: 'January 2023',
      membershipType: 'Premium',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
    });
  }, [user]);

  const handleSaveChanges = () => {
    // Mock save changes
    toast.success('Profile updated successfully');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
              <img 
                src={profile.profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">{profile.fullName}</h3>
            <p className="text-gray-500">{profile.email}</p>
            <div className="bg-gym-orange/20 text-gym-orange px-3 py-1 rounded-full mt-2">
              {profile.membershipType} Member
            </div>
            <p className="text-sm text-gray-500 mt-2">Member since: {profile.memberSince}</p>
          </CardContent>
        </Card>
        
        {/* Personal Information Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="w-full p-2 border rounded"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={profile.phoneNumber}
                  onChange={(e) => setProfile({...profile, phoneNumber: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
