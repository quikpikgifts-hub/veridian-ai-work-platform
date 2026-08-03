-- ============================================================
-- Veridian Risk Platform — Migration 002
-- Client self-service assessments (Sprint 2 / Beta)
-- Run in: Supabase Dashboard → SQL Editor → New Query
-- Safe to re-run — every statement is idempotent.
-- ============================================================

CREATE SEQUENCE IF NOT EXISTS assessment_seq START 1;

CREATE TABLE IF NOT EXISTS public.assessments (
  id               TEXT PRIMARY KEY DEFAULT 'ASM-' || to_char(NOW(), 'YYYY') || '-' || lpad(nextval('assessment_seq')::text, 4, '0'),
  client_user_id   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name     TEXT NOT NULL,
  industry         TEXT NOT NULL,
  status           TEXT NOT NULL DEFAULT 'draft'
                     CHECK (status IN ('draft','submitted','completed','failed')),
  responses        JSONB NOT NULL DEFAULT '{}',
  risk_score       NUMERIC(4,2) CHECK (risk_score >= 0 AND risk_score <= 10),
  ai_summary       TEXT,
  recommendations  TEXT[],
  submitted_at     TIMESTAMPTZ,
  completed_at     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assessments_client_user_id ON public.assessments(client_user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_status         ON public.assessments(status);
CREATE INDEX IF NOT EXISTS idx_assessments_created_at     ON public.assessments(created_at DESC);

ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Clients: full access to their own assessments only
DROP POLICY IF EXISTS "assessments_select_own" ON public.assessments;
CREATE POLICY "assessments_select_own" ON public.assessments FOR SELECT USING (
  client_user_id = auth.uid()
);
DROP POLICY IF EXISTS "assessments_insert_own" ON public.assessments;
CREATE POLICY "assessments_insert_own" ON public.assessments FOR INSERT WITH CHECK (
  client_user_id = auth.uid()
);
DROP POLICY IF EXISTS "assessments_update_own" ON public.assessments;
CREATE POLICY "assessments_update_own" ON public.assessments FOR UPDATE USING (
  client_user_id = auth.uid()
);

-- Staff: read-only access to every assessment
DROP POLICY IF EXISTS "assessments_select_staff" ON public.assessments;
CREATE POLICY "assessments_select_staff" ON public.assessments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','director','analyst'))
);

-- Trigger to keep updated_at current
CREATE OR REPLACE FUNCTION public.handle_assessment_update()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_assessment_update ON public.assessments;
CREATE TRIGGER on_assessment_update
  BEFORE UPDATE ON public.assessments
  FOR EACH ROW EXECUTE FUNCTION public.handle_assessment_update();
