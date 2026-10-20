import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SavedHighlight } from '@/hooks/useSavedHighlights';
import { getStudyBySlug } from '@/data/studiesData';

interface SavedHighlightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlights: SavedHighlight[];
  onDelete: (id: string) => void;
}

export const SavedHighlightsModal: React.FC<SavedHighlightsModalProps> = ({
  isOpen,
  onClose,
  highlights,
  onDelete
}) => {
  const navigate = useNavigate();

  const handleNavigate = (slug: string, text: string) => {
    onClose();
    navigate(`/studies/${slug}?highlight=${encodeURIComponent(text)}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col bg-white p-0 [&>button]:hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-zinc-100">
          <DialogTitle className="font-mono text-lg font-bold uppercase tracking-[0.15em]">
            Saved Highlights
          </DialogTitle>
          <p className="text-sm text-zinc-500 mt-1">
            Your collection of highlighted text from studies
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {highlights.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-100 flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <p className="text-zinc-500 mb-2">No highlights yet</p>
              <p className="text-sm text-zinc-400">
                Select text in any study and save it to your collection
              </p>
            </div>
          ) : (
            highlights.map((highlight) => {
              const study = getStudyBySlug(highlight.study_slug);
              return (
                <div
                  key={highlight.id}
                  className="group relative p-4 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-all"
                >
                  {/* Highlighted text */}
                  <div
                    className="px-3 py-2 rounded-lg text-sm leading-relaxed mb-3"
                    style={{
                      backgroundColor: highlight.background_color,
                      color: highlight.text_color
                    }}
                  >
                    "{highlight.highlighted_text}"
                  </div>

                  {/* Study info & actions */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <button
                        onClick={() => handleNavigate(highlight.study_slug, highlight.highlighted_text)}
                        className="text-xs font-mono text-zinc-600 hover:text-zinc-900 transition-colors flex items-center gap-1.5 truncate"
                      >
                        <ExternalLink size={12} />
                        <span className="truncate">
                          {study?.title || highlight.study_slug}
                        </span>
                      </button>
                      <p className="text-[10px] text-zinc-400 mt-1">
                        {formatDate(highlight.created_at)}
                      </p>
                    </div>

                    <button
                      onClick={() => onDelete(highlight.id)}
                      className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Remove highlight"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
