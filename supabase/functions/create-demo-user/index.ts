import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Use service role key to create user without authentication
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const demoEmail = "amaan.khan@demo.com";
    const demoPassword = "aaaa";
    const demoName = "Amaan Khan";

    // Check if user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const userExists = existingUsers?.users?.some(u => u.email === demoEmail);

    if (userExists) {
      return new Response(
        JSON.stringify({ 
          message: 'Demo user already exists',
          email: demoEmail,
          name: demoName
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create demo user using admin API
    const { data: newUser, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
      email: demoEmail,
      password: demoPassword,
      email_confirm: true,
      user_metadata: {
        full_name: demoName,
        reporting_manager: "Vinay Kumar (Manager)"
      }
    });

    if (signUpError) throw signUpError;

    if (!newUser.user) {
      throw new Error('Failed to create user');
    }

    console.log('Demo user created:', newUser.user.id);

    // Get leave types
    const { data: leaveTypes, error: leaveTypesError } = await supabaseAdmin
      .from('leave_types')
      .select('id, name');

    if (leaveTypesError) throw leaveTypesError;

    // Create leave balances
    const balancesData = leaveTypes.map(lt => {
      let granted = 0, availed = 0, balance = 0;
      
      switch (lt.name) {
        case 'Casual Leave':
          granted = 5; availed = 5; balance = 0;
          break;
        case 'Sick Leave':
          granted = 6; availed = 0; balance = 6;
          break;
        case 'Privilege Leave':
          granted = 16.5; availed = 14.5; balance = 2;
          break;
        case 'Compensatory Off':
          granted = 0; availed = 0; balance = 0;
          break;
        case 'Miss Punch':
          granted = 0; availed = 23; balance = -23;
          break;
        case 'Loss Of Pay':
          granted = 0; availed = 6; balance = -6;
          break;
      }

      return {
        user_id: newUser.user.id,
        leave_type_id: lt.id,
        granted,
        availed,
        balance,
        year: 2025
      };
    });

    const { error: balancesError } = await supabaseAdmin
      .from('leave_balances')
      .insert(balancesData);

    if (balancesError) throw balancesError;

    // Create sample leave applications
    const privilegeLeaveId = leaveTypes.find(lt => lt.name === 'Privilege Leave')?.id;
    const sickLeaveId = leaveTypes.find(lt => lt.name === 'Sick Leave')?.id;
    const casualLeaveId = leaveTypes.find(lt => lt.name === 'Casual Leave')?.id;

    const applications = [
      {
        user_id: newUser.user.id,
        leave_type_id: privilegeLeaveId,
        from_date: '2025-01-15',
        from_session: 'Session 1',
        to_date: '2025-01-17',
        to_session: 'Session 2',
        days: 3,
        comments: 'Family vacation to Goa',
        status: 'Approved',
        reporting_manager: 'Vinay Kumar (Manager)',
        applied_on: '2025-01-05T10:30:00Z'
      },
      {
        user_id: newUser.user.id,
        leave_type_id: sickLeaveId,
        from_date: '2025-11-20',
        from_session: 'Session 1',
        to_date: '2025-11-21',
        to_session: 'Session 2',
        days: 2,
        comments: 'Medical appointment and recovery',
        status: 'Pending',
        reporting_manager: 'Vinay Kumar (Manager)',
        applied_on: new Date().toISOString()
      },
      {
        user_id: newUser.user.id,
        leave_type_id: casualLeaveId,
        from_date: '2025-02-10',
        from_session: 'Session 2',
        to_date: '2025-02-10',
        to_session: 'Session 2',
        days: 0.5,
        comments: 'Personal work',
        status: 'Approved',
        reporting_manager: 'Vinay Kumar (Manager)',
        applied_on: '2025-02-08T14:20:00Z'
      },
      {
        user_id: newUser.user.id,
        leave_type_id: privilegeLeaveId,
        from_date: '2025-03-01',
        from_session: 'Session 1',
        to_date: '2025-03-05',
        to_session: 'Session 2',
        days: 5,
        comments: 'Extended weekend trip',
        status: 'Rejected',
        reporting_manager: 'Vinay Kumar (Manager)',
        applied_on: '2025-02-25T11:45:00Z'
      },
      {
        user_id: newUser.user.id,
        leave_type_id: casualLeaveId,
        from_date: '2025-12-05',
        from_session: 'Session 1',
        to_date: '2025-12-05',
        to_session: 'Session 2',
        days: 1,
        comments: 'Plans changed - Cancellation requested',
        status: 'Cancelled',
        reporting_manager: 'Vinay Kumar (Manager)',
        applied_on: '2025-11-28T16:00:00Z'
      },
      {
        user_id: newUser.user.id,
        leave_type_id: privilegeLeaveId,
        from_date: '2025-10-20',
        from_session: 'Session 1',
        to_date: '2025-10-25',
        to_session: 'Session 2',
        days: 6,
        comments: 'Diwali celebration with family',
        status: 'Approved',
        reporting_manager: 'Vinay Kumar (Manager)',
        applied_on: '2025-10-10T10:00:00Z'
      },
      {
        user_id: newUser.user.id,
        leave_type_id: casualLeaveId,
        from_date: '2025-12-24',
        from_session: 'Session 1',
        to_date: '2025-12-24',
        to_session: 'Session 2',
        days: 1,
        comments: 'Christmas eve plans',
        status: 'Pending',
        reporting_manager: 'Vinay Kumar (Manager)',
        applied_on: new Date().toISOString()
      }
    ];

    const { error: applicationsError } = await supabaseAdmin
      .from('leave_applications')
      .insert(applications);

    if (applicationsError) throw applicationsError;

    return new Response(
      JSON.stringify({ 
        message: 'Demo user created successfully with leave data',
        email: demoEmail,
        password: demoPassword,
        name: demoName,
        userId: newUser.user.id,
        balances: balancesData.length,
        applications: applications.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error creating demo user:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
