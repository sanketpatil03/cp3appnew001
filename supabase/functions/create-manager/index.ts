import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    console.log('Creating manager account...');

    // Check if manager already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingManager = existingUsers?.users?.find(u => u.email === 'manager@demo.com');

    let managerId: string;

    if (existingManager) {
      console.log('Manager already exists:', existingManager.id);
      managerId = existingManager.id;
    } else {
      // Create manager user
      const { data: managerUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: 'manager@demo.com',
        password: 'aaaa',
        email_confirm: true,
        user_metadata: {
          full_name: 'John Manager',
          reporting_manager: 'CEO'
        }
      });

      if (createError) {
        console.error('Error creating manager:', createError);
        throw createError;
      }

      managerId = managerUser.user.id;
      console.log('Manager created:', managerId);
    }

    // Check if manager role already exists
    const { data: existingRole } = await supabaseAdmin
      .from('user_roles')
      .select('*')
      .eq('user_id', managerId)
      .eq('role', 'manager')
      .maybeSingle();

    if (!existingRole) {
      // Assign manager role
      const { error: roleError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: managerId,
          role: 'manager'
        });

      if (roleError) {
        console.error('Error assigning role:', roleError);
        throw roleError;
      }
      console.log('Manager role assigned');
    }

    // Check if profile exists, create if not
    const { data: existingProfile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', managerId)
      .maybeSingle();

    if (!existingProfile) {
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: managerId,
          full_name: 'John Manager',
          reporting_manager: 'CEO',
          department: 'Sales',
          employee_id: 'MGR001'
        });

      if (profileError) {
        console.error('Error creating profile:', profileError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Manager account created successfully',
        managerId 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});