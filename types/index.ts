export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus = 'active' | 'investigating' | 'contained' | 'resolved';
export type ThreatCategory = 'workplace-violence' | 'theft' | 'trespass' | 'safety' | 'compliance' | 'fleet';

export interface Incident {
  id: string;
  title: string;
  location: string;
  industry: string;
  severity: SeverityLevel;
  status: IncidentStatus;
  category: ThreatCategory;
  reportedAt: string;
  assignedTo: string;
  description: string;
  aiSummary?: string;
}

export interface ThreatFeed {
  id: string;
  title: string;
  source: string;
  severity: SeverityLevel;
  category: ThreatCategory;
  timestamp: string;
  location: string;
  summary: string;
  actionable: boolean;
}

export interface KpiCard {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'flat';
  positive: boolean;
}

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'standby' | 'processing';
  tasksToday: number;
  lastAction: string;
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  riskScore: number;
  lastAssessment: string;
  nextReview: string;
  status: 'active' | 'pending' | 'review';
  incidents: number;
}
