-- Add DELETE policy for user_interests table to allow users to remove their interest data
CREATE POLICY "Users can delete their own interests" 
ON public.user_interests 
FOR DELETE 
USING (auth.uid() = user_id);