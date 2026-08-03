/**
 * app/api/assessments/[id]/submit/route.ts
 * POST — submit an in-progress assessment for AI-generated summary + risk score.
 *
 * Flow: mark 'submitted' -> call OpenAI -> parse structured result ->
 * mark 'completed' with risk_score/ai_summary/recommendations, or 'failed'
 * on error (responses are preserved either way so the client never loses data).
 */
import { NextRequest, NextResponse } from 'next/server';
import { extractRequestContext, writeAuditLog } from '@/lib/audit';
import { getAssessmentForUser, setAssessmentStatus, resolveUserId } from '@/lib/services/assessments';
import { complete, openAIErrorResponse } from '@/lib/openai';
import { ASSESSMENT_SECTIONS, totalQuestionCount } from '@/lib/assessment-content';

function buildPrompt(companyName: string, industry: string, responses: Record<string, string>): string {
  const lines: string[] = [`Company: ${companyName}`, `Industry: ${industry}`, ''];

  for (const section of ASSESSMENT_SECTIONS) {
    lines.push(`## ${section.title}`);
    for (const q of section.questions) {
      const answer = responses[q.id]?.trim();
      if (answer) lines.push(`- ${q.prompt}\n  Answer: ${answer}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

interface AISummaryResult {
  riskScore: number;
  summary: string;
  recommendations: string[];
}

function parseAIResponse(raw: string): AISummaryResult {
  // Model is instructed to return JSON; strip markdown code fences defensively.
  const cleaned = raw.trim().replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/```\s*$/, '');
  const parsed = JSON.parse(cleaned);

  const riskScore = Number(parsed.riskScore);
  if (!Number.isFinite(riskScore) || riskScore < 0 || riskScore > 10) {
    throw new Error('Model returned an out-of-range risk score.');
  }
  if (typeof parsed.summary !== 'string' || !parsed.summary.trim()) {
    throw new Error('Model returned an empty summary.');
  }
  if (!Array.isArray(parsed.recommendations)) {
    throw new Error('Model returned invalid recommendations.');
  }

  return {
    riskScore,
    summary: parsed.summary.trim(),
    recommendations: parsed.recommendations.map((r: unknown) => String(r)).slice(0, 8),
  };
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userEmail, userRole } = extractRequestContext(request.headers);
  const userId = resolveUserId(extractRequestContext(request.headers).userId);
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  const { id } = await params;
  const assessment = await getAssessmentForUser(id, userId);
  if (!assessment) {
    return NextResponse.json({ error: 'Assessment not found.' }, { status: 404 });
  }
  if (assessment.status === 'completed') {
    return NextResponse.json({ assessment }); // already done — idempotent
  }

  const answeredCount = Object.values(assessment.responses).filter(v => v?.trim()).length;
  if (answeredCount === 0) {
    return NextResponse.json({ error: 'Answer at least one question before submitting.' }, { status: 422 });
  }

  await setAssessmentStatus(id, userId, 'submitted');
  await writeAuditLog({
    action: 'assessment_submitted', resource: 'assessment', resourceId: id,
    userId, userEmail, userRole, success: true,
    details: { answeredCount, totalQuestions: totalQuestionCount() },
  });

  const prompt = buildPrompt(assessment.companyName, assessment.industry, assessment.responses);

  try {
    const result = await complete({
      system:
        'You are a senior operational risk consultant at Veridian Risk & Resilience Group. ' +
        'Given a client\'s self-assessment answers, produce an executive-level risk summary. ' +
        'Respond with ONLY valid JSON, no markdown, in this exact shape: ' +
        '{"riskScore": <number 0-10, higher = more risk>, "summary": "<2-4 paragraph executive summary>", ' +
        '"recommendations": ["<specific, actionable recommendation>", ...]} ' +
        'Base the risk score and recommendations strictly on the answers provided. ' +
        'If a section was skipped (no answers), do not speculate about it.',
      user: prompt,
      maxTokens: 1400,
      temperature: 0.3,
    });

    const parsed = parseAIResponse(result.output);
    const completed = await setAssessmentStatus(id, userId, 'completed', {
      riskScore: parsed.riskScore,
      aiSummary: parsed.summary,
      recommendations: parsed.recommendations,
    });

    await writeAuditLog({
      action: 'assessment_completed', resource: 'assessment', resourceId: id,
      userId, userEmail, userRole, success: true,
      details: { riskScore: parsed.riskScore, model: result.model },
    });

    return NextResponse.json({ assessment: completed });
  } catch (err) {
    await setAssessmentStatus(id, userId, 'failed');
    await writeAuditLog({
      action: 'assessment_failed', resource: 'assessment', resourceId: id,
      userId, userEmail, userRole, success: false,
      details: { error: err instanceof Error ? err.message : 'unknown error' },
    });

    const errorBody = openAIErrorResponse(err);
    return NextResponse.json(
      { error: `We couldn't generate your summary right now (${errorBody.error}). Your answers were saved — try submitting again shortly.` },
      { status: errorBody.status }
    );
  }
}
