import React, { useState } from 'react';

import { Search, Sliders, ArrowUp, ArrowDown, ChevronsUp, ChevronsDown, X } from 'lucide-react';



const RequestQueue: React.FC = () => {

  const [filterOpen, setFilterOpen] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isValidSelection, setIsValidSelection] = useState(false);



  const topics = [

    { rank: "01", title: "Psilocybin & TRD" },

    { rank: "02", title: "Microplastics" },

    { rank: "03", title: "Sauna Usage" },

    { rank: "04", title: "Creatine Monohydrate" },

  ];



  const categories = [

    "Sleep", "Nutrition", "Mental Health", "Longevity", 

    "Exercise", "Metabolism", "Neuroscience", "Cardiology",

    "Immunology", "Genetics", "Pharmacology", "Public Health"

  ];



  const handleCategorySelect = (cat: string) => {

    setSearchInput(cat);

    setIsValidSelection(true);

    setFilterOpen(false);

  };



  const handleSubmit = () => {
     if (!searchInput.trim()) return;
     setIsSubmitted(true);
     setFilterOpen(false);
  };



  const handleClose = () => {

      setIsSubmitted(false);

      setSearchInput('');

      setIsValidSelection(false);

  };



  const renderTrendIcon = (index: number) => {

      if (index === 0) return <ArrowUp size={20} className="text-green-500" strokeWidth={1.5} />;

      if (index === 1) return <ArrowDown size={20} className="text-red-500" strokeWidth={1.5} />;

      if (index === 2) return <ChevronsUp size={20} className="text-green-500" strokeWidth={1.5} />;

      if (index === 3) return <ChevronsDown size={20} className="text-red-500" strokeWidth={1.5} />;

      return null;

  }



  return (

    <section className="py-24 bg-white border-b border-gray-100">

      <div className="container mx-auto px-6 md:px-12 relative">

        

        {/* Success Overlay */}

        {isSubmitted && (

            <div className="absolute left-1/2 -translate-x-1/2 top-0 z-50 w-full max-w-3xl bg-white/98 backdrop-blur-sm border border-gray-200 flex flex-col items-center justify-center text-center p-12 h-[550px] animate-in fade-in zoom-in-95 duration-300">

                <button onClick={handleClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors">

                    <X size={16} strokeWidth={1} />

                </button>

                <div className="max-w-2xl mx-auto px-8 leading-[3rem]">

                    <span className="inline box-decoration-clone bg-gray-200 px-3 py-1 font-mono text-xs text-gray-900 uppercase tracking-widest rounded-sm shadow-sm">

                        We have sent "{searchInput || 'your request'}", thank you for your input and your efforts in supporting EXPLICATIO. We hope to see your chosen category here in the foreseeable future.

                    </span>

                </div>
                <img 
                    src="/assets/explicatio-logo-zebra.png" 
                    alt="Explicatio" 
                    className="absolute bottom-6 right-6 h-2 opacity-60"
                />

            </div>

        )}



        {/* Header - Centered */}

        <header className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-12">
            <span className="text-[10px] tracking-[0.4em] text-gray-400 uppercase font-medium mb-6">Community Radar</span>
            <h2 className="text-4xl md:text-5xl font-mono font-bold tracking-[0.1em] uppercase text-gray-900 mb-8 leading-tight">RESEARCH QUEUE</h2>
        </header>



        {/* Explanatory Subtext */}

        <div className="max-w-2xl mx-auto text-center mb-12">

            <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed">

                This is a feature where our community can contribute what new categories they'd like to see on EXPLICATIO, or which they'd like to see more of.

            </p>

        </div>

        

        <div className="max-w-3xl mx-auto">

            {/* Search Bar */}

            <div className="relative z-20">

                <div className="relative group">

                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">

                        <Search className={`h-5 w-5 transition-colors ${isValidSelection ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-900'}`} />

                    </div>

                    <input 

                        type="text" 

                        value={searchInput}

                        onChange={(e) => setSearchInput(e.target.value)}

                        className={`block w-full pl-16 pr-12 py-6 border text-gray-900 text-sm focus:ring-0 transition-all outline-none font-mono uppercase tracking-widest placeholder:font-sans placeholder:normal-case placeholder:tracking-normal placeholder:text-sm ${isValidSelection ? 'border-green-200 bg-green-50 focus:border-green-500 focus:bg-green-50' : 'bg-gray-50 border-gray-200 focus:border-gray-900 focus:bg-white'}`}

                        placeholder="Search to add your own 'category' if not already listed..." 

                    />

                    <div 

                        className="absolute inset-y-0 right-0 pr-6 flex items-center cursor-pointer"

                        onClick={() => setFilterOpen(!filterOpen)}

                    >

                        <Sliders className={`h-4 w-4 transition-colors ${filterOpen ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900'}`} />

                    </div>

                </div>



                {/* Aesthetic Dropdown */}

                {filterOpen && (

                    <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-100 shadow-xl rounded-lg p-2 grid grid-cols-1 gap-1 max-h-60 overflow-y-auto z-30 animate-in fade-in slide-in-from-top-2 duration-200">

                        <div className="px-3 py-2 text-[10px] font-mono uppercase text-gray-400 tracking-widest border-b border-gray-50 mb-1">Select Category</div>

                        {categories.map((cat, i) => (

                            <button 

                                key={i} 

                                onClick={() => handleCategorySelect(cat)}

                                className="text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded transition-colors font-light"

                            >

                                {cat}

                            </button>

                        ))}

                    </div>

                )}

            </div>



             {/* Submit Request Button */}

            <div className="flex justify-end mt-4 mb-16">

                 <button 

                    onClick={handleSubmit}

                    className="relative bg-white text-black px-6 py-3 text-xs font-medium uppercase tracking-widest border border-gray-200 transition-colors overflow-hidden group/submit"

                 >
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <rect x="0" y="0" width="100" height="100" fill="none" stroke="black" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="btn-sweep-segment" />
                    </svg>
                    <span className="relative z-10">Submit Request</span>

                </button>

            </div>



            {/* List Header */}

            <div className="flex justify-center items-center mb-6 border-b border-gray-100 pb-2">

                 <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Trending Categories</span>

            </div>



            {/* Topics List */}

            <div className="text-left">

                {topics.map((topic, i) => (

                    <div key={i} className="flex flex-col md:flex-row items-center py-5 border-b border-gray-50 px-4 -mx-4">

                        <div className="w-full md:w-12 font-mono text-gray-300 text-lg font-light mb-2 md:mb-0">

                            {topic.rank}

                        </div>

                        <div className="flex-grow mb-4 md:mb-0">

                            <h3 className="font-sans font-extralight text-xl text-zinc-800 tracking-tight">{topic.title}</h3>

                            <div className="flex items-center mt-2">

                                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">

                                    CURRENTLY IN REVIEW BY EXPLICATIO

                                </span>

                            </div>

                        </div>

                        <div className="flex items-center justify-end w-12">

                            {renderTrendIcon(i)}

                        </div>

                    </div>

                ))}

            </div>

            

        </div>

      </div>

    </section>

  );

};



export default RequestQueue;
