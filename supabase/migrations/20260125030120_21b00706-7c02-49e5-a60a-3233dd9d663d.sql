-- Revoke public/anonymous access to sensitive user data tables
-- This prevents unauthenticated users from querying these tables

-- Revoke all permissions from anon role on profiles table
REVOKE ALL ON public.profiles FROM anon;

-- Revoke all permissions from anon role on ai_summaries table
REVOKE ALL ON public.ai_summaries FROM anon;

-- Also revoke from other sensitive tables for consistency
REVOKE ALL ON public.reading_history FROM anon;
REVOKE ALL ON public.saved_studies FROM anon;
REVOKE ALL ON public.study_notes FROM anon;
REVOKE ALL ON public.user_interests FROM anon;