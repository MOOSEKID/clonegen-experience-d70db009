
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createSpecificAdmin } from '@/utils/createAdmin';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export default function CreateAdminButton() {
  const [isCreating, setIsCreating] = useState(false);
  const { createAdminAccount } = useAuth();
  
  const handleCreateAdmin = async () => {
    setIsCreating(true);
    try {
      // Admin credentials
      const email = "uptowngyms@gmail.com";
      const password = "UptownGym@123";
      const name = "Uptown Gyms Admin";
      
      const { error } = await createAdminAccount(email, password, name);
      
      if (error) {
        toast.error(`Failed to create admin: ${error.message}`);
      } else {
        toast.success('Admin account created successfully!');
        toast.info('Email: uptowngyms@gmail.com, Password: UptownGym@123');
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsCreating(false);
    }
  };
  
  return (
    <Button 
      onClick={handleCreateAdmin}
      disabled={isCreating}
      className="bg-red-600 hover:bg-red-700 text-white"
    >
      {isCreating ? 'Creating Admin...' : 'Create Admin Account'}
    </Button>
  );
}
