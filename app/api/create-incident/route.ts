import { NextRequest, NextResponse } from 'next/server';
import { complete, isRateLimitError, isAuthError, TOKEN_LIMITS } from '@/lib/openai';

// ── System prompt ────────────────────────────────────────────
const INCIDENT_SYSTEM = `You are the incident analysis module for Veridian Risk & Resilience Group, LLC — an operational risk management consulting firm based in Sanford, Florida.

Your role: Analyse submitted incident data and generate a structured incident report with risk analysis, contributing factors, and recommended response actions. Output is always a DRAFT for Co-Founder review.

Tone: Factual, precise, operational. Write like a decorated law enforcement professional who has filed hundreds of incident reports. Clear headings, numbered findings, no fluff.

Do not include disclaimers about being an AI. Do not say you cannot provide analysis. Provide the best possible analysis based on the information given.

Company: Veridian Risk & Resilience Group, LLC | Steve Washington Smith, Managing Member | +1 (407) 470-5992`;

// ── POST /api/create-incident ────────────────────────────────
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
      title,
      location,
      industry,
      severity,
      category,
      description,
      assignedTo,
      immediateActions,
      witnesses,
    } = body as {
      title?:           string;
      location?:        string;
      industry?:        string;
      severity?:        string;
      category?:        string;
      description?:     string;
      assignedTo?:      string;
      immediateActions?:string;
      witnesses?:       number;
    };

    if (!description?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Incident description is required.' },
        { status: 400 }
      );
    }

    const userPrompt = `Analyse the following incident and generate a structured incident report.

Incident Details:
- Title: ${title || 'Not specified'}
- Location: ${location || 'Not specified'}
- Industry: ${industry || 'Not specified'}
- Severity: ${severity || 'Not assessed'}
- Category: ${category || 'Not specified'}
- Assigned To: ${assignedTo || 'Not assigned'}
- Witnesses: ${witnesses ?? 'Unknown'}

Description:
${description}

Immediate Actions Taken:
${immediateActions || 'None documented'}

Generate a structured incident report with:

1. INCIDENT SUMMARY
   Concise 2–3 sentence summary of what occurred.

2. CONTRIBUTING FACTORS
   2–4 specific factors that likely contributed to this incident.

3. RISK EXPOSURE
   What liability, compliance, or operational risks does this incident create for the business?

4. IMMEDIATE RESPONSE ACTIONS
   What should be done in the next 24–72 hours?

5. RECOMMENDED REMEDIATION
   3–5 specific steps to prevent recurrence. Reference applicable standards (OSHA, DOT, etc.) if relevant.

6. DOCUMENTATION CHECKLIST
   List of documentation the client should gather and retain for this incident.

Label: DRAFT — For review by ${assignedTo || 'Steve Washington Smith'} before client delivery.`;

    const result = await complete({
      system:    INCIDENT_SYSTEM,
      user:      userPrompt,
      maxTokens: TOKEN_LIMITS.STANDARD,
      temperature: 0.3,
    });

    return NextResponse.json({
      success:      true,
      analysis:     result.output,
      model:        result.model,
      inputTokens:  result.inputTokens,
      outputTokens: result.outputTokens,
      timestamp:    new Date().toISOString(),
    });

  } catch (error: unknown) {
    console.error('[/api/create-incident] Error:', error);

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

    const msg = error instanceof Error ? error.message : 'Incident analysis failed';
    return NextResponse.json(
      { success: false, error: msg, code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
