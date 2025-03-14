
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function CreateAdminButton() {
  const [isCreating, setIsCreating] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const { createAdminAccount } = useAuth();
  
  // Admin credentials
  const email = "uptowngym250@gmail.com";
  const password = "UptownGym@123";
  const name = "Uptown Gyms Admin";
  
  const handleCreateAdmin = async () => {
    setIsCreating(true);
    try {
      const { error } = await createAdminAccount(email, password, name);
      
      if (error) {
        toast.error(`Failed to create admin: ${error.message}`);
      } else {
        toast.success('Admin account created successfully!');
        setShowCredentials(true);
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsCreating(false);
    }
  };
  
  return (
    <>
      <Button 
        onClick={handleCreateAdmin}
        disabled={isCreating}
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        {isCreating ? 'Creating Admin...' : 'Create Admin Account'}
      </Button>
      
      <Dialog open={showCredentials} onOpenChange={setShowCredentials}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Credentials</DialogTitle>
            <DialogDescription>
              Use these credentials to log in as an administrator.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-md">
              <div className="font-medium">Email:</div>
              <div className="col-span-2 font-mono bg-gray-100 px-2 rounded">{email}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-md">
              <div className="font-medium">Password:</div>
              <div className="col-span-2 font-mono bg-gray-100 px-2 rounded">{password}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-md">
              <div className="font-medium">Name:</div>
              <div className="col-span-2 font-mono bg-gray-100 px-2 rounded">{name}</div>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t text-sm text-gray-500">
            Please save these credentials in a secure location.
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
