import { getEnv, getStudy, updateStudy } from './utils';

const REVIEW_PROMPT = `You are a quality reviewer for Explicatio. Review this study summary against three criteria.

Return ONLY valid JSON, no markdown:
{
  "faithful": true/false,
  "practical": true/false,
  "human": true/false,
  "issues": ["list any problems found"],
  "final": { ...corrected summary object in same shape as input, or unchanged if all pass }
}

If any criterion fails, rewrite only the failing sections in "final". Never change what the research actually concluded.`;

export async function reviewSummary(slug: string): Promise<string> {
  const study = await getStudy(slug);
  if (!study.summary_raw) {
    throw new Error(`Study ${slug} has no summary_raw to review`);
  }

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
        { role: 'system', content: REVIEW_PROMPT },
        {
          role: 'user',
          content: JSON.stringify({
            original_research_context: {
              title: study.title,
              abstract_or_summary: study.summary || study.research_objective || study.excerpt,
              source: study.source_url ?? study.source?.link,
            },
            summary_raw: JSON.parse(study.summary_raw),
          }),
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI review failed: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('OpenAI review returned no content');
  }

  const parsed = JSON.parse(content);
  const final = JSON.stringify(parsed.final);

  await updateStudy(slug, {
    summary_final: final,
    pipeline_status: 'reviewed',
  });

  return final;
}

