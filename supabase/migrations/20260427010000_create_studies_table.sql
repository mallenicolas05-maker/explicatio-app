CREATE TABLE IF NOT EXISTS public.studies (
  slug                  TEXT PRIMARY KEY,
  study_id              TEXT UNIQUE,
  category_id           TEXT,
  category              TEXT NOT NULL,
  category_color        TEXT,
  title                 TEXT NOT NULL,
  excerpt               TEXT,
  date                  TEXT,
  read_time             TEXT,
  journal               TEXT,
  image_url             TEXT,
  keywords              TEXT[] DEFAULT '{}',
  researchers           JSONB DEFAULT '[]'::jsonb,
  institutions          TEXT[] DEFAULT '{}',
  summary               TEXT,
  execution_protocol    JSONB DEFAULT '[]'::jsonb,
  research_objective    TEXT,
  methodology           JSONB,
  observations          TEXT[] DEFAULT '{}',
  impact                TEXT,
  constraints           TEXT,
  source                JSONB,
  openalex_id           TEXT UNIQUE,
  source_url            TEXT,
  published_date        DATE,
  tags                  TEXT[] DEFAULT '{}',
  audio_url             TEXT,
  card_image_url        TEXT,
  hero_image_url        TEXT,
  summary_raw           TEXT,
  summary_final         TEXT,
  pipeline_status       TEXT DEFAULT 'complete',
  is_static_migrated    BOOLEAN DEFAULT FALSE,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.studies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Studies are publicly readable" ON public.studies;
CREATE POLICY "Studies are publicly readable"
ON public.studies FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Service role can insert studies" ON public.studies;
CREATE POLICY "Service role can insert studies"
ON public.studies FOR INSERT TO service_role
WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can update studies" ON public.studies;
CREATE POLICY "Service role can update studies"
ON public.studies FOR UPDATE TO service_role
USING (true);

DROP TRIGGER IF EXISTS update_studies_updated_at ON public.studies;
CREATE TRIGGER update_studies_updated_at
BEFORE UPDATE ON public.studies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
