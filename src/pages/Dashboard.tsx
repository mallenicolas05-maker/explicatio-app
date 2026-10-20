import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Settings, Bookmark, LogOut, Clock, ArrowRight, X, Sparkles, LayoutGrid, PenLine, BrainCircuit, Check, Trophy, ChevronsUp, HelpCircle, Loader2, Edit, Highlighter, Flame, Target } from 'lucide-react';
import { SettingsModal } from '@/components/dashboard/SettingsModal';
import { ReflectionsModal } from '@/components/dashboard/ReflectionsModal';
import { CategoriesModal } from '@/components/dashboard/CategoriesModal';
import { SavedStudiesModal } from '@/components/dashboard/SavedStudiesModal';
import { SavedHighlightsModal } from '@/components/dashboard/SavedHighlightsModal';
import DebunkingRumors from '@/components/dashboard/DebunkingRumors';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle } from '@/components/ui/alert-dialog';
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useSavedStudies } from '@/hooks/useSavedStudies';
import { useSavedHighlights } from '@/hooks/useSavedHighlights';
import { useUserProfile } from '@/hooks/useUserProfile';
import { getStudyBySlug, getStudyImageUrl, STUDIES_DATA } from '@/data/studiesData';

const TrendingStudy = () => {
  const navigate = useNavigate();
  const latestStudy = STUDIES_DATA[STUDIES_DATA.length - 1];
  if (!latestStudy) return null;
  const imageUrl = getStudyImageUrl(latestStudy);
  return (
    <div className="glass-card mb-12 group overflow-hidden bg-white hover:border-black/5 rounded-xl cursor-pointer" onClick={() => navigate(`/studies/${latestStudy.slug}`)}>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-8">
        <div className="w-full md:w-72 h-40 md:h-56 bg-gray-100 flex-shrink-0 relative rounded-xl overflow-hidden shadow-inner">
          <img src={imageUrl} alt={latestStudy.title} className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
            <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              <ChevronsUp size={14} className="text-emerald-500 flex-shrink-0" />
              <span className="text-[9px] md:text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider md:tracking-widest whitespace-nowrap">Latest</span>
            </div>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-2 md:gap-4 text-[9px] md:text-[10px] font-mono text-gray-400 uppercase tracking-wider md:tracking-widest">
              <span className="flex items-center gap-1"><Clock size={10} className="md:w-3 md:h-3" /> {latestStudy.readTime}</span>
              <span>{latestStudy.category}</span>
            </div>
          </div>
          <h3 className="font-sans text-xl md:text-3xl lg:text-4xl text-black font-extralight tracking-tight leading-tight mb-3 md:mb-4 group-hover:text-gray-700 transition-colors">
            {latestStudy.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-4 md:mb-6 max-w-2xl line-clamp-2">{latestStudy.excerpt}</p>
          <div className="flex items-center mt-auto pt-3 md:pt-4 border-t border-gray-100">
            <span className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] flex items-center gap-2">
              Read Full Analysis <ArrowRight size={12} className="md:w-3.5 md:h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StreakBanner = ({ savedCount, highlightCount }: { savedCount: number; highlightCount: number }) => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 py-6 sm:py-8 mb-12 sm:mb-16">
    <div className="flex items-center gap-2 sm:gap-3">
      <Flame size={13} className="text-gray-400 sm:w-[14px] sm:h-[14px]" />
      <span className="text-[10px] sm:text-xs font-bold font-mono tracking-[0.15em] sm:tracking-[0.2em] text-black">4-DAY STREAK</span>
    </div>
    <div className="h-px w-full sm:h-3 sm:w-px bg-gray-200"></div>
    <div className="flex items-center gap-2 sm:gap-3">
      <Bookmark size={13} className="text-gray-400 sm:w-[14px] sm:h-[14px]" />
      <span className="text-[10px] sm:text-xs font-bold font-mono tracking-[0.15em] sm:tracking-[0.2em] text-black">{savedCount} SAVED</span>
    </div>
    <div className="h-px w-full sm:h-3 sm:w-px bg-gray-200"></div>
    <div className="flex items-center gap-2 sm:gap-3">
      <Highlighter size={13} className="text-gray-400 sm:w-[14px] sm:h-[14px]" />
      <span className="text-[10px] sm:text-xs font-bold font-mono tracking-[0.15em] sm:tracking-[0.2em] text-black">{highlightCount} HIGHLIGHTS</span>
    </div>
    <div className="h-px w-full sm:h-3 sm:w-px bg-gray-200 hidden sm:block"></div>
    <div className="flex items-center gap-2 sm:gap-3">
      <Target size={12} className="text-gray-300 sm:w-[13px] sm:h-[13px]" />
      <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.15em] sm:tracking-[0.2em] text-gray-400">NEXT MILESTONE: 7 DAYS</span>
    </div>
  </div>
);

