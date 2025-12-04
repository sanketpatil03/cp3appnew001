-- Allow managers to view their team members' profiles
CREATE POLICY "Managers can view their team profiles"
ON public.profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.manager_hierarchy
    WHERE manager_hierarchy.employee_id = profiles.id
    AND manager_hierarchy.manager_id = auth.uid()
  )
);