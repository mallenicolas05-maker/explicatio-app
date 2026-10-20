import { Link } from "react-router-dom";

const CategoryThemeMap: Record<string, { hex: string }> = {
  Sleep: { hex: "#f4b9ba" },
  Neuroscience: { hex: "#d14d4d" },
  Nutrition: { hex: "#059669" },
  Performance: { hex: "#ea580c" },
  Physiology: { hex: "#0d9488" },
  Cognition: { hex: "#2563eb" },
  Behavior: { hex: "#9ae4f5" },
  Longevity: { hex: "#3d98f8" },
  Technology: { hex: "#376f7a" },
  Aesthetics: { hex: "#db2777" },
};

interface HomeStudyCardProps {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  imageUrl: string;
}

export function HomeStudyCard({
  slug,
  title,
  category,
  date,
  readTime,
  excerpt,
  imageUrl,
}: HomeStudyCardProps) {
  const theme = CategoryThemeMap[category] || { hex: "#a1a1aa" };

  return (
    <Link to={`/studies/${slug}`} className="block h-full">
      <article className="relative flex h-full min-w-0 cursor-pointer flex-col">
        <div className="relative overflow-visible rounded-[12px] bg-[#eef1f4]">
          <div className="relative aspect-[1.58] overflow-hidden rounded-[12px]">
            <img src={imageUrl} alt={title} className="h-full w-full object-cover grayscale-[0.03]" />

            <div
              className="absolute right-3 top-3 z-10 rounded-full px-2.5 py-[5px] text-[8px] font-medium uppercase tracking-[0.18em]"
              style={{
                color: theme.hex,
                background: "rgba(255,255,255,0.94)",
                border: `1px solid ${theme.hex}30`,
              }}
            >
              {category}
            </div>
          </div>
        </div>

        <div className="relative -mt-1 flex min-w-0 flex-1 flex-col rounded-br-[12px] border-b border-r border-[#d8d7d1] px-3 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
          <h3 className="line-clamp-3 break-words font-sans text-[15px] font-semibold leading-[1.14] tracking-[-0.03em] text-foreground sm:text-[18px]">
            {title}
          </h3>

          <p className="mt-3 line-clamp-3 break-words text-[10px] leading-[1.72] text-foreground-muted sm:min-h-[58px] sm:text-[11px] sm:leading-[1.72]">
            {excerpt}
          </p>

          <div className="mt-auto pt-6">
            <div className="grid grid-cols-[1fr_1.1fr] gap-4 border-t border-[#e1dfda] pt-4">
              <div>
                <span className="block text-[9px] font-medium uppercase tracking-[0.24em] text-foreground-subtle">Published</span>
                <span className="mt-1 block font-mono text-[10px] leading-none text-foreground sm:text-[11px]">{date}</span>
              </div>
              <div className="border-l border-[#e1dfda] pl-4">
                <span className="block text-[9px] font-medium uppercase tracking-[0.24em] text-foreground-subtle">Details</span>
                <div className="mt-1 flex min-w-0 items-center gap-2 text-[9px] sm:text-[10px]">
                  <span className="line-clamp-1 min-w-0 truncate font-mono uppercase text-foreground">{category}</span>
                  <span className="text-[#c6c3bc]">|</span>
                  <span className="whitespace-nowrap font-mono text-foreground">{readTime}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#e1dfda] pt-3">
              <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-foreground">Read Analysis</span>
              <svg className="h-3 w-3 text-foreground sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
