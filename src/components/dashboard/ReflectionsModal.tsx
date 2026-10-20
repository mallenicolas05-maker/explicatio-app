import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Trash2, Calendar as CalendarIcon } from 'lucide-react';

interface ReflectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reflections: Record<string, string>;
  onDelete: (dateKey: string) => void;
}

export const ReflectionsModal: React.FC<ReflectionsModalProps> = ({ isOpen, onClose, reflections, onDelete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
    setSelectedDateKey(null);
  };

  const formatDateKey = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'bg-black/20 backdrop-blur-sm' : 'bg-transparent backdrop-blur-none pointer-events-none'}`}>
      <div 
        className={`w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-out flex flex-col md:flex-row max-h-[85vh] ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'}`}
      >
        {/* Left Side: Calendar */}
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-mono text-lg font-bold text-gray-900 uppercase tracking-[0.15em]">Past Reflections</h2>
            <div className="flex items-center gap-2">
               <button onClick={() => changeMonth(-1)} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors">
                 <ChevronLeft size={18} />
               </button>
               <button onClick={() => changeMonth(1)} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors">
                 <ChevronRight size={18} />
               </button>
            </div>
          </div>

          <div className="mb-6">
            <span className="text-sm font-mono text-gray-800 uppercase tracking-[0.15em]">{monthNames[month]} {year}</span>
          </div>

          <div className="grid grid-cols-7 gap-0 text-center mb-3">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={i} className="text-[11px] font-mono text-gray-400 uppercase py-2 tracking-wide">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10 w-full"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateKey = formatDateKey(day);
              const hasReflection = !!reflections[dateKey];
              const isSelected = selectedDateKey === dateKey;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDateKey(dateKey)}
                  className={`
                    relative h-10 w-full flex items-center justify-center text-sm transition-all font-sans
                    ${isSelected ? 'bg-gray-900 text-white rounded-full' : 'hover:bg-gray-100 text-gray-600 rounded-full'}
                    ${hasReflection && !isSelected ? 'font-semibold text-gray-900' : ''}
                  `}
                >
                  {day}
                  {hasReflection && !isSelected && (
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-72 p-8 bg-gray-50/50 flex flex-col justify-center border-l border-gray-100 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>

          {selectedDateKey ? (
            <div className="animate-in fade-in slide-in-from-right-4">
              <div className="mb-6">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">Selected Date</span>
                <div className="flex items-center gap-2 text-gray-900">
                  <CalendarIcon size={16} className="text-gray-400" />
                  <span className="font-mono text-sm">{selectedDateKey}</span>
                </div>
              </div>

              <div className="mb-6">
                 <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2">Note</span>
                 {reflections[selectedDateKey] ? (
                   <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <p className="text-sm text-gray-700 italic leading-relaxed font-serif">
                        "{reflections[selectedDateKey]}"
                      </p>
                   </div>
                 ) : (
                   <div className="p-4 bg-white/50 rounded-xl border border-dashed border-gray-200 text-center">
                     <p className="text-xs text-gray-400 font-mono uppercase">No reflection for this day.</p>
                   </div>
                 )}
              </div>

              {reflections[selectedDateKey] && (
                <button
                  onClick={() => {
                    onDelete(selectedDateKey);
                    setSelectedDateKey(null);
                  }}
                  className="mt-6 flex items-center justify-center w-full py-3 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors text-xs font-medium uppercase tracking-wide border border-transparent hover:border-red-100"
                >
                   <Trash2 size={14} className="mr-2" />
                   Remove Entry
                </button>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400 animate-in fade-in">
               <CalendarIcon size={40} className="mx-auto mb-4 opacity-20 stroke-[1.5]" />
               <p className="text-sm text-gray-400">Select a date to view past<br />reflections.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};