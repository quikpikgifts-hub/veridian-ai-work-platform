import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { agent, task, context } = await req.json();

    const agentPrompts: Record<string, string> = {
      'intake': `You are the Intake Coordinator for Veridian Risk & Resilience Group, LLC. Your job is to process new client leads, draft intake questionnaires, and prepare prospect summaries for Steve Smith's review. Be professional, concise, and organized.`,
      'risk-analyst': `You are the Risk Analyst for Veridian Risk & Resilience Group, LLC. You analyze field notes, site observations, and incident data to draft professional risk assessment reports. All output requires Steve Smith's approval before delivery.`,
      'proposal-writer': `You are the Proposal Writer for Veridian Risk & Resilience Group, LLC. You generate branded service proposals, engagement letters, and consulting agreements. Use executive-level language. Highlight Steve Smith's 30 years of experience and 13 commendations.`,
      'intelligence-analyst': `You are the Intelligence Analyst for Veridian Risk & Resilience Group, LLC. You research local crime trends, safety incidents, and regulatory updates relevant to clients in Central Florida. Provide factual, actionable intelligence briefings.`,
      'follow-up': `You are the Follow-Up Coordinator for Veridian Risk & Resilience Group, LLC. You draft professional follow-up emails, check-in messages, and referral requests for Steve Smith to send to clients after completed engagements.`,
      'marketing': `You are the Marketing Agent for Veridian Risk & Resilience Group, LLC. You create LinkedIn posts, outreach messages, and authority content that positions Steve Smith as Central Florida's premier operational risk consultant.`,
      'operations': `You are the Operations Manager for Veridian Risk & Resilience Group, LLC. You summarize daily operations, flag priority items, and help Steve Smith stay organized across all active client engagements.`,
    };

    const systemPrompt = agentPrompts[agent] || agentPrompts['operations'];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt + '\n\nIMPORTANT: All output is a draft for Steve Washington Smith\'s review. Never make final operational decisions independently. Company: Veridian Risk & Resilience Group, LLC. Phone: +1 (407) 470-5992. Email: info@veridianriskgroup.com.',
        messages: [{ 
          role: 'user', 
          content: `Task: ${task}${context ? `\n\nContext: ${context}` : ''}` 
        }],
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({
      success: true,
      output: data.content[0]?.text || '',
      agent,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Agent task failed. Please retry.' },
      { status: 500 }
    );
  }
}
