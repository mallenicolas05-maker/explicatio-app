import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSlugFromId, STUDIES_DATA, getStudyImageUrl } from '@/data/studiesData';
import { FEATURED_STUDY_IDS } from '@/data/featuredStudies';
import { Star, Bookmark } from 'lucide-react';
import OnboardingCheckoutModal from '@/components/onboarding/OnboardingCheckoutModal';
import { useSavedStudies } from '@/hooks/useSavedStudies';

// Types
enum CategoryStatus {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
}
interface Category {
  id: string;
  name: string;
  color: string;
  status: CategoryStatus;
}
interface Study {
  id: string;
  categoryId: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  isSimplified: boolean;
  imageUrl?: string;
  savedCount: number;
  popularity: number;
}

// Constants
const CATEGORIES: Category[] = [{
  id: '0',
  name: 'Featured',
  color: 'bg-black',
  status: CategoryStatus.UNLOCKED
}, {
  id: '1',
  name: 'Sleep',
  color: 'bg-[#f4b9ba]',
  status: CategoryStatus.UNLOCKED
}, {
  id: '2',
  name: 'Neuroscience',
  color: 'bg-[#d14d4d]',
  status: CategoryStatus.UNLOCKED
}, {
  id: '3',
  name: 'Nutrition',
  color: 'bg-[#059669]',
  status: CategoryStatus.UNLOCKED
}, {
  id: '4',
  name: 'Performance',
  color: 'bg-[#ea580c]',
  status: CategoryStatus.UNLOCKED
}, {
  id: '5',
  name: 'Physiology',
  color: 'bg-[#0d9488]',
  status: CategoryStatus.UNLOCKED
}, {
  id: '6',
  name: 'Cognition',
  color: 'bg-[#2563eb]',
  status: CategoryStatus.UNLOCKED
}, {
  id: '7',
  name: 'Behavior',
  color: 'bg-[#9ae4f5]',
  status: CategoryStatus.UNLOCKED
}, {
  id: '8',
  name: 'Longevity',
  color: 'bg-[#3d98f8]',
  status: CategoryStatus.UNLOCKED
}, {
  id: '9',
  name: 'Technology',
  color: 'bg-[#376f7a]',
  status: CategoryStatus.UNLOCKED
}, {
  id: '10',
  name: 'Aesthetics',
  color: 'bg-[#db2777]',
  status: CategoryStatus.UNLOCKED
}];
// Convert STUDIES_DATA to local Study format
const STUDIES: Study[] = STUDIES_DATA.map((study, index) => ({
  id: study.id,
  categoryId: study.categoryId,
  title: study.title,
  excerpt: study.excerpt,
  date: study.date,
  readTime: study.readTime,
  isSimplified: true,
  imageUrl: getStudyImageUrl(study),
  savedCount: Math.floor(Math.random() * 500) + index * 10,
  popularity: Math.floor(Math.random() * 1000) + index * 5
}));
const STUDIES_PER_PAGE = 9;

// Category theme map for SVG sweep colors
const CategoryThemeMap: Record<string, {dot: string;label: string;hex: string;}> = {
  Sleep: { dot: 'bg-[#f4b9ba]', label: 'text-[#f4b9ba]', hex: '#f4b9ba' },
  Neuroscience: { dot: 'bg-[#d14d4d]', label: 'text-[#d14d4d]', hex: '#d14d4d' },
  Nutrition: { dot: 'bg-[#059669]', label: 'text-[#059669]', hex: '#059669' },
  Performance: { dot: 'bg-[#ea580c]', label: 'text-[#ea580c]', hex: '#ea580c' },
  Physiology: { dot: 'bg-[#0d9488]', label: 'text-[#0d9488]', hex: '#0d9488' },
  Cognition: { dot: 'bg-[#2563eb]', label: 'text-[#2563eb]', hex: '#2563eb' },
  Behavior: { dot: 'bg-[#9ae4f5]', label: 'text-[#9ae4f5]', hex: '#9ae4f5' },
  Longevity: { dot: 'bg-[#3d98f8]', label: 'text-[#3d98f8]', hex: '#3d98f8' },
  Technology: { dot: 'bg-[#376f7a]', label: 'text-[#376f7a]', hex: '#376f7a' },
  Aesthetics: { dot: 'bg-[#db2777]', label: 'text-[#db2777]', hex: '#db2777' },
  Featured: { dot: 'bg-black', label: 'text-black', hex: '#000000' }
};
type SortOption = 'Latest' | 'Most Saved' | 'Popularity';

