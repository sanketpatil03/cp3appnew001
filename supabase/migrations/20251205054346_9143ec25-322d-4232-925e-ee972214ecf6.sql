-- Drop the problematic policy
DROP POLICY IF EXISTS "Managers can view their team leave applications" ON public.leave_applications;

-- Create a fixed policy that doesn't self-reference
CREATE POLICY "Managers can view their team leave applications" 
ON public.leave_applications 
FOR SELECT 
USING (
  has_role(auth.uid(), 'manager'::app_role) 
  AND EXISTS (
    SELECT 1 FROM manager_hierarchy mh 
    WHERE mh.manager_id = auth.uid() 
    AND mh.employee_id = leave_applications.user_id
  )
);