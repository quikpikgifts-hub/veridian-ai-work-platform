// ─── Shared public-site content ───────────────────────────────
// Single source of truth for marketing pages (/, /services, /about).
// Keep in sync with lib/constants.ts (PLATFORM, FOUNDERS) for contact info.

import type { LucideIcon } from 'lucide-react';
import {
  Shield,
  Truck,
  FileText,
  AlertTriangle,
  BookOpen,
  Eye,
  Users,
  Siren,
} from 'lucide-react';

export interface ServiceEntry {
  Icon: LucideIcon;
  title: string;
  body: string;
}

export const SERVICES: readonly ServiceEntry[] = [
  {
    Icon: Shield,
    title: 'Operational Risk Assessments',
    body: 'On-site evaluations identifying OSHA compliance gaps, security vulnerabilities, and liability exposures — delivered with a prioritised remediation roadmap.',
  },
  {
    Icon: AlertTriangle,
    title: 'Incident Documentation',
    body: 'Legal-grade incident reports, workplace violence response protocols, and structured documentation built for insurance, HR, and litigation support.',
  },
  {
    Icon: BookOpen,
    title: 'OSHA Compliance Advisory',
    body: '29 CFR 1910 gap analysis, Emergency Action Plans, and regulatory alignment reviews tailored to your industry and workforce.',
  },
  {
    Icon: Truck,
    title: 'Fleet & DOT Safety Consulting',
    body: 'DOT compliance audits, driver qualification file reviews, pre-trip inspection systems, and fleet cost-efficiency analysis for logistics operations.',
  },
  {
    Icon: Eye,
    title: 'Threat Monitoring & Intelligence',
    body: 'Regional crime-trend analysis, pre-visit situational briefs, and industry-specific threat assessments for proactive risk posture.',
  },
  {
    Icon: FileText,
    title: 'Executive Reporting',
    body: 'Professional consulting reports structured for executive review — risk scores, prioritised findings, and clear next steps.',
  },
  {
    Icon: Siren,
    title: 'Workplace Violence Prevention',
    body: 'Threat-assessment protocols, de-escalation training pathways, and Emergency Action Plan development for high-risk environments.',
  },
  {
    Icon: Users,
    title: 'HR Risk Advisory',
    body: 'Policy review, workforce risk exposure analysis, and supervisory-practice guidance grounded in HR compliance standards.',
  },
] as const;

export const INDUSTRIES = [
  'Logistics & Fleet',
  'Retail',
  'Multifamily Housing',
  'Healthcare',
  'Construction',
  'Fuel & Convenience',
  'Hospitality',
  'Schools & Institutions',
  'Houses of Worship',
  'Auto Dealerships',
  'Law Enforcement & Municipal',
  'Manufacturing',
] as const;

export const CREDENTIALS = [
  'OSHA 10-Hour General Industry — U.S. Department of Labor',
  'FEMA IS-100 / IS-200 / IS-700 Certified',
  'Jamaica Constabulary Force — Detective Corporal, 30 Years',
  'Sanford Police Department — Community Services Officer',
  'DOT / FMCSA Fleet Compliance Program Development',
  'Workplace Violence Prevention Advisory',
] as const;

export interface ProcessStep {
  step: string;
  title: string;
  body: string;
}

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery Call',
    body: 'A no-obligation conversation to understand your operational environment, current exposures, and what a successful engagement looks like.',
  },
  {
    step: '02',
    title: 'Scope & Proposal',
    body: 'A written proposal outlining the assessment scope, timeline, and deliverables — no work begins until it is agreed.',
  },
  {
    step: '03',
    title: 'On-Site Assessment',
    body: 'A structured on-site evaluation using our standardised interview toolkit and document review checklist across every relevant compliance domain.',
  },
  {
    step: '04',
    title: 'Report & Debrief',
    body: 'A prioritised findings report and executive debrief, with a clear, practical remediation roadmap you can act on immediately.',
  },
] as const;

export const PLATFORM_FEATURES = [
  {
    stat: '01',
    label: 'Incident Intelligence',
    body: 'Centralised incident registry with structured severity classification, assignment tracking, and exportable documentation.',
  },
  {
    stat: '02',
    label: 'Risk Scoring Engine',
    body: 'Site-level risk scores derived from field observations, OSHA citations, and historical incident data — updated at each engagement.',
  },
  {
    stat: '03',
    label: 'Compliance Workflows',
    body: 'Guided workflows for OSHA audit preparation, fleet inspection scheduling, and Emergency Action Plan development.',
  },
  {
    stat: '04',
    label: 'Client Reporting Portal',
    body: 'Secure access to assessment reports, remediation status, and compliance documentation in one organised workspace.',
  },
] as const;
