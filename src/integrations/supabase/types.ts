export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_summaries: {
        Row: {
          created_at: string
          generated_summary: string
          id: string
          key_findings: Json | null
          original_title: string | null
          practical_implications: string | null
          source_doi: string | null
          source_url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          generated_summary: string
          id?: string
          key_findings?: Json | null
          original_title?: string | null
          practical_implications?: string | null
          source_doi?: string | null
          source_url: string
          user_id: string
        }
        Update: {
          created_at?: string
          generated_summary?: string
          id?: string
          key_findings?: Json | null
          original_title?: string | null
          practical_implications?: string | null
          source_doi?: string | null
          source_url?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          affiliation: string | null
          country: string | null
          created_at: string
          discovery_source: string | null
          display_name: string | null
          email: string | null
          id: string
          interests: string[] | null
          preferred_language: string | null
          professional_identity: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          affiliation?: string | null
          country?: string | null
          created_at?: string
          discovery_source?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          interests?: string[] | null
          preferred_language?: string | null
          professional_identity?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          affiliation?: string | null
          country?: string | null
          created_at?: string
          discovery_source?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          interests?: string[] | null
          preferred_language?: string | null
          professional_identity?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reading_history: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          reading_time_seconds: number | null
          started_at: string
          study_slug: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          reading_time_seconds?: number | null
          started_at?: string
          study_slug: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          reading_time_seconds?: number | null
          started_at?: string
          study_slug?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_highlights: {
        Row: {
          background_color: string
          created_at: string
          highlighted_text: string
          id: string
          study_slug: string
          text_color: string
          user_id: string
        }
        Insert: {
          background_color?: string
          created_at?: string
          highlighted_text: string
          id?: string
          study_slug: string
          text_color?: string
          user_id: string
        }
        Update: {
          background_color?: string
          created_at?: string
          highlighted_text?: string
          id?: string
          study_slug?: string
          text_color?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_studies: {
        Row: {
          id: string
          saved_at: string
          study_slug: string
          user_id: string
        }
        Insert: {
          id?: string
          saved_at?: string
          study_slug: string
          user_id: string
        }
        Update: {
          id?: string
          saved_at?: string
          study_slug?: string
          user_id?: string
        }
        Relationships: []
      }
      study_notes: {
        Row: {
          created_at: string
          id: string
          note_text: string
          study_slug: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          note_text: string
          study_slug: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          note_text?: string
          study_slug?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_interests: {
        Row: {
          category: string
          id: string
          interest_score: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          id?: string
          interest_score?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          id?: string
          interest_score?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
