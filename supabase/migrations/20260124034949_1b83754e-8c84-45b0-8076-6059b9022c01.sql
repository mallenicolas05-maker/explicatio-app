-- Add onboarding data columns to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS display_name text,
ADD COLUMN IF NOT EXISTS preferred_language text DEFAULT 'English',
ADD COLUMN IF NOT EXISTS discovery_source text,
ADD COLUMN IF NOT EXISTS professional_identity text,
ADD COLUMN IF NOT EXISTS interests text[] DEFAULT '{}';