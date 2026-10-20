import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Highlighter, Flame, Target, ArrowRight, Lock, Sparkles, Trophy, BrainCircuit, Clock, Loader2, LogOut, Settings } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SettingsModal } from '@/components/dashboard/SettingsModal';
import { UpgradeModal } from '@/components/dashboard/UpgradeModal';
import { SavedStudiesModal } from '@/components/dashboard/SavedStudiesModal';
import { SavedHighlightsModal } from '@/components/dashboard/SavedHighlightsModal';
import { useAuth } from '@/contexts/AuthContext';
import { useSavedStudies } from '@/hooks/useSavedStudies';
import { useSavedHighlights } from '@/hooks/useSavedHighlights';
import { useUserProfile } from '@/hooks/useUserProfile';
import { getStudyBySlug, getStudyImageUrl } from '@/data/studiesData';

const LockedOverlay: React.FC<{ onClick: () => void; label?: string }> = ({ onClick, label = "Unlock with upgrade" }) => (
  <div
    className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[6px] cursor-pointer rounded-xl"
    onClick={onClick}
  >
    <Lock size={20} className="text-gray-400 mb-2" />
    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">{label}</span>
  </div>
);

const FreeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { savedStudySlugs, isLoading: studiesLoading, toggleSaveStudy } = useSavedStudies();
  const { highlights, isLoading: highlightsLoading, deleteHighlight } = useSavedHighlights();
  const { getDisplayName } = useUserProfile();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isSavedStudiesOpen, setIsSavedStudiesOpen] = useState(false);
  const [isHighlightsOpen, setIsHighlightsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => { setShowContent(true); }, []);

  const savedArticles = Array.from(savedStudySlugs).map(slug => {
    const study = getStudyBySlug(slug);
    if (!study) return null;
    return { slug: study.slug, title: study.title, category: study.category.toUpperCase(), date: study.date, readTime: study.readTime, isSimplified: true, imageUrl: getStudyImageUrl(study) };
  }).filter(Boolean) as Array<{ slug: string; title: string; category: string; date: string; readTime: string; isSimplified: boolean; imageUrl: string }>;

  const displayedStudies = savedArticles.slice(0, 2);
  const displayedHighlights = highlights.slice(0, 2);

  const handleSignOut = async () => { await signOut(); navigate('/onboarding'); };

  return (
    <div className={`min-h-screen flex flex-col relative transition-opacity duration-1000 ease-out dashboard-bg ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      <Header onUserIconClick={() => setIsSettingsOpen(true)} />

      <main className="flex-grow z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="font-sans font-extralight tracking-tight text-zinc-800 text-2xl md:text-3xl mb-10 mt-6 text-center">
            Welcome back, {getDisplayName().split(' ')[0]}
          </h2>

          {/* Streak Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 py-6 sm:py-8 mb-12 sm:mb-16">
            <div className="flex items-center gap-2"><Flame size={13} className="text-gray-400" /><span className="text-[10px] font-bold font-mono tracking-[0.15em] text-black">4-DAY STREAK</span></div>
            <div className="h-px w-full sm:h-3 sm:w-px bg-gray-200"></div>
            <div className="flex items-center gap-2"><Bookmark size={13} className="text-gray-400" /><span className="text-[10px] font-bold font-mono tracking-[0.15em] text-black">{savedStudySlugs.size} SAVED</span></div>
            <div className="h-px w-full sm:h-3 sm:w-px bg-gray-200"></div>
            <div className="flex items-center gap-2"><Highlighter size={13} className="text-gray-400" /><span className="text-[10px] font-bold font-mono tracking-[0.15em] text-black">{highlights.length} HIGHLIGHTS</span></div>
            <div className="h-px w-full sm:h-3 sm:w-px bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center gap-2"><Target size={12} className="text-gray-300" /><span className="text-[9px] font-mono tracking-[0.15em] text-gray-400">NEXT MILESTONE: 7 DAYS</span></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              {/* Saved Studies (limited to 2) */}
              <section>
                <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
                  <h3 className="text-xs font-mono font-bold text-black uppercase tracking-[0.3em] flex items-center gap-2">
                    Saved Library
                    <span className="text-[10px] text-gray-400 font-normal bg-gray-100 px-2 py-0.5 rounded-full">{savedStudySlugs.size}</span>
                  </h3>
                  {savedArticles.length > 2 && (
                    <button onClick={() => setIsSavedStudiesOpen(true)} className="text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 bg-black text-white rounded hover:bg-gray-800 transition-colors">View All</button>
                  )}
                </div>
                <div className="space-y-4">
                  {studiesLoading ? (
                    <div className="flex justify-center py-8"><Loader2 className="animate-spin text-gray-400" size={24} /></div>
                  ) : displayedStudies.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
                      <Bookmark size={32} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-sm text-gray-500 mb-2">No saved studies yet</p>
                      <button onClick={() => navigate('/studies')} className="text-xs font-mono text-black uppercase tracking-wider hover:underline">Browse Studies →</button>
                    </div>
                  ) : (
                    displayedStudies.map((article) => (
                      <div key={article.slug} onClick={() => navigate(`/studies/${article.slug}`)} className="cursor-pointer glass-card p-4 sm:p-6 rounded-xl group">
                        <div className="flex gap-4">
                          <div className="w-24 h-20 bg-gray-100 flex-shrink-0 rounded-lg overflow-hidden">
                            {article.imageUrl && <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-mono text-[9px] font-medium uppercase tracking-widest text-gray-500">{article.category}</span>
                            <h3 className="text-lg font-extralight tracking-tight text-gray-900 leading-tight group-hover:text-gray-600 transition-colors line-clamp-2">{article.title}</h3>
                            <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-gray-400"><Clock size={10} />{article.readTime}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <button onClick={() => navigate('/studies')} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-gray-500 hover:text-black transition-colors mt-2">
                    Save a new study <ArrowRight size={12} />
                  </button>
                </div>
              </section>

              {/* Saved Highlights (limited to 2) */}
              <section>
                <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
                  <h3 className="text-xs font-mono font-bold text-black uppercase tracking-[0.3em] flex items-center gap-2">
                    <Highlighter size={14} /> Saved Highlights
                    <span className="text-[10px] text-gray-400 font-normal bg-gray-100 px-2 py-0.5 rounded-full">{highlights.length}</span>
                  </h3>
                  {highlights.length > 2 && (
                    <button onClick={() => setIsHighlightsOpen(true)} className="text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 bg-black text-white rounded hover:bg-gray-800 transition-colors">View All</button>
                  )}
                </div>
                <div className="space-y-3">
                  {highlightsLoading ? (
                    <div className="flex justify-center py-8"><Loader2 className="animate-spin text-gray-400" size={24} /></div>
                  ) : displayedHighlights.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
                      <Highlighter size={32} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-sm text-gray-500 mb-2">No highlights yet</p>
                      <p className="text-xs text-gray-400">Select text in any study to save quotes</p>
                    </div>
                  ) : (
                    displayedHighlights.map((highlight) => {
                      const study = getStudyBySlug(highlight.study_slug);
                      return (
                        <div key={highlight.id} className="group p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all cursor-pointer"
                          onClick={() => navigate(`/studies/${highlight.study_slug}?highlight=${encodeURIComponent(highlight.highlighted_text)}`)}>
                          <div className="px-3 py-2 rounded-lg text-sm leading-relaxed mb-2 line-clamp-2" style={{ backgroundColor: highlight.background_color, color: highlight.text_color }}>
                            "{highlight.highlighted_text}"
                          </div>
                          <p className="text-[10px] font-mono text-gray-400 truncate flex items-center gap-1">
                            <ArrowRight size={10} />
                            {study?.title || highlight.study_slug}
                          </p>
                        </div>
                      );
                    })
                  )}
                  <button onClick={() => navigate('/studies')} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-gray-500 hover:text-black transition-colors mt-2">
                    Save a new highlight <ArrowRight size={12} />
                  </button>
                </div>
              </section>

              {/* Blurred Premium Features */}
              <section className="relative rounded-xl overflow-hidden">
                <LockedOverlay onClick={() => setIsUpgradeOpen(true)} label="Knowledge Quiz · Upgrade to unlock" />
                <div className="glass-panel p-6 sm:p-8 rounded-xl select-none">
                  <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
                    <h3 className="text-xs font-mono font-bold text-black uppercase tracking-[0.3em]">Knowledge Quiz</h3>
                  </div>
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-4">Identify the category from the summary</p>
                  <p className="text-sm text-gray-700 leading-relaxed mb-6">Test your knowledge by identifying which category a study belongs to based on its summary alone...</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Sleep', 'Nutrition', 'Cognition', 'Performance'].map(opt => (
                      <div key={opt} className="font-mono text-[10px] uppercase tracking-wider px-3 py-2.5 border border-gray-200 text-gray-400 rounded">{opt}</div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="relative rounded-xl overflow-hidden">
                <LockedOverlay onClick={() => setIsUpgradeOpen(true)} label="AI Recommendation · Upgrade to unlock" />
                <div className="bg-white/40 rounded-[32px] p-8 border border-white shadow-sm select-none">
                  <div className="flex items-center justify-between p-8 bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-3xl">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <Sparkles size={16} className="text-purple-600" />
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em]">AI Recommendation</span>
                      </div>
                      <h4 className="font-sans text-2xl font-extralight tracking-tight text-zinc-800 leading-tight">Personalized study suggestions based on your reading habits.</h4>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Account */}
              <div className="glass-panel p-6 sm:p-8 mb-6 rounded-xl">
                <h4 className="text-xs font-mono font-bold text-black uppercase tracking-[0.3em] mb-6 border-b border-gray-100 pb-3">ACCOUNT</h4>
                <div className="space-y-1">
                  <button onClick={() => setIsSettingsOpen(true)} className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-black/5 transition-all text-gray-700 group">
                    <Settings size={18} className="text-gray-400 group-hover:text-black transition-colors" />
                    <span className="text-sm font-medium">Settings & Preferences</span>
                  </button>
                  <div className="pt-2 mt-2 border-t border-gray-100">
                    <button onClick={handleSignOut} className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-red-50 transition-all text-red-600 group">
                      <LogOut size={18} className="text-red-400 group-hover:text-red-600 transition-colors" />
                      <span className="text-sm font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Blurred: Interest Pulse */}
              <div className="relative rounded-xl overflow-hidden">
                <LockedOverlay onClick={() => setIsUpgradeOpen(true)} label="Interest Pulse · Upgrade" />
                <div className="glass-panel p-6 sm:p-8 rounded-xl select-none">
                  <h4 className="text-xs font-mono font-bold text-black uppercase tracking-[0.3em] mb-6 border-b border-gray-100 pb-3">INTEREST PULSE</h4>
                  <div className="space-y-4">
                    {['Sleep', 'Neuroscience', 'Nutrition'].map(cat => (
                      <div key={cat}>
                        <div className="flex justify-between text-xs font-mono mb-1.5 text-gray-400"><span>{cat}</span><span>—%</span></div>
                        <div className="h-1.5 bg-gray-100 rounded-full"><div className="h-full bg-gray-300 rounded-full" style={{ width: '40%' }}></div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Blurred: Achievements */}
              <div className="relative rounded-xl overflow-hidden">
                <LockedOverlay onClick={() => setIsUpgradeOpen(true)} label="Achievements · Upgrade" />
                <div className="glass-panel p-6 sm:p-8 rounded-xl select-none">
                  <h4 className="text-xs font-mono font-bold text-black uppercase tracking-[0.3em] mb-6 border-b border-gray-100 pb-3">ACHIEVEMENTS</h4>
                  <p className="text-sm text-gray-400">Track your research milestones</p>
                </div>
              </div>

              {/* Blurred: Challenge */}
              <div className="relative rounded-xl overflow-hidden">
                <LockedOverlay onClick={() => setIsUpgradeOpen(true)} label="Challenge · Upgrade" />
                <div className="glass-panel p-6 sm:p-8 rounded-xl select-none">
                  <h4 className="text-xs font-mono font-bold text-black uppercase tracking-[0.3em] mb-6 border-b border-gray-100 pb-3">CHALLENGE</h4>
                  <div className="flex items-start space-x-3">
                    <Trophy size={18} className="text-gray-300" />
                    <div><h5 className="text-sm font-semibold text-gray-400">November Readathon</h5><p className="text-xs text-gray-400 mt-1">Join 400+ researchers</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <UpgradeModal isOpen={isUpgradeOpen} onClose={() => setIsUpgradeOpen(false)} />
      <SavedStudiesModal
        isOpen={isSavedStudiesOpen}
        onClose={() => setIsSavedStudiesOpen(false)}
        studies={savedArticles}
        onRemove={(slug) => toggleSaveStudy(slug)}
        isManaging={false}
        setIsManaging={() => {}}
      />
      <SavedHighlightsModal
        isOpen={isHighlightsOpen}
        onClose={() => setIsHighlightsOpen(false)}
        highlights={highlights}
        onDelete={deleteHighlight}
      />
    </div>
  );
};

export default FreeDashboard;
