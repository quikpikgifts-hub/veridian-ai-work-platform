/**
 * app/api/profile/route.ts
 * GET   — the current user's profile row
 * PATCH — update the current user's display name { name }
 *
 * Uses the cookie-authenticated Supabase client so RLS ("profiles_select_own" /
 * "profiles_update_own") enforces access — no manual ownership check needed.
 */
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createServerSupabase();

  if (!supabase) {
    return NextResponse.json({
      profile: { id: 'demo', name: 'Demo Client', email: 'demo@veridian.com', role: 'client', department: null },
    });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });

  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (error || !data) return NextResponse.json({ error: 'Profile not found.' }, { status: 404 });

  return NextResponse.json({ profile: data });
}

export async function PATCH(request: NextRequest) {
  const supabase = await createServerSupabase();
  if (!supabase) {
    return NextResponse.json({ profile: { id: 'demo', name: 'Demo Client', email: 'demo@veridian.com', role: 'client' } });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });

  let body: { name?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }
  if (!body.name?.trim()) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 422 });
  }

  // `as never`: supabase-js's Update generic doesn't resolve correctly through
  // @supabase/ssr's createServerClient<Database> wrapper for this hand-written
  // type file — a known friction point until types.ts is regenerated from the
  // live schema (`npx supabase gen types typescript`).
  const { data, error } = await supabase
    .from('profiles')
    .update({ name: body.name.trim() } as never)
    .eq('id', user.id)
    .select('*')
    .single();

  if (error) return NextResponse.json({ error: 'Could not update profile.' }, { status: 500 });

  await supabase.auth.updateUser({ data: { name: body.name.trim() } });

  return NextResponse.json({ profile: data });
}
