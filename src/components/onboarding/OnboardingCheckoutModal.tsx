import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Tier {
  id: string;
  price: string;
  billingPeriod: string;
  scope: string;
  freq: string;
  desc: string;
}

interface OnboardingCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: Tier;
}

const ALL_CATEGORIES = [
  { name: 'Sleep', color: '#f4b9ba' },
  { name: 'Neuroscience', color: '#d14d4d' },
  { name: 'Nutrition', color: '#059669' },
  { name: 'Performance', color: '#ea580c' },
  { name: 'Physiology', color: '#0d9488' },
  { name: 'Cognition', color: '#2563eb' },
  { name: 'Behavior', color: '#9ae4f5' },
  { name: 'Longevity', color: '#3d98f8' },
  { name: 'Technology', color: '#376f7a' },
  { name: 'Aesthetics', color: '#db2777' },
];

function getCategoryLimit(tierId: string): number {
  switch (tierId) {
    case '01': return 1;
    case '02': return 6;
    case '03': return 10;
    case '04': return 10; // all
    default: return 1;
  }
}

const OnboardingCheckoutModal: React.FC<OnboardingCheckoutModalProps> = ({ isOpen, onClose, tier }) => {
  const [step, setStep] = useState<'summary' | 'categories' | 'payment' | 'success'>('summary');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  const billingLabel = tier.billingPeriod === 'week' ? 'Weekly' : 'Monthly';
  const isUnlimited = tier.id === '04';
  const categoryLimit = getCategoryLimit(tier.id);

  // Auto-select all for tier 04
  useEffect(() => {
    if (isUnlimited && step === 'categories') {
      setSelectedCategories(new Set(ALL_CATEGORIES.map(c => c.name)));
    }
  }, [isUnlimited, step]);

  const toggleCategory = (name: string) => {
    if (isUnlimited) return;
    setSelectedCategories(prev => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else if (next.size < categoryLimit) {
        next.add(name);
      }
      return next;
    });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep('success');
  };

  const handleClose = () => {
    setStep('summary');
    setCardNumber('');
    setExpiry('');
    setCvc('');
    setName('');
    setSelectedCategories(new Set());
    onClose();
  };

  const handleComplete = () => {
    handleClose();
    navigate('/dashboard');
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-white/90 backdrop-blur-2xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-zinc-50 border border-zinc-200 shadow-[0_25px_80px_rgba(0,0,0,0.15)] rounded-xl md:rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <AnimatePresence mode="wait">
              {step === 'summary' && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="p-5 md:p-10"
                >
                  <div className="flex items-start justify-between mb-6 md:mb-10">
                    <div>
                      <span className="font-mono text-[8px] md:text-[9px] text-zinc-400 uppercase tracking-[0.2em] md:tracking-[0.3em] block mb-1 md:mb-2">
                        Order Summary
                      </span>
                      <h2 className="font-mono text-lg md:text-xl font-bold tracking-[0.05em] md:tracking-[0.1em] uppercase text-zinc-900">Tier {tier.id}</h2>
                    </div>
                    <button onClick={handleClose} className="p-1.5 md:p-2 hover:bg-zinc-100 rounded-lg transition-colors">
                      <X className="w-4 h-4 text-zinc-400" />
                    </button>
                  </div>

                  <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 mb-5 md:mb-8 border border-zinc-200">
                    <div className="flex justify-between items-start mb-4 md:mb-6">
                      <div>
                        <h3 className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-wide md:tracking-wider text-zinc-900 mb-1">
                          Explicatio Tier {tier.id}
                        </h3>
                        <p className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-wide">{tier.desc}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl md:text-3xl font-sans font-extralight text-zinc-900" style={{ fontVariantNumeric: 'normal', fontFeatureSettings: '"zero" 0' }}>${tier.price}</span>
                        <span className="text-[10px] md:text-[11px] font-mono text-black uppercase ml-1 tracking-wide font-bold">/ {billingLabel}</span>
                      </div>
                    </div>

                    <div className="space-y-2 md:space-y-3 pt-3 md:pt-4 border-t border-zinc-200">
                      <div className="flex items-center gap-2 md:gap-3">
                        <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-zinc-700" />
                        <span className="text-[9px] md:text-[10px] font-mono text-zinc-700 uppercase tracking-wide">{tier.scope}</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-zinc-700" />
                        <span className="text-[9px] md:text-[10px] font-mono text-zinc-700 uppercase tracking-wide">{tier.freq} / week</span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-zinc-700" />
                        <span className="text-[9px] md:text-[10px] font-mono text-zinc-700 uppercase tracking-wide">Full archive access</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 mb-5 md:mb-8 border border-zinc-200">
                    <div className="flex justify-between items-center mb-2 md:mb-3">
                      <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-wide text-zinc-600">Subscription</span>
                      <span className="font-mono text-[10px] md:text-[11px] text-zinc-900" style={{ fontVariantNumeric: 'normal', fontFeatureSettings: '"zero" 0' }}>${tier.price} / {billingLabel}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 md:pt-3 border-t border-zinc-200">
                      <span className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-wide text-zinc-900">Due Today</span>
                      <span className="font-mono text-base md:text-lg font-bold text-zinc-900" style={{ fontVariantNumeric: 'normal', fontFeatureSettings: '"zero" 0' }}>${tier.price}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep('categories')}
                    className="w-full py-3.5 md:py-4 bg-zinc-900 text-white font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-black transition-colors rounded-sm flex items-center justify-center gap-2 md:gap-3"
                  >
                    Choose Your Categories
                    <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  </button>

                  <p className="text-center text-[8px] md:text-[9px] text-zinc-400 mt-4 md:mt-6 font-mono uppercase tracking-wider md:tracking-widest">
                    Cancel anytime. No commitment required.
                  </p>
                </motion.div>
              )}

              {step === 'categories' && (
                <motion.div
                  key="categories"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="p-5 md:p-10"
                >
                  <div className="flex items-start justify-between mb-5 md:mb-8">
                    <div>
                      <span className="font-mono text-[8px] md:text-[9px] text-zinc-400 uppercase tracking-[0.2em] md:tracking-[0.3em] block mb-1 md:mb-2">
                        Select Categories
                      </span>
                      <h2 className="font-mono text-base md:text-lg font-bold tracking-[0.05em] md:tracking-[0.1em] uppercase text-zinc-900">
                        {isUnlimited ? 'All Categories Included' : `Choose ${categoryLimit} ${categoryLimit === 1 ? 'Category' : 'Categories'}`}
                      </h2>
                      <p className="text-[9px] md:text-[10px] text-zinc-500 mt-1">
                        {isUnlimited
                          ? 'Your tier includes full access to every research category.'
                          : `Select up to ${categoryLimit} ${categoryLimit === 1 ? 'category' : 'categories'} to receive new studies from. ${selectedCategories.size}/${categoryLimit} selected.`
                        }
                      </p>
                    </div>
                    <button onClick={handleClose} className="p-1.5 md:p-2 hover:bg-zinc-100 rounded-lg transition-colors">
                      <X className="w-4 h-4 text-zinc-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 md:gap-3 mb-5 md:mb-8">
                    {ALL_CATEGORIES.map((cat) => {
                      const isSelected = selectedCategories.has(cat.name);
                      const isDisabled = !isSelected && !isUnlimited && selectedCategories.size >= categoryLimit;
                      return (
                        <button
                          key={cat.name}
                          onClick={() => toggleCategory(cat.name)}
                          disabled={isDisabled && !isSelected}
                          className={`relative flex items-center gap-3 p-3 md:p-4 rounded-lg border transition-all text-left ${
                            isSelected
                              ? 'border-zinc-800 bg-white shadow-sm'
                              : isDisabled
                                ? 'border-zinc-100 bg-zinc-50 opacity-40 cursor-not-allowed'
                                : 'border-zinc-200 bg-white hover:border-zinc-400 cursor-pointer'
                          }`}
                        >
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: cat.color }}
                          />
                          <span className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-wide text-zinc-800">
                            {cat.name}
                          </span>
                          {isSelected && (
                            <Check className="w-3 h-3 text-zinc-800 ml-auto" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-3 md:gap-4">
                    <button onClick={() => setStep('summary')} className="flex-1 py-3 md:py-4 border border-zinc-200 text-zinc-600 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] hover:border-zinc-400 transition-colors rounded-sm">Back</button>
                    <button
                      onClick={() => setStep('payment')}
                      disabled={!isUnlimited && selectedCategories.size === 0}
                      className="flex-1 py-3 md:py-4 bg-zinc-900 text-white font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-black transition-colors rounded-sm disabled:opacity-40 flex items-center justify-center gap-2"
                    >
                      Continue to Payment
                      <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="p-5 md:p-10"
                >
                  <div className="flex items-start justify-between mb-5 md:mb-8">
                    <div className="flex items-center gap-3">
                      <svg className="w-10 md:w-12 h-4 md:h-5" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M59.64 12.776c0-4.19-2.03-7.494-5.91-7.494-3.9 0-6.26 3.305-6.26 7.458 0 4.92 2.79 7.402 6.78 7.402 1.95 0 3.42-.442 4.53-1.065v-3.27c-1.11.553-2.39.885-4.01.885-1.59 0-3-.553-3.18-2.487h8.02c0-.212.03-1.065.03-1.43zm-8.11-1.557c0-1.849 1.13-2.617 2.16-2.617 1 0 2.07.768 2.07 2.617h-4.23zm-10.04-5.937c-1.6 0-2.63.75-3.2 1.272l-.21-1.012h-3.56v19.09l4.04-.86.01-4.633c.59.426 1.45 1.03 2.88 1.03 2.91 0 5.56-2.34 5.56-7.494-.01-4.714-2.69-7.393-5.52-7.393zm-.97 11.37c-.96 0-1.52-.34-1.91-.759l-.02-5.998c.42-.461.99-.79 1.93-.79 1.48 0 2.5 1.66 2.5 3.766 0 2.165-1 3.78-2.5 3.78zm-13.09-12.3l4.05-.866V0l-4.05.858v3.493zm0 1.214h4.05v14.053h-4.05V5.566zm-4.45 1.19l-.26-1.19h-3.5v14.053h4.04V9.217c.95-1.244 2.57-1.016 3.07-.839V5.566c-.51-.189-2.4-.542-3.35 1.19zM9.46 2.063L5.5 2.91l-.02 12.872c0 2.38 1.78 4.13 4.16 4.13 1.32 0 2.28-.244 2.81-.53v-3.28c-.52.21-3.09.955-3.09-1.44V8.907h3.09V5.566H9.36l.1-3.503zM.01 9.02c0-.638.53-1.042 1.42-1.042 1.27 0 2.86.386 4.13 1.078V5.59C4.16 5.15 2.79 4.94 1.41 4.94-1.87 4.94 0 7.566 0 9.37c0 2.79 2.43 3.714 4.34 4.1 1.12.235 2.16.408 2.16 1.052 0 .753-.66 1.058-1.59 1.058-1.37 0-3.13-.565-4.52-1.327v3.536c1.54.66 3.1.94 4.52.94 3.34 0 5.64-1.653 5.64-4.007-.01-3.012-2.59-3.925-4.54-4.313-1.08-.212-2.01-.386-2.01-1.059z" fill="#635BFF"/>
                      </svg>
                    </div>
                    <button onClick={handleClose} className="p-1.5 md:p-2 hover:bg-zinc-100 rounded-lg transition-colors">
                      <X className="w-4 h-4 text-zinc-400" />
                    </button>
                  </div>
                  
                  <div className="mb-4 md:mb-6">
                    <h2 className="font-mono text-base md:text-lg font-bold tracking-[0.05em] md:tracking-[0.1em] uppercase text-zinc-900 mb-1">Payment Details</h2>
                    <p className="font-mono text-[10px] md:text-[11px] text-black uppercase tracking-wide font-bold">Tier {tier.id} · ${tier.price} / {billingLabel}</p>
                  </div>

                  <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 border border-zinc-200 mb-4 md:mb-6">
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <label className="block text-[8px] md:text-[9px] font-mono text-zinc-500 uppercase tracking-[0.15em] md:tracking-[0.2em] mb-1.5 md:mb-2">Cardholder Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name on card" className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-colors font-mono text-sm uppercase tracking-wide placeholder:normal-case placeholder:text-zinc-400" />
                      </div>
                      <div>
                        <label className="block text-[8px] md:text-[9px] font-mono text-zinc-500 uppercase tracking-[0.15em] md:tracking-[0.2em] mb-1.5 md:mb-2">Card Number</label>
                        <div className="relative">
                          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} className="w-full pl-3 md:pl-4 pr-16 md:pr-20 py-2.5 md:py-3 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-colors font-mono text-sm tracking-wider md:tracking-widest placeholder:text-zinc-400" />
                          <div className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 flex gap-0.5 md:gap-1">
                            <svg className="w-6 h-4 md:w-8 md:h-5" viewBox="0 0 32 20" fill="none"><rect width="32" height="20" rx="2" fill="#1A1F71"/><circle cx="12" cy="10" r="5" fill="#EB001B"/><circle cx="20" cy="10" r="5" fill="#F79E1B"/><path d="M16 6.5a5 5 0 000 7" fill="#FF5F00"/></svg>
                            <svg className="w-6 h-4 md:w-8 md:h-5" viewBox="0 0 32 20" fill="none"><rect width="32" height="20" rx="2" fill="#0066B2"/><text x="6" y="13" fill="white" fontSize="8" fontWeight="bold">VISA</text></svg>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <div>
                          <label className="block text-[8px] md:text-[9px] font-mono text-zinc-500 uppercase tracking-[0.15em] md:tracking-[0.2em] mb-1.5 md:mb-2">Expiry Date</label>
                          <input type="text" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" maxLength={5} className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-colors font-mono text-sm tracking-wider md:tracking-widest placeholder:text-zinc-400" />
                        </div>
                        <div>
                          <label className="block text-[8px] md:text-[9px] font-mono text-zinc-500 uppercase tracking-[0.15em] md:tracking-[0.2em] mb-1.5 md:mb-2">CVC</label>
                          <div className="relative">
                            <input type="text" value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="123" maxLength={4} className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-colors font-mono text-sm tracking-wider md:tracking-widest placeholder:text-zinc-400" />
                            <Lock className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-3 h-3 md:w-3.5 md:h-3.5 text-zinc-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <Lock className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-600" />
                      <span className="text-[8px] md:text-[9px] font-mono text-zinc-600 uppercase tracking-wide">256-bit SSL</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-1.5">
                      <span className="text-[8px] md:text-[9px] font-mono text-zinc-500 uppercase tracking-wide">Powered by</span>
                      <svg className="w-8 h-3 md:w-10 md:h-4" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M59.64 12.776c0-4.19-2.03-7.494-5.91-7.494-3.9 0-6.26 3.305-6.26 7.458 0 4.92 2.79 7.402 6.78 7.402 1.95 0 3.42-.442 4.53-1.065v-3.27c-1.11.553-2.39.885-4.01.885-1.59 0-3-.553-3.18-2.487h8.02c0-.212.03-1.065.03-1.43zm-8.11-1.557c0-1.849 1.13-2.617 2.16-2.617 1 0 2.07.768 2.07 2.617h-4.23zm-10.04-5.937c-1.6 0-2.63.75-3.2 1.272l-.21-1.012h-3.56v19.09l4.04-.86.01-4.633c.59.426 1.45 1.03 2.88 1.03 2.91 0 5.56-2.34 5.56-7.494-.01-4.714-2.69-7.393-5.52-7.393zm-.97 11.37c-.96 0-1.52-.34-1.91-.759l-.02-5.998c.42-.461.99-.79 1.93-.79 1.48 0 2.5 1.66 2.5 3.766 0 2.165-1 3.78-2.5 3.78zm-13.09-12.3l4.05-.866V0l-4.05.858v3.493zm0 1.214h4.05v14.053h-4.05V5.566zm-4.45 1.19l-.26-1.19h-3.5v14.053h4.04V9.217c.95-1.244 2.57-1.016 3.07-.839V5.566c-.51-.189-2.4-.542-3.35 1.19zM9.46 2.063L5.5 2.91l-.02 12.872c0 2.38 1.78 4.13 4.16 4.13 1.32 0 2.28-.244 2.81-.53v-3.28c-.52.21-3.09.955-3.09-1.44V8.907h3.09V5.566H9.36l.1-3.503zM.01 9.02c0-.638.53-1.042 1.42-1.042 1.27 0 2.86.386 4.13 1.078V5.59C4.16 5.15 2.79 4.94 1.41 4.94-1.87 4.94 0 7.566 0 9.37c0 2.79 2.43 3.714 4.34 4.1 1.12.235 2.16.408 2.16 1.052 0 .753-.66 1.058-1.59 1.058-1.37 0-3.13-.565-4.52-1.327v3.536c1.54.66 3.1.94 4.52.94 3.34 0 5.64-1.653 5.64-4.007-.01-3.012-2.59-3.925-4.54-4.313-1.08-.212-2.01-.386-2.01-1.059z" fill="#635BFF"/>
                      </svg>
                    </div>
                  </div>

                  <div className="flex gap-3 md:gap-4">
                    <button onClick={() => setStep('categories')} className="flex-1 py-3 md:py-4 border border-zinc-200 text-zinc-600 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] hover:border-zinc-400 transition-colors rounded-sm">Back</button>
                    <button onClick={handleSubmit} disabled={isProcessing} className="flex-1 py-3 md:py-4 bg-zinc-900 text-white font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-black transition-colors rounded-sm disabled:opacity-50 flex items-center justify-center gap-2">
                      {isProcessing ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>Pay ${tier.price}</>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 md:p-10 text-center"
                >
                  <div className="mb-6 md:mb-8">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                      <Check className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <h2 className="font-mono text-lg md:text-xl font-bold tracking-[0.05em] md:tracking-[0.1em] uppercase text-zinc-900 mb-2">Welcome to Explicatio</h2>
                    <p className="font-mono text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-wide">Your Tier {tier.id} membership is active</p>
                  </div>
                  
                  <button
                    onClick={handleComplete}
                    className="w-full py-3.5 md:py-4 bg-zinc-900 text-white font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-black transition-colors rounded-sm flex items-center justify-center gap-2 md:gap-3"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingCheckoutModal;
