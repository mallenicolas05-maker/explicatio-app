import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Loader2, Mail } from 'lucide-react';
import { z } from 'zod';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showVerification, setShowVerification] = useState(false);
  
  const { signIn, signUp, signInWithGoogle, signInWithApple, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) newErrors.email = emailResult.error.errors[0].message;
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) newErrors.password = passwordResult.error.errors[0].message;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error.message.includes('Invalid login credentials') ? 'Invalid email or password' : error.message);
        } else {
          toast.success('Welcome back!');
          navigate('/dashboard');
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          toast.error(error.message.includes('already registered') ? 'An account with this email already exists' : error.message);
        } else {
          setShowVerification(true);
          setPassword('');
        }
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-zinc-400" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <Header />

      <div className="container-editorial py-16 pt-48">
        <div className="max-w-md mx-auto">
          
          {showVerification ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-6 border border-zinc-200 flex items-center justify-center">
                <Mail size={28} strokeWidth={1.5} className="text-zinc-400" />
              </div>
              <h1 
                className="text-3xl font-bold text-[#0B0B0B] uppercase tracking-[-0.02em] mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Check Your Inbox
              </h1>
              <p className="text-zinc-500 text-sm leading-relaxed mb-2">
                We've sent a verification link to
              </p>
              <p className="text-[#0B0B0B] text-sm font-mono font-medium mb-6">{email}</p>
              <p className="text-zinc-400 text-xs leading-relaxed mb-10">
                Click the link in the email to verify your account, then return here to sign in.
              </p>
              <button
                onClick={() => {
                  setShowVerification(false);
                  setIsLogin(true);
                }}
                className="w-full bg-[#0B0B0B] text-white py-4 text-[11px] font-medium uppercase tracking-[0.15em] hover:bg-zinc-800 transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h1 
                  className="text-4xl font-bold text-[#0B0B0B] uppercase tracking-[-0.02em] mb-4"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </h1>
                <p className="text-zinc-400 text-sm font-mono uppercase tracking-[0.1em]">
                  {isLogin ? 'Access your research library' : 'Start saving studies today'}
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <button
                  onClick={async () => {
                    const { error } = await signInWithGoogle();
                    if (error) toast.error(error.message || 'Failed to sign in with Google');
                  }}
                  className="w-full flex items-center justify-center gap-4 bg-white border border-zinc-200 py-4 px-6 hover:bg-zinc-50 hover:border-zinc-400 transition-all"
                >
                  <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-700">Sign in with Google</span>
                </button>

                <button
                  onClick={async () => {
                    const { error } = await signInWithApple();
                    if (error) toast.error(error.message || 'Failed to sign in with Apple');
                  }}
                  className="w-full flex items-center justify-center gap-4 bg-[#0B0B0B] border border-zinc-800 py-4 px-6 hover:bg-zinc-900 transition-all"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white">Sign in with Apple</span>
                </button>
              </div>

              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-100"></div></div>
                <div className="relative flex justify-center text-[8px] uppercase tracking-[0.3em]"><span className="bg-white px-4 text-zinc-300 font-bold">or use email</span></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
                    className={`w-full px-4 py-3 border ${errors.email ? 'border-red-300' : 'border-zinc-200'} text-[#0B0B0B] text-sm focus:outline-none focus:border-zinc-400 transition-colors`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 font-mono">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })); }}
                    className={`w-full px-4 py-3 border ${errors.password ? 'border-red-300' : 'border-zinc-200'} text-[#0B0B0B] text-sm focus:outline-none focus:border-zinc-400 transition-colors`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1 font-mono">{errors.password}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0B0B0B] text-white py-4 text-[11px] font-medium uppercase tracking-[0.15em] hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button
                  onClick={() => { setIsLogin(!isLogin); setErrors({}); }}
                  className="text-zinc-400 text-xs font-mono uppercase tracking-[0.1em] hover:text-zinc-600 transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>
              </div>
            </>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;
