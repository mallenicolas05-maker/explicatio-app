import React, { useEffect, useState } from 'react';
import { X, Search } from 'lucide-react';

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CategoriesModal: React.FC<CategoriesModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
      setSearchTerm('');
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  const categories = [
    'Biochemistry', 'Cell Biology', 'Genetics', 'Immunology', 'Microbiology', 
    'Neuroscience', 'Pathology', 'Pharmacology', 'Physiology', 'Virology', 
    'Epidemiology', 'Public Health', 'Bioinformatics', 'Biophysics', 'Botany', 
    'Zoology', 'Marine Biology', 'Ecology', 'Evolution', 'Molecular Biology', 
    'Oncology', 'Cardiology', 'Neurology', 'Endocrinology', 'Gastroenterology',
    'Hematology', 'Nephrology', 'Pulmonology', 'Rheumatology', 'Dermatology',
    'Psychiatry', 'Radiology', 'Anesthesiology', 'Surgery', 'Pediatrics'
  ];

  const filteredCategories = categories.filter(cat => 
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'bg-black/20 backdrop-blur-sm' : 'bg-transparent backdrop-blur-none pointer-events-none'}`}>
      <div 
        className={`w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-out flex flex-col max-h-[85vh] ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'}`}
      >
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="font-mono text-lg font-bold text-gray-900 uppercase tracking-[0.15em]">All Categories</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 pb-6">
           <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Search size={16} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="SEARCH CATEGORIES ..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg pl-11 pr-4 py-3 text-sm font-mono placeholder:text-gray-400 placeholder:text-[11px] placeholder:tracking-[0.1em] focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/5 transition-all"
                autoFocus
              />
           </div>
        </div>

        <div className="px-6 pb-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {filteredCategories.map((cat, idx) => (
                <button 
                  key={idx}
                  className="px-2.5 py-2 bg-white border border-gray-200 rounded text-center hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200 group"
                >
                  <span className="font-mono text-[10px] font-medium text-gray-600 group-hover:text-white uppercase tracking-wider block truncate">{cat}</span>
                </button>
            ))}
            {filteredCategories.length === 0 && (
               <div className="col-span-full text-center py-8 text-gray-400 font-mono text-[10px] uppercase tracking-widest">
                  No categories matched your search
               </div>
            )}
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-400 font-mono uppercase tracking-[0.2em]">Select a classification to update library</p>
        </div>
      </div>
    </div>
  );
};