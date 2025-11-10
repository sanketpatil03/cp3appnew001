-- Create leave_types table
CREATE TABLE public.leave_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leave_balances table
CREATE TABLE public.leave_balances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  leave_type_id UUID NOT NULL REFERENCES public.leave_types(id) ON DELETE CASCADE,
  granted DECIMAL(5,1) NOT NULL DEFAULT 0,
  availed DECIMAL(5,1) NOT NULL DEFAULT 0,
  balance DECIMAL(5,1) NOT NULL DEFAULT 0,
  year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, leave_type_id, year)
);

-- Create leave_applications table
CREATE TABLE public.leave_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  leave_type_id UUID NOT NULL REFERENCES public.leave_types(id) ON DELETE CASCADE,
  from_date DATE NOT NULL,
  from_session TEXT NOT NULL CHECK (from_session IN ('Session 1', 'Session 2')),
  to_date DATE NOT NULL,
  to_session TEXT NOT NULL CHECK (to_session IN ('Session 1', 'Session 2')),
  days DECIMAL(5,1) NOT NULL,
  comments TEXT,
  attachment_url TEXT,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Cancelled')),
  reporting_manager TEXT NOT NULL,
  applied_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leave_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for leave_types (readable by all authenticated users)
CREATE POLICY "Leave types are viewable by authenticated users"
  ON public.leave_types FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for leave_balances
CREATE POLICY "Users can view their own leave balances"
  ON public.leave_balances FOR SELECT
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own leave balances"
  ON public.leave_balances FOR UPDATE
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own leave balances"
  ON public.leave_balances FOR INSERT
  WITH CHECK (auth.uid()::text = user_id::text);

-- RLS Policies for leave_applications
CREATE POLICY "Users can view their own leave applications"
  ON public.leave_applications FOR SELECT
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own leave applications"
  ON public.leave_applications FOR INSERT
  WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own leave applications"
  ON public.leave_applications FOR UPDATE
  USING (auth.uid()::text = user_id::text);

-- Create trigger for updating updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_leave_balances_updated_at
  BEFORE UPDATE ON public.leave_balances
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leave_applications_updated_at
  BEFORE UPDATE ON public.leave_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample leave types
INSERT INTO public.leave_types (name, description) VALUES
  ('Casual Leave', 'Short-term leave for personal matters'),
  ('Sick Leave', 'Leave for health-related issues'),
  ('Privilege Leave', 'Earned leave for long service'),
  ('Compensatory Off', 'Leave granted for working on holidays'),
  ('Miss Punch', 'Leave for attendance discrepancies'),
  ('Loss Of Pay', 'Unpaid leave');