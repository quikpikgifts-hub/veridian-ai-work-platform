import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { reportType, incidentData, notes } = await req.json();

    const systemPrompt = `You are the AI Risk Analyst for Veridian Risk & Resilience Group, LLC — an operational risk management consulting firm founded by Steve Washington Smith, a decorated law enforcement veteran with nearly 30 years of experience and 13 formal commendations from the Commissioner of Police.

Your role is to draft professional consulting reports for Steve's review. All output is a DRAFT — Steve reviews and approves everything before client delivery.

Brand voice: Executive, authoritative, practical. Never alarmist. Never vague. Always actionable.
Company tagline: "Operational Risk. Elevated Standard."`;

    const userPrompt = `Generate a professional ${reportType} for Veridian Risk & Resilience Group, LLC.

${incidentData ? `Incident/Case Data: ${JSON.stringify(incidentData)}` : ''}
${notes ? `Additional Context: ${notes}` : ''}

Structure the report with:
1. Executive Summary (2-3 sentences)
2. Key Findings (3-5 specific observations)  
3. Risk Assessment (Low/Moderate/High/Critical rating with justification)
4. Recommendations (3-5 specific, actionable items)
5. Next Steps

Use professional consulting language. Frame findings as opportunities to strengthen operations, not failures. This is a DRAFT for Steve Washington Smith's review and approval.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const reportText = data.content[0]?.text || '';

    return NextResponse.json({
      success: true,
      report: reportText,
      model: 'claude-sonnet-4',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate report. Please try again.' },
      { status: 500 }
    );
  }
}
