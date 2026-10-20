import { delay, getEnv, getStudy, parseSummary, updateStudy, uploadPublicFile } from './utils';

type LeonardoGenerationResponse = {
  sdGenerationJob?: {
    generationId?: string;
  };
};

type LeonardoPollingResponse = {
  generations_by_pk?: {
    status?: string;
    generated_images?: Array<{ url?: string }>;
  };
};

function heroPrompt(title: string, category: string, summaryText: string): string {
  return [
    'Pen-and-ink watercolor editorial illustration in a minimalist Red Bull editorial aesthetic.',
    `Subject: ${title}.`,
    `Scientific category: ${category}.`,
    `Context: ${summaryText.slice(0, 400)}.`,
    'Portrait orientation. No text. No faces. Simple composition, energetic but restrained, subject-relevant.',
  ].join(' ');
}

async function pollLeonardoGeneration(generationId: string): Promise<string> {
  const headers = {
    Authorization: `Bearer ${getEnv('LEONARDO_API_KEY')}`,
    Accept: 'application/json',
  };

  for (let attempt = 0; attempt < 30; attempt += 1) {
    await delay(2000);
    const response = await fetch(`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Leonardo polling failed: ${response.status} ${await response.text()}`);
    }

    const payload = (await response.json()) as LeonardoPollingResponse;
    const generation = payload.generations_by_pk;
    const imageUrl = generation?.generated_images?.[0]?.url;

    if (generation?.status === 'COMPLETE' && imageUrl) {
      return imageUrl;
    }

    if (generation?.status === 'FAILED') {
      throw new Error('Leonardo generation failed');
    }
  }

  throw new Error('Leonardo generation timed out');
}

export async function generateHeroImage(slug: string): Promise<string> {
  const study = await getStudy(slug);
  const summary = study.summary_final ? parseSummary(study.summary_final) : null;
  const prompt = heroPrompt(study.title, study.category, summary?.tldr ?? study.summary ?? study.excerpt ?? '');

  const response = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getEnv('LEONARDO_API_KEY')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      prompt,
      num_images: 1,
      width: 832,
      height: 1216,
      guidance_scale: 7,
      alchemy: true,
      photoReal: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Leonardo generation failed: ${response.status} ${await response.text()}`);
  }

  const payload = (await response.json()) as LeonardoGenerationResponse;
  const generationId = payload.sdGenerationJob?.generationId;
  if (!generationId) {
    throw new Error('Leonardo did not return a generationId');
  }

  const remoteImageUrl = await pollLeonardoGeneration(generationId);
  const imageResponse = await fetch(remoteImageUrl);
  if (!imageResponse.ok) {
    throw new Error(`Leonardo image download failed: ${imageResponse.status}`);
  }

  const image = await imageResponse.arrayBuffer();
  const publicUrl = await uploadPublicFile('study-heroes', `${slug}.png`, image, 'image/png');

  await updateStudy(slug, {
    hero_image_url: publicUrl,
    pipeline_status: 'complete',
  });

  return publicUrl;
}

