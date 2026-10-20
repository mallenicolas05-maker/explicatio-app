import React from 'react';
import { Check, X } from 'lucide-react';
import { 
  PasswordValidationResult, 
  getStrengthLabel, 
  getStrengthColor 
} from '@/utils/passwordValidation';
import { cn } from '@/lib/utils';

interface PasswordStrengthIndicatorProps {
  validation: PasswordValidationResult;
  showRequirements?: boolean;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ 
  validation, 
  showRequirements = true 
}) => {
  const { score, requirements } = validation;
  const strengthLabel = getStrengthLabel(score);
  const strengthColor = getStrengthColor(score);

  return (
    <div className="space-y-3 mt-3">
      {/* Strength bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-[8px] md:text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
            Strength
          </span>
          <span className={cn(
            "text-[8px] md:text-[9px] font-bold uppercase tracking-widest",
            score <= 1 ? "text-red-500" : score <= 2 ? "text-yellow-600" : "text-green-600"
          )}>
            {strengthLabel}
          </span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-300",
                index <= score ? strengthColor : "bg-zinc-200"
              )}
            />
          ))}
        </div>
      </div>

      {/* Requirements checklist */}
      {showRequirements && (
        <div className="space-y-2">
          <span className="text-[8px] md:text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
            Must include
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {requirements.map((req) => (
              <div 
                key={req.id} 
                className="flex items-center gap-1.5"
              >
                {req.met ? (
                  <Check size={10} className="text-green-600 shrink-0" />
                ) : (
                  <X size={10} className="text-zinc-300 shrink-0" />
                )}
                <span className={cn(
                  "text-[8px] uppercase tracking-wide truncate",
                  req.met ? "text-green-600" : "text-zinc-400"
                )}>
                  {req.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
