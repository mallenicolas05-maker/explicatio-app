import React from 'react';
import { X, Bookmark, Clock, Check, PenLine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SavedStudy {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  isSimplified: boolean;
  imageUrl: string;
}

interface SavedStudiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  studies: SavedStudy[];
  onRemove: (slug: string) => void;
  isManaging: boolean;
  setIsManaging: (val: boolean) => void;
}

export const SavedStudiesModal: React.FC<SavedStudiesModalProps> = ({
  isOpen,
  onClose,
  studies,
  onRemove,
  isManaging,
  setIsManaging
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div 
        className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden z-10 border border-gray-100"
        style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xs font-mono font-bold text-black uppercase tracking-[0.3em]">
              Saved Library
            </h2>
            <p className="text-[10px] font-mono text-gray-400 mt-1">
              {studies.length} {studies.length === 1 ? 'study' : 'studies'} saved
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsManaging(!isManaging)}
              className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded transition-all ${
                isManaging 
                  ? 'bg-red-50 text-red-600 border border-red-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isManaging ? 'Done' : 'Edit'}
            </button>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6">
          {studies.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark size={32} className="mx-auto text-gray-300 mb-4" />
              <p className="text-sm text-gray-500 mb-2">No saved studies yet</p>
              <button 
                onClick={() => {
                  onClose();
                  navigate('/studies');
                }}
                className="text-xs font-mono text-black uppercase tracking-wider hover:underline"
              >
                Browse Studies →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {studies.map((study) => (
                <div 
                  key={study.slug}
                  onClick={() => {
                    if (!isManaging) {
                      onClose();
                      navigate(`/studies/${study.slug}`);
                    }
                  }}
                  className={`group flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 transition-all ${
                    !isManaging ? 'cursor-pointer hover:bg-white hover:border-gray-200 hover:shadow-sm' : ''
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                    <img 
                      src={study.imageUrl} 
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[8px] font-mono font-bold tracking-[0.1em] text-gray-500 uppercase">
                        {study.category}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-[9px] font-mono text-gray-400 flex items-center gap-1">
                        <Clock size={10} />
                        {study.readTime}
                      </span>
                      {study.isSimplified && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span className="text-[9px] font-mono text-emerald-500 flex items-center gap-1">
                            <Check size={10} />
                            Simplified
                          </span>
                        </>
                      )}
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">
                      {study.title}
                    </h4>
                  </div>

                  {/* Actions */}
                  {isManaging && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(study.slug);
                      }}
                      className="p-2 bg-red-50 hover:bg-red-100 rounded-full text-red-500 transition-colors flex-shrink-0"
                      title="Remove from library"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
