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
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const authHeader = req.headers.get('Authorization')!;

    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Get leave types
    const { data: leaveTypes, error: leaveTypesError } = await supabase
      .from('leave_types')
      .select('id, name');

    if (leaveTypesError) throw leaveTypesError;

    // Check if user already has leave balances
    const { data: existingBalances } = await supabase
      .from('leave_balances')
      .select('id')
      .eq('user_id', user.id)
      .eq('year', 2025)
      .limit(1);

    if (existingBalances && existingBalances.length > 0) {
      return new Response(
        JSON.stringify({ message: 'Leave balances already exist for this user' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

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
        user_id: user.id,
        leave_type_id: lt.id,
        granted,
        availed,
        balance,
        year: 2025
      };
    });

    const { error: balancesError } = await supabase
      .from('leave_balances')
      .insert(balancesData);

    if (balancesError) throw balancesError;

    // Create sample leave applications
    const privilegeLeaveId = leaveTypes.find(lt => lt.name === 'Privilege Leave')?.id;
    const sickLeaveId = leaveTypes.find(lt => lt.name === 'Sick Leave')?.id;
    const casualLeaveId = leaveTypes.find(lt => lt.name === 'Casual Leave')?.id;

    const applications = [
      {
        user_id: user.id,
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
        user_id: user.id,
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
        user_id: user.id,
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
        user_id: user.id,
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
        user_id: user.id,
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
        user_id: user.id,
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
        user_id: user.id,
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

    const { error: applicationsError } = await supabase
      .from('leave_applications')
      .insert(applications);

    if (applicationsError) throw applicationsError;

    return new Response(
      JSON.stringify({ 
        message: 'Dummy leave data created successfully',
        balances: balancesData.length,
        applications: applications.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
