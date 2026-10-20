import React, { createContext, useContext, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface OnboardingData {
  displayName: string;
  country: string;
  state?: string;
  affiliation: string;
  discoverySource: string;
  professionalIdentity: string;
  interests: string[];
  recommendedTier: string;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  saveToProfile: (finalInterests?: string[]) => Promise<boolean>;
  isLoading: boolean;
}

const defaultData: OnboardingData = {
  displayName: '',
  country: '',
  state: undefined,
  affiliation: '',
  discoverySource: '',
  professionalIdentity: '',
  interests: [],
  recommendedTier: '01'
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<OnboardingData>(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const updateData = useCallback((updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  const saveToProfile = useCallback(async (finalInterests?: string[]): Promise<boolean> => {
    if (!user) {
      console.log('No user found, skipping profile save');
      return false;
    }

    setIsLoading(true);
    try {
      const interestsToSave = finalInterests !== undefined ? finalInterests : data.interests;
      
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: data.displayName || null,
          country: data.country || null,
          affiliation: data.affiliation || null,
          discovery_source: data.discoverySource || null,
          professional_identity: data.professionalIdentity || null,
          interests: interestsToSave,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: 'Profile saved!',
        description: 'Your preferences have been saved.',
      });

      return true;
    } catch (err) {
      console.error('Error saving profile:', err);
      toast({
        title: 'Error',
        description: 'Failed to save your profile. Please try again.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user, data]);

  return (
    <OnboardingContext.Provider value={{ data, updateData, saveToProfile, isLoading }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
