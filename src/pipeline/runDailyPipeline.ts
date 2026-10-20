import { discoverStudies } from './discoverStudies';
import { generateAudio } from './generateAudio';
import { generateCardImage } from './generateCardImage';
import { generateHeroImage } from './generateHeroImage';
import { reviewSummary } from './reviewSummary';
import { summarizeStudy } from './summarizeStudy';

function timestamp(): string {
  return new Date().toISOString().replace('T', ' ').slice(0, 16);
}

export async function runDailyPipeline(): Promise<void> {
  const slugs = await discoverStudies();
  let processed = 0;

  for (const slug of slugs) {
    try {
      console.log(`[${timestamp()}] [${slug}] summarize`);
      await summarizeStudy(slug);
      console.log(`[${timestamp()}] [${slug}] review`);
      await reviewSummary(slug);
      console.log(`[${timestamp()}] [${slug}] audio`);
      await generateAudio(slug);
      console.log(`[${timestamp()}] [${slug}] card image`);
      await generateCardImage(slug);
      console.log(`[${timestamp()}] [${slug}] hero image`);
      await generateHeroImage(slug);
      processed += 1;
      console.log(`[${timestamp()}] [${slug}] complete`);
    } catch (error) {
      console.error(`[${slug}] ERROR: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  console.log(`Daily pipeline complete - ${processed} studies processed`);
}

