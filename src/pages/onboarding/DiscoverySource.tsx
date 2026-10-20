import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, Newspaper, Bot, Mail, Users, Mic, Briefcase, type LucideIcon } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

// Custom SVG icons as components
const XIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const TikTokIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const LinkedInIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GoogleIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const ChatGPTIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
);

interface SourceItem {
  label: string;
  icon: LucideIcon | React.FC | null;
  isLucide: boolean;
}

const sources: SourceItem[] = [
  { label: 'In the news', icon: Newspaper, isLucide: true },
  { label: 'Friends or School', icon: Users, isLucide: true },
  { label: 'Podcast', icon: Mic, isLucide: true },
  { label: 'From work', icon: Briefcase, isLucide: true },
  { label: 'ChatGPT, Claude, etc.', icon: ChatGPTIcon, isLucide: false },
  { label: 'Newsletter or Blog', icon: Mail, isLucide: true },
  { label: 'Instagram', icon: Instagram, isLucide: true },
  { label: 'Google', icon: GoogleIcon, isLucide: false },
  { label: 'Facebook', icon: Facebook, isLucide: true },
  { label: 'X', icon: XIcon, isLucide: false },
  { label: 'TikTok', icon: TikTokIcon, isLucide: false },
  { label: 'YouTube', icon: Youtube, isLucide: true },
  { label: 'LinkedIn', icon: LinkedInIcon, isLucide: false },
  { label: "Don't remember", icon: null, isLucide: false },
  { label: 'Other', icon: null, isLucide: false }
];

const DiscoverySource: React.FC<Props> = ({ onNext, onPrev }) => {
  const { data, updateData } = useOnboarding();
  const [selected, setSelected] = useState<string | null>(data.discoverySource || null);

  const handleSelection = (label: string) => {
    setSelected(label);
  };

  const handleNext = () => {
    if (!selected) return;
    updateData({ discoverySource: selected });
    onNext();
  };

  const renderIcon = (source: SourceItem) => {
    if (!source.icon) return null;
    
    if (source.isLucide) {
      const LucideIconComponent = source.icon as LucideIcon;
      return <LucideIconComponent size={20} className="text-black" />;
    } else {
      const CustomIcon = source.icon as React.FC;
      return <CustomIcon />;
    }
  };

  return (
    <div className="h-full flex flex-col animate-fade-in overflow-hidden">
      <nav className="flex justify-between items-center px-4 md:px-12 py-3 md:py-6 shrink-0">
      </nav>

      <div className="flex-grow flex flex-col items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-lg md:text-3xl font-mono font-bold tracking-tight uppercase mb-4 md:mb-8">How did you hear about Explicatio?</h1>
          
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 mb-6 md:mb-10">
            {sources.map((source) => (
              <button
                key={source.label}
                onClick={() => handleSelection(source.label)}
                className={`flex flex-col items-center justify-center p-3 md:p-6 border rounded-lg md:rounded-xl transition-all text-center min-h-[70px] md:min-h-[100px] gap-1 md:gap-2 ${
                  selected === source.label 
                  ? 'border-black bg-white ring-1 ring-black shadow-xl' 
                  : 'border-zinc-100 bg-white/50 hover:border-zinc-300 hover:bg-white'
                }`}
              >
                {source.icon && (
                  <span className="text-black scale-75 md:scale-100">
                    {renderIcon(source)}
                  </span>
                )}
                <span className="text-[8px] md:text-[11px] font-bold uppercase tracking-wide leading-tight">{source.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 md:gap-6">
            <button 
              onClick={onPrev}
              className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider md:tracking-widest text-zinc-300 hover:text-black transition-colors py-3 md:py-5 px-4 md:px-8"
            >
              Back
            </button>
            
            <button 
              onClick={handleNext}
              disabled={!selected}
              className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] py-3 md:py-4 px-10 md:px-16 rounded-sm transition-all shadow-xl ${
                selected
                  ? 'bg-black text-white hover:bg-zinc-800'
                  : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <div className="h-4 md:h-0 shrink-0"></div>
    </div>
  );
};

export default DiscoverySource;
