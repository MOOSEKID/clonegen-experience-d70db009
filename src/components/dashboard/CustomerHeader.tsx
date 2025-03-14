
import { useState, useEffect } from 'react';
import { Search, Bell, Menu, ChevronDown, User, LogOut, Settings, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CustomerHeaderProps {
  toggleSidebar: () => void;
}

const CustomerHeader = ({ toggleSidebar }: CustomerHeaderProps) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        if (data) setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchProfile();
  }, [user]);
  
  // Get user details from supabase user or fallback to localStorage
  const userEmail = user?.email || localStorage.getItem('userEmail') || '';
  const userName = profile?.full_name || user?.user_metadata?.name || localStorage.getItem('userName') || 'User';

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="bg-gym-darkblue py-3 px-6 flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="text-white/80 hover:text-white transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={22} />
        </button>
        
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search"
            className="w-64 rounded-full bg-gym-dark/50 border border-gray-700 pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gym-orange focus:border-gym-orange"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative text-white/80 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-gym-orange text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 text-white hover:text-gym-orange transition-colors"
          >
            <Avatar className="h-8 w-8 border border-gym-orange/50">
              <AvatarImage src={profile?.avatar_url} alt={userName} />
              <AvatarFallback className="bg-gym-orange/20 text-gym-orange">
                {userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:block font-medium">{userName}</span>
            <ChevronDown size={16} className={cn("transition-transform", userMenuOpen && "rotate-180")} />
          </button>
          
          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-gym-darkblue border border-gray-700 rounded-md shadow-lg py-1 z-10">
              <div className="px-4 py-3 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={profile?.avatar_url} alt={userName} />
                    <AvatarFallback className="bg-gym-orange/20 text-gym-orange">
                      {userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-white">{userName}</p>
                    <p className="text-xs text-gray-400">{userEmail}</p>
                  </div>
                </div>
              </div>
              <a href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gym-dark hover:text-white transition-colors">
                <UserCircle size={16} />
                <span>Your Profile</span>
              </a>
              <a href="/dashboard/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gym-dark hover:text-white transition-colors">
                <Settings size={16} />
                <span>Settings</span>
              </a>
              <button 
                onClick={handleSignOut}
                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gym-dark hover:text-white transition-colors"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;
