import { getEnv, getStudy, updateStudy } from './utils';

const SYSTEM_PROMPT = `You are a science writer for Explicatio, a platform whose mission is to stimulate curiosity and spark innovation by making research accessible. Write in plain, practical, human-sounding language.

Rules:
1. Never misrepresent what the authors concluded. Stay faithful to their findings - this is critical for legal and ethical reasons.
2. Make it practical - tell the reader what this means for their actual life.
3. Sound like a smart human wrote this, not an AI. Avoid: "the study found", "it is worth noting", "delve", "it's important to understand", "in conclusion", "furthermore".
4. Be direct and conversational. Write like you're explaining something interesting to a curious friend.

Return ONLY a valid JSON object with no markdown, no backticks, no preamble:
{
  "headline": "max 12 words, punchy and specific",
  "tldr": "1 sentence, max 25 words, the core finding",
  "body": ["paragraph 1 (2-3 sentences)", "paragraph 2 (2-3 sentences)", "paragraph 3 (2-3 sentences)"],
  "practical_takeaway": "1 sentence starting with: What this means for you:",
  "keywords": ["3-6 broad category keywords"],
  "execution_protocol": [
    {"title": "step title", "desc": "1-2 sentence description"},
    {"title": "step title", "desc": "1-2 sentence description"},
    {"title": "step title", "desc": "1-2 sentence description"},
    {"title": "step title", "desc": "1-2 sentence description"}
  ]
}`;

export async function summarizeStudy(slug: string): Promise<string> {
  const study = await getStudy(slug);
  const sourceText = [
    `Title: ${study.title}`,
    `Journal: ${study.journal ?? 'Unknown'}`,
    `Authors: ${(study.researchers ?? []).map((researcher) => researcher.name).join(', ')}`,
    `Abstract or current summary: ${study.summary || study.research_objective || study.excerpt || ''}`,
    `Source: ${study.source_url ?? study.source?.link ?? ''}`,
  ].join('\n\n');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getEnv('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: sourceText },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI summarization failed: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('OpenAI summarization returned no content');
  }

  await updateStudy(slug, {
    summary_raw: content,
    pipeline_status: 'summarized',
  });

  return content;
}

