import { NextRequest, NextResponse } from 'next/server';
import { complete, isRateLimitError, isAuthError, TOKEN_LIMITS } from '@/lib/openai';
import { getAgentPrompt } from '@/lib/agents';

// ── POST /api/ai-agent ───────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // ── Parse & validate body ──────────────────────────────
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body.' },
        { status: 400 }
      );
    }

    const {
      agent        = 'agt-01',
      agentName    = 'Operations',
      task,
      context,
      systemOverride,
      maxTokens,
    } = body as {
      agent?:          string;
      agentName?:      string;
      task?:           string;
      context?:        string;
      systemOverride?: string;
      maxTokens?:      number;
    };

    if (!task?.trim()) {
      return NextResponse.json(
        { success: false, error: 'task is required and cannot be empty.' },
        { status: 400 }
      );
    }

    // ── Build prompts ──────────────────────────────────────
    const systemPrompt = systemOverride ?? getAgentPrompt(agent);

    const userContent = context?.trim()
      ? `Task: ${task.trim()}\n\nAdditional Context:\n${context.trim()}`
      : `Task: ${task.trim()}`;

    // ── Call OpenAI ────────────────────────────────────────
    const result = await complete({
      system:    systemPrompt,
      user:      userContent,
      maxTokens: maxTokens ?? TOKEN_LIMITS.STANDARD,
    });

    return NextResponse.json({
      success:      true,
      output:       result.output,
      agent,
      agentName,
      model:        result.model,
      finishReason: result.finishReason,
      inputTokens:  result.inputTokens,
      outputTokens: result.outputTokens,
      timestamp:    new Date().toISOString(),
    });

  } catch (error: unknown) {
    console.error('[/api/ai-agent] Error:', error);

    // ── Auth failure ───────────────────────────────────────
    if (isAuthError(error)) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Invalid OpenAI API key. Verify OPENAI_API_KEY in your environment variables.',
          code: 'AUTH_ERROR',
        },
        { status: 401 }
      );
    }

    // ── Rate limit ─────────────────────────────────────────
    if (isRateLimitError(error)) {
      return NextResponse.json(
        {
          success: false,
          error:
            'OpenAI rate limit reached. Please wait a moment and try again.',
          code: 'RATE_LIMIT',
        },
        { status: 429 }
      );
    }

    // ── API key not configured ─────────────────────────────
    const msg = error instanceof Error ? error.message : 'Internal server error';
    if (msg.includes('OPENAI_API_KEY')) {
      return NextResponse.json(
        {
          success: false,
          error:
            'OPENAI_API_KEY is not configured. Add it to .env.local or Vercel environment variables.',
          code: 'NO_API_KEY',
        },
        { status: 503 }
      );
    }

    // ── Generic failure ────────────────────────────────────
    return NextResponse.json(
      { success: false, error: msg, code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
