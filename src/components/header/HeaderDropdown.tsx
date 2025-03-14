
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const HeaderDropdown = () => {
  const { user, isLoading, isAdmin, isTrainer, signOut } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-9 w-24 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Link to="/login">
          <Button variant="outline" size="sm">
            Log in
          </Button>
        </Link>
        <Link to="/signup">
          <Button size="sm" className="bg-gym-orange hover:bg-gym-orange/90">
            Sign up
          </Button>
        </Link>
      </div>
    );
  }

  const userInitial = user?.email?.charAt(0).toUpperCase() || 'U';
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center space-x-1 hover:opacity-80 transition-opacity focus:outline-none">
          <Avatar className="h-8 w-8 border border-gray-200">
            <AvatarImage src={user.user_metadata?.avatar_url || ''} />
            <AvatarFallback className="bg-gym-orange text-white">
              {userInitial}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden md:inline ml-2">
            {user.user_metadata?.name || user.email}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 mt-1 p-0" align="end">
        <div className="flex flex-col">
          <div className="border-b border-gray-100 p-3">
            <p className="font-medium text-sm">{user.user_metadata?.name || 'Member'}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <div className="py-2">
            <Link to="/dashboard" className="px-3 py-2 text-sm hover:bg-gray-50 flex items-center">
              Dashboard
            </Link>
            {isAdmin && (
              <Link to="/admin" className="px-3 py-2 text-sm hover:bg-gray-50 flex items-center">
                Admin Panel
              </Link>
            )}
            {isTrainer && (
              <Link to="/trainer" className="px-3 py-2 text-sm hover:bg-gray-50 flex items-center">
                Trainer Portal
              </Link>
            )}
            <Link to="/profile" className="px-3 py-2 text-sm hover:bg-gray-50 flex items-center">
              Profile Settings
            </Link>
            <Link to="/membership" className="px-3 py-2 text-sm hover:bg-gray-50 flex items-center">
              Membership
            </Link>
            <Link to="/reset-password" className="px-3 py-2 text-sm hover:bg-gray-50 flex items-center">
              Reset Password
            </Link>
            <button
              onClick={handleSignOut}
              className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
            >
              Sign out
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HeaderDropdown;
