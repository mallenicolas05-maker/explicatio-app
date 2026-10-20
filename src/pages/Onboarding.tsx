import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { useAuth } from '@/contexts/AuthContext';
import SignUp from './onboarding/SignUp';
import CreateAccount from './onboarding/CreateAccount';
import PersonalizeLocation from './onboarding/PersonalizeLocation';
import DiscoverySource from './onboarding/DiscoverySource';
import PersonaSelection from './onboarding/PersonaSelection';
import DescribeBest from './onboarding/DescribeBest';
import UseCases from './onboarding/UseCases';
import TopicSelection from './onboarding/TopicSelection';
import TopicIntrigue from './onboarding/TopicIntrigue';
import Plans from './onboarding/Plans';
import explicatioLogo from '@/assets/explicatio-logo-zebra.png';

const Onboarding: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const getInitialStep = () => {
    const stepParam = searchParams.get('step');
    if (stepParam === 'personalize' && user) {
      return 2;
    }
    return 0;
  };

  const [step, setStep] = useState(getInitialStep);

  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam === 'personalize' && user && step < 2) {
      setStep(2);
    }
  }, [searchParams, user, step]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(0, prev - 1));
  const resetToStart = () => setStep(0);
  const goToCreateAccount = () => setStep(1);
  const goToSignIn = () => setStep(0);

  // Steps:
  // 0: Sign In
  // 1: Create Account
  // 2: Personalize Location
  // 3: Discovery Source
  // 4: What brings you here (PersonaSelection)
  // 5: Professional Identity (DescribeBest) - skippable
  // 6: What's your primary goal (UseCases) - skippable
  // 7: Select Research Topics (TopicSelection)
  // 8: What topics intrigue you (TopicIntrigue) - skippable
  // 9: Select a Frequency (Plans) - free option available

  const renderStep = () => {
    switch (step) {
      case 0: return <SignUp onNext={nextStep} onCreateAccount={goToCreateAccount} />;
      case 1: return <CreateAccount onNext={() => setStep(2)} onBack={goToSignIn} />;
      case 2: return <PersonalizeLocation onNext={nextStep} onPrev={prevStep} />;
      case 3: return <DiscoverySource onNext={nextStep} onPrev={prevStep} />;
      case 4: return <PersonaSelection onNext={nextStep} onPrev={prevStep} />;
      case 5: return <DescribeBest onNext={nextStep} onPrev={prevStep} />;
      case 6: return <UseCases onNext={nextStep} onPrev={prevStep} />;
      case 7: return <TopicSelection onNext={nextStep} onPrev={prevStep} />;
      case 8: return <TopicIntrigue onNext={nextStep} onPrev={prevStep} />;
      case 9: return <Plans onNext={resetToStart} onPrev={prevStep} />;
      default: return <SignUp onNext={nextStep} onCreateAccount={goToCreateAccount} />;
    }
  };

  // Show progress for steps 2-9 (after auth)
  const showProgress = step >= 2 && step <= 9;
  const progressSteps = 8; // steps 2-9

  return (
    <OnboardingProvider>
      <div 
        className="h-screen w-screen flex flex-col overflow-hidden relative"
        style={{ 
          background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #f1f5f9 100%)'
        }}
      >
        <div className="flex-grow overflow-hidden">
          {renderStep()}
        </div>
        
        {showProgress && (
          <div className="shrink-0 pb-8 flex justify-center">
            <div className="flex items-center gap-2">
              {Array.from({ length: progressSteps }, (_, i) => i + 1).map((i) => {
                const currentProgress = step - 1; // step 2 = progress 1, step 9 = progress 8
                return (
                  <div 
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === currentProgress
                        ? 'w-6 bg-black' 
                        : i < currentProgress
                          ? 'w-2 bg-zinc-300' 
                          : 'w-2 bg-zinc-200'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Explicatio Logo - Bottom Left */}
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
          <img 
            src={explicatioLogo} 
            alt="EXPLICATIO" 
            className="h-3 md:h-4 opacity-60"
          />
        </div>
      </div>
    </OnboardingProvider>
  );
};

export default Onboarding;
