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
      brands: {
        Row: {
          id: string
          created_at: string
          name: string
          slug: string
          logo_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          slug: string
          logo_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          slug?: string
          logo_url?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          created_at: string
          name: string
          slug: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          slug: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          id: string
          created_at: string
          name: string
          slug: string
          description: string | null
          price: number
          is_available: boolean
          brand_id: string | null
          category_id: string | null
          images: string[] | null
          sizes: string[] | null
          is_featured: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          slug: string
          description?: string | null
          price: number
          is_available?: boolean
          brand_id?: string | null
          category_id?: string | null
          images?: string[] | null
          sizes?: string[] | null
          is_featured?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          slug?: string
          description?: string | null
          price?: number
          is_available?: boolean
          brand_id?: string | null
          category_id?: string | null
          images?: string[] | null
          sizes?: string[] | null
          is_featured?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
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
