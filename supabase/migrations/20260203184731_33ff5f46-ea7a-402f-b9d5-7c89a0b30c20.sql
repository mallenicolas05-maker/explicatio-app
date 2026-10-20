-- Create a table for saved text highlights
CREATE TABLE public.saved_highlights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  study_slug TEXT NOT NULL,
  highlighted_text TEXT NOT NULL,
  background_color TEXT NOT NULL DEFAULT '#dbeafe',
  text_color TEXT NOT NULL DEFAULT '#1e40af',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.saved_highlights ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own highlights" 
ON public.saved_highlights 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own highlights" 
ON public.saved_highlights 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own highlights" 
ON public.saved_highlights 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add index for faster lookups
CREATE INDEX idx_saved_highlights_user_id ON public.saved_highlights(user_id);
CREATE INDEX idx_saved_highlights_study_slug ON public.saved_highlights(study_slug);