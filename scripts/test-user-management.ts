import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database.types';

// Initialize Supabase client with service role key for admin operations
const SUPABASE_URL = "https://uldnqunqeibvocxsbkhb.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!; // Must be set in environment

const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Test users data with proper role-based email conventions
const testUsers = [
  // Management
  { email: 'admin@uptowngym.rw', password: 'admin123', role: 'admin', full_name: 'Admin User', access_level: 'full', staff_category: 'management', department: 'management' },
  { email: 'general.manager.john.smith@uptowngym.rw', password: 'manager123', role: 'general_manager', full_name: 'John Smith', access_level: 'full', staff_category: 'management', department: 'management' },
  { email: 'operations.manager.sarah.johnson@uptowngym.rw', password: 'ops123', role: 'operations_manager', full_name: 'Sarah Johnson', access_level: 'high', staff_category: 'management', department: 'operations' },
  { email: 'fitness.manager.mike.wilson@uptowngym.rw', password: 'fit123', role: 'fitness_manager', full_name: 'Mike Wilson', access_level: 'high', staff_category: 'management', department: 'training' },
  
  // Training staff
  { email: 'head.trainer.david.brown@uptowngym.rw', password: 'head123', role: 'head_trainer', full_name: 'David Brown', access_level: 'high', staff_category: 'training', department: 'training' },
  { email: 'senior.trainer.emma.davis@uptowngym.rw', password: 'senior123', role: 'senior_trainer', full_name: 'Emma Davis', access_level: 'medium', staff_category: 'training', department: 'training' },
  { email: 'trainer.james.anderson@uptowngym.rw', password: 'trainer123', role: 'trainer', full_name: 'James Anderson', access_level: 'basic', staff_category: 'training', department: 'training' },
  { email: 'trainee.lisa.white@uptowngym.rw', password: 'trainee123', role: 'trainee_trainer', full_name: 'Lisa White', access_level: 'limited', staff_category: 'training', department: 'training' },
  
  // Operations staff
  { email: 'supervisor.robert.taylor@uptowngym.rw', password: 'super123', role: 'operations_supervisor', full_name: 'Robert Taylor', access_level: 'medium', staff_category: 'operations', department: 'operations' },
  { email: 'receptionist.mary.clark@uptowngym.rw', password: 'recep123', role: 'receptionist', full_name: 'Mary Clark', access_level: 'basic', staff_category: 'reception', department: 'reception' },
  { email: 'membership.patricia.lee@uptowngym.rw', password: 'member123', role: 'membership_coordinator', full_name: 'Patricia Lee', access_level: 'basic', staff_category: 'operations', department: 'operations' },
  { email: 'nutritionist.daniel.green@uptowngym.rw', password: 'nutri123', role: 'nutritionist', full_name: 'Daniel Green', access_level: 'basic', staff_category: 'operations', department: 'nutrition' },
  { email: 'physio.susan.hall@uptowngym.rw', password: 'physio123', role: 'physiotherapist', full_name: 'Susan Hall', access_level: 'basic', staff_category: 'operations', department: 'rehabilitation' },
  
  // Maintenance staff
  { email: 'maintenance.supervisor.george.king@uptowngym.rw', password: 'maint123', role: 'maintenance_supervisor', full_name: 'George King', access_level: 'medium', staff_category: 'maintenance', department: 'maintenance' },
  { email: 'maintenance.thomas.wright@uptowngym.rw', password: 'staff123', role: 'maintenance_staff', full_name: 'Thomas Wright', access_level: 'basic', staff_category: 'maintenance', department: 'maintenance' },
  { email: 'cleaner.linda.martinez@uptowngym.rw', password: 'clean123', role: 'cleaner', full_name: 'Linda Martinez', access_level: 'basic', staff_category: 'maintenance', department: 'maintenance' }
];

const testUserManagement = async () => {
  try {
    console.log('Starting user management system test...\n');

    // Create test users
    console.log('1. Creating test users...');
    for (const user of testUsers) {
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', user.email)
        .maybeSingle();

      if (existingUser) {
        console.log(`User ${user.email} already exists`);
        continue;
      }

      // Create auth user with service role
      const { data: authData, error: signUpError } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true
      });

      if (signUpError) {
        console.error(`Error creating auth user ${user.email}:`, signUpError.message);
        continue;
      }

      if (!authData.user) {
        console.error(`No user data returned for ${user.email}`);
        continue;
      }

      // Create profile with all required fields
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
          is_admin: user.role === 'admin',
          is_staff: true,
          staff_category: user.staff_category,
          department: user.department,
          access_level: user.access_level,
          status: 'active',
          working_hours: {
            start: '09:00',
            end: '17:00',
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
          },
          primary_location: 'Main Gym',
          contact_email: user.email,
          contact_phone: '+250700000000',
          emergency_contact: {
            name: 'Emergency Contact',
            relationship: 'Family',
            phone: '+250700000001'
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (profileError) {
        console.error(`Error creating profile for ${user.email}:`, profileError.message);
        continue;
      }

      console.log(`Created user: ${user.email} (${user.role})`);
    }

    // Verify user profiles
    console.log('\n2. Verifying user profiles...');
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .order('role');

    if (profileError) {
      throw new Error(`Error fetching profiles: ${profileError.message}`);
    }

    if (!profiles) {
      throw new Error('No profiles found');
    }

    console.log(`\nFound ${profiles.length} user profiles`);

    // Profile statistics
    console.log('\n3. User Profile Statistics:');
    console.log('-------------------------');
    
    const roleCategories = new Map<string, number>();
    const accessLevels = new Map<string, number>();
    const departments = new Map<string, number>();

    profiles.forEach(profile => {
      // Count role categories
      const category = profile.staff_category || 'client';
      roleCategories.set(category, (roleCategories.get(category) || 0) + 1);

      // Count access levels
      const access = profile.access_level || 'none';
      accessLevels.set(access, (accessLevels.get(access) || 0) + 1);

      // Count departments
      const dept = profile.department || 'none';
      departments.set(dept, (departments.get(dept) || 0) + 1);
    });

    console.log('\nRole Categories Distribution:');
    roleCategories.forEach((count, category) => {
      console.log(`${category}: ${count} users`);
    });

    console.log('\nAccess Levels Distribution:');
    accessLevels.forEach((count, level) => {
      console.log(`${level}: ${count} users`);
    });

    console.log('\nDepartment Distribution:');
    departments.forEach((count, dept) => {
      console.log(`${dept}: ${count} users`);
    });

    console.log('\nUser management system test completed!');

  } catch (error) {
    console.error('Error during user management test:', error);
  }
};

// Run the test
testUserManagement();
