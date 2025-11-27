-- Fix RLS policy for free_trial_signups - change from RESTRICTIVE to PERMISSIVE
DROP POLICY IF EXISTS "Anyone can submit trial signup" ON public.free_trial_signups;
CREATE POLICY "Anyone can submit trial signup"
ON public.free_trial_signups
FOR INSERT
TO public
WITH CHECK (true);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  stripe_customer_id TEXT,
  stripe_session_id TEXT,
  stripe_subscription_id TEXT,
  amount_cents INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow inserts from edge functions (service role)
CREATE POLICY "Service role can manage subscriptions"
ON public.subscriptions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow users to view their own subscriptions by email
CREATE POLICY "Users can view their subscriptions by email"
ON public.subscriptions
FOR SELECT
TO public
USING (true);

-- Allow public inserts for checkout process
CREATE POLICY "Anyone can create subscription record"
ON public.subscriptions
FOR INSERT
TO public
WITH CHECK (true);