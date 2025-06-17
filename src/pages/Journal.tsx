import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircle, BookOpen, Calendar, Medal, Target } from 'lucide-react';
import JournalEntryCard from '@/components/JournalEntryCard';
import EnhancedJournalModal from '@/components/EnhancedJournalModal';
import Navigation from '@/components/Navigation';
import EmotionalAnalytics from '@/components/EmotionalAnalytics';
import AnonymousModeToggle from '@/components/AnonymousModeToggle';
import SOSButton from '@/components/SOSButton';

const Journal = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showWriteModal, setShowWriteModal] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: journalEntries } = useQuery({
    queryKey: ['journal-entries', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const createEntryMutation = useMutation({
    mutationFn: async (entryData: {
      title: string;
      content: string;
      isPublic: boolean;
      bounceBackPlan?: string;
      moodBefore?: number;
      moodAfter?: number;
      tags?: string[];
    }) => {
      const { data: newEntry, error } = await supabase
        .from('journal_entries')
        .insert({
          title: entryData.title,
          content: entryData.content,
          is_public: entryData.isPublic,
          bounce_back_plan: entryData.bounceBackPlan,
          mood_before: entryData.moodBefore,
          mood_after: entryData.moodAfter,
          tags: entryData.tags,
          user_id: user!.id
        })
        .select()
        .single();
      
      if (error) throw error;

      // Trigger content moderation
      await supabase.rpc('moderate_content', {
        content_text: `${entryData.title} ${entryData.content}`,
        content_type_param: 'journal_entry',
        content_id_param: newEntry.id,
        user_id_param: user!.id
      });

      return newEntry;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal-entries'] });
      setShowWriteModal(false);
      toast({
        title: "Success",
        description: "Journal entry created successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const latestEntry = journalEntries?.[0];
  const currentDay = 5;
  const badges = ['Resilient Soul', 'Open Warrior', 'Truth Seeker'];

  return (
    <div className="min-h-screen bg-navy-900">
      <Navigation />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header with SOS */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Hello, {profile?.first_name || 'Warrior'} 👋
            </h2>
            <p className="text-gray-300">Your personal mental space for growth and reflection</p>
          </div>
          <SOSButton />
        </div>

        {/* Privacy Control */}
        <div className="mb-6">
          <AnonymousModeToggle 
            isAnonymous={profile?.is_anonymous_mode || false} 
            userId={user.id} 
          />
        </div>

        {/* Journey Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* ... keep existing code (journey overview cards) */}
          <Card className="bg-navy-800 border-navy-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-8 h-8 text-gold-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">📖 Latest Journal</h3>
                  <p className="text-gray-300 text-sm truncate">
                    {latestEntry?.title || "Start your first entry"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-navy-800 border-navy-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Target className="w-8 h-8 text-gold-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">🧭 Current Quest</h3>
                  <p className="text-gray-300 text-sm">Day {currentDay} - Confidence Rebuild</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-navy-800 border-navy-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Medal className="w-8 h-8 text-gold-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">🏆 Badges</h3>
                  <p className="text-gray-300 text-sm">{badges.length} earned</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emotional Analytics */}
        <div className="mb-8">
          <EmotionalAnalytics userId={user.id} />
        </div>

        {/* Write New Journal Section */}
        <Card className="bg-navy-800 border-navy-700 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Ready to reflect?</h3>
                <p className="text-gray-300">Your thoughts matter. Let them flow.</p>
              </div>
              <Button 
                onClick={() => setShowWriteModal(true)}
                className="bg-gold-500 hover:bg-gold-600 text-navy-900"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Write New Journal
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Journal Entries */}
        <Card className="bg-navy-800 border-navy-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              📁 My Past Entries
              <span className="text-sm text-gray-400 font-normal">
                {journalEntries?.length || 0} entries
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {journalEntries?.length ? (
                journalEntries.map((entry) => (
                  <JournalEntryCard key={entry.id} entry={entry} />
                ))
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No entries yet</h3>
                  <p className="text-gray-400 mb-6">Start your journey by writing your first journal entry</p>
                  <Button 
                    onClick={() => setShowWriteModal(true)}
                    className="bg-gold-500 hover:bg-gold-600 text-navy-900"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Write Your First Entry
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Badge System */}
        <Card className="bg-navy-800 border-navy-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white">🏆 Your Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {badges.map((badge, index) => (
                <div key={index} className="bg-navy-700 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">🏅</div>
                  <p className="text-gold-400 font-medium">{badge}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <EnhancedJournalModal 
        isOpen={showWriteModal}
        onClose={() => setShowWriteModal(false)}
        onSubmit={createEntryMutation.mutate}
        isLoading={createEntryMutation.isPending}
      />
    </div>
  );
};

export default Journal;
