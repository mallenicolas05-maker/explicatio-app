-- Fix security vulnerability: Convert RESTRICTIVE policies to PERMISSIVE policies for authenticated role only
-- This prevents unauthenticated/anonymous users from accessing user data

-- ==========================================
-- PROFILES TABLE - Fix public exposure
-- ==========================================

-- Drop existing RESTRICTIVE policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create PERMISSIVE policies targeting authenticated role only
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- ==========================================
-- AI_SUMMARIES TABLE - Fix public exposure
-- ==========================================

-- Drop existing RESTRICTIVE policies
DROP POLICY IF EXISTS "Users can view their own ai summaries" ON public.ai_summaries;
DROP POLICY IF EXISTS "Users can insert their own ai summaries" ON public.ai_summaries;
DROP POLICY IF EXISTS "Users can delete their own ai summaries" ON public.ai_summaries;

-- Create PERMISSIVE policies targeting authenticated role only
CREATE POLICY "Users can view their own ai summaries"
ON public.ai_summaries FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ai summaries"
ON public.ai_summaries FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ai summaries"
ON public.ai_summaries FOR DELETE
TO authenticated
USING (auth.uid() = user_id);