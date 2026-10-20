-- Fix remaining tables: Convert RESTRICTIVE policies to PERMISSIVE policies for authenticated role only

-- ==========================================
-- READING_HISTORY TABLE
-- ==========================================
DROP POLICY IF EXISTS "Users can view their own reading history" ON public.reading_history;
DROP POLICY IF EXISTS "Users can insert their own reading history" ON public.reading_history;
DROP POLICY IF EXISTS "Users can update their own reading history" ON public.reading_history;
DROP POLICY IF EXISTS "Users can delete their own reading history" ON public.reading_history;

CREATE POLICY "Users can view their own reading history"
ON public.reading_history FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reading history"
ON public.reading_history FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reading history"
ON public.reading_history FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reading history"
ON public.reading_history FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ==========================================
-- STUDY_NOTES TABLE
-- ==========================================
DROP POLICY IF EXISTS "Users can view their own study notes" ON public.study_notes;
DROP POLICY IF EXISTS "Users can insert their own study notes" ON public.study_notes;
DROP POLICY IF EXISTS "Users can update their own study notes" ON public.study_notes;
DROP POLICY IF EXISTS "Users can delete their own study notes" ON public.study_notes;

CREATE POLICY "Users can view their own study notes"
ON public.study_notes FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own study notes"
ON public.study_notes FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own study notes"
ON public.study_notes FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own study notes"
ON public.study_notes FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ==========================================
-- SAVED_STUDIES TABLE
-- ==========================================
DROP POLICY IF EXISTS "Users can view their own saved studies" ON public.saved_studies;
DROP POLICY IF EXISTS "Users can save studies" ON public.saved_studies;
DROP POLICY IF EXISTS "Users can unsave studies" ON public.saved_studies;

CREATE POLICY "Users can view their own saved studies"
ON public.saved_studies FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can save studies"
ON public.saved_studies FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave studies"
ON public.saved_studies FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ==========================================
-- USER_INTERESTS TABLE
-- ==========================================
DROP POLICY IF EXISTS "Users can view their own interests" ON public.user_interests;
DROP POLICY IF EXISTS "Users can insert their own interests" ON public.user_interests;
DROP POLICY IF EXISTS "Users can update their own interests" ON public.user_interests;
DROP POLICY IF EXISTS "Users can delete their own interests" ON public.user_interests;

CREATE POLICY "Users can view their own interests"
ON public.user_interests FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own interests"
ON public.user_interests FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interests"
ON public.user_interests FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interests"
ON public.user_interests FOR DELETE
TO authenticated
USING (auth.uid() = user_id);