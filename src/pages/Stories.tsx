
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ReportContent from '@/components/ReportContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Search, Filter, Flag, Calendar, User, Eye } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Stories = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterTags, setFilterTags] = useState('all');
  const [reportModal, setReportModal] = useState<{
    isOpen: boolean;
    contentId: string;
    authorId: string;
  }>({ isOpen: false, contentId: '', authorId: '' });

  // Fetch public journal entries (stories)
  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['public-stories', sortBy, filterTags, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('journal_entries')
        .select(`
          *,
          profiles!journal_entries_user_id_fkey (
            first_name,
            last_name,
            is_anonymous_mode
          )
        `)
        .eq('is_public', true);

      // Apply search filter
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
      }

      // Apply tag filter
      if (filterTags !== 'all') {
        query = query.contains('tags', [filterTags]);
      }

      // Apply sorting
      switch (sortBy) {
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'oldest':
          query = query.order('created_at', { ascending: true });
          break;
        case 'most_engaging':
          // For now, just order by creation date
          query = query.order('created_at', { ascending: false });
          break;
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Set up real-time updates for public stories
  useEffect(() => {
    const channel = supabase
      .channel('public-stories-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'journal_entries',
          filter: 'is_public=eq.true',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['public-stories'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  // Get unique tags for filtering
  const allTags = [...new Set(stories.flatMap(story => story.tags || []))];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAuthorName = (story: any) => {
    if (!story.profiles || story.profiles.is_anonymous_mode) {
      return 'Anonymous';
    }
    return `${story.profiles.first_name} ${story.profiles.last_name}`;
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const handleReport = (contentId: string, authorId: string) => {
    setReportModal({
      isOpen: true,
      contentId,
      authorId
    });
  };

  return (
    <div className="min-h-screen bg-navy-900">
      <Navigation />
      
      <div className="max-w-6xl mx-auto py-8 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Community Stories</h1>
          <p className="text-xl text-gray-300">
            Real experiences from men who've turned their failures into strength
          </p>
        </div>

        {/* Search and Filter Controls */}
        <Card className="bg-navy-800 border-navy-700 mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search stories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-navy-700 border-navy-600 text-white"
                  />
                </div>
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-navy-700 border-navy-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="most_engaging">Most Engaging</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterTags} onValueChange={setFilterTags}>
                <SelectTrigger className="bg-navy-700 border-navy-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stories Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading stories...</p>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">
              {searchTerm || filterTags !== 'all' 
                ? 'No stories match your search criteria' 
                : 'No public stories yet'
              }
            </p>
            {user && (
              <Button 
                onClick={() => window.location.href = '/journal'}
                className="bg-gold-500 hover:bg-gold-600 text-navy-900"
              >
                Share Your Story
              </Button>
            )}
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {stories.map((story) => (
              <Card key={story.id} className="bg-navy-800 border-navy-700 hover:bg-navy-750 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-2">{story.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {getAuthorName(story)}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(story.created_at)}
                        </div>
                      </div>
                    </div>
                    {user && user.id !== story.user_id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReport(story.id, story.user_id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <Flag className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {truncateContent(story.content)}
                  </p>
                  
                  {story.tags && story.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {story.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="border-gold-400 text-gold-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {story.mood_before && story.mood_after && (
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>Mood: {story.mood_before} → {story.mood_after}</span>
                      {story.mood_after > story.mood_before && (
                        <span className="text-green-400">↑ Improved</span>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />

      <ReportContent
        isOpen={reportModal.isOpen}
        onClose={() => setReportModal({ isOpen: false, contentId: '', authorId: '' })}
        contentType="journal_entry"
        contentId={reportModal.contentId}
        reportedUserId={reportModal.authorId}
      />
    </div>
  );
};

export default Stories;
