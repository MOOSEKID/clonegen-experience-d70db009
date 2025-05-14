
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    // Get authorization header
    const authorization = req.headers.get("Authorization");
    if (!authorization) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create a Supabase client with the auth header
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      {
        global: {
          headers: {
            Authorization: authorization,
          },
        },
      }
    );

    // Verify the user is a superadmin
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check if user is superadmin
    const { data: isSuperadmin, error: isSuperadminError } = await supabaseClient.rpc("is_superadmin");
    
    if (isSuperadminError || !isSuperadmin) {
      return new Response(
        JSON.stringify({ 
          error: "Unauthorized. Only superadmins can perform this action.",
          details: isSuperadminError ? isSuperadminError.message : "Not a superadmin"
        }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get role filter (if any) from request body
    let roleFilter: string | null = null;
    if (req.method === "POST") {
      try {
        const body = await req.json();
        roleFilter = body.role || null;
      } catch (e) {
        // If JSON parsing fails, just continue without a role filter
      }
    }

    // Call the sync_missing_trainer_profiles function
    // This will create trainer profiles for staff members with role="trainer"
    const { data: syncResult, error: syncError } = await supabaseClient.rpc("sync_missing_trainer_profiles");

    if (syncError) {
      console.error("Error syncing profiles:", syncError);
      return new Response(
        JSON.stringify({ 
          error: "Failed to sync profiles", 
          details: syncError.message
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Record the action in the audit log
    const { error: auditError } = await supabaseClient
      .from("admin_audit_logs")
      .insert({
        admin_id: user.id,
        action: "Manual profile sync triggered",
        details: { role_filter: roleFilter, method: "sync_missing_trainer_profiles" }
      });

    if (auditError) {
      console.error("Error recording audit log:", auditError);
      // Continue even if audit logging fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Staff profile sync completed successfully",
        details: syncResult
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Function error:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Internal Server Error", 
        details: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
