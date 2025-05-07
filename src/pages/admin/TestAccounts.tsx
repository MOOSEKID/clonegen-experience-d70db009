
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { createAdminUser } from '@/services/createAdmin';
import { supabase } from '@/integrations/supabase/client';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Separator } from '@/components/ui/separator';

const TestAccounts = () => {
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [adminEmail, setAdminEmail] = useState('admin@example.com');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [adminName, setAdminName] = useState('Admin User');
  const [userEmail, setUserEmail] = useState('user@example.com');
  const [userPassword, setUserPassword] = useState('user123');
  const [userName, setUserName] = useState('Regular User');

  const handleCreateAdmin = async () => {
    try {
      setIsCreatingAdmin(true);
      
      // Validate inputs
      if (!adminEmail || !adminPassword || !adminName) {
        toast.error('All admin fields are required');
        return;
      }
      
      toast.info('Creating admin test account...');
      
      // Create admin user
      const result = await createAdminUser(adminEmail, adminPassword, adminName);
      
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error creating admin account:', error);
      toast.error('Failed to create admin account');
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      setIsCreatingUser(true);
      
      // Validate inputs
      if (!userEmail || !userPassword || !userName) {
        toast.error('All user fields are required');
        return;
      }
      
      toast.info('Creating regular test account...');
      
      // Try to sign in first to check if user exists
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword
      });
      
      // If user exists
      if (!signInError && signInData.user) {
        console.log('User exists, checking/updating profile');
        
        // Check if profile exists
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id, role, is_admin')
          .eq('id', signInData.user.id)
          .single();
          
        if (!profileError && profileData) {
          console.log('Profile exists, updating if needed');
          
          // Update profile if needed
          if (profileData.role !== 'member' || profileData.is_admin) {
            const { error: updateError } = await supabase
              .from('profiles')
              .update({
                role: 'member',
                is_admin: false,
                full_name: userName
              })
              .eq('id', signInData.user.id);
              
            if (updateError) {
              toast.error('Failed to update user profile');
            } else {
              toast.success('Regular user exists, profile updated');
            }
          } else {
            toast.success('Regular user already exists');
          }
        } else {
          console.log('Profile does not exist, creating');
          
          // Create profile
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{
              id: signInData.user.id,
              full_name: userName,
              email: userEmail,
              role: 'member',
              is_admin: false
            }]);
            
          if (insertError) {
            toast.error('Failed to create user profile');
          } else {
            toast.success('Regular user exists, profile created');
          }
        }
        
        // Sign out
        await supabase.auth.signOut();
      } else {
        console.log('User does not exist, creating');
        
        // Create user
        const { data, error } = await supabase.auth.signUp({
          email: userEmail,
          password: userPassword,
          options: {
            data: {
              full_name: userName,
              role: 'member'
            }
          }
        });
        
        if (error) {
          toast.error('Failed to create regular user: ' + error.message);
        } else if (data.user) {
          // Create profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([{
              id: data.user.id,
              full_name: userName,
              email: userEmail,
              role: 'member',
              is_admin: false
            }]);
            
          if (profileError) {
            toast.error('Failed to create user profile');
          } else {
            toast.success('Regular user created successfully');
          }
        }
      }
    } catch (error) {
      console.error('Error creating regular account:', error);
      toast.error('Failed to create regular account');
    } finally {
      setIsCreatingUser(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Test Accounts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Admin Account Card */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Test Account</CardTitle>
            <CardDescription>Create or update an admin test account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Email</Label>
              <Input 
                id="adminEmail" 
                value={adminEmail} 
                onChange={(e) => setAdminEmail(e.target.value)} 
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminPassword">Password</Label>
              <Input 
                id="adminPassword" 
                type="password" 
                value={adminPassword} 
                onChange={(e) => setAdminPassword(e.target.value)} 
                placeholder="Password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminName">Full Name</Label>
              <Input 
                id="adminName" 
                value={adminName} 
                onChange={(e) => setAdminName(e.target.value)} 
                placeholder="Admin User"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleCreateAdmin} disabled={isCreatingAdmin}>
              {isCreatingAdmin ? (
                <>
                  <LoadingSpinner size="sm" color="white" className="mr-2" />
                  Creating...
                </>
              ) : (
                'Create Admin Account'
              )}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Regular User Account Card */}
        <Card>
          <CardHeader>
            <CardTitle>Regular Test Account</CardTitle>
            <CardDescription>Create or update a regular test account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userEmail">Email</Label>
              <Input 
                id="userEmail" 
                value={userEmail} 
                onChange={(e) => setUserEmail(e.target.value)} 
                placeholder="user@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userPassword">Password</Label>
              <Input 
                id="userPassword" 
                type="password" 
                value={userPassword} 
                onChange={(e) => setUserPassword(e.target.value)} 
                placeholder="Password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userName">Full Name</Label>
              <Input 
                id="userName" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                placeholder="Regular User"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleCreateUser} disabled={isCreatingUser}>
              {isCreatingUser ? (
                <>
                  <LoadingSpinner size="sm" color="white" className="mr-2" />
                  Creating...
                </>
              ) : (
                'Create Regular Account'
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Separator className="my-6" />
      
      <div className="bg-muted p-4 rounded-md">
        <h2 className="text-lg font-medium mb-2">About Test Accounts</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Test accounts are created automatically but can be manually managed here.
          The accounts are automatically configured in the database with the proper roles and permissions.
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Admin account has access to the admin dashboard and all admin features</li>
          <li>Regular account has access to the member dashboard only</li>
        </ul>
      </div>
    </div>
  );
};

export default TestAccounts;
