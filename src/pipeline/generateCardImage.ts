import { getEnv, getStudy, hashString, parseSummary, updateStudy, uploadPublicFile } from './utils';

const GRADIENTS = [
  'Dark indigo to slate blue, warm sandy-gold light bloom bottom-left, heavy film grain. Base: #1E1B3A to #1B3A4B, accent: #C4956A',
  'Electric blue with soft light-ray texture. #1A6FD4 to #A8D4F5',
  'Soft violet to deep purple, smooth blur. #7B5EA7 to #2D1B5E',
  'Dusty rose to salmon pink, smooth blur. #E8A598 to #C4716A',
  'Deep teal to midnight navy. #0D3B4A to #0A1628',
];

function subjectForStudy(title: string, keywords: string[]): string {
  const text = `${title} ${keywords.join(' ')}`.toLowerCase();
  if (text.includes('sleep') || text.includes('circadian')) return 'a sleeping figure silhouette';
  if (text.includes('neuro') || text.includes('brain') || text.includes('cognition')) return 'a glowing synapse';
  if (text.includes('exercise') || text.includes('muscle') || text.includes('performance')) return 'a minimalist dumbbell';
  if (text.includes('nutrition') || text.includes('metabolism') || text.includes('glucose')) return 'a clean metabolic molecule';
  if (text.includes('aging') || text.includes('longevity')) return 'a small hourglass with a sprouting leaf';
  if (text.includes('mental') || text.includes('stress') || text.includes('mood')) return 'a calm abstract mind wave';
  return 'one simple symbolic object representing the study topic';
}

function base64ToBytes(base64: string): Uint8Array {
  const binary =
    typeof atob === 'function'
      ? atob(base64)
      : Buffer.from(base64, 'base64').toString('binary');
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

export async function generateCardImage(slug: string): Promise<string> {
  const study = await getStudy(slug);
  const summary = study.summary_final ? parseSummary(study.summary_final) : null;
  const keywords = summary?.keywords ?? study.keywords ?? study.tags ?? [];
  const gradient = GRADIENTS[hashString(slug) % GRADIENTS.length];
  const subject = subjectForStudy(study.title, keywords);
  const prompt = `Minimal abstract card thumbnail. Background: ${gradient}. Centered subject: ${subject}. No text. No faces. Clean editorial style. 16:9.`;

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getEnv('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-image-2',
      prompt,
      size: '1024x576',
      n: 1,
      response_format: 'b64_json',
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI image generation failed: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  const b64 = payload.data?.[0]?.b64_json;
  if (!b64) {
    throw new Error('OpenAI image generation returned no image');
  }

  const publicUrl = await uploadPublicFile('study-cards', `${slug}.png`, base64ToBytes(b64), 'image/png');
  await updateStudy(slug, {
    card_image_url: publicUrl,
    pipeline_status: study.hero_image_url ? 'complete' : 'images_done',
  });

  return publicUrl;
}

