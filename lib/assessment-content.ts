// ─── Operational Readiness Self-Assessment ─────────────────────
// The questionnaire behind the client-portal Assessment Wizard.
// Grounded in the same practice areas Veridian sells (lib/site-content.ts
// SERVICES) so the AI summary can speak directly to a real service offer.

export type QuestionType = 'yesno' | 'scale' | 'text';

export interface AssessmentQuestion {
  id: string;
  prompt: string;
  type: QuestionType;
  helpText?: string;
  citation?: string;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
}

export const ASSESSMENT_SECTIONS: readonly AssessmentSection[] = [
  {
    id: 'operational-risk',
    title: 'Operational Risk',
    description: 'General exposure to liability, security, and safety incidents at your site(s).',
    questions: [
      { id: 'or-1', type: 'yesno', prompt: 'Has a formal, documented risk assessment been performed at your primary site within the last 12 months?' },
      { id: 'or-2', type: 'yesno', prompt: 'Do you have a written incident-reporting procedure that all staff are trained on?' },
      { id: 'or-3', type: 'scale', prompt: 'How would you rate your organization\'s overall physical security posture (locks, access control, lighting, monitoring)?', helpText: '1 = no controls in place, 10 = comprehensive and regularly reviewed' },
      { id: 'or-4', type: 'text', prompt: 'Describe any incidents (theft, injury, property damage, workplace violence) in the last 12 months.' },
    ],
  },
  {
    id: 'osha-compliance',
    title: 'OSHA Compliance',
    description: 'Workplace safety standards required under 29 CFR 1910.',
    questions: [
      { id: 'osha-1', type: 'yesno', prompt: 'Are walking/working surfaces (aisles, floors, stairways) kept clear and in good repair?', citation: '29 CFR 1910.22' },
      { id: 'osha-2', type: 'yesno', prompt: 'Are exit routes clearly marked, unobstructed, and adequate for your occupancy?', citation: '29 CFR 1910.36' },
      { id: 'osha-3', type: 'yesno', prompt: 'Is required personal protective equipment (PPE) provided and consistently used?', citation: '29 CFR 1910.132' },
      { id: 'osha-4', type: 'yesno', prompt: 'Are fire extinguishers inspected on a documented monthly schedule?', citation: '29 CFR 1910.157' },
      { id: 'osha-5', type: 'yesno', prompt: 'Do you maintain a written Hazard Communication (chemical safety) program?', citation: '29 CFR 1910.1200' },
    ],
  },
  {
    id: 'fleet-safety',
    title: 'Fleet & DOT Safety',
    description: 'Applicable only if your organization operates a vehicle fleet — otherwise mark N/A.',
    questions: [
      { id: 'fleet-1', type: 'yesno', prompt: 'Are driver qualification files maintained for every driver (license, MVR, medical cert)?' },
      { id: 'fleet-2', type: 'yesno', prompt: 'Is a documented pre-trip vehicle inspection performed and logged daily?' },
      { id: 'fleet-3', type: 'scale', prompt: 'How confident are you that your fleet would pass a DOT compliance audit today?', helpText: '1 = not confident, 10 = fully confident' },
    ],
  },
  {
    id: 'emergency-preparedness',
    title: 'Emergency Preparedness',
    description: 'Your organization\'s readiness to respond to a critical incident.',
    questions: [
      { id: 'ep-1', type: 'yesno', prompt: 'Do you have a written Emergency Action Plan (EAP) covering fire, severe weather, and active-threat scenarios?', citation: '29 CFR 1910.38' },
      { id: 'ep-2', type: 'yesno', prompt: 'Has your EAP been reviewed or drilled in the last 12 months?' },
      { id: 'ep-3', type: 'text', prompt: 'Who is designated to make critical decisions during an emergency in the absence of ownership/executive leadership?' },
    ],
  },
  {
    id: 'workforce-hr-risk',
    title: 'Workforce & HR Risk',
    description: 'Workplace violence prevention and HR-related exposure.',
    questions: [
      { id: 'hr-1', type: 'yesno', prompt: 'Do you have a written workplace violence prevention policy?' },
      { id: 'hr-2', type: 'yesno', prompt: 'Are managers trained to recognize and de-escalate escalating behavior?' },
      { id: 'hr-3', type: 'scale', prompt: 'How would you rate employee awareness of how to report safety or conduct concerns?', helpText: '1 = low awareness, 10 = high awareness' },
    ],
  },
] as const;

export function totalQuestionCount(): number {
  return ASSESSMENT_SECTIONS.reduce((sum, s) => sum + s.questions.length, 0);
}

export function findQuestion(id: string): { section: AssessmentSection; question: AssessmentQuestion } | null {
  for (const section of ASSESSMENT_SECTIONS) {
    const question = section.questions.find(q => q.id === id);
    if (question) return { section, question };
  }
  return null;
}
