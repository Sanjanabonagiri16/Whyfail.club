import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Heart, MessageCircle, Users, Filter } from 'lucide-react';

const Stories = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Career Failure', 'Relationship', 'Mental Health', 'Addiction', 'Loss', 'Other'];

  const { data: stories } = useQuery({
    queryKey: ['stories', searchTerm, selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
      }

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data: storiesData, error } = await query;
      if (error) throw error;

      // Fetch profiles separately
      const userIds = storiesData?.map(story => story.user_id) || [];
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, username')
        .in('id', userIds);
      
      if (profilesError) throw profilesError;

      // Fetch reactions separately
      const { data: reactions, error: reactionsError } = await supabase
        .from('story_reactions')
        .select('*');
      
      if (reactionsError) throw reactionsError;

      // Combine stories with their profiles and reactions
      const storiesWithData = storiesData?.map(story => {
        const profile = profiles?.find(p => p.id === story.user_id);
        return {
          ...story,
          profiles: profile || null,
          story_reactions: reactions?.filter(reaction => reaction.story_id === story.id) || []
        };
      });

      return storiesWithData;
    },
  });

  const reactionMutation = useMutation({
    mutationFn: async ({ storyId, reactionType }: { storyId: string, reactionType: string }) => {
      // Check if user already reacted with this type
      const { data: existingReaction } = await supabase
        .from('story_reactions')
        .select('*')
        .eq('story_id', storyId)
        .eq('user_id', user!.id)
        .eq('reaction_type', reactionType)
        .single();

      if (existingReaction) {
        // Remove reaction
        const { error } = await supabase
          .from('story_reactions')
          .delete()
          .eq('id', existingReaction.id);
        if (error) throw error;
      } else {
        // Add reaction
        const { error } = await supabase
          .from('story_reactions')
          .insert({
            story_id: storyId,
            user_id: user!.id,
            reaction_type: reactionType,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
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

  const getReactionCount = (story: any, reactionType: string) => {
    return story.story_reactions?.filter((r: any) => r.reaction_type === reactionType).length || 0;
  };

  const hasUserReacted = (story: any, reactionType: string) => {
    return story.story_reactions?.some((r: any) => r.user_id === user.id && r.reaction_type === reactionType) || false;
  };

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Navigation */}
      <nav className="bg-navy-800 border-b border-navy-700 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex space-x-8">
            <h1 className="text-xl font-bold text-white">WhyFail.club</h1>
            <div className="flex space-x-6">
              <a href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</a>
              <a href="/stories" className="text-gold-400 hover:text-gold-300">Stories</a>
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

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-navy-800 border-navy-600 text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-4 h-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-navy-800 border border-navy-600 text-white rounded-md px-3 py-2"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stories Feed */}
        <div className="space-y-6">
          {stories?.map((story) => (
            <Card key={story.id} className="bg-navy-800 border-navy-700 hover:bg-navy-750 transition-colors">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white">{story.title}</h3>
                    <Badge variant="outline" className="border-gold-400 text-gold-400">
                      {story.category}
                    </Badge>
                  </div>
                  <p className="text-gray-300 leading-relaxed line-clamp-3">{story.content}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-navy-600">
                  <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <span>by</span>
                    <span className="font-medium">
                      {story.is_anonymous 
                        ? 'Anonymous' 
                        : `${story.profiles?.first_name || 'Unknown'}`
                      }
                    </span>
                    <span>•</span>
                    <span>{new Date(story.created_at).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Reactions */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => reactionMutation.mutate({ storyId: story.id, reactionType: 'relate' })}
                      className={`text-sm ${hasUserReacted(story, 'relate') ? 'text-gold-400' : 'text-gray-400'} hover:text-gold-300`}
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      I Relate ({getReactionCount(story, 'relate')})
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => reactionMutation.mutate({ storyId: story.id, reactionType: 'inspired' })}
                      className={`text-sm ${hasUserReacted(story, 'inspired') ? 'text-gold-400' : 'text-gray-400'} hover:text-gold-300`}
                    >
                      <Users className="w-4 h-4 mr-1" />
                      Inspired ({getReactionCount(story, 'inspired')})
                    </Button>

                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-300">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Replies
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {stories?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No stories found</p>
              <Button className="bg-gold-500 hover:bg-gold-600 text-navy-900">
                Share Your Story
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stories;
