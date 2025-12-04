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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      escalation_config: {
        Row: {
          created_at: string
          enabled: boolean
          escalation_hours: number
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          escalation_hours?: number
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          enabled?: boolean
          escalation_hours?: number
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      holidays: {
        Row: {
          created_at: string
          date: string
          id: string
          name: string
          type: string
          year: number
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          name: string
          type?: string
          year: number
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          name?: string
          type?: string
          year?: number
        }
        Relationships: []
      }
      leave_applications: {
        Row: {
          applied_on: string
          approval_level: number
          attachment_url: string | null
          cancellation_approved_by: string | null
          cancellation_reason: string | null
          cancelled_by: string | null
          comments: string | null
          created_at: string
          current_approver_id: string | null
          days: number
          escalated_at: string | null
          from_date: string
          from_session: string
          id: string
          leave_type_id: string
          reporting_manager: string
          status: string
          to_date: string
          to_session: string
          updated_at: string
          user_id: string
        }
        Insert: {
          applied_on?: string
          approval_level?: number
          attachment_url?: string | null
          cancellation_approved_by?: string | null
          cancellation_reason?: string | null
          cancelled_by?: string | null
          comments?: string | null
          created_at?: string
          current_approver_id?: string | null
          days: number
          escalated_at?: string | null
          from_date: string
          from_session: string
          id?: string
          leave_type_id: string
          reporting_manager: string
          status?: string
          to_date: string
          to_session: string
          updated_at?: string
          user_id: string
        }
        Update: {
          applied_on?: string
          approval_level?: number
          attachment_url?: string | null
          cancellation_approved_by?: string | null
          cancellation_reason?: string | null
          cancelled_by?: string | null
          comments?: string | null
          created_at?: string
          current_approver_id?: string | null
          days?: number
          escalated_at?: string | null
          from_date?: string
          from_session?: string
          id?: string
          leave_type_id?: string
          reporting_manager?: string
          status?: string
          to_date?: string
          to_session?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leave_applications_leave_type_id_fkey"
            columns: ["leave_type_id"]
            isOneToOne: false
            referencedRelation: "leave_types"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_approvals: {
        Row: {
          action: string
          application_id: string
          approver_id: string | null
          comments: string | null
          created_at: string
          id: string
          level: number
          updated_at: string
        }
        Insert: {
          action: string
          application_id: string
          approver_id?: string | null
          comments?: string | null
          created_at?: string
          id?: string
          level?: number
          updated_at?: string
        }
        Update: {
          action?: string
          application_id?: string
          approver_id?: string | null
          comments?: string | null
          created_at?: string
          id?: string
          level?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leave_approvals_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "leave_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_balances: {
        Row: {
          availed: number
          balance: number
          created_at: string
          granted: number
          id: string
          leave_type_id: string
          updated_at: string
          user_id: string
          year: number
        }
        Insert: {
          availed?: number
          balance?: number
          created_at?: string
          granted?: number
          id?: string
          leave_type_id: string
          updated_at?: string
          user_id: string
          year: number
        }
        Update: {
          availed?: number
          balance?: number
          created_at?: string
          granted?: number
          id?: string
          leave_type_id?: string
          updated_at?: string
          user_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "leave_balances_leave_type_id_fkey"
            columns: ["leave_type_id"]
            isOneToOne: false
            referencedRelation: "leave_types"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_types: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_lwp: boolean
          mandatory_attachment_days: number | null
          name: string
          requires_approval: boolean
          requires_balance_check: boolean
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_lwp?: boolean
          mandatory_attachment_days?: number | null
          name: string
          requires_approval?: boolean
          requires_balance_check?: boolean
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_lwp?: boolean
          mandatory_attachment_days?: number | null
          name?: string
          requires_approval?: boolean
          requires_balance_check?: boolean
        }
        Relationships: []
      }
      manager_hierarchy: {
        Row: {
          created_at: string
          employee_id: string
          id: string
          level: number
          manager_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          employee_id: string
          id?: string
          level?: number
          manager_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          employee_id?: string
          id?: string
          level?: number
          manager_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          employee_id: string | null
          full_name: string
          id: string
          reporting_manager: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          employee_id?: string | null
          full_name: string
          id: string
          reporting_manager?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          employee_id?: string | null
          full_name?: string
          id?: string
          reporting_manager?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      weekly_offs: {
        Row: {
          created_at: string
          day_of_week: number
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          day_of_week: number
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          day_of_week?: number
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_manager: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "rep" | "manager" | "admin"
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
    Enums: {
      app_role: ["rep", "manager", "admin"],
    },
  },
} as const
