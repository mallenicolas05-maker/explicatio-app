import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type PipelineStatus =
  | 'pending'
  | 'summarized'
  | 'reviewed'
  | 'tts_done'
  | 'images_done'
  | 'complete'
  | 'error';

export type SummaryObject = {
  headline: string;
  tldr: string;
  body: string[];
  practical_takeaway: string;
  keywords?: string[];
  execution_protocol?: Array<{ title: string; desc: string }>;
};

export type StudyRow = {
  slug: string;
  study_id?: string | null;
  category_id?: string | null;
  category: string;
  category_color?: string | null;
  title: string;
  excerpt?: string | null;
  date?: string | null;
  read_time?: string | null;
  journal?: string | null;
  image_url?: string | null;
  keywords?: string[] | null;
  researchers?: Array<{ name: string; role: string }> | null;
  institutions?: string[] | null;
  summary?: string | null;
  execution_protocol?: Array<{ title: string; desc: string }> | null;
  research_objective?: string | null;
  methodology?: unknown;
  observations?: string[] | null;
  impact?: string | null;
  constraints?: string | null;
  source?: { title?: string; doi?: string; link?: string } | null;
  openalex_id?: string | null;
  source_url?: string | null;
  published_date?: string | null;
  tags?: string[] | null;
  audio_url?: string | null;
  card_image_url?: string | null;
  hero_image_url?: string | null;
  summary_raw?: string | null;
  summary_final?: string | null;
  pipeline_status?: PipelineStatus | null;
};

const PROJECT_URL = 'https://xfvjzmuvwgzdwjowczbe.supabase.co';

export function getEnv(name: string): string {
  const processEnv =
    typeof process !== 'undefined' && process.env ? process.env[name] : undefined;
  const viteEnv =
    typeof import.meta !== 'undefined' && import.meta.env
      ? (import.meta.env[name] as string | undefined)
      : undefined;
  const value = processEnv || viteEnv;

  if (!value) {
    throw new Error(`${name} is not configured`);
  }

  return value;
}

export function getPublicSupabaseUrl(): string {
  return getEnv('VITE_SUPABASE_URL') || PROJECT_URL;
}

export function getAdminSupabase() {
  return createClient<any>(getPublicSupabaseUrl(), getEnv('SUPABASE_SERVICE_ROLE_KEY'), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function getReadonlySupabase() {
  return supabase as any;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function toSlug(input: string, maxLength = 60): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, maxLength)
    .replace(/-+$/g, '');
}

export function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function parseSummary(value: string | null | undefined): SummaryObject {
  if (!value) {
    throw new Error('Study summary is empty');
  }

  const parsed = JSON.parse(value) as SummaryObject;
  if (!parsed.body || !Array.isArray(parsed.body) || !parsed.practical_takeaway) {
    throw new Error('Study summary does not match the expected JSON shape');
  }

  return parsed;
}

export async function uploadPublicFile(
  bucket: string,
  path: string,
  file: ArrayBuffer | Blob | Uint8Array,
  contentType: string,
): Promise<string> {
  const admin = getAdminSupabase();
  const { error } = await admin.storage.from(bucket).upload(path, file, {
    contentType,
    upsert: true,
  });

  if (error) {
    throw error;
  }

  const { data } = admin.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function updateStudy(slug: string, values: Partial<StudyRow>) {
  const admin = getAdminSupabase();
  const { error } = await admin.from('studies').update(values).eq('slug', slug);

  if (error) {
    throw error;
  }
}

export async function getStudy(slug: string): Promise<StudyRow> {
  const admin = getAdminSupabase();
  const { data, error } = await admin.from('studies').select('*').eq('slug', slug).single();

  if (error) {
    throw error;
  }

  return data as StudyRow;
}

