import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface SavedHighlight {
  id: string;
  study_slug: string;
  highlighted_text: string;
  background_color: string;
  text_color: string;
  created_at: string;
}

export const useSavedHighlights = () => {
  const [highlights, setHighlights] = useState<SavedHighlight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch highlights on mount and when user changes
  useEffect(() => {
    const fetchHighlights = async () => {
      if (!user) {
        setHighlights([]);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('saved_highlights')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setHighlights(data || []);
      } catch (err) {
        console.error('Error fetching highlights:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHighlights();
  }, [user]);

  const saveHighlight = useCallback(async (
    studySlug: string,
    text: string,
    backgroundColor: string,
    textColor: string
  ): Promise<boolean> => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to save highlights',
        variant: 'destructive',
      });
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('saved_highlights')
        .insert({
          user_id: user.id,
          study_slug: studySlug,
          highlighted_text: text,
          background_color: backgroundColor,
          text_color: textColor
        })
        .select()
        .single();

      if (error) throw error;

      setHighlights(prev => [data, ...prev]);

      toast({
        title: 'Highlight saved',
        description: 'Text has been added to your collection',
        duration: 10000,
      });
      return true;
    } catch (err) {
      console.error('Error saving highlight:', err);
      toast({
        title: 'Error',
        description: 'Failed to save highlight. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  }, [user]);

  const deleteHighlight = useCallback(async (highlightId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('saved_highlights')
        .delete()
        .eq('id', highlightId)
        .eq('user_id', user.id);

      if (error) throw error;

      setHighlights(prev => prev.filter(h => h.id !== highlightId));

      toast({
        title: 'Highlight removed',
        description: 'Text has been removed from your collection',
      });
      return true;
    } catch (err) {
      console.error('Error deleting highlight:', err);
      toast({
        title: 'Error',
        description: 'Failed to remove highlight. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  }, [user]);

  return {
    highlights,
    isLoading,
    saveHighlight,
    deleteHighlight
  };
};
