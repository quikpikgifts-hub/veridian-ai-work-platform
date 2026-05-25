import OpenAI from 'openai';

// ── Singleton client — instantiated once per cold start ──────
let _client: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (_client) return _client;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'OPENAI_API_KEY is not configured. ' +
      'Add it to .env.local (local dev) or Vercel → Settings → Environment Variables (production).'
    );
  }

  _client = new OpenAI({
    apiKey,
    maxRetries: 2,          // built-in retry on 429 / 5xx
    timeout:    45_000,     // 45 s — generous for long reports
  });

  return _client;
}

// ── Model configuration ──────────────────────────────────────
export const MODEL = {
  // Primary — use gpt-4.1 (strong, fast, cost-effective for 2025/26)
  // Falls back to gpt-4o if 4.1 not available on account tier
  PRIMARY:  'gpt-4.1',
  FALLBACK: 'gpt-4o',
} as const;

export const TOKEN_LIMITS = {
  BRIEF:   600,   // daily briefings, status lines
  STANDARD: 1200, // reports, proposals, analyses
  EXTENDED: 2400, // detailed assessments, full reports
} as const;

// ── Canonical OpenAI call with error normalisation ────────────
export interface CompletionOptions {
  system:    string;
  user:      string;
  maxTokens?: number;
  model?:    string;
  temperature?: number;
}

export interface CompletionResult {
  output:       string;
  model:        string;
  inputTokens:  number;
  outputTokens: number;
  finishReason: string;
}

export async function complete(opts: CompletionOptions): Promise<CompletionResult> {
  const client = getOpenAIClient();

  const model       = opts.model      ?? MODEL.PRIMARY;
  const maxTokens   = opts.maxTokens  ?? TOKEN_LIMITS.STANDARD;
  const temperature = opts.temperature ?? 0.4;   // consistent, professional output

  const response = await client.chat.completions.create({
    model,
    max_tokens:  maxTokens,
    temperature,
    messages: [
      { role: 'system', content: opts.system },
      { role: 'user',   content: opts.user   },
    ],
  });

  const choice = response.choices[0];
  return {
    output:       choice.message.content ?? '',
    model:        response.model,
    inputTokens:  response.usage?.prompt_tokens     ?? 0,
    outputTokens: response.usage?.completion_tokens ?? 0,
    finishReason: choice.finish_reason               ?? 'unknown',
  };
}

// ── Rate-limit aware wrapper ─────────────────────────────────
// Re-exported for API routes that want to surface rate-limit info
export function isRateLimitError(err: unknown): boolean {
  return (
    err instanceof OpenAI.RateLimitError ||
    (err instanceof Error && err.message.toLowerCase().includes('rate limit'))
  );
}

export function isAuthError(err: unknown): boolean {
  return (
    err instanceof OpenAI.AuthenticationError ||
    (err instanceof Error && (
      err.message.toLowerCase().includes('invalid api key') ||
      err.message.toLowerCase().includes('incorrect api key')
    ))
  );
}
