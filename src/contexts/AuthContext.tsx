import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any | null, data: any | null }>;
  signOut: () => Promise<void>;
  createAdminAccount: (email: string, password: string, name: string) => Promise<{ error: any | null, data: any | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error fetching session:', error);
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();
        
        setIsAdmin(profile?.is_admin || false);
      }
      
      setIsLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', session.user.email || '');
        localStorage.setItem('userName', session.user.user_metadata.name || '');
        
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);
        document.cookie = `session_active=true; path=/; expires=${expiryDate.toUTCString()}`;
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();
        
        setIsAdmin(profile?.is_admin || false);
      } else {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('isAdmin');
        document.cookie = 'session_active=; path=/; max-age=0';
        document.cookie = 'user_role=; path=/; max-age=0';
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message);
        return { error };
      }
      
      toast.success('Logged in successfully');
      return { error: null };
    } catch (error) {
      toast.error('An unexpected error occurred');
      return { error };
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      console.log('Signing up user with data:', { email, ...userData });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            username: userData.username || email.split('@')[0],
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      
      if (error) {
        toast.error(error.message);
        return { error, data: null };
      }
      
      console.log('Signup successful:', data);
      
      if (data.user) {
        setTimeout(async () => {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user?.id)
            .single();
          
          if (profileError || !profile) {
            console.warn('Profile not created automatically, attempting manual creation');
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([{
                id: data.user?.id,
                full_name: userData.name,
                username: userData.username || email.split('@')[0],
              }]);
              
            if (insertError) {
              console.error('Error creating profile manually:', insertError);
            } else {
              console.log('Profile created manually');
            }
          } else {
            console.log('Profile created automatically:', profile);
          }
        }, 1000);
      }
      
      toast.success('Account created successfully!');
      return { error: null, data };
    } catch (error) {
      toast.error('An unexpected error occurred during signup');
      return { error, data: null };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      document.cookie = "session_active=; path=/; max-age=0";
      document.cookie = "user_role=; path=/; max-age=0";
    } catch (error) {
      toast.error('Error signing out');
      console.error('Error signing out:', error);
    }
  };

  const createAdminAccount = async (email: string, password: string, name: string) => {
    try {
      console.log('Creating admin account:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || email.split('@')[0],
            username: email.split('@')[0],
          }
        }
      });
      
      if (error) {
        toast.error(`Error creating admin: ${error.message}`);
        return { error, data: null };
      }
      
      console.log('Admin signup successful:', data);
      
      if (data.user) {
        setTimeout(async () => {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user?.id)
            .single();
          
          if (profileError || !profile) {
            console.warn('Profile not created automatically, creating manually');
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([{
                id: data.user?.id,
                full_name: name || email.split('@')[0],
                username: email.split('@')[0],
                is_admin: true,
                role: 'admin'
              }]);
              
            if (insertError) {
              console.error('Error creating admin profile manually:', insertError);
              toast.error('Error setting admin privileges');
            } else {
              console.log('Admin profile created manually');
              toast.success('Admin account created successfully');
            }
          } else {
            const { error: updateError } = await supabase
              .from('profiles')
              .update({ 
                is_admin: true,
                role: 'admin'
              })
              .eq('id', data.user?.id);
              
            if (updateError) {
              console.error('Error updating profile to admin:', updateError);
              toast.error('Error setting admin privileges');
            } else {
              console.log('Profile updated to admin');
              toast.success('Admin account created successfully');
            }
          }
        }, 1000);
      }
      
      return { error: null, data };
    } catch (error) {
      toast.error('An unexpected error occurred creating admin account');
      return { error, data: null };
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isAdmin,
    signIn,
    signUp,
    signOut,
    createAdminAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
