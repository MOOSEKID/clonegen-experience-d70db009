// @ts-check
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.production' });

// Define types for our schema
const StaffCategory = {
  Management: 'management',
  Training: 'training',
  Operations: 'operations',
  Reception: 'reception',
  Maintenance: 'maintenance'
} as const;

const AccessLevel = {
  Full: 'full',
  High: 'high',
  Medium: 'medium',
  Basic: 'basic',
  Limited: 'limited'
} as const;

const StaffStatus = {
  Active: 'active',
  Inactive: 'inactive',
  OnLeave: 'on_leave',
  Terminated: 'terminated'
} as const;

const Department = {
  Management: 'management',
  Training: 'training',
  Operations: 'operations',
  Maintenance: 'maintenance',
  Reception: 'reception',
  Nutrition: 'nutrition',
  Rehabilitation: 'rehabilitation'
} as const;

const WorkingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

// Admin user configuration based on our schema and email convention
const adminConfig = {
  email: 'admin@uptowngym.rw',
  password: process.env.ADMIN_PASSWORD || 'admin@123', // Use env var if available
  full_name: 'Admin User',
  role: 'admin',
  staffCategory: StaffCategory.Management,
  department: Department.Management,
  accessLevel: AccessLevel.Full,
  status: StaffStatus.Active,
  workingHours: {
    start: '09:00',
    end: '17:00',
    days: WorkingDays
  },
  specializations: [],
  certifications: [],
  primary_location: 'Main Gym',
  secondary_locations: [],
  emergency_contact: {
    name: 'Emergency Contact',
    relationship: 'Administrator',
    phone: '',
    email: ''
  }
} as const;

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Error: Required environment variables are not set');
  console.error('Please ensure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
  process.exit(1);
}

// Create admin client with service role key
const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  }
);

const createAdminProfile = async (userId: string) => {
  const profile = {
    id: userId,
    email: adminConfig.email,
    full_name: adminConfig.full_name,
    role: adminConfig.role,
    is_admin: true,
    is_staff: true,
    staff_category: adminConfig.staffCategory,
    department: adminConfig.department,
    access_level: adminConfig.accessLevel,
    status: adminConfig.status,
    specializations: adminConfig.specializations,
    certifications: adminConfig.certifications,
    working_hours: adminConfig.workingHours,
    primary_location: adminConfig.primary_location,
    secondary_locations: adminConfig.secondary_locations,
    contact_email: adminConfig.email,
    contact_phone: null,
    emergency_contact: adminConfig.emergency_contact,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const { error: profileError } = await supabase
    .from('profiles')
    .upsert(profile);

  if (profileError) {
    throw new Error(`Error creating admin profile: ${profileError.message}`);
  }

  console.log('Successfully created admin profile');
};

const setupAdminUser = async () => {
  try {
    console.log('Setting up admin user...');

    // Check if admin user already exists in auth.users
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();
    
    if (usersError) {
      throw new Error(`Error checking existing users: ${usersError.message}`);
    }

    const existingAdmin = users?.find(user => user.email === adminConfig.email);

    if (existingAdmin) {
      console.log('Admin user already exists in auth.users');

      // Check if profile exists and matches our schema
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', existingAdmin.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw new Error(`Error checking admin profile: ${profileError.message}`);
      }

      if (!profile) {
        console.log('Creating admin profile for existing auth user...');
        await createAdminProfile(existingAdmin.id);
      } else {
        // Update existing profile to match our schema
        console.log('Updating existing admin profile to match schema...');
        await createAdminProfile(existingAdmin.id);
      }

      return;
    }

    // Create new admin user
    console.log('Creating new admin user...');
    const { data: authData, error: createError } = await supabase.auth.admin.createUser({
      email: adminConfig.email,
      password: adminConfig.password,
      email_confirm: true,
      user_metadata: {
        full_name: adminConfig.full_name
      }
    });

    if (createError) {
      throw new Error(`Error creating admin user: ${createError.message}`);
    }

    if (!authData.user) {
      throw new Error('No user data returned');
    }

    // Create admin profile
    await createAdminProfile(authData.user.id);

    console.log(`Successfully set up admin user with email: ${adminConfig.email}`);
    console.log(`Default password: ${adminConfig.password}`);
    console.log('Please change the password after first login');

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Run the setup
setupAdminUser();
