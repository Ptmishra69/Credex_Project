/**
 * Placeholder Supabase database types.
 *
 * In production, generate this file automatically with:
 *   npx supabase gen types typescript --project-id <your-id> > src/types/database.ts
 *
 * For now, we define a minimal shape so the Supabase client is typed
 * and autocomplete works for table names.
 */
export type Database = {
  public: {
    Tables: {
      audits: {
        Row: {
          id: string;
          company_name: string;
          team_size: number | null;
          input_data: Record<string, unknown>;
          result_data: Record<string, unknown> | null;
          status: "pending" | "processing" | "completed" | "failed";
          total_monthly_spend: number | null;
          estimated_savings: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_name: string;
          team_size?: number | null;
          input_data: Record<string, unknown>;
          result_data?: Record<string, unknown> | null;
          status?: "pending" | "processing" | "completed" | "failed";
          total_monthly_spend?: number | null;
          estimated_savings?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["audits"]["Insert"]>;
      };
      leads: {
        Row: {
          id: string;
          audit_id: string | null;
          email: string;
          name: string | null;
          company: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          audit_id?: string | null;
          email: string;
          name?: string | null;
          company?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
