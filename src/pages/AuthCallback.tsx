import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import explicatioLogo from '@/assets/explicatio-logo-zebra.png';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkUserProfile = async () => {
      // Wait for auth to finish loading
      if (authLoading) return;

      // If no user, redirect to onboarding sign-in
      if (!user) {
        navigate('/onboarding', { replace: true });
        return;
      }

      try {
        // Check if user has completed onboarding (has display_name set)
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          // If profile doesn't exist or error, send to onboarding
          navigate('/onboarding?step=personalize', { replace: true });
          return;
        }

        // If display_name exists, user has completed onboarding
        if (profile?.display_name) {
          navigate('/dashboard', { replace: true });
        } else {
          // New user, needs to complete onboarding (start at personalize step)
          navigate('/onboarding?step=personalize', { replace: true });
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        navigate('/onboarding?step=personalize', { replace: true });
      } finally {
        setIsChecking(false);
      }
    };

    checkUserProfile();
  }, [user, authLoading, navigate]);

  return (
    <div 
      className="h-screen w-screen flex flex-col items-center justify-center"
      style={{ 
        background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #f1f5f9 100%)'
      }}
    >
      {/* Loading spinner */}
      <div className="flex flex-col items-center gap-6">
        <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-800 rounded-full animate-spin" />
        <p className="text-sm text-zinc-500 font-mono tracking-wide">
          Signing you in...
        </p>
      </div>

      {/* Logo */}
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
        <img 
          src={explicatioLogo} 
          alt="EXPLICATIO" 
          className="h-3 md:h-4 opacity-60"
        />
      </div>
    </div>
  );
};

export default AuthCallback;
