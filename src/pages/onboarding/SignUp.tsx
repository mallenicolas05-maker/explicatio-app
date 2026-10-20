import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';

const emailSchema = z.string().trim().email({ message: 'Please enter a valid email address' });
const passwordSchema = z.string().min(6, { message: 'Password must be at least 6 characters' });

interface Props {
  onNext: () => void;
  onCreateAccount: () => void;
}

const SignUp: React.FC<Props> = ({ onNext, onCreateAccount }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { signInWithGoogle, signInWithApple, signIn } = useAuth();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      setEmailError(emailResult.error.errors[0].message);
      isValid = false;
    }

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      setPasswordError(passwordResult.error.errors[0].message);
      isValid = false;
    }

    return isValid;
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign in with Google',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithApple();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign in with Apple',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        // Handle specific Supabase error messages
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes('invalid login credentials')) {
          throw new Error('Invalid email or password. Please try again.');
        } else if (errorMessage.includes('email not confirmed')) {
          throw new Error('Please verify your email before signing in.');
        } else if (errorMessage.includes('too many requests')) {
          throw new Error('Too many login attempts. Please wait a moment.');
        }
        throw error;
      }
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Sign in failed',
        description: error.message || 'Failed to sign in. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col animate-fade-in overflow-hidden">
      <nav className="flex justify-between items-center px-4 md:px-12 py-4 md:py-8 shrink-0">
      </nav>

      <div className="flex-grow flex flex-col items-center justify-center px-4 md:px-6 overflow-y-auto">
        <div className="w-full max-w-[420px] text-center py-4">
          <h1 className="text-xl md:text-2xl font-mono font-bold tracking-tight mb-2 md:mb-3 uppercase">Sign In</h1>
          <p className="text-zinc-400 text-[10px] md:text-[11px] mt-2 md:mt-3 mb-8 md:mb-12 font-medium uppercase tracking-[0.15em] md:tracking-[0.2em]">Welcome back to Explicatio.</p>

          <div className="space-y-3 md:space-y-4">
            <button 
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 md:gap-5 bg-white border border-zinc-200 rounded-sm py-4 md:py-5 px-6 md:px-8 hover:bg-slate-50 hover:border-zinc-400 transition-all shadow-sm group disabled:opacity-50"
            >
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5 md:w-6 md:h-6" alt="Google" />
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider md:tracking-widest text-zinc-700">Sign in with Google</span>
            </button>

            <button 
              onClick={handleAppleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 md:gap-5 bg-black border border-zinc-800 rounded-sm py-4 md:py-5 px-6 md:px-8 hover:bg-zinc-900 hover:border-zinc-600 transition-all shadow-sm group disabled:opacity-50"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider md:tracking-widest text-white">Sign in with Apple</span>
            </button>

            <div className="relative py-5 md:py-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.4em]"><span className="bg-[#f8fafc] px-4 md:px-6 text-zinc-300 font-bold">or use email</span></div>
            </div>

            <div className="space-y-3 md:space-y-4 text-left">
              <div className="group">
                <label className="text-[8px] md:text-[9px] font-bold text-zinc-400 uppercase tracking-wider md:tracking-widest block mb-1 group-focus-within:text-black">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  className={`w-full bg-transparent border-b py-2.5 md:py-3 outline-none transition-colors text-sm font-mono tracking-wide ${
                    emailError ? 'border-red-500' : 'border-slate-200 focus:border-black'
                  }`}
                  placeholder="NAME@EXAMPLE.COM"
                />
                {emailError && (
                  <p className="text-red-500 text-[9px] mt-1 uppercase tracking-wide">{emailError}</p>
                )}
              </div>

              <div className="group">
                <label className="text-[8px] md:text-[9px] font-bold text-zinc-400 uppercase tracking-wider md:tracking-widest block mb-1 group-focus-within:text-black">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    className={`w-full bg-transparent border-b py-2.5 md:py-3 outline-none transition-colors text-sm font-mono tracking-wide pr-10 ${
                      passwordError ? 'border-red-500' : 'border-slate-200 focus:border-black'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-black transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-[9px] mt-1 uppercase tracking-wide">{passwordError}</p>
                )}
              </div>
            </div>

            <button 
              onClick={handleEmailSignIn}
              disabled={isLoading}
              className="w-full bg-zinc-800 text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] py-4 md:py-5 mt-4 md:mt-6 rounded-sm hover:bg-black transition-all shadow-lg disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
          
          <p className="mt-6 md:mt-10 text-[8px] md:text-[9px] uppercase tracking-[0.1em] md:tracking-[0.15em] text-zinc-400">
            Don't have an account? <button onClick={onCreateAccount} className="text-black underline cursor-pointer font-bold">Create one</button>
          </p>
        </div>
      </div>
      <div className="h-8 md:h-20 shrink-0"></div>
    </div>
  );
};

export default SignUp;
