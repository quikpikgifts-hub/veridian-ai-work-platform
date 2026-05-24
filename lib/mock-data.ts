import type { Incident, ThreatFeed, KpiCard, AIAgent, Client } from '@/types';

export const mockIncidents: Incident[] = [
  { id: 'INC-2025-001', title: 'Verbal Altercation — Retail Floor', location: 'Orange Ave Gas Station', industry: 'Retail / Fuel', severity: 'high', status: 'investigating', category: 'workplace-violence', reportedAt: '2025-05-20T09:14:00', assignedTo: 'Steve Smith', description: 'Customer-staff verbal confrontation escalated near register. De-escalation protocol initiated.', aiSummary: 'Pattern consistent with 3 prior events at this location. Recommend de-escalation training.' },
  { id: 'INC-2025-002', title: 'Unauthorized Entry — After Hours', location: 'Palmetto Apartments Complex A', industry: 'Property Management', severity: 'critical', status: 'active', category: 'trespass', reportedAt: '2025-05-20T02:33:00', assignedTo: 'Steve Smith', description: 'Motion sensors triggered in restricted parking garage. Individual bypassed access gate.', aiSummary: 'Access control vulnerability identified. Gate mechanism requires immediate review.' },
  { id: 'INC-2025-003', title: 'Vehicle Inventory Discrepancy', location: 'Premier Auto Group — Lot B', industry: 'Dealership', severity: 'high', status: 'investigating', category: 'theft', reportedAt: '2025-05-19T16:45:00', assignedTo: 'Steve Smith', description: 'End-of-day inventory check shows one vehicle unaccounted for. Reviewing camera footage.', aiSummary: 'Lot B has documented camera blind spot. Recommend camera repositioning.' },
  { id: 'INC-2025-004', title: 'Slip and Fall — Parking Lot', location: 'Westside Church Campus', industry: 'Religious Organization', severity: 'medium', status: 'contained', category: 'safety', reportedAt: '2025-05-19T11:22:00', assignedTo: 'Steve Smith', description: 'Visitor slipped on unmarked wet surface near main entrance. Medical assistance provided.', aiSummary: 'Premises liability exposure. Immediate signage and surface treatment recommended.' },
  { id: 'INC-2025-005', title: 'Driver Hours Violation', location: 'FastRoute Logistics — Fleet', industry: 'Transportation', severity: 'medium', status: 'resolved', category: 'compliance', reportedAt: '2025-05-18T08:00:00', assignedTo: 'Steve Smith', description: 'Log review identified driver exceeding DOT hours of service regulations. Shift adjusted.', aiSummary: 'Recurring compliance gap in fleet scheduling system. Audit recommended.' },
  { id: 'INC-2025-006', title: 'Shoplifting — Organized', location: 'Sunrise Retail Center', industry: 'Retail', severity: 'high', status: 'investigating', category: 'theft', reportedAt: '2025-05-18T14:30:00', assignedTo: 'Steve Smith', description: 'Three-person coordinated theft of high-value merchandise. Estimated $2,400 loss.', aiSummary: 'Organized retail crime pattern. Coordinate with neighboring stores and law enforcement.' },
  { id: 'INC-2025-007', title: 'OSHA Violation — Construction Zone', location: 'Meridian Construction Site', industry: 'Construction', severity: 'critical', status: 'active', category: 'compliance', reportedAt: '2025-05-17T13:15:00', assignedTo: 'Steve Smith', description: 'Workers observed without required PPE in designated hard hat zone. Site supervisor notified.', aiSummary: 'Second OSHA compliance event in 30 days. Escalated compliance training required.' },
  { id: 'INC-2025-008', title: 'Suspicious Package Report', location: 'Harbor Point Hotel — Lobby', industry: 'Hospitality', severity: 'medium', status: 'resolved', category: 'safety', reportedAt: '2025-05-17T09:45:00', assignedTo: 'Steve Smith', description: 'Unattended bag in lobby. Emergency protocol activated. Determined to be guest property.', aiSummary: 'Emergency response protocol performed correctly. No action needed.' },
];

export const mockThreatFeed: ThreatFeed[] = [
  { id: 'TF-001', title: 'Retail Crime Spike — Orange County', source: 'OCSO Public Records', severity: 'high', category: 'theft', timestamp: '2025-05-20T08:00:00', location: 'Orange County, FL', summary: 'Local law enforcement reports 34% increase in organized retail theft this quarter. High-risk areas include Semoran Blvd corridor.', actionable: true },
  { id: 'TF-002', title: 'Active Threat Training Advisory', source: 'DHS Bulletin', severity: 'medium', category: 'workplace-violence', timestamp: '2025-05-20T06:30:00', location: 'Nationwide', summary: 'DHS releases updated active threat response guidelines for commercial properties. Churches and schools specifically highlighted.', actionable: true },
  { id: 'TF-003', title: 'Fleet Safety Alert — I-4 Corridor', source: 'FDOT Safety Report', severity: 'medium', category: 'fleet', timestamp: '2025-05-19T15:00:00', location: 'I-4 Central Florida', summary: 'FDOT identifies high-incident zones on I-4 between exits 72-88. Commercial vehicle operators advised to review route safety protocols.', actionable: true },
  { id: 'TF-004', title: 'OSHA Priority Inspection Initiative', source: 'OSHA Region 4', severity: 'high', category: 'compliance', timestamp: '2025-05-19T10:00:00', location: 'Central Florida', summary: 'OSHA announces targeted enforcement campaign for construction and general industry through Q3. Recordkeeping and PPE compliance priority areas.', actionable: true },
  { id: 'TF-005', title: 'Apartment Complex Crime Trend', source: 'Crime Data Analysis', severity: 'medium', category: 'trespass', timestamp: '2025-05-18T14:00:00', location: 'Metro Orlando', summary: 'Analysis of public crime data shows 28% rise in trespass incidents at multi-family residential properties. Access control identified as primary gap.', actionable: true },
  { id: 'TF-006', title: 'Workplace Violence Prevention Act Update', source: 'FL Legislature', severity: 'low', category: 'compliance', timestamp: '2025-05-17T09:00:00', location: 'Florida', summary: 'Florida workplace safety legislation update includes new employer documentation requirements for violence prevention programs effective July 2025.', actionable: true },
];

