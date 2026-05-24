import { NextRequest, NextResponse } from 'next/server';
import { getAgentPrompt } from '@/lib/agents';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agent, agentName, task, context, systemOverride } = body;

    if (!task?.trim()) {
      return NextResponse.json({ success: false, error: 'Task is required.' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'ANTHROPIC_API_KEY not configured. Add it in Vercel environment variables.',
      }, { status: 503 });
    }

    const systemPrompt = systemOverride || getAgentPrompt(agent || 'agt-01');

    const userContent = context
      ? `Task: ${task}\n\nAdditional Context:\n${context}`
      : `Task: ${task}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: 'user', content: userContent }],
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = (errData as { error?: { message?: string } })?.error?.message || `API error ${response.status}`;
      return NextResponse.json({ success: false, error: errMsg }, { status: response.status });
    }

    const data = await response.json();
    const output = data.content?.[0]?.text || '';

    return NextResponse.json({
      success: true,
      output,
      agent: agent || 'agt-01',
      agentName: agentName || 'AI Agent',
      model: 'claude-sonnet-4-20250514',
      timestamp: new Date().toISOString(),
      inputTokens:  data.usage?.input_tokens  || 0,
      outputTokens: data.usage?.output_tokens || 0,
    });

  } catch (error: unknown) {
    console.error('[AI Agent Route Error]', error);
    const msg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
