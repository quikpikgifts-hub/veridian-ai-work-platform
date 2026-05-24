'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { KpiCards } from '@/components/dashboard/KpiCards';
import { RecentIncidents } from '@/components/dashboard/RecentIncidents';
import { AIAgentPanel } from '@/components/dashboard/AIAgentPanel';
import { AlertFeed } from '@/components/dashboard/AlertFeed';
import { ClientTable } from '@/components/dashboard/ClientTable';
import {
  IncidentTrendChart, ThreatCategoryChart,
  RevenueChart, RiskByIndustryChart,
} from '@/components/charts/Charts';
import { mockWorkflows, mockReports, mockAIAgents, mockNotifications } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import {
  Zap, FileText, CheckCircle, Clock,
  Brain, Activity, ChevronRight, Play,
  AlertCircle, TrendingUp, Shield,
} from 'lucide-react';

/* ── Live clock ─────────────────────────────────────── */
function LiveClock() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTime(n.toLocaleTimeString('en-US',{ hour:'2-digit', minute:'2-digit', second:'2-digit' }));
      setDate(n.toLocaleDateString('en-US',{ weekday:'long', month:'long', day:'numeric', year:'numeric' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="hidden md:flex flex-col items-end">
      <span className="text-[18px] font-mono font-bold text-amber-400/90 leading-none tabular-nums">{time}</span>
      <span className="text-[9.5px] text-white/30 mt-0.5">{date}</span>
    </div>
  );
}

/* ── AI Secretary panel ──────────────────────────────── */
function AISecretary() {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ran, setRan] = useState(false);

  const runBrief = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/ai-agent', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          agent:'agt-01',
          agentName:'Operations Manager',
          task:'Generate a concise 3-bullet morning operations briefing for Veridian Risk Group. Cover: (1) top priority action for Steve today, (2) any client items requiring attention, (3) one field opportunity or business development note. Be direct and operational.',
        }),
      });
      const d = await r.json();
      setOutput(d.output || d.content || 'Connected — no output returned. Check API key in Settings.');
      setRan(true);
    } catch {
      setOutput('API connection error. Add ANTHROPIC_API_KEY in Settings → AI Agents.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#080910] border border-white/[0.07] rounded-[4px] overflow-hidden panel-gold">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[3px] bg-amber-500/12 border border-amber-500/25 flex items-center justify-center">
            <Brain className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div>
            <div className="text-[11.5px] font-bold text-white/90">AI Secretary</div>
            <div className="text-[9.5px] text-white/30">Operations Manager · Daily Brief</div>
          </div>
        </div>
        <button
          onClick={runBrief}
          disabled={loading}
          className={cn(
            'flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[1.5px] px-3 py-1.5 rounded-[2px] transition-all',
            loading
              ? 'bg-amber-500/20 text-amber-400/50 cursor-not-allowed'
              : ran
                ? 'bg-white/[0.05] text-white/40 hover:bg-amber-500/15 hover:text-amber-400 border border-white/[0.07]'
                : 'bg-amber-500 text-black hover:bg-amber-400',
          )}
        >
          {loading ? (
            <span className="w-3 h-3 rounded-full border-2 border-amber-400/30 border-t-amber-400 anim-spin" />
          ) : (
            <Play className="w-3 h-3" />
          )}
          {loading ? 'Running...' : ran ? 'Refresh' : 'Run Brief'}
        </button>
      </div>

      <div className="p-4">
        {!ran && !loading && (
          <div className="flex flex-col items-center py-4 text-center gap-2">
            <Brain className="w-8 h-8 text-white/8" />
            <p className="text-[11px] text-white/25">Click Run Brief to generate today&#39;s AI operations briefing.</p>
          </div>
        )}
        {loading && (
          <div className="flex items-center gap-2.5 py-3 text-white/35 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot delay-200" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot delay-400" />
            <span className="ml-1">Processing operations brief...</span>
          </div>
        )}
        {output && !loading && (
          <div className="text-[11.5px] text-amber-100/60 leading-[1.85] whitespace-pre-wrap">
            {output}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Operations Feed ─────────────────────────────────── */
function OpsFeed() {
  const feeds = [
    { color:'#22C55E', msg:'Intake Coordinator — New lead captured: Riverside Apartments, Sanford FL', time:'Just now' },
    { color:'#C9A84C', msg:'Risk Analyst — Draft report ready for Steve review: Sunstate Restaurant OSHA audit', time:'14m ago' },
    { color:'#3B82F6', msg:'Fleet Advisor — DOT compliance audit completed: FastRoute Logistics', time:'1h ago' },
    { color:'#F59E0B', msg:'Follow-Up Coordinator — 30-day check-in sent: Premier Gas Station', time:'3h ago' },
    { color:'#22C55E', msg:'Proposal Writer — Service proposal drafted: Lakeland Church campus security', time:'5h ago' },
    { color:'#A855F7', msg:'Marketing Agent — LinkedIn post scheduled: workplace violence prevention stats', time:'6h ago' },
    { color:'#C9A84C', msg:'OSHA Advisor — Compliance report finalized: Meridian Construction', time:'8h ago' },
  ];

  return (
    <div className="bg-[#080910] border border-white/[0.07] rounded-[4px] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-green-400" />
          <div className="text-[11.5px] font-bold text-white/90">Operations Feed</div>
        </div>
        <div className="flex items-center gap-1.5 text-[9px] font-bold text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" />
          LIVE
        </div>
      </div>
      <div className="divide-y divide-white/[0.04] max-h-[240px] overflow-y-auto scrollable">
        {feeds.map((f, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-2.5 hover:bg-white/[0.02] transition-colors">
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background:f.color }} />
            <span className="flex-1 text-[11px] text-white/55 leading-relaxed">{f.msg}</span>
            <span className="text-[9px] font-mono text-white/22 flex-shrink-0 mt-0.5">{f.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Workflow strip ───────────────────────────────────── */
function WorkflowStrip() {
  const active = mockWorkflows.filter(w => w.status === 'running').slice(0, 3);
  return (
    <div className="bg-[#080910] border border-white/[0.07] rounded-[4px] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="text-[11.5px] font-bold text-white/90">Active Workflows</div>
        <a href="/workflows" className="flex items-center gap-1 text-[9.5px] text-amber-400/65 hover:text-amber-400 transition-colors font-semibold">
          View All <ChevronRight className="w-3 h-3" />
        </a>
      </div>
      <div className="p-3 space-y-2">
        {active.map(wf => (
          <div key={wf.id} className="flex items-center gap-3 p-2.5 bg-white/[0.025] border border-white/[0.055] rounded-[3px] hover:border-white/[0.1] transition-colors">
            <div className="w-7 h-7 rounded-[2px] bg-blue-500/10 border border-blue-500/22 flex items-center justify-center flex-shrink-0">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-semibold text-white/80 truncate">{wf.name}</div>
              <div className="text-[9px] text-white/28">{wf.assignedAgent} · {wf.runsTotal} runs</div>
            </div>
            <div className="flex items-center gap-1 text-[8.5px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/18 px-1.5 py-0.5 rounded-[2px]">
              <span className="w-1 h-1 rounded-full bg-blue-400 pulse-dot" />LIVE
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Reports strip ───────────────────────────────────── */
function ReportsStrip() {
  const recent = mockReports.slice(0, 4);
  return (
    <div className="bg-[#080910] border border-white/[0.07] rounded-[4px] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="text-[11.5px] font-bold text-white/90">Recent Reports</div>
        <a href="/reports" className="flex items-center gap-1 text-[9.5px] text-amber-400/65 hover:text-amber-400 transition-colors font-semibold">
          View All <ChevronRight className="w-3 h-3" />
        </a>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {recent.map(r => (
          <div key={r.id} className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-white/[0.02] transition-colors">
            <div className="w-7 h-7 bg-white/[0.035] border border-white/[0.07] rounded-[2px] flex items-center justify-center flex-shrink-0">
              <FileText className="w-3.5 h-3.5 text-white/28" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-medium text-white/72 truncate">{r.title}</div>
              <div className="text-[9px] text-white/25">{r.clientName || 'Internal'}</div>
            </div>
            {r.status === 'delivered'
              ? <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
              : <Clock className="w-3.5 h-3.5 text-amber-400/60 flex-shrink-0" />
            }
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Notif banner ────────────────────────────────────── */
function AlertBanner() {
  const criticals = mockNotifications.filter(n => !n.read && (n.priority === 'critical' || n.priority === 'high')).slice(0,1);
  if (!criticals.length) return null;
  const n = criticals[0];
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-red-500/[0.07] border border-red-500/20 rounded-[3px] anim-slide-down">
      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
      <span className="text-[11.5px] text-red-300/80 flex-1">{n.title} — {n.message}</span>
      <a href="/notifications" className="text-[10px] font-bold text-red-400 hover:text-red-300 whitespace-nowrap transition-colors">
        View →
      </a>
    </div>
  );
}

/* ── Command header ──────────────────────────────────── */
function CommandHeader() {
  const tasksToday  = mockAIAgents.reduce((s,a)=>s+a.tasksToday,0);
  const activeAgents= mockAIAgents.filter(a=>a.status==='active').length;
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-3.5 h-3.5 text-amber-400/70" />
          <span className="text-[9px] font-bold tracking-[4px] uppercase text-amber-400/70">Command Center</span>
        </div>
        <h1 className="text-[24px] md:text-[28px] font-bold text-white leading-tight tracking-tight">
          Operations Dashboard
        </h1>
        <p className="text-[11px] text-white/30 mt-1">
          Veridian Risk &amp; Resilience Group, LLC
        </p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Stats pills */}
        <div className="hidden sm:flex flex-col items-center px-3 py-2 bg-white/[0.03] border border-white/[0.07] rounded-[3px]">
          <span className="text-[18px] font-bold font-mono text-amber-400 leading-none">{activeAgents}</span>
          <span className="text-[8.5px] text-white/28 mt-0.5 uppercase tracking-wide">AI Active</span>
        </div>
        <div className="hidden sm:flex flex-col items-center px-3 py-2 bg-white/[0.03] border border-white/[0.07] rounded-[3px]">
          <span className="text-[18px] font-bold font-mono text-green-400 leading-none">{tasksToday}</span>
          <span className="text-[8.5px] text-white/28 mt-0.5 uppercase tracking-wide">Tasks Today</span>
        </div>
        <LiveClock />
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────── */
export default function DashboardPage() {
  return (
    <Sidebar>
      <div className="p-4 md:p-5 lg:p-6 space-y-4 anim-fade-up">

        <CommandHeader />
        <AlertBanner />
        <KpiCards />

        {/* Charts R1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2"><IncidentTrendChart /></div>
          <ThreatCategoryChart />
        </div>

        {/* Charts R2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RevenueChart />
          <RiskByIndustryChart />
        </div>

        {/* AI Secretary + feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AISecretary />
          <OpsFeed />
        </div>

        {/* Incidents + Alert feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecentIncidents />
          <AlertFeed />
        </div>

        {/* Agents + Workflows + Reports */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AIAgentPanel />
          <WorkflowStrip />
          <ReportsStrip />
        </div>

        {/* Client table */}
        <ClientTable />

        {/* Footer status */}
        <div className="flex items-center justify-center gap-3 py-2 border-t border-white/[0.04] text-[9.5px] text-white/20">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span>All systems operational · Veridian AI Platform v2 · {new Date().getFullYear()}</span>
          <TrendingUp className="w-3 h-3" />
        </div>
      </div>
    </Sidebar>
  );
}
