-- ==========================================================================
-- AI Spend Audit — Database Schema
-- ==========================================================================
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)
--
-- Design decisions:
--   • UUIDs as primary keys — no sequential ID leakage
--   • JSONB for input/result — flexible schema, avoids frequent migrations
--   • Status column — enables async processing pipeline
--   • Separate leads table — decoupled from audits for GDPR compliance
--   • updated_at trigger — automatic timestamp on every UPDATE
--   • RLS enabled — permissive for MVP, tighten when auth is added
-- ==========================================================================

-- -------------------------------------------------------------------------
-- 1. AUDITS TABLE
-- Stores each audit submission and its processed results.
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audits (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name        TEXT NOT NULL,
  team_size           INTEGER CHECK (team_size > 0),
  industry            TEXT,
  input_data          JSONB NOT NULL DEFAULT '[]'::jsonb,   -- ToolInput[]
  result_data         JSONB,                                 -- AuditResult (null until processed)
  status              TEXT NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  total_monthly_spend NUMERIC(12, 2),                        -- calculated from input
  estimated_savings   NUMERIC(12, 2),                        -- calculated from result
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index: fetch recent audits quickly
CREATE INDEX IF NOT EXISTS idx_audits_created_at ON audits (created_at DESC);

-- Index: filter by status (e.g., find all "pending" for processing queue)
CREATE INDEX IF NOT EXISTS idx_audits_status ON audits (status);

-- -------------------------------------------------------------------------
-- 2. LEADS TABLE
-- Captures contact info for follow-up. Linked to audits but can exist
-- independently (e.g., newsletter signups).
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id    UUID REFERENCES audits(id) ON DELETE SET NULL,
  email       TEXT NOT NULL,
  name        TEXT,
  company     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index: lookup leads by email (for deduplication)
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);

-- Index: find leads associated with an audit
CREATE INDEX IF NOT EXISTS idx_leads_audit_id ON leads (audit_id);

-- -------------------------------------------------------------------------
-- 3. UPDATED_AT TRIGGER
-- Automatically sets updated_at on every UPDATE to the audits table.
-- -------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_audits_updated_at
  BEFORE UPDATE ON audits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- -------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS)
-- Enabled but permissive for MVP. When auth is added, replace these
-- policies with user-scoped rules.
-- -------------------------------------------------------------------------
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads  ENABLE ROW LEVEL SECURITY;

-- Allow all operations via anon key (MVP only — tighten with auth)
CREATE POLICY "Allow all access to audits (MVP)" ON audits
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all access to leads (MVP)" ON leads
  FOR ALL
  USING (true)
  WITH CHECK (true);
