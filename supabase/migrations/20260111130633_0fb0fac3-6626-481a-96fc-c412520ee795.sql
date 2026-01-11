-- Fix RLS policy for otp_verifications - restrict to authenticated users only
-- Drop the permissive policy
DROP POLICY IF EXISTS "Service role can manage OTP verifications" ON public.otp_verifications;

-- Create restrictive policies - OTP table accessed only through edge functions with service role
-- For anon/authenticated users, we need specific limited policies

-- Users can only view their own OTP status (not the actual code)
CREATE POLICY "Users can view own OTP verification status"
ON public.otp_verifications
FOR SELECT
USING (false);  -- No direct SELECT access, handled by edge functions

-- Users can create OTP request (will be handled by edge function)
CREATE POLICY "No direct insert access"
ON public.otp_verifications
FOR INSERT
WITH CHECK (false);  -- No direct INSERT, handled by edge functions

-- Users can update (verify) their own OTP
CREATE POLICY "No direct update access"
ON public.otp_verifications
FOR UPDATE
USING (false)
WITH CHECK (false);  -- No direct UPDATE, handled by edge functions

-- No delete access
CREATE POLICY "No direct delete access"
ON public.otp_verifications
FOR DELETE
USING (false);