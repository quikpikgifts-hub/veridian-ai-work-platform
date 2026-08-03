/**
 * app/api/assessments/route.ts
 * GET  — list the current user's assessments
 * POST — create a new draft assessment { companyName, industry }
 */
import { NextRequest, NextResponse } from 'next/server';
import { extractRequestContext } from '@/lib/audit';
import { listAssessmentsForUser, createAssessment, resolveUserId } from '@/lib/services/assessments';

export async function GET(request: NextRequest) {
  const userId = resolveUserId(extractRequestContext(request.headers).userId);
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  const assessments = await listAssessmentsForUser(userId);
  return NextResponse.json({ assessments });
}

export async function POST(request: NextRequest) {
  const userId = resolveUserId(extractRequestContext(request.headers).userId);
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  let body: { companyName?: string; industry?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!body.companyName?.trim()) {
    return NextResponse.json({ error: 'Company name is required.' }, { status: 422 });
  }
  if (!body.industry?.trim()) {
    return NextResponse.json({ error: 'Industry is required.' }, { status: 422 });
  }

  const assessment = await createAssessment(userId, body.companyName.trim(), body.industry.trim());
  return NextResponse.json({ assessment }, { status: 201 });
}
