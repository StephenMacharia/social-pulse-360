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
      automation_workflows: {
        Row: {
          actions: Json | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          trigger_config: Json | null
          trigger_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actions?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          trigger_config?: Json | null
          trigger_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actions?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          trigger_config?: Json | null
          trigger_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          budget: number | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          metrics: Json | null
          name: string
          start_date: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          budget?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          metrics?: Json | null
          name: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          budget?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          metrics?: Json | null
          name?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      crm_contacts: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          id: string
          last_contact: string | null
          name: string
          notes: string | null
          phone: string | null
          role: string | null
          source: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          last_contact?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          role?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          last_contact?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          role?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      influencers: {
        Row: {
          avatar_url: string | null
          bio: string | null
          category: string | null
          created_at: string | null
          engagement_rate: number | null
          follower_count: number | null
          handle: string
          id: string
          is_tracked: boolean | null
          name: string
          platform: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          category?: string | null
          created_at?: string | null
          engagement_rate?: number | null
          follower_count?: number | null
          handle: string
          id?: string
          is_tracked?: boolean | null
          name: string
          platform: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          category?: string | null
          created_at?: string | null
          engagement_rate?: number | null
          follower_count?: number | null
          handle?: string
          id?: string
          is_tracked?: boolean | null
          name?: string
          platform?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      mentions: {
        Row: {
          author: string
          author_url: string | null
          content: string
          created_at: string | null
          engagement_count: number | null
          id: string
          mention_date: string | null
          platform: string
          post_url: string | null
          reach: number | null
          sentiment: number | null
          sentiment_label: string | null
          user_id: string
        }
        Insert: {
          author: string
          author_url?: string | null
          content: string
          created_at?: string | null
          engagement_count?: number | null
          id?: string
          mention_date?: string | null
          platform: string
          post_url?: string | null
          reach?: number | null
          sentiment?: number | null
          sentiment_label?: string | null
          user_id: string
        }
        Update: {
          author?: string
          author_url?: string | null
          content?: string
          created_at?: string | null
          engagement_count?: number | null
          id?: string
          mention_date?: string | null
          platform?: string
          post_url?: string | null
          reach?: number | null
          sentiment?: number | null
          sentiment_label?: string | null
          user_id?: string
        }
        Relationships: []
      }
      nps_responses: {
        Row: {
          created_at: string | null
          feedback: string | null
          id: string
          respondent_email: string | null
          score: number
          survey_id: string
        }
        Insert: {
          created_at?: string | null
          feedback?: string | null
          id?: string
          respondent_email?: string | null
          score: number
          survey_id: string
        }
        Update: {
          created_at?: string | null
          feedback?: string | null
          id?: string
          respondent_email?: string | null
          score?: number
          survey_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nps_responses_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "nps_surveys"
            referencedColumns: ["id"]
          },
        ]
      }
      nps_surveys: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          question: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          question: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          question?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      opportunities: {
        Row: {
          close_date: string | null
          contact_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          probability: number | null
          stage: string | null
          title: string
          updated_at: string | null
          user_id: string
          value: number | null
        }
        Insert: {
          close_date?: string | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          probability?: number | null
          stage?: string | null
          title: string
          updated_at?: string | null
          user_id: string
          value?: number | null
        }
        Update: {
          close_date?: string | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          probability?: number | null
          stage?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      social_accounts: {
        Row: {
          access_token: string | null
          account_id: string
          account_name: string
          created_at: string | null
          id: string
          is_active: boolean | null
          platform: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          account_id: string
          account_name: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          platform: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          account_id?: string
          account_name?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          platform?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      User: {
        Row: {
          createdAt: string
          email: string
          id: string
        }
        Insert: {
          createdAt?: string
          email: string
          id: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: string
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
