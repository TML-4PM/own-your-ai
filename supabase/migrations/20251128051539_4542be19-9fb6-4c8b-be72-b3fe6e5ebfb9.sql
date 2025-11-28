-- Add phone column to profiles table if it doesn't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;

-- Create enterprise_leads table for Enterprise package contact requests
CREATE TABLE IF NOT EXISTS public.enterprise_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  message text,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.enterprise_leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert enterprise leads
CREATE POLICY "Anyone can submit enterprise lead"
ON public.enterprise_leads
FOR INSERT
WITH CHECK (true);

-- Allow admins to view all leads
CREATE POLICY "Admins can view enterprise leads"
ON public.enterprise_leads
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update leads
CREATE POLICY "Admins can update enterprise leads"
ON public.enterprise_leads
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));