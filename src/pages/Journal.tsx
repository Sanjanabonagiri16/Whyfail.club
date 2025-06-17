
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EmotionalAnalytics from '@/components/EmotionalAnalytics';
import AnonymousModeToggle from '@/components/AnonymousModeToggle';
import EnhancedJournalModal from '@/components/EnhancedJournalModal';
import JournalEntryCard from '@/components/JournalEntryCard';
import SOSButton from '@/components/SOSButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenTool, BookOpen, TrendingUp } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

const Journal = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showWriteModal, setShowWriteModal] = useState(false);

  // Fetch user profile for anonymous mode
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

  // Fetch journal entries with real-time updates
  const { data: entries = [], isLoading } = useQuery({
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

  // Set up real-time updates for journal entries
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('journal-entries-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'journal_entries',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['journal-entries', user.id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, queryClient]);

  // Create journal entry mutation
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
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          user_id: user.id,
          title: entryData.title,
          content: entryData.content,
          is_public: entryData.isPublic,
          bounce_back_plan: entryData.bounceBackPlan,
          mood_before: entryData.moodBefore,
          mood_after: entryData.moodAfter,
          tags: entryData.tags,
        })
        .select()
        .single();

      if (error) throw error;

      // Trigger content moderation
      await supabase.rpc('moderate_content', {
        content_text: `${entryData.title} ${entryData.content}`,
        content_type_param: 'journal_entry',
        content_id_param: data.id,
        user_id_param: user.id,
      });

      return data;
    },
    onSuccess: () => {
      toast({
        title: "Entry Saved",
        description: "Your journal entry has been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['journal-entries', user?.id] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCreateEntry = (entryData: any) => {
    createEntryMutation.mutate(entryData);
    setShowWriteModal(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <Card className="bg-navy-800 border-navy-700 p-8">
          <CardContent>
            <p className="text-white text-center">Please log in to access your journal.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-900">
      <Navigation />
      
      <div className="max-w-6xl mx-auto py-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Your Journal</h1>
            <p className="text-gray-300">Express yourself in a safe space</p>
          </div>
          <div className="flex items-center space-x-4">
            <SOSButton />
            <Button 
              onClick={() => setShowWriteModal(true)}
              className="bg-gold-500 hover:bg-gold-600 text-navy-900"
            >
              <PenTool className="w-4 h-4 mr-2" />
              Write Entry
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Journal Entries */}
            <Card className="bg-navy-800 border-navy-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-gold-400" />
                  Your Entries ({entries.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400">Loading your entries...</p>
                  </div>
                ) : entries.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">No journal entries yet</p>
                    <Button 
                      onClick={() => setShowWriteModal(true)}
                      className="bg-gold-500 hover:bg-gold-600 text-navy-900"
                    >
                      Write Your First Entry
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {entries.map((entry) => (
                      <JournalEntryCard key={entry.id} entry={entry} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Anonymous Mode Toggle */}
            {profile && (
              <AnonymousModeToggle 
                isAnonymous={profile.is_anonymous_mode || false}
                userId={user.id}
              />
            )}

            {/* Emotional Analytics */}
            <EmotionalAnalytics userId={user.id} />

            {/* Quick Stats */}
            <Card className="bg-navy-800 border-navy-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-gold-400" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Entries</span>
                    <span className="text-white font-semibold">{entries.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Public Entries</span>
                    <span className="text-white font-semibold">
                      {entries.filter(e => e.is_public).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">This Month</span>
                    <span className="text-white font-semibold">
                      {entries.filter(e => 
                        new Date(e.created_at).getMonth() === new Date().getMonth()
                      ).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />

      <EnhancedJournalModal
        isOpen={showWriteModal}
        onClose={() => setShowWriteModal(false)}
        onSubmit={handleCreateEntry}
        isLoading={createEntryMutation.isPending}
      />
    </div>
  );
};

export default Journal;
