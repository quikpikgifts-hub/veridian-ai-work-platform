/**
 * lib/services/assessments.ts
 * Data access layer for client self-service assessments.
 * Queries Supabase `assessments` table when configured; falls back to an
 * in-memory store (demo mode / local dev without Supabase configured).
 */
import type { Assessment, AssessmentStatus } from '@/types';
import { getServiceClient, isDbConfigured } from './db';

/**
 * Resolve the acting user for the assessments API.
 * In demo mode (no Supabase configured) proxy.ts never sets x-user-id, since
 * there's no real session — fall back to a stable demo identity so the
 * client portal is usable without a live database, same as login/consultation.
 */
export function resolveUserId(headerUserId: string | undefined): string | null {
  if (headerUserId) return headerUserId;
  if (!isDbConfigured()) return 'demo-user';
  return null;
}

// ── Demo-mode in-memory store ──────────────────────────────────
// Only used when Supabase isn't configured. Per-process, not persisted.
const demoStore = new Map<string, Assessment>();
let demoSeq = 1;

function nowIso(): string {
  return new Date().toISOString();
}

function demoId(): string {
  const year = new Date().getFullYear();
  return `ASM-${year}-${String(demoSeq++).padStart(4, '0')}`;
}

// ── Row → domain type ─────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): Assessment {
  return {
    id: row.id,
    clientUserId: row.client_user_id,
    companyName: row.company_name,
    industry: row.industry,
    status: row.status,
    responses: row.responses ?? {},
    riskScore: row.risk_score ?? undefined,
    aiSummary: row.ai_summary ?? undefined,
    recommendations: row.recommendations ?? undefined,
    submittedAt: row.submitted_at ?? undefined,
    completedAt: row.completed_at ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listAssessmentsForUser(userId: string): Promise<Assessment[]> {
  const db = getServiceClient();
  if (!db) {
    return [...demoStore.values()]
      .filter(a => a.clientUserId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  const { data, error } = await db
    .from('assessments')
    .select('*')
    .eq('client_user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[assessments.service] listAssessmentsForUser:', error.message);
    return [];
  }
  return (data ?? []).map(mapRow);
}

export async function getAssessmentForUser(id: string, userId: string): Promise<Assessment | null> {
  const db = getServiceClient();
  if (!db) {
    const found = demoStore.get(id);
    return found && found.clientUserId === userId ? found : null;
  }

  const { data, error } = await db
    .from('assessments')
    .select('*')
    .eq('id', id)
    .eq('client_user_id', userId)
    .single();

  if (error || !data) return null;
  return mapRow(data);
}

export async function createAssessment(
  userId: string,
  companyName: string,
  industry: string
): Promise<Assessment> {
  const db = getServiceClient();
  const timestamp = nowIso();

  if (!db) {
    const assessment: Assessment = {
      id: demoId(),
      clientUserId: userId,
      companyName,
      industry,
      status: 'draft',
      responses: {},
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    demoStore.set(assessment.id, assessment);
    return assessment;
  }

  const { data, error } = await db
    .from('assessments')
    .insert({ client_user_id: userId, company_name: companyName, industry, status: 'draft', responses: {} })
    .select('*')
    .single();

  if (error) throw new Error(`Failed to create assessment: ${error.message}`);
  return mapRow(data);
}

export async function saveResponses(
  id: string,
  userId: string,
  responses: Record<string, string>
): Promise<Assessment | null> {
  const db = getServiceClient();

  if (!db) {
    const existing = demoStore.get(id);
    if (!existing || existing.clientUserId !== userId) return null;
    const updated = { ...existing, responses: { ...existing.responses, ...responses }, updatedAt: nowIso() };
    demoStore.set(id, updated);
    return updated;
  }

  const { data: current } = await db.from('assessments').select('responses').eq('id', id).eq('client_user_id', userId).single();
  if (!current) return null;

  const { data, error } = await db
    .from('assessments')
    .update({ responses: { ...current.responses, ...responses } })
    .eq('id', id)
    .eq('client_user_id', userId)
    .select('*')
    .single();

  if (error) return null;
  return mapRow(data);
}

export async function setAssessmentStatus(
  id: string,
  userId: string,
  status: AssessmentStatus,
  extra: Partial<{ riskScore: number; aiSummary: string; recommendations: string[] }> = {}
): Promise<Assessment | null> {
  const db = getServiceClient();
  const timestamp = nowIso();

  const patch: Record<string, unknown> = { status };
  if (status === 'submitted') patch.submitted_at = timestamp;
  if (status === 'completed') patch.completed_at = timestamp;
  if (extra.riskScore !== undefined) patch.risk_score = extra.riskScore;
  if (extra.aiSummary !== undefined) patch.ai_summary = extra.aiSummary;
  if (extra.recommendations !== undefined) patch.recommendations = extra.recommendations;

  if (!db) {
    const existing = demoStore.get(id);
    if (!existing || existing.clientUserId !== userId) return null;
    const updated: Assessment = {
      ...existing,
      status,
      updatedAt: timestamp,
      submittedAt: status === 'submitted' ? timestamp : existing.submittedAt,
      completedAt: status === 'completed' ? timestamp : existing.completedAt,
      riskScore: extra.riskScore ?? existing.riskScore,
      aiSummary: extra.aiSummary ?? existing.aiSummary,
      recommendations: extra.recommendations ?? existing.recommendations,
    };
    demoStore.set(id, updated);
    return updated;
  }

  const { data, error } = await db
    .from('assessments')
    .update(patch)
    .eq('id', id)
    .eq('client_user_id', userId)
    .select('*')
    .single();

  if (error) return null;
  return mapRow(data);
}
