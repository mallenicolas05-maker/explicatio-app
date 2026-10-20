import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export const useSavedStudies = () => {
  const [savedStudySlugs, setSavedStudySlugs] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch saved studies on mount and when user changes
  useEffect(() => {
    const fetchSavedStudies = async () => {
      if (!user) {
        setSavedStudySlugs(new Set());
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('saved_studies')
          .select('study_slug')
          .eq('user_id', user.id);

        if (error) throw error;

        setSavedStudySlugs(new Set(data?.map(s => s.study_slug) || []));
      } catch (err) {
        console.error('Error fetching saved studies:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedStudies();
  }, [user]);

  const toggleSaveStudy = useCallback(async (studySlug: string) => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to save studies to your library',
        variant: 'destructive',
      });
      return false;
    }

    const isSaved = savedStudySlugs.has(studySlug);

    try {
      if (isSaved) {
        // Remove from saved
        const { error } = await supabase
          .from('saved_studies')
          .delete()
          .eq('user_id', user.id)
          .eq('study_slug', studySlug);

        if (error) throw error;

        setSavedStudySlugs(prev => {
          const next = new Set(prev);
          next.delete(studySlug);
          return next;
        });

        toast({
          title: 'Removed from library',
          description: 'Study has been removed from your saved collection',
        });
      } else {
        // Add to saved
        const { error } = await supabase
          .from('saved_studies')
          .insert({
            user_id: user.id,
            study_slug: studySlug
          });

        if (error) throw error;

        setSavedStudySlugs(prev => new Set([...prev, studySlug]));

        toast({
          title: 'Saved to library',
          description: 'Study has been added to your collection',
        });
      }
      return true;
    } catch (err) {
      console.error('Error toggling saved study:', err);
      toast({
        title: 'Error',
        description: 'Failed to update your library. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  }, [user, savedStudySlugs]);

  const isStudySaved = useCallback((studySlug: string) => {
    return savedStudySlugs.has(studySlug);
  }, [savedStudySlugs]);

  return {
    savedStudySlugs,
    isLoading,
    toggleSaveStudy,
    isStudySaved
  };
};
