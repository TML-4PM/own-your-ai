-- Create free_trial_signups table
CREATE TABLE public.free_trial_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  ai_use_case TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.free_trial_signups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form)
CREATE POLICY "Anyone can submit trial signup"
ON public.free_trial_signups
FOR INSERT
WITH CHECK (true);

-- Create policy for service role to read all records
CREATE POLICY "Service role can read all signups"
ON public.free_trial_signups
FOR SELECT
USING (true);

-- Create index on email for faster lookups
CREATE INDEX idx_free_trial_signups_email ON public.free_trial_signups(email);

-- Create index on created_at for sorting
CREATE INDEX idx_free_trial_signups_created_at ON public.free_trial_signups(created_at DESC);