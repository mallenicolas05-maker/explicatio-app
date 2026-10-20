import { generateAudio } from './generateAudio';
import { generateCardImage } from './generateCardImage';
import { delay, getAdminSupabase } from './utils';

export async function runBackfill(): Promise<void> {
  const admin = getAdminSupabase();
  const { data, error } = await admin
    .from('studies')
    .select('slug, card_image_url, audio_url')
    .or('card_image_url.is.null,audio_url.is.null')
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  for (const study of data ?? []) {
    const slug = study.slug as string;

    try {
      if (!study.card_image_url) {
        await generateCardImage(slug);
        console.log(`[${slug}] card ok`);
        await delay(1000);
      }

      if (!study.audio_url) {
        await generateAudio(slug);
        console.log(`[${slug}] audio ok`);
        await delay(1000);
      }
    } catch (error) {
      console.error(`[${slug}] ERROR: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

