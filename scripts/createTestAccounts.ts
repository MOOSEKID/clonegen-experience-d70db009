import { supabase } from '../src/lib/supabase';

const createTestAccounts = async () => {
  try {
    // Create Admin Account
    let { error: adminError } = await supabase.auth.signUp({
      email: 'admin@uptowngym.rw',
      password: 'admin123',
    });
    if (adminError) throw adminError;
    console.log('Admin account created.');

    // Create Trainer Account
    let { error: trainerError } = await supabase.auth.signUp({
      email: 'trainer.john@uptowngym.rw',
      password: 'trainer123',
    });
    if (trainerError) throw trainerError;
    console.log('Trainer account created.');

    // Create Member Account
    let { error: memberError } = await supabase.auth.signUp({
      email: 'member.jane@uptowngym.rw',
      password: 'member123',
    });
    if (memberError) throw memberError;
    console.log('Member account created.');
  } catch (error) {
    console.error('Error creating test accounts:', error.message);
  }
};

createTestAccounts();
