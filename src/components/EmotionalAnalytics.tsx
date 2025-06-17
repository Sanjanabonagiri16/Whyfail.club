
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus, Brain, Target } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface EmotionalAnalyticsProps {
  userId: string;
}

const EmotionalAnalytics: React.FC<EmotionalAnalyticsProps> = ({ userId }) => {
  const { toast } = useToast();

  const { data: analytics } = useQuery({
    queryKey: ['emotional-analytics', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('emotional_analytics')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });

  const generateAnalyticsMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.rpc('analyze_user_emotions', {
        user_uuid: userId
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Analytics Updated",
        description: "Your emotional insights have been refreshed!",
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving':
        return 'text-green-400';
      case 'declining':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  // Helper function to safely extract suggestion from insights
  const getSuggestion = (insights: any) => {
    if (insights && typeof insights === 'object' && 'suggestion' in insights) {
      return insights.suggestion as string;
    }
    return null;
  };

  return (
    <Card className="bg-navy-800 border-navy-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-gold-400" />
            Emotional Insights
          </div>
          <Button 
            size="sm" 
            onClick={() => generateAnalyticsMutation.mutate()}
            disabled={generateAnalyticsMutation.isPending}
            className="bg-gold-500 hover:bg-gold-600 text-navy-900"
          >
            {generateAnalyticsMutation.isPending ? 'Analyzing...' : 'Refresh'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {analytics ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Optimism Score</span>
                  <span className="text-white font-semibold">{analytics.optimism_score}/10</span>
                </div>
                <Progress value={(analytics.optimism_score / 10) * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Trend</span>
                  <div className={`flex items-center space-x-1 ${getTrendColor(analytics.emotional_trend)}`}>
                    {getTrendIcon(analytics.emotional_trend)}
                    <span className="capitalize font-medium">{analytics.emotional_trend}</span>
                  </div>
                </div>
              </div>
            </div>

            {analytics.key_themes && analytics.key_themes.length > 0 && (
              <div className="space-y-2">
                <span className="text-gray-300 text-sm">Common Themes</span>
                <div className="flex flex-wrap gap-2">
                  {analytics.key_themes.map((theme, index) => (
                    <Badge key={index} variant="outline" className="border-gold-400 text-gold-400">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {getSuggestion(analytics.insights) && (
              <div className="bg-navy-700 p-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Target className="w-4 h-4 text-gold-400 mt-0.5" />
                  <p className="text-gray-300 text-sm">{getSuggestion(analytics.insights)}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 mb-4">No analytics yet</p>
            <Button 
              onClick={() => generateAnalyticsMutation.mutate()}
              disabled={generateAnalyticsMutation.isPending}
              className="bg-gold-500 hover:bg-gold-600 text-navy-900"
            >
              {generateAnalyticsMutation.isPending ? 'Analyzing...' : 'Generate Insights'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmotionalAnalytics;
