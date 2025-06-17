
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar, Clock, Users, Mic, Plus, UserPlus, UserMinus } from 'lucide-react';
import Navigation from '@/components/Navigation';

const MenTalkPage = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    description: '',
    scheduledFor: '',
    duration: 60,
    maxParticipants: 10,
  });

  const { data: sessions } = useQuery({
    queryKey: ['mentalk-sessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mentalk_sessions')
        .select(`
          *,
          mentalk_participants(count)
        `)
        .eq('is_active', true)
        .gte('scheduled_for', new Date().toISOString())
        .order('scheduled_for', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: myParticipations } = useQuery({
    queryKey: ['my-mentalk-participations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('mentalk_participants')
        .select('session_id')
        .eq('user_id', user.id)
        .is('left_at', null);
      
      if (error) throw error;
      return data.map(p => p.session_id);
    },
    enabled: !!user,
  });

  const createSessionMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('mentalk_sessions')
        .insert({
          title: newSession.title,
          description: newSession.description,
          scheduled_for: newSession.scheduledFor,
          duration_minutes: newSession.duration,
          max_participants: newSession.maxParticipants,
          host_id: user!.id,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mentalk-sessions'] });
      setShowCreateForm(false);
      setNewSession({
        title: '',
        description: '',
        scheduledFor: '',
        duration: 60,
        maxParticipants: 10,
      });
      toast({
        title: "Session Created",
        description: "Your MenTalk session has been scheduled!",
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

  const joinSessionMutation = useMutation({
    mutationFn: async (sessionId: string) => {
      const { error } = await supabase
        .from('mentalk_participants')
        .insert({
          session_id: sessionId,
          user_id: user!.id,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-mentalk-participations'] });
      queryClient.invalidateQueries({ queryKey: ['mentalk-sessions'] });
      toast({
        title: "Joined Session",
        description: "You're now registered for this MenTalk session!",
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

  const leaveSessionMutation = useMutation({
    mutationFn: async (sessionId: string) => {
      const { error } = await supabase
        .from('mentalk_participants')
        .update({ left_at: new Date().toISOString() })
        .eq('session_id', sessionId)
        .eq('user_id', user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-mentalk-participations'] });
      queryClient.invalidateQueries({ queryKey: ['mentalk-sessions'] });
      toast({
        title: "Left Session",
        description: "You've been removed from this session.",
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

  const isJoinedSession = (sessionId: string) => {
    return myParticipations?.includes(sessionId) || false;
  };

  return (
    <div className="min-h-screen bg-navy-900">
      <Navigation />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">MenTalk Circles</h2>
            <p className="text-gray-300">Connect, share, and heal together</p>
          </div>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-gold-500 hover:bg-gold-600 text-navy-900"
          >
            <Plus className="w-4 h-4 mr-2" />
            Host a Session
          </Button>
        </div>

        {showCreateForm && (
          <Card className="bg-navy-800 border-navy-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Create New MenTalk Session</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); createSessionMutation.mutate(); }} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Session Title</Label>
                    <Input
                      value={newSession.title}
                      onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                      placeholder="e.g., Overcoming Career Setbacks"
                      className="bg-navy-700 border-navy-600 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Date & Time</Label>
                    <Input
                      type="datetime-local"
                      value={newSession.scheduledFor}
                      onChange={(e) => setNewSession({...newSession, scheduledFor: e.target.value})}
                      className="bg-navy-700 border-navy-600 text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Description</Label>
                  <Textarea
                    value={newSession.description}
                    onChange={(e) => setNewSession({...newSession, description: e.target.value})}
                    placeholder="What will you discuss in this session?"
                    className="bg-navy-700 border-navy-600 text-white"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Duration (minutes)</Label>
                    <Input
                      type="number"
                      value={newSession.duration}
                      onChange={(e) => setNewSession({...newSession, duration: parseInt(e.target.value)})}
                      min="30"
                      max="180"
                      className="bg-navy-700 border-navy-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Max Participants</Label>
                    <Input
                      type="number"
                      value={newSession.maxParticipants}
                      onChange={(e) => setNewSession({...newSession, maxParticipants: parseInt(e.target.value)})}
                      min="2"
                      max="50"
                      className="bg-navy-700 border-navy-600 text-white"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateForm(false)}
                    className="border-navy-600 text-gray-300 hover:bg-navy-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createSessionMutation.isPending}
                    className="bg-gold-500 hover:bg-gold-600 text-navy-900"
                  >
                    {createSessionMutation.isPending ? 'Creating...' : 'Create Session'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6">
          {sessions?.map((session) => (
            <Card key={session.id} className="bg-navy-800 border-navy-700">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{session.title}</h3>
                    {session.description && (
                      <p className="text-gray-300 mb-3">{session.description}</p>
                    )}
                  </div>
                  <Badge className="bg-gold-500 text-navy-900">
                    <Mic className="w-3 h-3 mr-1" />
                    Live
                  </Badge>
                </div>

                <div className="flex items-center gap-6 mb-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(session.scheduled_for).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(session.scheduled_for).toLocaleTimeString()} ({session.duration_minutes}m)
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {session.mentalk_participants?.[0]?.count || 0}/{session.max_participants}
                  </div>
                </div>

                <div className="flex space-x-3">
                  {isJoinedSession(session.id) ? (
                    <Button
                      onClick={() => leaveSessionMutation.mutate(session.id)}
                      disabled={leaveSessionMutation.isPending}
                      variant="outline"
                      className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                    >
                      <UserMinus className="w-4 h-4 mr-2" />
                      {leaveSessionMutation.isPending ? 'Leaving...' : 'Leave Session'}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => joinSessionMutation.mutate(session.id)}
                      disabled={joinSessionMutation.isPending}
                      className="bg-gold-500 hover:bg-gold-600 text-navy-900"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {joinSessionMutation.isPending ? 'Joining...' : 'Join Session'}
                    </Button>
                  )}
                  <Button variant="outline" className="border-navy-600 text-gray-300 hover:bg-navy-700">
                    Set Reminder
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {sessions?.length === 0 && (
            <div className="text-center py-12">
              <Mic className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No upcoming sessions</h3>
              <p className="text-gray-400 mb-6">Be the first to host a MenTalk session!</p>
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="bg-gold-500 hover:bg-gold-600 text-navy-900"
              >
                <Plus className="w-4 h-4 mr-2" />
                Host Your First Session
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenTalkPage;
