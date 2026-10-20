import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';

interface SectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Section: React.FC<SectionProps> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-zinc-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group transition-all"
      >
        <h3 
          className="text-[18px] font-bold tracking-[0.01em] text-[#0B0B0B] uppercase"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {title}
        </h3>

        <div className={`text-zinc-400 transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}>
          <ChevronUp size={18} strokeWidth={1.5} />
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[2000px] opacity-100 pb-10' : 'max-h-0 opacity-0'}`}>
        <div 
          className="text-[17px] text-zinc-600 leading-[1.7] space-y-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400 }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};