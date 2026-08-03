import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

async function checkOpenAI(): Promise<{ ok: boolean; message: string }> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return { ok: false, message: 'OPENAI_API_KEY not set' };

  try {
    const res = await fetch('https://api.openai.com/v1/models', {
      headers: { Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) return { ok: true, message: 'Reachable, key accepted' };
    return { ok: false, message: `API rejected key (HTTP ${res.status})` };
  } catch (err) {
    return { ok: false, message: `Unreachable: ${err instanceof Error ? err.message : 'unknown error'}` };
  }
}

async function checkSupabase(): Promise<{ ok: boolean; message: string }> {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return { ok: false, message: 'Supabase env vars not set — auth disabled' };

  try {
    const res = await fetch(`${url}/auth/v1/health`, {
      headers: { apikey: anon },
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) return { ok: true, message: 'Reachable' };
    return { ok: false, message: `Rejected (HTTP ${res.status})` };
  } catch (err) {
    return { ok: false, message: `Unreachable: ${err instanceof Error ? err.message : 'unknown error'}` };
  }
}

export async function GET() {
  const [openai, supabase] = await Promise.all([checkOpenAI(), checkSupabase()]);

  const checks = {
    openai,
    supabase,
    model: { ok: true, message: `Using ${process.env.OPENAI_MODEL ?? 'gpt-4o'}` },
  };

  const allOk = checks.openai.ok; // OpenAI is the only hard requirement

  return NextResponse.json({
    status: allOk ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    checks,
  }, { status: allOk ? 200 : 503 });
}
