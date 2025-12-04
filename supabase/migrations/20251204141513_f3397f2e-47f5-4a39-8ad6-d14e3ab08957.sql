-- Create security definer function to check if user is a manager
CREATE OR REPLACE FUNCTION public.is_manager(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.manager_hierarchy
    WHERE manager_id = _user_id
  )
$$;

-- Drop the problematic policy
DROP POLICY IF EXISTS "Managers can view their team hierarchy" ON public.manager_hierarchy;

-- Recreate with security definer function
CREATE POLICY "Managers can view their team hierarchy" 
ON public.manager_hierarchy
FOR SELECT
USING (
  public.is_manager(auth.uid())
);