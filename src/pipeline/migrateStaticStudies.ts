import { STUDIES_DATA, type StudyDetailData } from '@/data/studiesData';
import { getAdminSupabase } from './utils';

const BATCH_SIZE = 50;

function mapStudy(study: StudyDetailData) {
  return {
    slug: study.slug,
    study_id: study.id,
    category_id: study.categoryId,
    category: study.category,
    category_color: study.categoryColor,
    title: study.title,
    excerpt: study.excerpt,
    date: study.date,
    read_time: study.readTime,
    journal: study.journal,
    image_url: study.imageUrl,
    keywords: study.keywords ?? [],
    researchers: study.researchers,
    institutions: study.institutions,
    summary: study.summary,
    execution_protocol: study.executionProtocol,
    research_objective: study.researchObjective,
    methodology: study.methodology,
    observations: study.observations,
    impact: study.impact,
    constraints: study.constraints,
    source: study.source,
    source_url: study.source?.link ?? null,
    tags: study.keywords ?? [],
    pipeline_status: 'complete',
    is_static_migrated: true,
  };
}

export async function migrateStaticStudies(): Promise<void> {
  const admin = getAdminSupabase();
  const rows = STUDIES_DATA.map(mapStudy);
  const totalBatches = Math.ceil(rows.length / BATCH_SIZE);

  for (let index = 0; index < rows.length; index += BATCH_SIZE) {
    const batch = rows.slice(index, index + BATCH_SIZE);
    const { error } = await admin.from('studies').upsert(batch, { onConflict: 'slug' });

    if (error) {
      throw error;
    }

    console.log(
      `Migrated batch ${Math.floor(index / BATCH_SIZE) + 1}/${totalBatches} - ${Math.min(
        index + batch.length,
        rows.length,
      )} studies total`,
    );
  }
}

