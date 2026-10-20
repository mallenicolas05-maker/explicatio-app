-- Fix RLS policies for profiles table
-- Drop existing SELECT policy if it exists and recreate as PERMISSIVE
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Fix RLS policies for ai_summaries table
-- Drop existing SELECT policy if it exists and recreate as PERMISSIVE
DROP POLICY IF EXISTS "Users can view their own ai summaries" ON public.ai_summaries;

CREATE POLICY "Users can view their own ai summaries" 
ON public.ai_summaries 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);