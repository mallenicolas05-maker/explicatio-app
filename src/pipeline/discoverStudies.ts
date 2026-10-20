import { getAdminSupabase, toSlug } from './utils';

type OpenAlexWork = {
  id: string;
  doi?: string | null;
  title?: string | null;
  display_name?: string | null;
  publication_date?: string | null;
  publication_year?: number | null;
  cited_by_count?: number | null;
  abstract_inverted_index?: Record<string, number[]> | null;
  primary_location?: {
    source?: { display_name?: string | null } | null;
    landing_page_url?: string | null;
  } | null;
  open_access?: { oa_url?: string | null; is_oa?: boolean | null } | null;
  authorships?: Array<{
    author?: { display_name?: string | null } | null;
    institutions?: Array<{ display_name?: string | null }>;
  }>;
};

const TOPICS = [
  'Neuroscience',
  'Behavioral Psychology',
  'Nutrition & Metabolism',
  'Sleep Science',
  'Exercise Physiology',
  'Longevity & Aging',
  'Mental Health & Cognition',
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  Neuroscience: 'bg-violet-500',
  'Behavioral Psychology': 'bg-rose-500',
  'Nutrition & Metabolism': 'bg-emerald-500',
  'Sleep Science': 'bg-indigo-400',
  'Exercise Physiology': 'bg-orange-500',
  'Longevity & Aging': 'bg-amber-500',
  'Mental Health & Cognition': 'bg-blue-500',
};

function reconstructAbstract(index: Record<string, number[]> | null | undefined): string {
  if (!index) return '';
  const words: string[] = [];

  for (const [word, positions] of Object.entries(index)) {
    for (const position of positions) {
      words[position] = word;
    }
  }

  return words.filter(Boolean).join(' ');
}

function getTopicForToday(): string {
  return TOPICS[new Date().getDay()];
}

function uniqueInstitutions(work: OpenAlexWork): string[] {
  const names = work.authorships
    ?.flatMap((authorship) => authorship.institutions ?? [])
    .map((institution) => institution.display_name)
    .filter(Boolean) as string[] | undefined;

  return [...new Set(names ?? [])].slice(0, 5);
}

function authors(work: OpenAlexWork) {
  return (
    work.authorships
      ?.map((authorship, index) => ({
        name: authorship.author?.display_name ?? 'Unknown researcher',
        role: index === 0 ? 'Lead author' : 'Co-author',
      }))
      .slice(0, 5) ?? []
  );
}

function mapWorkToStudy(work: OpenAlexWork, topic: string, slug: string) {
  const title = work.title || work.display_name || 'Untitled research study';
  const abstract = reconstructAbstract(work.abstract_inverted_index);
  const sourceUrl = work.open_access?.oa_url || work.primary_location?.landing_page_url || work.id;

  return {
    slug,
    category_id: String(new Date().getDay() + 1),
    category: topic,
    category_color: CATEGORY_COLORS[topic] ?? 'bg-blue-500',
    title,
    excerpt: abstract ? `${abstract.slice(0, 220)}${abstract.length > 220 ? '...' : ''}` : null,
    date: work.publication_date ?? String(work.publication_year ?? ''),
    read_time: '8 min',
    journal: work.primary_location?.source?.display_name ?? null,
    image_url: '',
    keywords: [topic],
    researchers: authors(work),
    institutions: uniqueInstitutions(work),
    summary: abstract,
    execution_protocol: [],
    research_objective: abstract,
    methodology: null,
    observations: [],
    impact: '',
    constraints: '',
    source: {
      title,
      doi: work.doi ?? '',
      link: sourceUrl,
    },
    openalex_id: work.id,
    source_url: sourceUrl,
    published_date: work.publication_date ?? null,
    tags: [topic],
    pipeline_status: 'pending',
    is_static_migrated: false,
  };
}

export async function discoverStudies(limit = 10): Promise<string[]> {
  const admin = getAdminSupabase();
  const topic = getTopicForToday();
  const since = new Date();
  since.setDate(since.getDate() - 30);

  const url = new URL('https://api.openalex.org/works');
  url.searchParams.set(
    'filter',
    `is_oa:true,from_publication_date:${since.toISOString().slice(0, 10)},cited_by_count:>3`,
  );
  url.searchParams.set('search', topic);
  url.searchParams.set('sort', 'cited_by_count:desc');
  url.searchParams.set('per-page', '20');
  url.searchParams.set('mailto', 'explicatio@gmail.com');

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`OpenAlex discovery failed: ${response.status} ${await response.text()}`);
  }

  const payload = (await response.json()) as { results?: OpenAlexWork[] };
  const candidates = payload.results ?? [];
  const openAlexIds = candidates.map((candidate) => candidate.id);
  const { data: existing, error: existingError } = await admin
    .from('studies')
    .select('openalex_id')
    .in('openalex_id', openAlexIds);

  if (existingError) {
    throw existingError;
  }

  const existingIds = new Set((existing ?? []).map((row: { openalex_id: string }) => row.openalex_id));
  const rows = candidates
    .filter((candidate) => !existingIds.has(candidate.id))
    .slice(0, limit)
    .map((candidate) => {
      const baseSlug = toSlug(candidate.title || candidate.display_name || candidate.id);
      const slug = baseSlug || toSlug(candidate.id);
      return mapWorkToStudy(candidate, topic, slug);
    });

  if (rows.length === 0) {
    return [];
  }

  const { data, error } = await admin.from('studies').insert(rows).select('slug');
  if (error) {
    throw error;
  }

  return (data ?? []).map((row: { slug: string }) => row.slug);
}

