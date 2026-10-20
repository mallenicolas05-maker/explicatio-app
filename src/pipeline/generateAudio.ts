import { getEnv, getStudy, parseSummary, updateStudy, uploadPublicFile } from './utils';

export async function generateAudio(slug: string): Promise<string> {
  const study = await getStudy(slug);
  const summary = parseSummary(study.summary_final);
  const input = `${summary.body.join(' ')} ${summary.practical_takeaway}`;

  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getEnv('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tts-1',
      voice: 'nova',
      input,
      response_format: 'mp3',
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI TTS failed: ${response.status} ${await response.text()}`);
  }

  const audio = await response.arrayBuffer();
  const publicUrl = await uploadPublicFile('study-audio', `${slug}.mp3`, audio, 'audio/mpeg');

  await updateStudy(slug, {
    audio_url: publicUrl,
    pipeline_status: 'tts_done',
  });

  return publicUrl;
}

