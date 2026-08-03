/**
 * app/api/assessments/[id]/route.ts
 * GET   — fetch one assessment (must belong to the current user)
 * PATCH — save in-progress responses { responses: Record<string, string> }
 */
import { NextRequest, NextResponse } from 'next/server';
import { extractRequestContext } from '@/lib/audit';
import { getAssessmentForUser, saveResponses, resolveUserId } from '@/lib/services/assessments';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = resolveUserId(extractRequestContext(request.headers).userId);
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  const { id } = await params;
  const assessment = await getAssessmentForUser(id, userId);
  if (!assessment) {
    return NextResponse.json({ error: 'Assessment not found.' }, { status: 404 });
  }
  return NextResponse.json({ assessment });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = resolveUserId(extractRequestContext(request.headers).userId);
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  const { id } = await params;

  let body: { responses?: Record<string, string> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!body.responses || typeof body.responses !== 'object') {
    return NextResponse.json({ error: 'responses object is required.' }, { status: 422 });
  }

  const assessment = await saveResponses(id, userId, body.responses);
  if (!assessment) {
    return NextResponse.json({ error: 'Assessment not found.' }, { status: 404 });
  }
  return NextResponse.json({ assessment });
}