export const mockKpis: KpiCard[] = [
  { label: 'Active Incidents', value: 4, change: '+2 from last week', trend: 'up', positive: false },
  { label: 'Risk Assessments', value: 12, change: '+3 this month', trend: 'up', positive: true },
  { label: 'Clients Protected', value: 9, change: 'Steady', trend: 'flat', positive: true },
  { label: 'Avg Risk Score', value: '6.4', change: '-0.8 from last month', trend: 'down', positive: true },
];

export const mockAIAgents: AIAgent[] = [
  { id: '1', name: 'Intake Coordinator', role: 'Lead Capture & Onboarding', status: 'active', tasksToday: 3, lastAction: 'Sent intake form to Palmetto Apartments' },
  { id: '2', name: 'Risk Analyst', role: 'Assessment Drafting', status: 'processing', tasksToday: 2, lastAction: 'Drafting report for Orange Ave Gas Station' },
  { id: '3', name: 'Proposal Writer', role: 'Document Generation', status: 'active', tasksToday: 1, lastAction: 'Generated proposal for FastRoute Logistics' },
  { id: '4', name: 'Intelligence Analyst', role: 'Situational Awareness', status: 'active', tasksToday: 5, lastAction: 'Updated Orange County threat brief' },
  { id: '5', name: 'Follow-Up Coordinator', role: 'Client Retention', status: 'standby', tasksToday: 0, lastAction: 'Scheduled 90-day review for Westside Church' },
  { id: '6', name: 'Marketing Agent', role: 'Business Development', status: 'active', tasksToday: 2, lastAction: 'Drafted LinkedIn post — workplace violence stats' },
];

export const mockClients: Client[] = [
  { id: 'APT001', name: 'Palmetto Apartments', industry: 'Property Management', riskScore: 7.8, lastAssessment: '2025-03-15', nextReview: '2025-06-15', status: 'active', incidents: 2 },
  { id: 'GAS001', name: 'Orange Ave Gas Station', industry: 'Retail / Fuel', riskScore: 8.2, lastAssessment: '2025-04-02', nextReview: '2025-07-02', status: 'review', incidents: 3 },
  { id: 'DLR001', name: 'Premier Auto Group', industry: 'Dealership', riskScore: 6.5, lastAssessment: '2025-04-20', nextReview: '2025-07-20', status: 'active', incidents: 1 },
  { id: 'CHR001', name: 'Westside Church', industry: 'Religious Org', riskScore: 4.2, lastAssessment: '2025-05-01', nextReview: '2025-08-01', status: 'active', incidents: 1 },
  { id: 'LOG001', name: 'FastRoute Logistics', industry: 'Transportation', riskScore: 6.9, lastAssessment: '2025-02-28', nextReview: '2025-05-28', status: 'review', incidents: 2 },
  { id: 'RTL001', name: 'Sunrise Retail Center', industry: 'Retail', riskScore: 7.1, lastAssessment: '2025-03-10', nextReview: '2025-06-10', status: 'active', incidents: 1 },
  { id: 'CON001', name: 'Meridian Construction', industry: 'Construction', riskScore: 8.9, lastAssessment: '2025-04-15', nextReview: '2025-07-15', status: 'review', incidents: 2 },
  { id: 'HTL001', name: 'Harbor Point Hotel', industry: 'Hospitality', riskScore: 5.4, lastAssessment: '2025-05-05', nextReview: '2025-08-05', status: 'active', incidents: 1 },
];

export const incidentTrendData = [
  { month: 'Nov', incidents: 3, resolved: 3, critical: 0 },
  { month: 'Dec', incidents: 5, resolved: 4, critical: 1 },
  { month: 'Jan', incidents: 4, resolved: 4, critical: 0 },
  { month: 'Feb', incidents: 7, resolved: 6, critical: 2 },
  { month: 'Mar', incidents: 6, resolved: 5, critical: 1 },
  { month: 'Apr', incidents: 9, resolved: 7, critical: 2 },
  { month: 'May', incidents: 8, resolved: 4, critical: 3 },
];

export const riskByIndustryData = [
  { name: 'Construction', risk: 8.9, color: '#E74C3C' },
  { name: 'Fuel/Retail', risk: 8.2, color: '#E67E22' },
  { name: 'Apartments', risk: 7.8, color: '#E67E22' },
  { name: 'Retail', risk: 7.1, color: '#F1C40F' },
  { name: 'Logistics', risk: 6.9, color: '#F1C40F' },
  { name: 'Dealership', risk: 6.5, color: '#2ECC71' },
  { name: 'Hospitality', risk: 5.4, color: '#2ECC71' },
  { name: 'Church', risk: 4.2, color: '#2ECC71' },
];

export const threatCategoryData = [
  { name: 'Workplace Violence', value: 28, fill: '#E74C3C' },
  { name: 'Theft', value: 32, fill: '#E67E22' },
  { name: 'Compliance', value: 20, fill: '#3498DB' },
  { name: 'Safety', value: 12, fill: '#F1C40F' },
  { name: 'Trespass', value: 8, fill: '#C9A84C' },
];
