import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.76.1';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting auto-escalation check...');
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get escalation config
    const { data: config } = await supabase
      .from('escalation_config')
      .select('*')
      .single();

    if (!config || !config.enabled) {
      console.log('Auto-escalation is disabled');
      return new Response(JSON.stringify({ message: 'Auto-escalation disabled' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Escalation config: ${config.escalation_hours} hours`);

    // Calculate cutoff time
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - config.escalation_hours);

    // Find pending applications that need escalation
    const { data: pendingApps, error: fetchError } = await supabase
      .from('leave_applications')
      .select(`
        id,
        user_id,
        current_approver_id,
        approval_level,
        applied_on,
        escalated_at,
        manager_hierarchy!leave_applications_user_id_fkey (
          employee_id,
          manager_id,
          level
        )
      `)
      .eq('status', 'Pending')
      .lt('applied_on', cutoffTime.toISOString())
      .is('escalated_at', null);

    if (fetchError) {
      console.error('Error fetching pending applications:', fetchError);
      throw fetchError;
    }

    console.log(`Found ${pendingApps?.length || 0} applications to escalate`);

    if (!pendingApps || pendingApps.length === 0) {
      return new Response(JSON.stringify({ message: 'No applications to escalate', count: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let escalatedCount = 0;

    for (const app of pendingApps) {
      console.log(`Processing application ${app.id}`);
      
      // Get current manager's hierarchy
      const { data: currentManager } = await supabase
        .from('manager_hierarchy')
        .select('manager_id, level')
        .eq('employee_id', app.user_id)
        .single();

      if (!currentManager || !currentManager.manager_id) {
        console.log(`No manager found for user ${app.user_id}, escalating to admin`);
        
        // Get an admin user
        const { data: adminRole } = await supabase
          .from('user_roles')
          .select('user_id')
          .eq('role', 'admin')
          .limit(1)
          .single();

        if (adminRole) {
          // Escalate to admin
          await supabase
            .from('leave_applications')
            .update({
              current_approver_id: adminRole.user_id,
              escalated_at: new Date().toISOString(),
              approval_level: app.approval_level + 1,
            })
            .eq('id', app.id);

          console.log(`Escalated ${app.id} to admin`);
          escalatedCount++;
        }
        continue;
      }

      // Find next level manager
      const { data: nextManager } = await supabase
        .from('manager_hierarchy')
        .select('manager_id')
        .eq('employee_id', currentManager.manager_id)
        .single();

      if (nextManager && nextManager.manager_id) {
        // Escalate to next level manager
        await supabase
          .from('leave_applications')
          .update({
            current_approver_id: nextManager.manager_id,
            escalated_at: new Date().toISOString(),
            approval_level: app.approval_level + 1,
          })
          .eq('id', app.id);

        console.log(`Escalated ${app.id} to next level manager`);
        escalatedCount++;
      } else {
        // No next level manager, escalate to admin
        const { data: adminRole } = await supabase
          .from('user_roles')
          .select('user_id')
          .eq('role', 'admin')
          .limit(1)
          .single();

        if (adminRole) {
          await supabase
            .from('leave_applications')
            .update({
              current_approver_id: adminRole.user_id,
              escalated_at: new Date().toISOString(),
              approval_level: app.approval_level + 1,
            })
            .eq('id', app.id);

          console.log(`Escalated ${app.id} to admin (no higher manager)`);
          escalatedCount++;
        }
      }
    }

    console.log(`Successfully escalated ${escalatedCount} applications`);

    return new Response(
      JSON.stringify({ 
        message: 'Escalation completed', 
        count: escalatedCount,
        processed: pendingApps.length 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error in auto-escalate-leaves:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
