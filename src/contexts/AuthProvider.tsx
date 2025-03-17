import { ReactNode, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useAuthState } from '@/hooks/useAuthState';
import { AuthContextType, AuthUser, UserRole, AccessLevel } from '@/types/auth.types';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { 
    user, 
    isAdmin,
    isLoading, 
    isAuthenticated,
    setUser,
    setIsAdmin,
    setIsAuthenticated,
    setIsLoading
  } = useAuthState();

  const fetchUserProfile = async (userId: string): Promise<Partial<AuthUser> | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data as Partial<AuthUser>;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  const createDefaultAdminIfNeeded = async () => {
    try {
      const { data: existingAdmins, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('is_admin', true)
        .limit(1);

      if (checkError) {
        console.error('Error checking for admins:', checkError);
        return;
      }

      if (!existingAdmins || existingAdmins.length === 0) {
        console.log('No admin found, creating default admin account');
        
        // Checking for existing admin user - this API might differ based on Supabase version
        try {
          const { data: userList, error: userListError } = await supabase.auth.admin.listUsers({
            perPage: 1,
            page: 1,
          });
          
          let adminExists = false;
          
          if (userList && userList.users) {
            adminExists = userList.users.some(user => 
              user.email && user.email === 'admin@uptowngym.rw'
            );
          }
          
          if (userListError) {
            console.error('Error checking for existing admin user:', userListError);
            return;
          }
          
          if (!adminExists) {
            const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
              email: 'admin@uptowngym.rw',
              password: 'Admin123!',
              email_confirm: true,
              user_metadata: {
                full_name: 'System Administrator'
              }
            });
            
            if (authError) {
              console.error('Error creating default admin user:', authError);
              return;
            }
            
            if (authUser && authUser.user) {
              const { error: profileError } = await supabase
                .from('profiles')
                .insert([
                  {
                    id: authUser.user.id,
                    email: 'admin@uptowngym.rw',
                    full_name: 'System Administrator',
                    role: 'admin',
                    is_admin: true,
                    access_level: 'Full'
                  }
                ]);
                
              if (profileError) {
                console.error('Error creating default admin profile:', profileError);
              } else {
                console.log('Default admin account created successfully');
              }
            }
          }
        } catch (err) {
          console.error('Error in admin user check:', err);
        }
      }
    } catch (error) {
      console.error('Error in createDefaultAdminIfNeeded:', error);
    }
  };

  useEffect(() => {
    const setupAuthListener = async () => {
      try {
        await createDefaultAdminIfNeeded();
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log('Initial session found:', session.user.email);
          const profile = await fetchUserProfile(session.user.id);
          
          if (profile) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              full_name: profile.full_name || session.user.user_metadata?.full_name || '',
              role: profile.role || 'member',
              is_admin: profile.is_admin || false,
              is_staff: profile.is_staff || false,
              status: profile.status || 'Active',
              access_level: profile.access_level || 'Basic',
              created_at: profile.created_at || new Date().toISOString(),
              updated_at: profile.updated_at || new Date().toISOString(),
              user_metadata: session.user.user_metadata,
              avatar_url: profile.avatar_url
            });
            setIsAdmin(profile.is_admin || false);
            setIsAuthenticated(true);
          } else {
            const isKnownAdmin = session.user.email === 'admin@uptowngym.rw';
            
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              full_name: session.user.user_metadata?.full_name || session.user.email || '',
              role: isKnownAdmin ? 'admin' : 'member',
              is_admin: isKnownAdmin,
              is_staff: false,
              status: 'Active',
              access_level: 'Basic',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              user_metadata: session.user.user_metadata
            });
            setIsAdmin(isKnownAdmin);
            setIsAuthenticated(true);
            
            const { error: profileError } = await supabase
              .from('profiles')
              .insert([
                { 
                  id: session.user.id,
                  email: session.user.email,
                  full_name: session.user.user_metadata?.full_name || session.user.email,
                  role: isKnownAdmin ? 'admin' : 'member',
                  is_admin: isKnownAdmin
                }
              ]);
              
            if (profileError && profileError.code !== '23505') {
              console.error('Error creating profile during auth setup:', profileError);
            }
          }
        }
        
        setIsLoading(false);
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth state changed:', event, session?.user?.email);
            
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
              if (session) {
                const profile = await fetchUserProfile(session.user.id);
                
                if (profile) {
                  setUser({
                    id: session.user.id,
                    email: session.user.email || '',
                    full_name: profile.full_name || session.user.user_metadata?.full_name || '',
                    role: profile.role || 'member',
                    is_admin: profile.is_admin || false,
                    is_staff: profile.is_staff || false,
                    status: profile.status || 'Active',
                    access_level: profile.access_level || 'Basic',
                    created_at: profile.created_at || new Date().toISOString(),
                    updated_at: profile.updated_at || new Date().toISOString(),
                    user_metadata: session.user.user_metadata,
                    avatar_url: profile.avatar_url
                  });
                  setIsAdmin(profile.is_admin || false);
                  setIsAuthenticated(true);
                } else {
                  const isKnownAdmin = session.user.email === 'admin@uptowngym.rw';
                  
                  setUser({
                    id: session.user.id,
                    email: session.user.email || '',
                    full_name: session.user.user_metadata?.full_name || session.user.email || '',
                    role: isKnownAdmin ? 'admin' : 'member',
                    is_admin: isKnownAdmin,
                    is_staff: false,
                    status: 'Active',
                    access_level: 'Basic',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    user_metadata: session.user.user_metadata
                  });
                  setIsAdmin(isKnownAdmin);
                  setIsAuthenticated(true);
                  
                  const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                      { 
                        id: session.user.id,
                        email: session.user.email,
                        full_name: session.user.user_metadata?.full_name || session.user.email,
                        role: isKnownAdmin ? 'admin' : 'member',
                        is_admin: isKnownAdmin
                      }
                    ]);
                    
                  if (profileError && profileError.code !== '23505') {
                    console.error('Error creating profile on sign in:', profileError);
                  }
                }
              }
            } else if (event === 'SIGNED_OUT') {
              setUser(null);
              setIsAdmin(false);
              setIsAuthenticated(false);
            }
          }
        );

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error setting up auth listener:', error);
        setIsLoading(false);
      }
    };

    setupAuthListener();
  }, [setUser, setIsAdmin, setIsAuthenticated, setIsLoading]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please check your credentials.');
      return false;
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    fullName: string,
    role: UserRole = 'client'
  ): Promise<boolean> => {
    try {
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      if (!user?.id) throw new Error('User ID not found');

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            email,
            full_name: fullName,
            role,
            status: 'Active',
            is_admin: email === 'admin@example.com',
            access_level: 'Basic'
          },
        ]);

      if (profileError) throw profileError;
      
      toast.success('Account created! Please verify your email to continue.');
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Failed to create account. Please try again.');
      return false;
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success('Successfully logged out');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout. Please try again.');
      return false;
    }
  };

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      toast.success('Password reset instructions sent to your email.');
      return true;
    } catch (error) {
      console.error('Password reset request error:', error);
      toast.error('Failed to send reset instructions. Please try again.');
      return false;
    }
  };

  const updatePassword = async (newPassword: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
      toast.success('Password updated successfully.');
      return true;
    } catch (error) {
      console.error('Password update error:', error);
      toast.error('Failed to update password. Please try again.');
      return false;
    }
  };

  const updateProfile = async (data: Partial<AuthUser>): Promise<boolean> => {
    try {
      if (!user?.id) throw new Error('No user logged in');

      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) throw error;

      const profile = await fetchUserProfile(user.id);
      if (profile) {
        setUser({
          ...user,
          ...profile
        });
        setIsAdmin(profile.is_admin || false);
      }

      toast.success('Profile updated successfully.');
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile. Please try again.');
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isAdmin,
    isStaff: user?.is_staff || false,
    isLoading,
    isAuthenticated,
    login,
    signUp,
    logout,
    requestPasswordReset,
    updatePassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