const QuickFilter = () => <div className="relative mb-8 group">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Search size={16} className="text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
    </div>
    <input type="text" placeholder="Query Research Catalog..." className="w-full glass-panel pl-10 pr-14 py-3 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-black/10 focus:border-black/20 transition-all placeholder:text-gray-400 shadow-sm rounded-lg" />
    <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
       <div className="hidden sm:flex items-center px-1.5 py-0.5 bg-gray-100 rounded border border-gray-200">
         <span className="text-[9px] font-mono text-gray-500">⌘ F</span>
       </div>
    </div>
  </div>;

const ReflectionCard = ({
  onOpenPastReflections,
  onSaveReflection
}: {
  onOpenPastReflections: () => void;
  onSaveReflection: (text: string) => void;
}) => {
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [text, setText] = useState('');
  const handleSave = () => {
    if (!text.trim()) return;
    setSaveState('saving');
    setTimeout(() => {
      onSaveReflection(text);
      setSaveState('saved');
      setText('');
      setTimeout(() => { setSaveState('idle'); }, 1500);
    }, 600);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSave(); }
  };
  return <div className="glass-panel p-4 sm:p-6 mb-4 border border-indigo-100 bg-gradient-to-br from-white/60 to-indigo-50/30 relative rounded-xl">
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        <div className="mt-0 sm:mt-1 p-2 bg-indigo-50 rounded-lg text-indigo-600 flex-shrink-0">
          <BrainCircuit size={20} />
        </div>
        <div className="flex-1 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1">
             <h4 className="font-sans text-base sm:text-lg font-extralight tracking-tight text-zinc-800">Daily Reflection</h4>
             <button onClick={onOpenPastReflections} className="text-[9px] sm:text-[10px] font-mono font-medium text-gray-400 hover:text-indigo-600 transition-colors uppercase tracking-wider cursor-pointer whitespace-nowrap">
               Past reflections
             </button>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 leading-relaxed">Did anything you read today change a specific habit or belief regarding your sleep schedule?</p>
          <div className="relative">
            <textarea className="w-full bg-white/60 border border-gray-200 rounded-lg p-2 sm:p-3 text-sm focus:outline-none focus:bg-white focus:border-indigo-300 transition-all resize-none font-mono text-gray-600" rows={2} placeholder="I realized that..." value={text} onChange={e => setText(e.target.value)} onKeyDown={handleKeyDown} />
            <button onClick={handleSave} disabled={saveState !== 'idle' || !text.trim()} className={`absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-xs font-medium uppercase tracking-wide transition-all duration-300 flex items-center justify-center min-w-[50px] sm:min-w-[60px] ${saveState === 'saved' ? 'text-emerald-500' : 'text-indigo-600 hover:text-indigo-800'}`}>
              {saveState === 'saved' ? <div className="animate-in fade-in zoom-in duration-300"><Check size={16} /></div> : <span className={saveState === 'idle' ? 'animate-in fade-in' : 'opacity-50'}>{saveState === 'saving' ? '...' : 'Save'}</span>}
            </button>
          </div>
        </div>
      </div>
    </div>;
};

