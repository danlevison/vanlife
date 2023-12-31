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
      vans: {
        Row: {
          created_at: string
          features: string[]
          hostId: string
          id: number
          imageURL: string
          name: string
          overview: string[]
          price: string
          rating: number | null
          type: string
          vanId: string
          vehicle_description: string[]
          vehicle_details: Json
          vehicle_rules: string[]
        }
        Insert: {
          created_at?: string
          features: string[]
          hostId: string
          id?: number
          imageURL: string
          name: string
          overview: string[]
          price: string
          rating?: number | null
          type: string
          vanId: string
          vehicle_description: string[]
          vehicle_details: Json
          vehicle_rules: string[]
        }
        Update: {
          created_at?: string
          features?: string[]
          hostId?: string
          id?: number
          imageURL?: string
          name?: string
          overview?: string[]
          price?: string
          rating?: number | null
          type?: string
          vanId?: string
          vehicle_description?: string[]
          vehicle_details?: Json
          vehicle_rules?: string[]
        }
        Relationships: []
      }
      vans_duplicate: {
        Row: {
          arrayTest: string[] | null
          created_at: string
          description: string | null
          hostId: string | null
          id: number
          imageURL: string | null
          name: string | null
          price: string | null
          type: string | null
          vanId: string | null
        }
        Insert: {
          arrayTest?: string[] | null
          created_at?: string
          description?: string | null
          hostId?: string | null
          id?: number
          imageURL?: string | null
          name?: string | null
          price?: string | null
          type?: string | null
          vanId?: string | null
        }
        Update: {
          arrayTest?: string[] | null
          created_at?: string
          description?: string | null
          hostId?: string | null
          id?: number
          imageURL?: string | null
          name?: string | null
          price?: string | null
          type?: string | null
          vanId?: string | null
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
