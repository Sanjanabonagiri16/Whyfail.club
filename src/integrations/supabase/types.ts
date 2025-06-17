export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      content_moderation: {
        Row: {
          ai_score: number | null
          content_id: string
          content_type: string
          created_at: string
          id: string
          moderation_reason: string | null
          moderation_status: string
          reviewed_at: string | null
          reviewed_by: string | null
          urgency_level: string | null
          user_id: string
        }
        Insert: {
          ai_score?: number | null
          content_id: string
          content_type: string
          created_at?: string
          id?: string
          moderation_reason?: string | null
          moderation_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          urgency_level?: string | null
          user_id: string
        }
        Update: {
          ai_score?: number | null
          content_id?: string
          content_type?: string
          created_at?: string
          id?: string
          moderation_reason?: string | null
          moderation_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          urgency_level?: string | null
          user_id?: string
        }
        Relationships: []
      }
      content_reports: {
        Row: {
          created_at: string
          id: string
          report_description: string | null
          report_reason: string
          reported_content_id: string
          reported_content_type: string
          reported_user_id: string
          reporter_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          report_description?: string | null
          report_reason: string
          reported_content_id: string
          reported_content_type: string
          reported_user_id: string
          reporter_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          report_description?: string | null
          report_reason?: string
          reported_content_id?: string
          reported_content_type?: string
          reported_user_id?: string
          reporter_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
        }
        Relationships: []
      }
      emotional_analytics: {
        Row: {
          analysis_date: string
          created_at: string
          emotional_trend: string | null
          id: string
          insights: Json | null
          key_themes: string[] | null
          optimism_score: number | null
          user_id: string
        }
        Insert: {
          analysis_date?: string
          created_at?: string
          emotional_trend?: string | null
          id?: string
          insights?: Json | null
          key_themes?: string[] | null
          optimism_score?: number | null
          user_id: string
        }
        Update: {
          analysis_date?: string
          created_at?: string
          emotional_trend?: string | null
          id?: string
          insights?: Json | null
          key_themes?: string[] | null
          optimism_score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          bounce_back_plan: string | null
          content: string
          created_at: string
          id: string
          is_public: boolean | null
          mood_after: number | null
          mood_before: number | null
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bounce_back_plan?: string | null
          content: string
          created_at?: string
          id?: string
          is_public?: boolean | null
          mood_after?: number | null
          mood_before?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bounce_back_plan?: string | null
          content?: string
          created_at?: string
          id?: string
          is_public?: boolean | null
          mood_after?: number | null
          mood_before?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mentalk_participants: {
        Row: {
          id: string
          is_moderator: boolean | null
          joined_at: string | null
          left_at: string | null
          session_id: string
          user_id: string
        }
        Insert: {
          id?: string
          is_moderator?: boolean | null
          joined_at?: string | null
          left_at?: string | null
          session_id: string
          user_id: string
        }
        Update: {
          id?: string
          is_moderator?: boolean | null
          joined_at?: string | null
          left_at?: string | null
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentalk_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "mentalk_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      mentalk_sessions: {
        Row: {
          created_at: string
          description: string | null
          duration_minutes: number | null
          host_id: string
          id: string
          is_active: boolean | null
          max_participants: number | null
          reminder_sent: boolean | null
          scheduled_for: string
          timezone: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          host_id: string
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          reminder_sent?: boolean | null
          scheduled_for: string
          timezone?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          host_id?: string
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          reminder_sent?: boolean | null
          scheduled_for?: string
          timezone?: string | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          is_anonymous_mode: boolean | null
          last_name: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          is_anonymous_mode?: boolean | null
          last_name?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          is_anonymous_mode?: boolean | null
          last_name?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      sos_incidents: {
        Row: {
          created_at: string
          description: string | null
          id: string
          incident_type: string
          resolved_at: string | null
          responded_at: string | null
          severity: string | null
          status: string | null
          support_contact_info: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          incident_type: string
          resolved_at?: string | null
          responded_at?: string | null
          severity?: string | null
          status?: string | null
          support_contact_info?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          incident_type?: string
          resolved_at?: string | null
          responded_at?: string | null
          severity?: string | null
          status?: string | null
          support_contact_info?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      stories: {
        Row: {
          category: string
          content: string
          created_at: string
          id: string
          is_anonymous: boolean | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          id?: string
          is_anonymous?: boolean | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          id?: string
          is_anonymous?: boolean | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      story_reactions: {
        Row: {
          created_at: string
          id: string
          reaction_type: string
          story_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          reaction_type: string
          story_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          reaction_type?: string
          story_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_reactions_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_description: string | null
          badge_name: string
          criteria_met: Json | null
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_description?: string | null
          badge_name: string
          criteria_met?: Json | null
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_description?: string | null
          badge_name?: string
          criteria_met?: Json | null
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completed_at: string | null
          completed_steps: number | null
          created_at: string
          current_day: number | null
          id: string
          quest_name: string
          started_at: string
          status: string | null
          total_steps: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completed_steps?: number | null
          created_at?: string
          current_day?: number | null
          id?: string
          quest_name: string
          started_at?: string
          status?: string | null
          total_steps?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completed_steps?: number | null
          created_at?: string
          current_day?: number | null
          id?: string
          quest_name?: string
          started_at?: string
          status?: string | null
          total_steps?: number | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      analyze_user_emotions: {
        Args: { user_uuid: string }
        Returns: Json
      }
      moderate_content: {
        Args: {
          content_text: string
          content_type_param: string
          content_id_param: string
          user_id_param: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
