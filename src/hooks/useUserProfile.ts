import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface UserProfile {
  id: string;
  user_id: string;
  email: string | null;
  display_name: string | null;
  country: string | null;
  affiliation: string | null;
  preferred_language: string | null;
  discovery_source: string | null;
  professional_identity: string | null;
  interests: string[];
  created_at: string;
  updated_at: string;
}

export interface ProfileUpdate {
  display_name?: string | null;
  country?: string | null;
  affiliation?: string | null;
  preferred_language?: string | null;
  discovery_source?: string | null;
  professional_identity?: string | null;
  interests?: string[];
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch profile on mount and when user changes
  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        // If profile doesn't exist, it will be created by the trigger
        if (error.code === 'PGRST116') {
          console.log('Profile not found, waiting for trigger to create it');
          return;
        }
        throw error;
      }

      setProfile({
        ...data,
        interests: data.interests || []
      } as UserProfile);
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(async (updates: ProfileUpdate): Promise<boolean> => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to update your profile',
        variant: 'destructive',
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state
      setProfile(prev => prev ? {
        ...prev,
        ...updates,
        updated_at: new Date().toISOString()
      } : null);

      return true;
    } catch (err) {
      console.error('Error updating profile:', err);
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  }, [user]);

  // Helper to get display name or fallback
  const getDisplayName = useCallback(() => {
    if (profile?.display_name) return profile.display_name;
    if (profile?.email) return profile.email.split('@')[0];
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  }, [profile, user]);

  // Helper to get initials for avatar
  const getInitials = useCallback(() => {
    const name = getDisplayName();
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }, [getDisplayName]);

  return {
    profile,
    isLoading,
    updateProfile,
    refetchProfile: fetchProfile,
    getDisplayName,
    getInitials
  };
};
