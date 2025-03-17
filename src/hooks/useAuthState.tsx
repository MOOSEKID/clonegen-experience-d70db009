
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { AuthUser } from '@/types/auth.types';

/**
 * A hook that provides the authentication state
 */
export const useAuthState = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Initial auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Check for existing session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking auth session:', error);
          setIsLoading(false);
          return;
        }
        
        if (!session) {
          console.log('No active session found');
          setUser(null);
          setIsAdmin(false);
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        
        console.log('Active session found for user:', session.user.email);
        
        // Fetch profile data
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();
          
        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          setIsLoading(false);
          return;
        }
        
        // Special handling for admin email
        const isKnownAdmin = session.user.email === 'admin@uptowngym.rw';
                            
        // Update auth state
        if (profile) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            full_name: profile.full_name || session.user.user_metadata?.full_name || '',
            role: profile.role || 'member',
            is_admin: profile.is_admin || isKnownAdmin,
            is_staff: profile.is_staff || false,
            status: profile.status || 'Active',
            access_level: profile.access_level || 'Basic',
            created_at: profile.created_at || new Date().toISOString(),
            updated_at: profile.updated_at || new Date().toISOString(),
            user_metadata: session.user.user_metadata,
            avatar_url: profile.avatar_url
          });
          setIsAdmin(profile.is_admin || isKnownAdmin);
          setIsAuthenticated(true);
        } else {
          // If no profile found, attempt to create one
          console.log('No profile found for user, attempting to create one');
          
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([{
              id: session.user.id,
              email: session.user.email,
              full_name: session.user.user_metadata?.full_name || session.user.email,
              role: isKnownAdmin ? 'admin' : 'member',
              is_admin: isKnownAdmin,
              access_level: isKnownAdmin ? 'Full' : 'Basic',
              status: 'Active'
            }])
            .select()
            .single();
            
          if (insertError) {
            console.error('Error creating profile:', insertError);
          } else {
            console.log('Profile created successfully');
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              full_name: newProfile.full_name || session.user.user_metadata?.full_name || '',
              role: newProfile.role || 'member',
              is_admin: newProfile.is_admin || isKnownAdmin,
              is_staff: newProfile.is_staff || false,
              status: newProfile.status || 'Active',
              access_level: newProfile.access_level || 'Basic',
              created_at: newProfile.created_at || new Date().toISOString(),
              updated_at: newProfile.updated_at || new Date().toISOString(),
              user_metadata: session.user.user_metadata
            });
            setIsAdmin(newProfile.is_admin || isKnownAdmin);
            setIsAuthenticated(true);
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error in auth check:', error);
        setUser(null);
        setIsAdmin(false);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Set up auth state change listeners
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED') {
          if (session) {
            // Fetch the user's profile on sign in or token refresh
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();
            
            const isKnownAdmin = session.user.email === 'admin@uptowngym.rw';
            
            if (profile) {
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                full_name: profile.full_name || session.user.user_metadata?.full_name || '',
                role: profile.role || 'member',
                is_admin: profile.is_admin || isKnownAdmin,
                is_staff: profile.is_staff || false,
                status: profile.status || 'Active',
                access_level: profile.access_level || 'Basic',
                created_at: profile.created_at || new Date().toISOString(),
                updated_at: profile.updated_at || new Date().toISOString(),
                user_metadata: session.user.user_metadata,
                avatar_url: profile.avatar_url
              });
              setIsAdmin(profile.is_admin || isKnownAdmin);
              setIsAuthenticated(true);
            } else {
              // If profile doesn't exist, create minimal user data
              console.log('No profile found on auth state change, creating one');
              
              const { data: newProfile, error: insertError } = await supabase
                .from('profiles')
                .insert([{
                  id: session.user.id,
                  email: session.user.email,
                  full_name: session.user.user_metadata?.full_name || session.user.email,
                  role: isKnownAdmin ? 'admin' : 'member',
                  is_admin: isKnownAdmin,
                  access_level: isKnownAdmin ? 'Full' : 'Basic',
                  status: 'Active'
                }])
                .select()
                .single();
                
              if (insertError) {
                console.error('Error creating profile on auth state change:', insertError);
                
                // Still set basic user info even if profile creation fails
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
              } else {
                console.log('Profile created successfully on auth state change');
                setUser({
                  id: session.user.id,
                  email: session.user.email || '',
                  full_name: newProfile.full_name || session.user.user_metadata?.full_name || '',
                  role: newProfile.role || 'member',
                  is_admin: newProfile.is_admin || isKnownAdmin,
                  is_staff: newProfile.is_staff || false,
                  status: newProfile.status || 'Active',
                  access_level: newProfile.access_level || 'Basic',
                  created_at: newProfile.created_at || new Date().toISOString(),
                  updated_at: newProfile.updated_at || new Date().toISOString(),
                  user_metadata: session.user.user_metadata
                });
              }
              
              setIsAdmin(isKnownAdmin);
              setIsAuthenticated(true);
            }
          }
        } else if (event === 'SIGNED_OUT') {
          // Clear auth state on sign out
          console.log('User signed out, clearing auth state');
          setUser(null);
          setIsAdmin(false);
          setIsAuthenticated(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    isAdmin,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAdmin,
    setIsAuthenticated,
    setIsLoading
  };
};

export default useAuthState;
