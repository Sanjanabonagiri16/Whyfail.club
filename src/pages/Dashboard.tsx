
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EmotionalAnalytics from '@/components/EmotionalAnalytics';
import AnonymousModeToggle from '@/components/AnonymousModeToggle';
import SOSButton from '@/components/SOSButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PenTool, BookOpen, Users, TrendingUp, Calendar, Target } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch user profile
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

  // Fetch user's recent journal entries
  const { data: recentEntries = [] } = useQuery({
    queryKey: ['recent-entries', user?.id],
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

  // Fetch user progress
  const { data: userProgress } = useQuery({
    queryKey: ['user-progress', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch user badges
  const { data: badges = [] } = useQuery({
    queryKey: ['user-badges', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Set up real-time updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('dashboard-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'journal_entries',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['recent-entries', user.id] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_progress',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['user-progress', user.id] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_badges',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['user-badges', user.id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, queryClient]);

  if (!user) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <Card className="bg-navy-800 border-navy-700 p-8">
          <CardContent>
            <p className="text-white text-center">Please log in to access your dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getStreakDays = () => {
    if (recentEntries.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    const sortedEntries = [...recentEntries].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    for (let i = 0; i < sortedEntries.length; i++) {
      const entryDate = new Date(sortedEntries[i].created_at);
      const daysDiff = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === i) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  return (
    <div className="min-h-screen bg-navy-900">
      <Navigation />
      
      <div className="max-w-6xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {profile?.first_name || 'Friend'}!
            </h1>
            <p className="text-gray-300">Track your progress and continue your journey</p>
          </div>
          <div className="flex items-center space-x-4">
            <SOSButton />
            <Button 
              onClick={() => navigate('/journal')}
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
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-navy-800 border-navy-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Entries</p>
                      <p className="text-2xl font-bold text-white">{recentEntries.length}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-gold-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-navy-800 border-navy-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Streak Days</p>
                      <p className="text-2xl font-bold text-white">{getStreakDays()}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-navy-800 border-navy-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Badges Earned</p>
                      <p className="text-2xl font-bold text-white">{badges.length}</p>
                    </div>
                    <Target className="w-8 h-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Entries */}
            <Card className="bg-navy-800 border-navy-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-gold-400" />
                    Recent Entries
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/journal')}
                    className="border-navy-600 text-gray-300 hover:bg-navy-700"
                  >
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentEntries.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">No journal entries yet</p>
                    <Button 
                      onClick={() => navigate('/journal')}
                      className="bg-gold-500 hover:bg-gold-600 text-navy-900"
                    >
                      Write Your First Entry
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentEntries.slice(0, 3).map((entry) => (
                      <div key={entry.id} className="bg-navy-700 p-4 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-white font-medium">{entry.title}</h4>
                          <div className="flex items-center text-xs text-gray-400">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(entry.created_at)}
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">
                          {entry.content.substring(0, 100)}...
                        </p>
                        {entry.tags && entry.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {entry.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="outline" className="border-gold-400 text-gold-400 text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Progress Quest */}
            {userProgress && (
              <Card className="bg-navy-800 border-navy-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-gold-400" />
                    Current Quest: {userProgress.quest_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Day {userProgress.current_day} of {userProgress.total_steps}</span>
                      <span className="text-gold-400">{Math.round((userProgress.current_day / userProgress.total_steps) * 100)}%</span>
                    </div>
                    <div className="w-full bg-navy-700 rounded-full h-2">
                      <div 
                        className="bg-gold-400 h-2 rounded-full" 
                        style={{ width: `${(userProgress.current_day / userProgress.total_steps) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
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

            {/* Badges */}
            {badges.length > 0 && (
              <Card className="bg-navy-800 border-navy-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-gold-400" />
                    Recent Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {badges.slice(0, 3).map((badge) => (
                      <div key={badge.id} className="bg-navy-700 p-3 rounded-lg">
                        <h4 className="text-white font-medium text-sm">{badge.badge_name}</h4>
                        <p className="text-gray-400 text-xs mt-1">{badge.badge_description}</p>
                        <p className="text-gold-400 text-xs mt-1">
                          Earned {formatDate(badge.earned_at)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="bg-navy-800 border-navy-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full border-navy-600 text-gray-300 hover:bg-navy-700"
                  onClick={() => navigate('/stories')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Browse Stories
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-navy-600 text-gray-300 hover:bg-navy-700"
                  onClick={() => navigate('/mentalk')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join MenTalk
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
