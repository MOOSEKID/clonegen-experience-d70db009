
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.42.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Check if the request is a POST request
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Create Supabase client
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client with the user's token
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    });

    // Check if user is authorized (superadmin)
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized access' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user is superadmin using the is_superadmin function
    const { data: isAdmin, error: adminCheckError } = await supabase.rpc('is_superadmin');
    if (adminCheckError || !isAdmin) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized access - Superadmin privileges required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get request body for optional parameters
    let params = {};
    try {
      if (req.body) {
        const body = await req.json();
        params = body;
      }
    } catch (e) {
      // If body parsing fails, continue with default params
      console.log('No body provided or invalid JSON, using defaults');
    }

    // Execute the sync_missing_trainer_profiles function
    const { data: result, error: syncError } = await supabase.rpc('sync_missing_trainer_profiles');
    
    if (syncError) {
      console.error('Error syncing profiles:', syncError);
      return new Response(
        JSON.stringify({ error: 'Failed to sync profiles', details: syncError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log action in admin audit logs
    await supabase.from('admin_audit_logs').insert({
      admin_id: userData.user.id,
      action: 'Manual profile sync triggered',
      details: {
        role: params.role || 'trainer',
        timestamp: new Date().toISOString()
      }
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Staff profiles synchronized successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Unhandled error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
})
