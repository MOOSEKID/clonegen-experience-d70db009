import { createContext, useContext, useEffect, useState } from 'react'
import { User, createClient } from '@supabase/supabase-js'
import { toast } from 'sonner'
import { Database } from '../types/database.types'
import { UserProfile, ProfileInsert } from '../types/database.types'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

export interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoading: boolean
  refreshSession: () => Promise<void>
  isAuthenticated: boolean
  isAdmin: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  signIn: async () => {},
  signOut: async () => {},
  isLoading: false,
  refreshSession: async () => {},
  isAuthenticated: false,
  isAdmin: false
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession()
      if (error) {
        console.error('Error refreshing session:', error)
        return
      }

      if (session?.user) {
        setUser(session.user)
        await fetchProfile(session.user)
      }
    } catch (error) {
      console.error('Error in refreshSession:', error)
    }
  }

  useEffect(() => {
    // Initial session check
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser(session.user)
          await fetchProfile(session.user)
        }
      } catch (error) {
        console.error('Error checking session:', error)
      }
    }

    checkSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed')
          if (session?.user) {
            setUser(session.user)
            await fetchProfile(session.user)
          }
        } else if (event === 'SIGNED_IN') {
          if (session?.user) {
            setUser(session.user)
            await fetchProfile(session.user)
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setProfile(null)
        }
      }
    )

    // Set up token refresh interval
    const refreshInterval = setInterval(refreshSession, 3300000) // Refresh every 55 minutes

    return () => {
      subscription.unsubscribe()
      clearInterval(refreshInterval)
    }
  }, [])

  const fetchProfile = async (user: User) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return
      }

      if (profile) {
        setProfile(profile as UserProfile)
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error)
    }
  }

  const verifyAdminProfile = async (user: User): Promise<UserProfile> => {
    try {
      // First check if admin profile exists
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', 'admin@uptowngym.rw')
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error checking admin profile:', fetchError)
        throw new Error('Failed to verify admin profile')
      }

      const defaultAdminProfile: ProfileInsert = {
        id: user.id,
        email: 'admin@uptowngym.rw',
        full_name: 'System Administrator',
        role: 'admin',
        is_admin: true,
        is_staff: true,
        staff_category: 'management',
        department: 'management',
        access_level: 'full',
        status: 'active',
        specializations: null,
        reporting_to: null,
        shift_preference: null,
        max_clients: null,
        certifications: null,
        working_hours: null,
        primary_location: null,
        secondary_locations: null,
        contact_email: null,
        contact_phone: null,
        emergency_contact: null,
        last_login: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      // If no profile exists, create it
      if (!profile) {
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([defaultAdminProfile])
          .select()
          .single()

        if (insertError) {
          console.error('Error creating admin profile:', insertError)
          throw new Error('Failed to create admin profile')
        }

        return newProfile as UserProfile
      }

      // If profile exists but needs updating
      const { data: updatedProfile, error: updateError } = await supabase
        .from('profiles')
        .update({
          id: user.id,
          is_admin: true,
          is_staff: true,
          staff_category: 'management',
          department: 'management',
          access_level: 'full',
          status: 'active',
          last_login: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('email', 'admin@uptowngym.rw')
        .select()
        .single()

      if (updateError) {
        console.error('Error updating admin profile:', updateError)
        throw new Error('Failed to update admin profile')
      }

      return updatedProfile as UserProfile
    } catch (error) {
      console.error('Error in verifyAdminProfile:', error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    if (isLoading) return // Prevent multiple simultaneous sign-in attempts

    try {
      setIsLoading(true)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Sign in error:', error)
        throw error
      }

      if (data.user) {
        if (email === 'admin@uptowngym.rw') {
          try {
            const adminProfile = await verifyAdminProfile(data.user)
            setProfile(adminProfile)
            toast.success('Welcome back, Administrator!')
          } catch (error) {
            console.error('Error verifying admin profile:', error)
            toast.error('Failed to verify admin profile')
          }
        } else {
          await fetchProfile(data.user)
          toast.success('Successfully signed in!')
        }
      }
    } catch (error) {
      console.error('Error signing in:', error)
      toast.error('Failed to sign in. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    if (isLoading) return // Prevent sign-out during loading state

    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      setUser(null)
      setProfile(null)
      toast.success('Successfully signed out!')
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Failed to sign out. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const isAuthenticated = !!user && !!profile
  const isAdmin = isAuthenticated && profile?.is_admin === true

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      signIn, 
      signOut, 
      isLoading, 
      refreshSession,
      isAuthenticated,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  )
}
