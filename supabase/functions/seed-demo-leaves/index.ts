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

    const { userId } = await req.json();
    
    if (!userId) {
      throw new Error('User ID is required');
    }

    console.log('Seeding demo leave applications for user:', userId);

    // Get leave types
    const { data: leaveTypes, error: ltError } = await supabaseAdmin
      .from('leave_types')
      .select('id, name');

    if (ltError) throw ltError;

    const casualLeave = leaveTypes?.find(lt => lt.name === 'Casual Leave');
    const sickLeave = leaveTypes?.find(lt => lt.name === 'Sick Leave');
    const privilegeLeave = leaveTypes?.find(lt => lt.name === 'Privilege Leave');

    if (!casualLeave || !sickLeave || !privilegeLeave) {
      throw new Error('Required leave types not found');
    }

    // Get manager info
    const { data: managerData } = await supabaseAdmin.auth.admin.listUsers();
    const manager = managerData?.users?.find(u => u.email === 'manager@demo.com');
    const managerId = manager?.id;

    // Create dummy leave applications
    const dummyLeaves = [
      {
        user_id: userId,
        leave_type_id: casualLeave.id,
        from_date: '2024-12-20',
        to_date: '2024-12-21',
        from_session: 'Full Day',
        to_session: 'Full Day',
        days: 2,
        status: 'Pending',
        comments: 'Family function in hometown',
        reporting_manager: 'John Manager',
        current_approver_id: managerId
      },
      {
        user_id: userId,
        leave_type_id: sickLeave.id,
        from_date: '2024-11-15',
        to_date: '2024-11-16',
        from_session: 'Full Day',
        to_session: 'Full Day',
        days: 2,
        status: 'Approved',
        comments: 'Feeling unwell, need rest',
        reporting_manager: 'John Manager',
        current_approver_id: managerId
      },
      {
        user_id: userId,
        leave_type_id: privilegeLeave.id,
        from_date: '2024-12-25',
        to_date: '2024-12-31',
        from_session: 'Full Day',
        to_session: 'Full Day',
        days: 5,
        status: 'Pending',
        comments: 'Year-end vacation with family',
        reporting_manager: 'John Manager',
        current_approver_id: managerId
      },
      {
        user_id: userId,
        leave_type_id: casualLeave.id,
        from_date: '2024-10-10',
        to_date: '2024-10-10',
        from_session: 'First Half',
        to_session: 'First Half',
        days: 0.5,
        status: 'Rejected',
        comments: 'Personal work',
        reporting_manager: 'John Manager',
        current_approver_id: managerId
      }
    ];

    // Insert leave applications
    const { data: insertedLeaves, error: insertError } = await supabaseAdmin
      .from('leave_applications')
      .insert(dummyLeaves)
      .select();

    if (insertError) {
      console.error('Error inserting leaves:', insertError);
      throw insertError;
    }

    console.log('Inserted leaves:', insertedLeaves?.length);

    // Add manager hierarchy entry
    if (managerId) {
      const { error: hierarchyError } = await supabaseAdmin
        .from('manager_hierarchy')
        .upsert({
          employee_id: userId,
          manager_id: managerId,
          level: 1
        }, { onConflict: 'employee_id' });

      if (hierarchyError) {
        console.error('Error creating hierarchy:', hierarchyError);
      } else {
        console.log('Manager hierarchy created');
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Demo leaves seeded successfully',
        count: insertedLeaves?.length 
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