// Inlined Components
interface QuickFilterProps {
  value: string;
  onChange: (val: string) => void;
}
const QuickFilter: React.FC<QuickFilterProps> = ({
  value,
  onChange
}) => {
  return <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-foreground-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input type="text" placeholder="QUERY RESEARCH CATALOG..." value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-border bg-background py-4 pl-12 pr-14 text-[11px] tracking-[0.18em] uppercase placeholder:text-foreground-subtle focus:outline-none focus:border-foreground/20 transition-colors duration-200" />
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <span className="rounded-md border border-border px-2 py-1 text-[9px] tracking-[0.2em] text-foreground-subtle">
          ⌘ F
        </span>
      </div>
    </div>;
};
interface CategoryGridProps {
  onCategoryClick: (name: string, status: CategoryStatus) => void;
  selectedCategory: string | null;
}
const CategoryGrid: React.FC<CategoryGridProps> = ({
  onCategoryClick,
  selectedCategory
}) => {
  return <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
      {CATEGORIES.map((cat) => {
      const isSelected = selectedCategory === cat.name;
      const isFeatured = cat.name === 'Featured';
      return <button key={cat.id} onClick={() => onCategoryClick(cat.name, cat.status)} className={`flex items-center justify-between rounded-lg px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors duration-200
            ${isSelected ? 'bg-foreground text-background border border-foreground' : cat.status === CategoryStatus.UNLOCKED ? 'bg-background border border-border text-foreground hover:border-foreground/20' : 'bg-background border border-border text-foreground-subtle opacity-50'}`}>
          <span>{cat.name}</span>
          {isFeatured ? <Star className="w-3 h-3" /> : <div className={`w-1.5 h-1.5 rounded-full ${cat.status === CategoryStatus.LOCKED ? 'bg-border' : isSelected ? 'bg-background/60' : cat.color}`}></div>}
        </button>;
    })}
    </div>;
};
interface StudyCardProps {
  study: Study;
  category: Category;
  onLockedClick: () => void;
  onStudyClick: (studyId: string) => void;
  isSaved: boolean;
  onToggleSave: (e: React.MouseEvent) => void;
}
const StudyCard: React.FC<StudyCardProps> = ({
  study,
  category,
  onLockedClick,
  onStudyClick,
  isSaved,
  onToggleSave
}) => {
  const isLocked = category.status === CategoryStatus.LOCKED;
  const theme = CategoryThemeMap[category.name] || CategoryThemeMap.Featured;

  // Get keyword tag from studiesData
  const studyDetail = STUDIES_DATA.find((s) => s.id === study.id);
  const tag = studyDetail?.keywords?.[0] || category.name;

  const handleClick = () => {
    if (isLocked) {
      onLockedClick();
    } else {
      onStudyClick(study.id);
    }
  };

  return <article
    onClick={handleClick}
    className={`relative flex h-full cursor-pointer flex-col ${isLocked ? 'opacity-50' : ''}`}>

    <div className="relative overflow-visible rounded-[12px] bg-[#eef1f4]">
      <div className="relative aspect-[1.58] overflow-hidden rounded-[12px]">
        <img src={study.imageUrl} alt={study.title} className={`h-full w-full object-cover ${isLocked ? 'grayscale' : 'grayscale-[0.03]'}`} />

        <button
          onClick={onToggleSave}
          className="absolute left-3 top-3 text-white/80"
          title={isSaved ? 'Remove from library' : 'Save to library'}>
          <Bookmark size={14} className={`sm:w-4 sm:h-4 ${isSaved ? 'fill-white text-white' : ''}`} strokeWidth={1.4} />
        </button>

        <div
          className="absolute right-3 top-3 z-10 rounded-full px-2.5 py-[5px] text-[8px] font-medium uppercase tracking-[0.18em]"
          style={{
            color: isLocked ? '#8e8e8e' : theme.hex,
            background: isLocked
              ? 'rgba(255,255,255,0.96)'
              : `rgba(255,255,255,0.94)`,
            border: `1px solid ${isLocked ? 'rgba(160,160,160,0.18)' : `${theme.hex}30`}`,
          }}>
          {category.name}
        </div>
      </div>
    </div>

    <div className="relative -mt-1 flex min-w-0 flex-1 flex-col border-b border-r border-[#d8d7d1] px-3 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5 rounded-br-[12px]">
      <h3 className="line-clamp-3 break-words font-sans text-[15px] font-semibold leading-[1.14] tracking-[-0.03em] text-foreground sm:text-[18px]">
        {study.title}
      </h3>

      <p className="mt-3 line-clamp-3 break-words text-[10px] leading-[1.72] text-foreground-muted sm:min-h-[58px] sm:text-[11px] sm:leading-[1.72]">
        {study.excerpt}
      </p>

      <div className="mt-auto pt-6">
        <div className="grid grid-cols-[1fr_1.1fr] gap-4 border-t border-[#e1dfda] pt-4">
          <div>
            <span className="block text-[9px] font-medium uppercase tracking-[0.24em] text-foreground-subtle">Published</span>
            <span className="mt-1 block font-mono text-[10px] leading-none text-foreground sm:text-[11px]">{study.date}</span>
          </div>
          <div className="border-l border-[#e1dfda] pl-4">
            <span className="block text-[9px] font-medium uppercase tracking-[0.24em] text-foreground-subtle">Details</span>
            <div className="mt-1 flex min-w-0 items-center gap-2 text-[9px] sm:text-[10px]">
              <span className="line-clamp-1 min-w-0 truncate font-mono uppercase text-foreground">{tag}</span>
              <span className="text-[#c6c3bc]">|</span>
              <span className="whitespace-nowrap font-mono text-foreground">{study.readTime}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#e1dfda] pt-3">
          <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-foreground">
            Read Analysis
          </span>
          <svg className="h-3 w-3 text-foreground sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </div>
  </article>;
};
interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
}
const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  categoryName
}) => {
  const [checkoutTier, setCheckoutTier] = useState<{
    id: string;
    price: string;
    billingPeriod: string;
    scope: string;
    freq: string;
    desc: string;
  } | null>(null);
  if (!isOpen) return null;
  const tiers = [{
    id: '01',
    price: 0.99,
    billingPeriod: 'week',
    categories: 1,
    studies: 4,
    description: 'Trial the platform functionality',
    gradientColor: '#C0C0C0'
  }, {
    id: '02',
    price: 4.99,
    billingPeriod: 'week',
    categories: 6,
    studies: 24,
    description: 'Test a more complete use of the platform with more categories',
    gradientColor: '#C0C0C0'
  }, {
    id: '03',
    price: 11.99,
    billingPeriod: 'month',
    categories: 10,
    studies: 40,
    description: 'Enjoyed the platform and committed to utilizing it actively',
    gradientColor: '#C0C0C0'
  }, {
    id: '04',
    price: 15,
    billingPeriod: 'month',
    categories: 'Unlimited',
    studies: 70,
    description: 'For the neurodivergent/polymaths/obsessed with learning',
    gradientColor: '#C0C0C0'
  }];
  const handleSelectPlan = (tier: typeof tiers[0]) => {
    setCheckoutTier({
      id: tier.id,
      price: String(tier.price),
      billingPeriod: tier.billingPeriod,
      scope: `${tier.categories} Categories`,
      freq: `${tier.studies} studies`,
      desc: tier.description
    });
  };

  // If checkout modal is open, only show that
  if (checkoutTier) {
    return <OnboardingCheckoutModal
      isOpen={true}
      onClose={() => setCheckoutTier(null)}
      tier={checkoutTier} />;

  }

  return <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-3xl p-8 md:p-12 max-w-4xl w-full z-10 border border-gray-100 max-h-[90vh] overflow-y-auto" style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
      }}>
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header matching pricing page */}
          <div className="text-center mb-10">
            <span className="text-[10px] tracking-[0.4em] text-gray-400 uppercase font-medium mb-4 block">
              EXPLICATIO
            </span>
            <h2 className="text-3xl md:text-4xl font-mono font-bold tracking-[0.1em] uppercase text-gray-900 mb-4">
              UPGRADE YOUR PLAN  
            </h2>
            <p className="text-gray-500 text-sm font-light max-w-md mx-auto">
              The <span className="text-black font-medium">"{categoryName}"</span> category requires an active membership. Choose a plan to continue.
            </p>
          </div>

          {/* Pricing Grid matching pricing page style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {tiers.map((tier) => <div key={tier.id} className="relative rounded-2xl p-6 border border-[#C0C0C0]/30 bg-white hover:bg-gray-50/30 transition-all duration-500 group flex flex-col overflow-hidden">
                {/* Gradient overlay - matching tier 2 silver color */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity duration-500" style={{
              background: `radial-gradient(circle at 0% 0%, #C0C0C0 0%, transparent 45%)`
            }} />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-6">
                    <span className="text-[9px] tracking-[0.2em] text-gray-400 font-bold uppercase">
                      TIER {tier.id}
                    </span>

                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-3xl font-sans font-extralight tracking-tight text-zinc-800">
                        ${tier.price}
                      </span>
                      <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">
                        /mo
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 flex-grow">
                    <div className="flex flex-col gap-0.5 border-l-2 border-[#C0C0C0]/40 pl-3">
                      <span className="text-[8px] uppercase tracking-wider text-gray-400 font-bold">
                        Access
                      </span>
                      <span className="text-sm font-sans font-extralight tracking-tight text-zinc-800">
                        {tier.categories} Categories
                      </span>
                    </div>

                    <div className="flex flex-col gap-0.5 border-l-2 border-[#C0C0C0]/40 pl-3">
                      <span className="text-[8px] uppercase tracking-wider text-gray-400 font-bold">
                        Frequency
                      </span>
                      <span className="text-sm font-sans font-extralight tracking-tight text-zinc-800">
                        {tier.studies} Weekly
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                      {tier.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <button onClick={() => handleSelectPlan(tier)} className="w-full mt-6 py-3 bg-[#1A1C1E] text-white text-[9px] tracking-[0.2em] uppercase hover:bg-zinc-700 transition-all rounded-sm font-medium">
                    Select Plan
                  </button>
                </div>
              </div>)}
          </div>

          {/* Free tier link */}
          <div className="text-center pt-4 border-t border-gray-100">
            <button onClick={onClose} className="text-[11px] font-mono text-gray-500 hover:text-black transition-colors uppercase tracking-wider">
              Continue with limited access →
            </button>
          </div>
        </div>
      </div>
    </>;
};