interface ArticleCardProps {
  title: string;
  category: string;
  date: string;
  readTime: string;
  isSimplified?: boolean;
  isManaging?: boolean;
  imageUrl?: string;
  onRemove?: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title, category, date, readTime, isSimplified, isManaging, imageUrl, onRemove
}) => {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [note, setNote] = useState('');
  const [tempNote, setTempNote] = useState('');
  const handleSaveNote = () => { setNote(tempNote); setIsEditingNote(false); };
  const showDeleteButton = isManaging || isEditingNote;
  return <div className="glass-card p-4 sm:p-6 rounded-xl mb-4 group relative overflow-hidden transition-all duration-300">
      {showDeleteButton && <button onClick={(e) => { e.stopPropagation(); if (onRemove) onRemove(); }} className="absolute top-3 sm:top-4 right-3 sm:right-4 text-red-400 hover:text-red-600 z-20 transition-all animate-in fade-in zoom-in p-1">
          <X size={16} strokeWidth={2.5} />
        </button>}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="w-full sm:w-32 h-28 sm:h-32 bg-gray-100 flex-shrink-0 relative overflow-hidden group-hover:shadow-inner transition-shadow rounded-lg">
           {imageUrl ? (
             <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
           ) : (
             <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>
           )}
           <div className="absolute bottom-2 right-2 transition-opacity">
              <Bookmark size={14} className="text-black fill-black sm:w-4 sm:h-4" />
           </div>
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
            <span className="font-mono text-[9px] sm:text-[10px] font-medium uppercase tracking-wider sm:tracking-widest text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded-sm truncate max-w-[120px]">{category}</span>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <span className="font-mono text-[10px] sm:text-xs text-gray-400">{date}</span>
          </div>
          <h3 className="font-sans text-lg sm:text-xl md:text-2xl font-extralight tracking-tight text-gray-900 leading-tight mb-2 sm:mb-3 group-hover:text-gray-600 transition-colors cursor-pointer line-clamp-2">{title}</h3>
          <div className="mt-auto">
             <div className="flex items-center justify-between border-t border-gray-100 pt-2 sm:pt-3">
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center text-gray-400 text-[10px] sm:text-xs font-mono"><Clock size={10} className="mr-1 sm:w-3 sm:h-3" />{readTime}</div>
                  {isSimplified && <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-100"><Check size={10} className="mr-1" /> Simplified</span>}
                </div>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  <button onClick={(e) => { e.stopPropagation(); setIsEditingNote(true); }} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black transition-colors" title="Add Note">
                    <PenLine size={14} />
                  </button>
                </div>
             </div>
             {note && !isEditingNote && <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-lg animate-in slide-in-from-top-2">
                 <span className="block text-[9px] sm:text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">Note:</span>
                 <p className="text-xs sm:text-sm text-gray-600 italic font-medium leading-relaxed">{note}</p>
               </div>}
             {isEditingNote && <div className="mt-2 sm:mt-3 flex gap-2 animate-in slide-in-from-top-2" onClick={(e) => e.stopPropagation()}>
                 <input type="text" maxLength={50} value={tempNote} onChange={e => setTempNote(e.target.value)} placeholder="Add a quick note..." className="flex-1 bg-white border border-gray-200 rounded px-2 py-1.5 text-xs sm:text-sm focus:outline-none focus:border-black/20" autoFocus />
                 <button onClick={handleSaveNote} className="px-2 sm:px-3 py-1 bg-black text-white text-[10px] sm:text-xs font-medium rounded hover:bg-gray-800">Save</button>
               </div>}
          </div>
        </div>
      </div>
    </div>;
};

const SidebarWidget = ({ title, children, className = "" }: { title: React.ReactNode; children?: React.ReactNode; className?: string }) => (
  <div className={`glass-panel p-6 sm:p-8 mb-6 rounded-xl ${className}`}>
    <h4 className="text-xs font-mono font-bold text-black uppercase tracking-[0.3em] mb-6 border-b border-gray-100 pb-3 flex items-center justify-between">
      {title}
    </h4>
    {children}
  </div>
);

const PulseWidget = ({ savedStudySlugs }: { savedStudySlugs: Set<string> }) => {
  const categoryDistribution = React.useMemo(() => {
    const counts: Record<string, number> = {};
    let total = 0;
    savedStudySlugs.forEach(slug => {
      const study = getStudyBySlug(slug);
      if (study) {
        counts[study.category] = (counts[study.category] || 0) + 1;
        total++;
      }
    });
    if (total === 0) return [];
    const COLORS: Record<string, string> = {
      Sleep: 'bg-indigo-600', Neuroscience: 'bg-red-500', Nutrition: 'bg-emerald-500',
      Performance: 'bg-orange-500', Physiology: 'bg-sky-500', Cognition: 'bg-teal-500',
      Behavior: 'bg-cyan-400', Longevity: 'bg-blue-500', Technology: 'bg-slate-600', Aesthetics: 'bg-pink-500'
    };
    return Object.entries(counts)
      .map(([label, count]) => ({ label, val: Math.round((count / total) * 100), color: COLORS[label] || 'bg-gray-500' }))
      .sort((a, b) => b.val - a.val)
      .slice(0, 5);
  }, [savedStudySlugs]);

  return (
    <SidebarWidget title="INTEREST PULSE">
      <div className="space-y-5">
        {categoryDistribution.length === 0 ? (
          <p className="text-xs text-gray-400 font-mono">Save studies to see your interest distribution</p>
        ) : (
          categoryDistribution.map(item => (
            <div key={item.label} className="group cursor-default">
              <div className="flex justify-between text-xs font-mono mb-1.5 text-gray-500 group-hover:text-black transition-colors">
                <span>{item.label}</span>
                <span>{item.val}%</span>
              </div>
              <div className="h-1.5 bg-gray-100/80 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.val}%` }}></div>
              </div>
            </div>
          ))
        )}
      </div>
    </SidebarWidget>
  );
};

const AchievementsWidget = ({ savedCount, highlightCount }: { savedCount: number; highlightCount: number }) => (
  <SidebarWidget title="ACHIEVEMENTS">
    <div className="relative pl-4 border-l border-gray-200 space-y-8 ml-2">
      <div className="relative">
        <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 border-2 border-white"></div>
        <p className="text-[10px] text-gray-400 font-mono mb-0.5 uppercase tracking-wider">Library</p>
        <p className="text-sm font-medium text-gray-900">{savedCount > 0 ? `${savedCount} studies saved` : 'No studies saved yet'}</p>
      </div>
      <div className="relative group">
        <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-black border-2 border-white shadow-sm"></div>
        <p className="text-[10px] text-gray-400 font-mono mb-0.5 uppercase tracking-wider">Highlights</p>
        <p className="text-sm font-medium text-gray-900">{highlightCount > 0 ? `${highlightCount} insights saved` : 'No highlights yet'}</p>
      </div>
    </div>
  </SidebarWidget>
);

const BlindComparisonGame = () => {
  const allCategories = useMemo(() => Array.from(new Set(STUDIES_DATA.map(s => s.category))), []);
  
  const pickRound = useCallback(() => {
    const study = STUDIES_DATA[Math.floor(Math.random() * STUDIES_DATA.length)];
    const wrong = allCategories.filter(c => c !== study.category).sort(() => Math.random() - 0.5).slice(0, 3);
    const opts = [study.category, ...wrong].sort(() => Math.random() - 0.5);
    return { study, options: opts };
  }, [allCategories]);

  const [round, setRound] = useState(() => pickRound());
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const handleSelect = (cat: string) => {
    if (selected) return;
    setSelected(cat);
    setTotal(t => t + 1);
    if (cat === round.study.category) setScore(s => s + 1);
  };

  const handleNext = () => {
    setRound(pickRound());
    setSelected(null);
  };

  const isCorrect = selected === round.study.category;

  return (
    <section>
      <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
        <h3 className="text-xs font-mono font-bold text-black uppercase tracking-[0.3em]">Knowledge Quiz</h3>
        {total > 0 && <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{score}/{total} correct</span>}
      </div>
      <div className="glass-panel p-6 sm:p-8 rounded-xl">
        <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-4">Identify the category from the summary</p>
        <p className="text-sm text-gray-700 leading-relaxed mb-6 line-clamp-4">{round.study.summary.slice(0, 300)}...</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {round.options.map(opt => {
            let btnClass = "font-mono text-[10px] uppercase tracking-wider px-3 py-2.5 border rounded transition-all text-left";
            if (!selected) {
              btnClass += " border-gray-200 text-gray-600 hover:border-gray-400 hover:text-black cursor-pointer";
            } else if (opt === round.study.category) {
              btnClass += " bg-emerald-50 text-emerald-700 border-emerald-200";
            } else if (opt === selected) {
              btnClass += " bg-red-50 text-red-700 border-red-200";
            } else {
              btnClass += " border-gray-100 text-gray-300";
            }
            return (
              <button key={opt} onClick={() => handleSelect(opt)} className={btnClass} disabled={!!selected}>
                {opt}
              </button>
            );
          })}
        </div>
        {selected && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className={`text-xs font-mono ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
              {isCorrect ? 'Correct!' : `Answer: ${round.study.category}`}
            </span>
            <button onClick={handleNext} className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-black hover:text-gray-600 transition-colors flex items-center gap-1">
              Next <ArrowRight size={12} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isLoading: authLoading, signOut } = useAuth();
  const { savedStudySlugs, isLoading: studiesLoading, toggleSaveStudy } = useSavedStudies();
  const { highlights, isLoading: highlightsLoading, deleteHighlight } = useSavedHighlights();
  const { getDisplayName, getInitials, profile } = useUserProfile();
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isReflectionsOpen, setIsReflectionsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSavedStudiesOpen, setIsSavedStudiesOpen] = useState(false);
  const [isHighlightsOpen, setIsHighlightsOpen] = useState(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [isManaging, setIsManaging] = useState(false);
  const [editingHighlightId, setEditingHighlightId] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [reflections, setReflections] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('explicatio_reflections');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  useEffect(() => {
    if (!authLoading && !user) navigate('/onboarding');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (searchParams.get('openHighlights') === 'true') {
      setIsHighlightsOpen(true);
      window.history.replaceState({}, '', '/dashboard');
    }
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem('explicatio_reflections', JSON.stringify(reflections));
  }, [reflections]);
  
  const handleAddReflection = (text: string) => {
    const date = new Date();
    const todayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setReflections(prev => ({ ...prev, [todayKey]: text }));
  };
  
  const handleDeleteReflection = (key: string) => {
    const newReflections = { ...reflections };
    delete newReflections[key];
    setReflections(newReflections);
  };

  const handleSignOut = async () => { await signOut(); navigate('/onboarding'); };
  const handleSignOutClick = () => setIsSignOutOpen(true);
  
  useEffect(() => { setShowContent(true); }, []);

  const savedArticles = Array.from(savedStudySlugs).map(slug => {
    const study = getStudyBySlug(slug);
    if (!study) return null;
    return {
      slug: study.slug, title: study.title, category: study.category.toUpperCase(),
      date: study.date, readTime: study.readTime, isSimplified: true, imageUrl: getStudyImageUrl(study)
    };
  }).filter(Boolean) as Array<{ slug: string; title: string; category: string; date: string; readTime: string; isSimplified: boolean; imageUrl: string }>;

  const displayedArticles = savedArticles.slice(0, 4);
  const hasMoreStudies = savedArticles.length > 4;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-zinc-400" size={32} />
      </div>
    );
  }

  if (!user) return null;

  return <div className={`min-h-screen flex flex-col relative transition-opacity duration-1000 ease-out dashboard-bg ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      <Header onUserIconClick={() => setIsSettingsOpen(true)} />
      
      <main className="flex-grow z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Back Banner */}
          <h2 className="font-sans font-extralight tracking-tight text-zinc-800 text-2xl md:text-3xl mb-10 mt-6 text-center">
            Welcome back, {getDisplayName().split(' ')[0]}
          </h2>
          <StreakBanner savedCount={savedStudySlugs.size} highlightCount={highlights.length} />
          <TrendingStudy />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              <QuickFilter />
              
              <section>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 border-b border-gray-200 pb-4 gap-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xs font-mono font-bold text-black uppercase tracking-[0.3em] flex items-center gap-2">
                      Saved Studies
                      <span className="text-[10px] text-gray-400 font-normal bg-gray-100 px-2 py-0.5 rounded-full">{savedStudySlugs.size}</span>
                    </h3>
                    <button onClick={() => navigate('/studies')} className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-gray-500 hover:text-black transition-colors">
                      Save a new study <ArrowRight size={12} />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                     <button 
                       onClick={() => setIsManaging(!isManaging)} 
                       className={`lg:hidden text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                         isManaging ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                       }`}
                     >
                       <Edit size={12} />
                       {isManaging ? 'Done' : 'Edit'}
                     </button>
                     {hasMoreStudies && (
                       <button onClick={() => setIsSavedStudiesOpen(true)} className="text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 bg-black text-white rounded hover:bg-gray-800 transition-colors">View All</button>
                     )}
                     <button onClick={() => setIsCategoriesOpen(true)} className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded transition-colors" title="View All Categories"><LayoutGrid size={16} /></button>
                  </div>
                </div>
                <div className="space-y-4">
                  {studiesLoading ? (
                    <div className="flex justify-center py-8"><Loader2 className="animate-spin text-gray-400" size={24} /></div>
                  ) : displayedArticles.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
                      <Bookmark size={32} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-sm text-gray-500 mb-2">No saved studies yet</p>
                      <button onClick={() => navigate('/studies')} className="text-xs font-mono text-black uppercase tracking-wider hover:underline">Browse Studies →</button>
                    </div>
                  ) : (
                    displayedArticles.map((article) => (
                      <div key={article.slug} onClick={() => !isManaging && navigate(`/studies/${article.slug}`)} className={!isManaging ? 'cursor-pointer' : ''}>
                        <ArticleCard {...article} isManaging={isManaging} onRemove={() => toggleSaveStudy(article.slug)} />
                      </div>
                    ))
                  )}
                  <ReflectionCard onOpenPastReflections={() => setIsReflectionsOpen(true)} onSaveReflection={handleAddReflection} />
                </div>
              </section>

              {/* Saved Highlights Section */}
              <section>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 border-b border-gray-200 pb-4 gap-4">
                  <h3 className="text-xs font-mono font-bold text-black uppercase tracking-[0.3em] flex items-center gap-2">
                    <Highlighter size={14} />
                    Saved Highlights
                    <span className="text-[10px] text-gray-400 font-normal bg-gray-100 px-2 py-0.5 rounded-full">{highlights.length}</span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setIsManaging(!isManaging)} 
                      className={`lg:hidden text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                        isManaging ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Edit size={12} />
                      {isManaging ? 'Done' : 'Edit'}
                    </button>
                    {highlights.length > 7 && (
                      <button onClick={() => setIsHighlightsOpen(true)} className="text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 bg-black text-white rounded hover:bg-gray-800 transition-colors">View All</button>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  {highlightsLoading ? (
                    <div className="flex justify-center py-8"><Loader2 className="animate-spin text-gray-400" size={24} /></div>
                  ) : highlights.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
                      <Highlighter size={32} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-sm text-gray-500 mb-2">No highlights yet</p>
                      <p className="text-xs text-gray-400">Select text in any study to save quotes</p>
                    </div>
                  ) : (
                    highlights.slice(0, 7).map((highlight) => {
                      const study = getStudyBySlug(highlight.study_slug);
                      return (
                        <div key={highlight.id} className="group relative p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all cursor-pointer"
                          onClick={() => !isManaging && editingHighlightId !== highlight.id && navigate(`/studies/${highlight.study_slug}?highlight=${encodeURIComponent(highlight.highlighted_text)}&hlBg=${encodeURIComponent(highlight.background_color)}&hlColor=${encodeURIComponent(highlight.text_color)}`)}>
                          {(isManaging || editingHighlightId === highlight.id) && (
                            <button onClick={(e) => { e.stopPropagation(); deleteHighlight(highlight.id); setEditingHighlightId(null); }} className="absolute top-3 right-3 text-red-400 hover:text-red-600 z-20 transition-all animate-in fade-in zoom-in p-1">
                              <X size={16} strokeWidth={2.5} />
                            </button>
                          )}
                          <div className="px-3 py-2 rounded-lg text-sm leading-relaxed mb-2 line-clamp-2" style={{ backgroundColor: highlight.background_color, color: highlight.text_color }}>
                            "{highlight.highlighted_text}"
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] font-mono text-gray-400 truncate flex items-center gap-1">
                              <ArrowRight size={10} />
                              {study?.title || highlight.study_slug}
                            </p>
                            {!isManaging && (
                              <button 
                                onClick={(e) => { e.stopPropagation(); setEditingHighlightId(editingHighlightId === highlight.id ? null : highlight.id); }}
                                className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                                title={editingHighlightId === highlight.id ? "Cancel" : "Remove highlight"}
                              >
                                <PenLine size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                  {/* Save new highlight CTA */}
                  <button onClick={() => navigate('/studies')} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-gray-500 hover:text-black transition-colors mt-2">
                    Save a new highlight <ArrowRight size={12} />
                  </button>
                </div>
              </section>

              {/* Knowledge Quiz Game */}
              <BlindComparisonGame />

              {/* Debunking Rumors - Premium Feature */}
              <DebunkingRumors isPremium={true} />

              <section className="bg-white/40 rounded-[32px] p-8 border border-white shadow-sm">
                <div className="flex items-center justify-between p-8 bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group cursor-pointer shadow-sm">
                   <div className="flex-1">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600"><Sparkles size={16} /></div>
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em]"><span className="text-black">AI Recommendation</span></span>
                     </div>
                     <h4 className="font-sans text-2xl font-extralight tracking-tight text-zinc-800 leading-tight group-hover:text-black transition-colors">Light exposure timing and insulin sensitivity: A systematic review.</h4>
                   </div>
                   <div className="text-gray-300 ml-8 flex-shrink-0"><ArrowRight size={18} /></div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <SidebarWidget title="ACCOUNT">
                <div className="space-y-1">
                  <button onClick={() => setIsSettingsOpen(true)} className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-black/5 transition-all text-gray-700 group">
                    <Settings size={18} className="text-gray-400 group-hover:text-black transition-colors" />
                    <span className="text-sm font-medium">Settings & Preferences</span>
                  </button>
                  <button onClick={() => setIsManaging(!isManaging)} className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all text-gray-700 group ${isManaging ? 'bg-red-50 text-red-600' : 'hover:bg-black/5'}`}>
                    <Bookmark size={18} className={`${isManaging ? 'text-red-500' : 'text-gray-400 group-hover:text-black'} transition-colors`} />
                    <span className="text-sm font-medium">{isManaging ? 'Done Managing' : 'Manage Saved Items'}</span>
                  </button>
                  <div className="pt-2 mt-2 border-t border-gray-100">
                    <button onClick={handleSignOutClick} className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-red-50 transition-all text-red-600 group">
                      <LogOut size={18} className="text-red-400 group-hover:text-red-600 transition-colors" />
                      <span className="text-sm font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
              </SidebarWidget>

              <PulseWidget savedStudySlugs={savedStudySlugs} />
              <AchievementsWidget savedCount={savedStudySlugs.size} highlightCount={highlights.length} />

              <SidebarWidget title="CHALLENGE">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600 mt-1"><Trophy size={18} /></div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-gray-900">November Readathon</h5>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">Join 400+ researchers reading 1 paper daily for 7 days.</p>
                    <button className="mt-3 w-full py-1.5 border border-orange-200 text-orange-600 text-xs font-medium rounded hover:bg-orange-50 transition-colors font-mono uppercase tracking-widest">Join Challenge</button>
                  </div>
                </div>
              </SidebarWidget>

              <SidebarWidget title={<React.Fragment>
                  <span>WEEKLY GOAL</span>
                  <span className="text-[9px] font-mono font-normal text-gray-400 normal-case tracking-wider">Goal: 5 Papers</span>
                </React.Fragment>}>
                 <div className="mb-2 flex justify-end text-[10px] font-mono uppercase tracking-wider text-gray-400">
                    <span className="text-black font-bold">60%</span>
                 </div>
                 <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-black w-[60%]"></div>
                 </div>
                 <p className="mt-3 text-[10px] text-gray-400 font-mono uppercase tracking-tight">Read 2 more studies to hit target.</p>
              </SidebarWidget>

              <SidebarWidget title="SUPPORT">
                  <button className="w-full flex items-center justify-center space-x-2 py-2 border border-dashed border-gray-300 rounded text-[10px] font-mono text-gray-500 hover:border-black hover:text-black transition-colors uppercase tracking-widest">
                     <HelpCircle size={14} />
                     <span>Contact Research Team</span>
                  </button>
               </SidebarWidget>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <ReflectionsModal isOpen={isReflectionsOpen} onClose={() => setIsReflectionsOpen(false)} reflections={reflections} onDelete={handleDeleteReflection} />
      <CategoriesModal isOpen={isCategoriesOpen} onClose={() => setIsCategoriesOpen(false)} />
      <SavedStudiesModal 
        isOpen={isSavedStudiesOpen} 
        onClose={() => setIsSavedStudiesOpen(false)} 
        studies={savedArticles}
        onRemove={(slug) => toggleSaveStudy(slug)}
        isManaging={isManaging}
        setIsManaging={setIsManaging}
      />
      <SavedHighlightsModal
        isOpen={isHighlightsOpen}
        onClose={() => setIsHighlightsOpen(false)}
        highlights={highlights}
        onDelete={deleteHighlight}
      />

      {/* Sign Out Confirmation */}
      <AlertDialog open={isSignOutOpen} onOpenChange={setIsSignOutOpen}>
        <AlertDialogPortal>
          <AlertDialogOverlay className="bg-black/30" />
          <AlertDialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-sm translate-x-[-50%] translate-y-[-50%] rounded-2xl border border-red-100/60 bg-red-50/20 backdrop-blur-xl shadow-xl p-8 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="font-sans text-xl font-extralight tracking-tight text-white">Leaving so soon?</AlertDialogTitle>
              <AlertDialogDescription className="text-xs font-mono text-white/80 leading-relaxed tracking-wide">
                You'll be signed out of your Explicatio account. Any unsaved progress will remain intact for your next session.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-4 sm:gap-3 mt-6">
              <AlertDialogCancel className="text-xs font-mono uppercase tracking-widest border-zinc-200 hover:bg-zinc-50">Stay</AlertDialogCancel>
              <AlertDialogAction onClick={handleSignOut} className="bg-red-500/90 hover:bg-red-600 text-white text-xs font-mono uppercase tracking-widest rounded-md border border-white/40">Sign Out</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogPrimitive.Content>
        </AlertDialogPortal>
      </AlertDialog>
    </div>;
};
export default Dashboard;
