import { getStudyImageUrl, STUDIES_DATA } from "@/data/studiesData";

export type PulseStudy = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  journal: string;
  date: string;
  readTime: string;
  imageUrl: string;
  summary: string;
  keywords: string[];
};

function seededRandom(seed: number) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function getDailySeed() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return Number(`${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`);
}

export function getPulseStudies(): PulseStudy[] {
  const seed = getDailySeed();
  const random = seededRandom(seed);
  const studies = STUDIES_DATA.map((study) => ({
    id: study.id,
    slug: study.slug,
    title: study.title,
    excerpt: study.excerpt,
    category: study.category,
    journal: study.journal,
    date: study.date,
    readTime: study.readTime,
    imageUrl: getStudyImageUrl(study),
    summary: study.summary,
    keywords: study.keywords ?? [],
  }));

  for (let i = studies.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [studies[i], studies[j]] = [studies[j], studies[i]];
  }

  return studies;
}

export function fakeLikes(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 100000;
  }
  return 800 + (hash % 3400);
}

export function formatLikes(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return `${value}`;
}

export const PULSE_SEEN_KEY = "pulse_seen_studies";

export function getSeenStudies() {
  if (typeof window === "undefined") return new Set<string>();
  try {
    const raw = window.sessionStorage.getItem(PULSE_SEEN_KEY);
    return new Set<string>(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set<string>();
  }
}

export function setSeenStudies(seen: Set<string>) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(PULSE_SEEN_KEY, JSON.stringify([...seen]));
}