// Main Studies Component
const Studies: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('Latest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [lockedCategoryModal, setLockedCategoryModal] = useState<{
    isOpen: boolean;
    name: string;
  }>({
    isOpen: false,
    name: ''
  });

  const { isStudySaved, toggleSaveStudy } = useSavedStudies();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, []);

  // Read category and keyword from URL
  const selectedCategory = searchParams.get('category');
  const selectedKeyword = searchParams.get('keyword');
  const selectedSort = searchParams.get('sort') as SortOption | null;

  useEffect(() => {
    if (selectedSort && ['Latest', 'Most Saved', 'Popularity'].includes(selectedSort) && selectedSort !== sortBy) {
      setSortBy(selectedSort);
    }
    if (!selectedSort && sortBy !== 'Latest') {
      setSortBy('Latest');
    }
  }, [selectedSort, sortBy]);

  // Update URL when category changes
  const setSelectedCategory = (category: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
    setCurrentPage(1);
  };

  // Clear keyword filter
  const clearKeywordFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('keyword');
    setSearchParams(newParams);
    setCurrentPage(1);
  };
  const setSelectedSort = (sort: SortOption) => {
    const newParams = new URLSearchParams(searchParams);
    if (sort === 'Latest') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', sort);
    }
    setSearchParams(newParams);
    setCurrentPage(1);
  };
  const handleStudyClick = (studyId: string) => {
    // Get the slug for this study ID
    const slug = getSlugFromId(studyId);
    if (slug) {
      navigate(`/studies/${slug}`);
    } else {
      // Fallback to ID if no slug found
      navigate(`/studies/${studyId}`);
    }
  };
  const filteredStudies = useMemo(() => {
    let result = STUDIES.filter((study) => {
      const matchesText = study.title.toLowerCase().includes(filterText.toLowerCase()) || study.excerpt.toLowerCase().includes(filterText.toLowerCase());
      const category = CATEGORIES.find((c) => c.id === study.categoryId);
      
      // Featured filter: show only featured studies
      const matchesCategory = selectedCategory === 'Featured' 
        ? FEATURED_STUDY_IDS.includes(study.id)
        : selectedCategory 
          ? category?.name === selectedCategory 
          : true;

      // Keyword filtering: match if study title contains the keyword
      const matchesKeyword = selectedKeyword ? study.title.toLowerCase().includes(selectedKeyword.toLowerCase()) || study.excerpt.toLowerCase().includes(selectedKeyword.toLowerCase()) : true;
      return matchesText && matchesCategory && matchesKeyword;
    });
    result = [...result].sort((a, b) => {
      if (sortBy === 'Latest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === 'Most Saved') {
        return b.savedCount - a.savedCount;
      }
      if (sortBy === 'Popularity') {
        return b.popularity - a.popularity;
      }
      return 0;
    });
    return result;
  }, [filterText, selectedCategory, selectedKeyword, sortBy]);
  const totalPages = Math.max(1, Math.ceil(filteredStudies.length / STUDIES_PER_PAGE));
  const currentStudies = filteredStudies.slice((currentPage - 1) * STUDIES_PER_PAGE, currentPage * STUDIES_PER_PAGE);
  const handleCategoryClick = (name: string, status: CategoryStatus) => {
    if (status === CategoryStatus.LOCKED) {
      setLockedCategoryModal({
        isOpen: true,
        name
      });
    } else {
      // Toggle category - if already selected, deselect
      if (selectedCategory === name) {
        setSelectedCategory(null);
      } else {
        setSelectedCategory(name);
      }
    }
  };
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  return <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-6xl mx-auto px-6 pt-28 lg:pt-36 pb-16">
        {/* Studies Header */}
        <header className="mx-auto mb-16 flex max-w-4xl flex-col items-center text-center">
          <span className="section-label mb-6">Research Catalog</span>
          <h1 className="editorial-title mb-8 text-5xl leading-[0.94] md:text-7xl">
            Studies
          </h1>
          <p className="editorial-copy max-w-md text-sm md:text-base">
            Professional repository of simplified clinical research summaries.
          </p>
        </header>

        {/* Quick Filter */}
        <div className="max-w-2xl mx-auto mb-16">
          <QuickFilter value={filterText} onChange={(val) => {
          setFilterText(val);
          setCurrentPage(1);
        }} />
        </div>

        {/* Keyword Filter Indicator */}
        {selectedKeyword && <div className="mb-6 flex justify-center">
            <div className="px-4 py-3 bg-background rounded-lg border border-border inline-flex items-center gap-3">
              <span className="text-[10px] font-medium text-foreground-subtle uppercase tracking-[0.18em]">
                Filtered by keyword:
              </span>
              <span className="px-2 py-1 border border-border text-foreground-muted text-[10px] font-mono uppercase tracking-wide">
                {selectedKeyword}
              </span>
              <button onClick={clearKeywordFilter} className="text-[10px] font-medium text-foreground-subtle hover:text-foreground transition-colors uppercase tracking-[0.18em] ml-2">
                Clear
              </button>
            </div>
          </div>}

        {/* Categories Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[10px] font-medium tracking-[0.22em] uppercase text-foreground-subtle">Categories</h2>
            {(selectedCategory || selectedKeyword || filterText) && <button onClick={() => {
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('category');
            newParams.delete('keyword');
            setSearchParams(newParams);
            setFilterText('');
            setCurrentPage(1);
          }} className="text-[10px] font-medium tracking-[0.22em] text-foreground-subtle hover:text-foreground transition-colors uppercase">
                Reset Filters
              </button>}
          </div>
          <CategoryGrid onCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
        </div>

        {/* Top Pagination (pages 2+) */}
        {currentPage > 1 && (filteredStudies.length > STUDIES_PER_PAGE || selectedCategory) && <div className="flex justify-center mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-6">
            <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="text-foreground-subtle hover:text-foreground disabled:opacity-20 transition-colors" title="First Page">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="text-[10px] font-medium tracking-[0.22em] text-foreground-subtle hover:text-foreground disabled:opacity-30 transition-colors uppercase">
              PREVIOUS
            </button>
            <span className="text-[10px] font-medium tracking-[0.18em] text-foreground-subtle px-4">
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="text-[10px] font-medium tracking-[0.22em] text-foreground-subtle hover:text-foreground disabled:opacity-30 transition-colors uppercase">
              NEXT
            </button>
            <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="text-foreground-subtle hover:text-foreground disabled:opacity-20 transition-colors" title="Last Page">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>}

        {/* Search Result Indicator */}
        {filterText && <div className="mb-10 flex justify-center">
            <div className="px-6 py-4 bg-background rounded-lg border border-border inline-flex items-center gap-4">
              <span className="text-[10px] font-medium text-foreground-subtle uppercase tracking-[0.18em]">
                Refining catalog for
                <span className="text-foreground ml-2 uppercase">
                  "{filterText}"
                </span>
              </span>
              <div className="h-4 w-px bg-border"></div>
              <span className="text-[10px] font-medium tracking-[0.18em] text-foreground-subtle uppercase">
                {filteredStudies.length} {filteredStudies.length === 1 ? 'result' : 'results'}
              </span>
            </div>
          </div>}

        {/* Catalog Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-foreground-subtle">
              Catalog
            </span>
            <div className="w-px h-4 bg-border"></div>
            <div className="relative">
              <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center gap-2 text-[10px] font-medium tracking-[0.18em] text-foreground hover:text-foreground-muted transition-colors uppercase">
                {sortBy}
                <svg className={`w-3 h-3 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isSortOpen && <div className="absolute right-0 top-full mt-2 bg-background rounded-lg border border-border z-50 overflow-hidden min-w-[140px]">
                  {(['Latest', 'Most Saved', 'Popularity'] as SortOption[]).map((option) => <button key={option} onClick={() => {
                setSortBy(option);
                setSelectedSort(option);
                setIsSortOpen(false);
                setCurrentPage(1);
              }} className="w-full text-left px-5 py-2.5 text-[10px] font-medium tracking-[0.14em] uppercase hover:bg-muted transition-colors text-foreground">
                      {option}
                    </button>)}
                </div>}
            </div>
          </div>

          {currentStudies.length > 0 ? <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
              {currentStudies.map((study) => {
            const category = CATEGORIES.find((c) => c.id === study.categoryId)!;
            const slug = getSlugFromId(study.id);
            return <StudyCard
              key={study.id}
              study={study}
              category={category}
              onLockedClick={() => handleCategoryClick(category.name, CategoryStatus.LOCKED)}
              onStudyClick={handleStudyClick}
              isSaved={slug ? isStudySaved(slug) : false}
              onToggleSave={(e) => {
                e.stopPropagation();
                if (slug) {
                  toggleSaveStudy(slug);
                }
              }} />;

          })}
            </div> : <div className="text-center py-20">
              <p className="text-[10px] font-mono font-bold tracking-widest text-gray-300 mb-4 uppercase">No entries found.</p>
              <button onClick={() => {
            setFilterText('');
            setSelectedCategory(null);
          }} className="text-[10px] font-mono font-bold tracking-widest border-b border-black pb-0.5 hover:opacity-50 transition-all">
                REINITIALIZE
              </button>
            </div>}
            
            {selectedCategory && <div className="text-[10px] font-mono text-gray-400 text-center mt-8">
              Showing results for this category:
              <span className="ml-2 px-2.5 py-1 bg-gray-50 rounded-md text-black font-bold tracking-wider">
                <span className="uppercase">{selectedCategory}</span>
              </span>
            </div>}
        </div>

        {/* Footer Area - Pagination */}
        {(filteredStudies.length > STUDIES_PER_PAGE || selectedCategory) && <div className="mt-40">
          <div className="h-px bg-black w-full mb-8" />
          <div className="flex items-center justify-between">
            <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-[11px] font-mono font-bold tracking-widest text-black hover:opacity-50 disabled:opacity-20 transition-all uppercase">

              ← PREV ARCHIVE
            </button>
            
            <div className="flex items-center gap-3">
              {(() => {
              const pages: (number | string)[] = [];
              if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                pages.push(1, 2, 3);
                if (currentPage > 4) pages.push('...');
                if (currentPage > 3 && currentPage < totalPages - 2) pages.push(currentPage);
                if (currentPage < totalPages - 3) pages.push('...');
                pages.push(totalPages - 1, totalPages);
              }
              // Deduplicate
              const unique = pages.filter((p, i, arr) => arr.indexOf(p) === i);
              return unique.map((p, i) =>
              typeof p === 'string' ?
              <span key={`ellipsis-${i}`} className="text-[11px] font-mono text-gray-300 px-1">...</span> :
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`text-[11px] font-mono font-bold tracking-wider px-2 py-1 transition-all ${currentPage === p ? 'text-black underline underline-offset-4' : 'text-gray-300 hover:text-black'}`}>

                        {String(p).padStart(2, '0')}
                      </button>
              );
            })()}
            </div>

            <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-[11px] font-mono font-bold tracking-widest text-black hover:opacity-50 disabled:opacity-20 transition-all uppercase">

              NEXT ARCHIVE →
            </button>
          </div>
        </div>}
      </main>

      <UpgradeModal isOpen={lockedCategoryModal.isOpen} onClose={() => setLockedCategoryModal({
      ...lockedCategoryModal,
      isOpen: false
    })} categoryName={lockedCategoryModal.name} />

      <Footer />
    </div>;
};
export default Studies;
