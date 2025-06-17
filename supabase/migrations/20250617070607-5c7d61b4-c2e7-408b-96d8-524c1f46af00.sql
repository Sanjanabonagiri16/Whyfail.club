
-- Add anonymous mode support to profiles
ALTER TABLE public.profiles ADD COLUMN is_anonymous_mode boolean DEFAULT false;

-- Add bounce-back fields to journal entries
ALTER TABLE public.journal_entries ADD COLUMN bounce_back_plan text;
ALTER TABLE public.journal_entries ADD COLUMN mood_before integer CHECK (mood_before >= 1 AND mood_before <= 10);
ALTER TABLE public.journal_entries ADD COLUMN mood_after integer CHECK (mood_after >= 1 AND mood_after <= 10);
ALTER TABLE public.journal_entries ADD COLUMN tags text[];

-- Create content moderation table
CREATE TABLE public.content_moderation (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type text NOT NULL CHECK (content_type IN ('journal_entry', 'story', 'comment')),
  content_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  moderation_status text NOT NULL DEFAULT 'pending' CHECK (moderation_status IN ('pending', 'approved', 'flagged', 'rejected')),
  moderation_reason text,
  urgency_level text DEFAULT 'low' CHECK (urgency_level IN ('low', 'medium', 'high', 'critical')),
  ai_score numeric(3,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id)
);

-- Create emotional analytics table
CREATE TABLE public.emotional_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  analysis_date date NOT NULL DEFAULT CURRENT_DATE,
  optimism_score numeric(3,2),
  emotional_trend text CHECK (emotional_trend IN ('improving', 'stable', 'declining')),
  key_themes text[],
  insights jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, analysis_date)
);

-- Create user progress tracking table
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  quest_name text NOT NULL,
  current_day integer DEFAULT 1,
  completed_steps integer DEFAULT 0,
  total_steps integer DEFAULT 30,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create content reports table
CREATE TABLE public.content_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reported_content_type text NOT NULL CHECK (reported_content_type IN ('journal_entry', 'story', 'comment')),
  reported_content_id UUID NOT NULL,
  reported_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  report_reason text NOT NULL CHECK (report_reason IN ('harassment', 'spam', 'self_harm', 'inappropriate', 'other')),
  report_description text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id)
);

-- Create SOS incidents table
CREATE TABLE public.sos_incidents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  incident_type text NOT NULL CHECK (incident_type IN ('crisis', 'support_request', 'emergency')),
  description text,
  severity text DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'responded', 'resolved')),
  support_contact_info jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  responded_at TIMESTAMP WITH TIME ZONE,
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create MenTalk participants table
CREATE TABLE public.mentalk_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.mentalk_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  left_at TIMESTAMP WITH TIME ZONE,
  is_moderator boolean DEFAULT false,
  UNIQUE(session_id, user_id)
);

-- Add timezone support to mentalk sessions
ALTER TABLE public.mentalk_sessions ADD COLUMN timezone text DEFAULT 'UTC';
ALTER TABLE public.mentalk_sessions ADD COLUMN reminder_sent boolean DEFAULT false;

-- Create user badges table
CREATE TABLE public.user_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_name text NOT NULL,
  badge_description text,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  criteria_met jsonb
);

-- Enable RLS on all new tables
ALTER TABLE public.content_moderation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emotional_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sos_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentalk_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- RLS policies for emotional analytics
CREATE POLICY "Users can view their own analytics" ON public.emotional_analytics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert analytics" ON public.emotional_analytics FOR INSERT WITH CHECK (true);

-- RLS policies for user progress
CREATE POLICY "Users can view their own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS policies for content reports
CREATE POLICY "Users can view reports they made" ON public.content_reports FOR SELECT USING (auth.uid() = reporter_id);
CREATE POLICY "Users can create reports" ON public.content_reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- RLS policies for SOS incidents
CREATE POLICY "Users can view their own SOS incidents" ON public.sos_incidents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create SOS incidents" ON public.sos_incidents FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS policies for MenTalk participants
CREATE POLICY "Users can view session participants" ON public.mentalk_participants FOR SELECT USING (true);
CREATE POLICY "Users can join sessions" ON public.mentalk_participants FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave sessions" ON public.mentalk_participants FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for user badges
CREATE POLICY "Users can view all badges" ON public.user_badges FOR SELECT USING (true);
CREATE POLICY "System can award badges" ON public.user_badges FOR INSERT WITH CHECK (true);

-- Create function for emotional analysis
CREATE OR REPLACE FUNCTION public.analyze_user_emotions(user_uuid UUID)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  recent_entries RECORD;
  optimism_score numeric := 0;
  trend text := 'stable';
  insights jsonb := '{}';
BEGIN
  -- Get recent journal entries for analysis
  SELECT COUNT(*), 
         AVG(COALESCE(mood_after, 5)) as avg_mood,
         array_agg(DISTINCT unnest(COALESCE(tags, ARRAY[]::text[]))) as all_tags
  INTO recent_entries
  FROM public.journal_entries 
  WHERE user_id = user_uuid 
    AND created_at >= CURRENT_DATE - INTERVAL '30 days';

  -- Calculate optimism score (simplified)
  optimism_score := LEAST(10, GREATEST(0, recent_entries.avg_mood * 2));
  
  -- Determine trend (simplified)
  IF optimism_score > 7 THEN
    trend := 'improving';
  ELSIF optimism_score < 4 THEN
    trend := 'declining';
  ELSE
    trend := 'stable';
  END IF;

  -- Build insights
  insights := jsonb_build_object(
    'total_entries', recent_entries.count,
    'common_themes', recent_entries.all_tags,
    'suggestion', CASE 
      WHEN trend = 'declining' THEN 'Consider reaching out to the community or a professional'
      WHEN trend = 'improving' THEN 'Great progress! Keep up the positive momentum'
      ELSE 'Steady progress. Consider setting new goals'
    END
  );

  -- Insert or update analytics
  INSERT INTO public.emotional_analytics (user_id, optimism_score, emotional_trend, insights)
  VALUES (user_uuid, optimism_score, trend, insights)
  ON CONFLICT (user_id, analysis_date) 
  DO UPDATE SET 
    optimism_score = EXCLUDED.optimism_score,
    emotional_trend = EXCLUDED.emotional_trend,
    insights = EXCLUDED.insights;

  RETURN insights;
END;
$$;

-- Create function for content moderation
CREATE OR REPLACE FUNCTION public.moderate_content(content_text text, content_type_param text, content_id_param UUID, user_id_param UUID)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  flagged_words text[] := ARRAY['suicide', 'kill myself', 'end it all', 'hate everyone', 'worthless piece'];
  ai_score numeric := 0;
  urgency text := 'low';
  status text := 'approved';
  word text;
BEGIN
  -- Simple keyword-based moderation (in reality, this would call an AI service)
  FOREACH word IN ARRAY flagged_words
  LOOP
    IF LOWER(content_text) LIKE '%' || word || '%' THEN
      ai_score := ai_score + 0.3;
    END IF;
  END LOOP;

  -- Determine urgency and status
  IF ai_score >= 0.8 THEN
    urgency := 'critical';
    status := 'flagged';
  ELSIF ai_score >= 0.5 THEN
    urgency := 'high';
    status := 'flagged';
  ELSIF ai_score >= 0.3 THEN
    urgency := 'medium';
    status := 'flagged';
  END IF;

  -- Insert moderation record
  INSERT INTO public.content_moderation (content_type, content_id, user_id, moderation_status, urgency_level, ai_score)
  VALUES (content_type_param, content_id_param, user_id_param, status, urgency, ai_score);

  RETURN status;
END;
$$;
