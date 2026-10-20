-- Add country and affiliation columns to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS country text,
ADD COLUMN IF NOT EXISTS affiliation text;