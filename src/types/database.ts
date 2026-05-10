/**
 * Supabase database types.
 */
export type Database = {
  public: {
    Tables: {
      audits: {
        Row: {
          id: string;
          company_name: string;
          team_size: number | null;
          industry: string | null;
          input_data: any; // Using any for JSONB to avoid strict structural conflicts
          result_data: any; 
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
          industry?: string | null;
          input_data: any;
          result_data?: any;
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
