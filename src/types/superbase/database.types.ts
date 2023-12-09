export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      asset_tb: {
        Row: {
          access: string
          created_at: string
          download: string
          fullPath: string
          id: string
          path: string
          updated_at: string
        }
        Insert: {
          access: string
          created_at?: string
          download: string
          fullPath: string
          id?: string
          path: string
          updated_at?: string
        }
        Update: {
          access?: string
          created_at?: string
          download?: string
          fullPath?: string
          id?: string
          path?: string
          updated_at?: string
        }
        Relationships: []
      }
      course_tb: {
        Row: {
          code: string
          created_at: string
          id: string
          name: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          name?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          name?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      courses_departments: {
        Row: {
          course_id: string
          created_at: string
          department_id: string
          id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          department_id: string
          id?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          department_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_departments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course_tb"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_departments_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "department_tb"
            referencedColumns: ["id"]
          }
        ]
      }
      department_tb: {
        Row: {
          created_at: string
          faculty_id: string
          id: string
          name: string
          short: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          faculty_id: string
          id?: string
          name: string
          short: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          faculty_id?: string
          id?: string
          name?: string
          short?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "department_tb_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "faculty_tb"
            referencedColumns: ["id"]
          }
        ]
      }
      faculty_tb: {
        Row: {
          created_at: string
          id: string
          name: string
          short: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          short: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          short?: string
          updated_at?: string
        }
        Relationships: []
      }
      materials: {
        Row: {
          asset_id: string | null
          course_id: string
          created_at: string
          id: number
          title: string
          updated_at: string
        }
        Insert: {
          asset_id?: string | null
          course_id: string
          created_at?: string
          id?: number
          title: string
          updated_at?: string
        }
        Update: {
          asset_id?: string | null
          course_id?: string
          created_at?: string
          id?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "materials_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "asset_tb"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "materials_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course_tb"
            referencedColumns: ["id"]
          }
        ]
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never



// ? Link to regenerate: https://supabase.com/dashboard/project/zxkacyqasqjoafeeabbe/api?page=tables-intro