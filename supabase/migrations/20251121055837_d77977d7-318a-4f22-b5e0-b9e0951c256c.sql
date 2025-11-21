-- Phase 1: Core Validation Tables

-- Create holidays table
CREATE TABLE public.holidays (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'national', -- national, company, regional
  year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(date)
);

ALTER TABLE public.holidays ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Holidays are viewable by authenticated users"
ON public.holidays
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Create weekly_offs configuration table
CREATE TABLE public.weekly_offs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL, -- 0=Sunday, 1=Monday, etc.
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, day_of_week)
);

ALTER TABLE public.weekly_offs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own weekly offs"
ON public.weekly_offs
FOR SELECT
USING (auth.uid() = user_id);

-- Add configuration columns to leave_types
ALTER TABLE public.leave_types 
ADD COLUMN requires_balance_check BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN mandatory_attachment_days INTEGER DEFAULT NULL,
ADD COLUMN is_lwp BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN requires_approval BOOLEAN NOT NULL DEFAULT true;

-- Phase 2: User Roles and Hierarchy

-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('rep', 'manager', 'admin');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create manager_hierarchy table
CREATE TABLE public.manager_hierarchy (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  manager_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  level INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(employee_id)
);

ALTER TABLE public.manager_hierarchy ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own hierarchy"
ON public.manager_hierarchy
FOR SELECT
USING (auth.uid() = employee_id OR auth.uid() = manager_id);

CREATE POLICY "Managers can view their team hierarchy"
ON public.manager_hierarchy
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.manager_hierarchy
    WHERE manager_id = auth.uid()
  )
);

-- Create trigger for manager_hierarchy updated_at
CREATE TRIGGER update_manager_hierarchy_updated_at
BEFORE UPDATE ON public.manager_hierarchy
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create leave_approvals table
CREATE TABLE public.leave_approvals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID REFERENCES public.leave_applications(id) ON DELETE CASCADE NOT NULL,
  approver_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL, -- 'approved', 'rejected', 'pending'
  level INTEGER NOT NULL DEFAULT 1,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.leave_approvals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view approvals for their applications"
ON public.leave_approvals
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.leave_applications
    WHERE id = application_id
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Managers can view approvals for their team"
ON public.leave_approvals
FOR SELECT
USING (
  public.has_role(auth.uid(), 'manager') OR 
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Managers can insert approvals"
ON public.leave_approvals
FOR INSERT
WITH CHECK (
  public.has_role(auth.uid(), 'manager') OR 
  public.has_role(auth.uid(), 'admin')
);

-- Create trigger for leave_approvals updated_at
CREATE TRIGGER update_leave_approvals_updated_at
BEFORE UPDATE ON public.leave_approvals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add escalation and approval fields to leave_applications
ALTER TABLE public.leave_applications
ADD COLUMN approval_level INTEGER NOT NULL DEFAULT 1,
ADD COLUMN escalated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN current_approver_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN cancelled_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN cancellation_reason TEXT,
ADD COLUMN cancellation_approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create escalation_config table
CREATE TABLE public.escalation_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  escalation_hours INTEGER NOT NULL DEFAULT 48,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.escalation_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage escalation config"
ON public.escalation_config
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Insert default escalation config
INSERT INTO public.escalation_config (escalation_hours, enabled)
VALUES (48, true);

-- Update RLS policies for leave_applications to support manager access
CREATE POLICY "Managers can view their team leave applications"
ON public.leave_applications
FOR SELECT
USING (
  public.has_role(auth.uid(), 'manager') AND
  EXISTS (
    SELECT 1 FROM public.manager_hierarchy mh
    JOIN public.leave_applications la ON la.user_id = mh.employee_id
    WHERE mh.manager_id = auth.uid()
    AND la.id = leave_applications.id
  )
);

CREATE POLICY "Admins can view all leave applications"
ON public.leave_applications
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Managers can update leave applications for approval"
ON public.leave_applications
FOR UPDATE
USING (
  (public.has_role(auth.uid(), 'manager') AND current_approver_id = auth.uid()) OR
  public.has_role(auth.uid(), 'admin')
);