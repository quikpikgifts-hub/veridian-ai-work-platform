import { NextRequest, NextResponse } from 'next/server';
import { complete, isRateLimitError, isAuthError, TOKEN_LIMITS } from '@/lib/openai';

// ── System prompt — risk consulting report writer ────────────
const REPORT_SYSTEM = `You are the senior report analyst for Veridian Risk & Resilience Group, LLC — an operational risk management consulting firm.

Firm principals:
- Steve Washington Smith, Managing Member: nearly 30 years law enforcement, JCF Detective Corporal, 13 formal commendations from the Commissioner of Police, OSHA 10-Hour General Industry (DOL), FEMA IS-100/200/700.
- Skeeter Adiansingh-Smith, Member Director: 25+ years fleet and logistics operations, 3,500 government emergency vehicles, $1M+ monthly budget, BS Human Resource Management, HRCI certified.

Your role: Draft professional consulting reports for Co-Founder review. Every output is a DRAFT — Steve or Skeeter approves before client delivery.

Writing standards:
- Executive, authoritative, practical tone
- Findings are specific and evidence-based
- Recommendations are actionable with clear priority
- Language is professional but accessible to business owners
- Never alarmist; frame findings as opportunities to strengthen operations
- Always cite applicable OSHA CFR standards where relevant
- Fines context when applicable: Other $0–15,625 | Serious up to $15,625 | Willful/Repeat up to $156,259 per violation

Company: Veridian Risk & Resilience Group, LLC | +1 (407) 470-5992 | info@veridianriskgroup.com | Sanford, FL 32773 | Central Florida + Nationwide`;

// ── Structured report prompt builder ────────────────────────
function buildReportPrompt(
  reportType: string,
  incidentData: Record<string, unknown> | null,
  notes: string,
  clientName?: string
): string {
  const client = clientName ? `Client: ${clientName}\n` : '';
  const incident = incidentData
    ? `\nIncident / Case Data:\n${JSON.stringify(incidentData, null, 2)}\n`
    : '';
  const context = notes ? `\nField Notes / Additional Context:\n${notes}\n` : '';

  return `Generate a professional ${reportType} for Veridian Risk & Resilience Group, LLC.
${client}${incident}${context}
Structure the report with these sections:

1. EXECUTIVE SUMMARY
   2–3 sentences. State what was assessed, key finding, and overall risk level.

2. KEY FINDINGS
   3–5 specific observations. Each finding should reference what was observed, where, and why it matters operationally or legally.

3. RISK ASSESSMENT
   Overall rating: Low / Moderate / High / Critical
   Justification paragraph. Reference applicable standards (OSHA CFR, DOT FMCSA, etc.) where relevant.

4. RECOMMENDATIONS
   3–5 specific, prioritized action items. Format as numbered list with clear ownership (owner, department, or vendor type) and suggested timeline.

5. NEXT STEPS
   2–3 sentences on immediate actions and follow-up engagement.

Label this clearly: DRAFT — Prepared for review by Steve Washington Smith, Managing Member.
Use professional consulting language throughout.`;
}

// ── POST /api/generate-report ────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body.' },
        { status: 400 }
      );
    }

    const {
      reportType   = 'Operational Risk Assessment',
      incidentData = null,
      notes        = '',
      clientName,
      extended     = false,
    } = body as {
      reportType?:   string;
      incidentData?: Record<string, unknown> | null;
      notes?:        string;
      clientName?:   string;
      extended?:     boolean;
    };

    if (!notes?.trim() && !incidentData) {
      return NextResponse.json(
        { success: false, error: 'Provide notes or incidentData to generate a report.' },
        { status: 400 }
      );
    }

    const userPrompt = buildReportPrompt(reportType, incidentData, notes, clientName);

    const result = await complete({
      system:    REPORT_SYSTEM,
      user:      userPrompt,
      maxTokens: extended ? TOKEN_LIMITS.EXTENDED : TOKEN_LIMITS.STANDARD,
      temperature: 0.35, // tighter for formal reports
    });

    return NextResponse.json({
      success:      true,
      report:       result.output,
      reportType,
      model:        result.model,
      inputTokens:  result.inputTokens,
      outputTokens: result.outputTokens,
      timestamp:    new Date().toISOString(),
    });

  } catch (error: unknown) {
    console.error('[/api/generate-report] Error:', error);

    if (isAuthError(error)) {
      return NextResponse.json(
        { success: false, error: 'Invalid OpenAI API key.', code: 'AUTH_ERROR' },
        { status: 401 }
      );
    }

    if (isRateLimitError(error)) {
      return NextResponse.json(
        { success: false, error: 'Rate limit reached. Please wait and retry.', code: 'RATE_LIMIT' },
        { status: 429 }
      );
    }

    const msg = error instanceof Error ? error.message : 'Report generation failed';
    return NextResponse.json(
      { success: false, error: msg, code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
