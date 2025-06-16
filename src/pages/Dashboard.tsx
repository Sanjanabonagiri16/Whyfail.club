
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { PlusCircle, BookOpen, Users, Target } from 'lucide-react';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();

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
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: upcomingMenTalk } = useQuery({
    queryKey: ['upcoming-mentalk'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mentalk_sessions')
        .select('*')
        .gte('scheduled_for', new Date().toISOString())
        .eq('is_active', true)
        .order('scheduled_for', { ascending: true })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Navigation */}
      <nav className="bg-navy-800 border-b border-navy-700 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex space-x-8">
            <h1 className="text-xl font-bold text-white">WhyFail.club</h1>
            <div className="flex space-x-6">
              <a href="/dashboard" className="text-gold-400 hover:text-gold-300">Dashboard</a>
              <a href="/stories" className="text-gray-300 hover:text-white">Stories</a>
              <a href="/mentalk" className="text-gray-300 hover:text-white">MenTalk</a>
            </div>
          </div>
          <Button 
            onClick={handleSignOut}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-navy-700"
          >
            Sign Out
          </Button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Hello, {profile?.first_name || 'Warrior'} 👋
          </h2>
          <p className="text-gray-300">Your safe space for growth and reflection</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-navy-800 border-navy-700">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-gold-400 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-white">Latest Journal</h3>
              <p className="text-gray-300 text-sm">
                {journalEntries?.[0]?.title || "Start your first entry"}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-navy-800 border-navy-700">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-gold-400 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-white">Current Quest</h3>
              <p className="text-gray-300 text-sm">Day 5 - Confidence Rebuild</p>
            </CardContent>
          </Card>
          
          <Card className="bg-navy-800 border-navy-700">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-gold-400 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-white">Circle Invite</h3>
              <p className="text-gray-300 text-sm">
                {upcomingMenTalk?.title || "No upcoming sessions"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Journal Section */}
          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                My Journal
                <Button size="sm" className="bg-gold-500 hover:bg-gold-600 text-navy-900">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Write New Entry
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {journalEntries?.length ? (
                  journalEntries.map((entry) => (
                    <div key={entry.id} className="p-4 bg-navy-700 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">{entry.title}</h4>
                      <p className="text-gray-300 text-sm line-clamp-2">{entry.content}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-gray-400">
                          {new Date(entry.created_at).toLocaleDateString()}
                        </span>
                        <Button size="sm" variant="outline" className="border-navy-600 text-gray-300">
                          Read
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">No journal entries yet</p>
                    <Button className="bg-gold-500 hover:bg-gold-600 text-navy-900">
                      Start Your Journey
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Community Section */}
          <Card className="bg-navy-800 border-navy-700">
            <CardHeader>
              <CardTitle className="text-white">Community</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMenTalk && (
                  <div className="p-4 bg-slate-800 rounded-lg border border-gold-400/20">
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">🔊</span>
                      <h4 className="font-semibold text-white">Join Live MenTalk</h4>
                    </div>
                    <p className="text-gray-300 mb-2">{upcomingMenTalk.title}</p>
                    <p className="text-sm text-gray-400 mb-3">
                      {new Date(upcomingMenTalk.scheduled_for).toLocaleString()}
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-gold-500 hover:bg-gold-600 text-navy-900">
                        Join
                      </Button>
                      <Button size="sm" variant="outline" className="border-navy-600 text-gray-300">
                        Set Reminder
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Recent Community Activity</h4>
                  <div className="p-3 bg-navy-700 rounded-lg">
                    <p className="text-gray-300 text-sm">23 new stories shared this week</p>
                  </div>
                  <div className="p-3 bg-navy-700 rounded-lg">
                    <p className="text-gray-300 text-sm">5 upcoming MenTalk sessions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
