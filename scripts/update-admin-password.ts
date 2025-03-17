import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database.types';

const SUPABASE_URL = "https://uldnqunqeibvocxsbkhb.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;

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

const updateAdminPassword = async () => {
  try {
    console.log('Updating admin password...');

    // Get admin user
    const { data: adminUser, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'admin@uptowngym.rw')
      .single();

    if (userError) {
      throw new Error(`Error finding admin user: ${userError.message}`);
    }

    if (!adminUser) {
      throw new Error('Admin user not found');
    }

    // Update admin password
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      adminUser.id,
      { password: 'admin123' }
    );

    if (updateError) {
      throw new Error(`Error updating admin password: ${updateError.message}`);
    }

    console.log('Successfully updated admin password');

  } catch (error) {
    console.error('Error:', error);
  }
};

// Run the update
updateAdminPassword();
