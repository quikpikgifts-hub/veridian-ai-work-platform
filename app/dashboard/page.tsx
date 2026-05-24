import { Sidebar } from '@/components/layout/Sidebar';
import { KpiCards } from '@/components/dashboard/KpiCards';
import { RecentIncidents } from '@/components/dashboard/RecentIncidents';
import { AIAgentPanel } from '@/components/dashboard/AIAgentPanel';
import { AlertFeed } from '@/components/dashboard/AlertFeed';
import { ClientTable } from '@/components/dashboard/ClientTable';
import { IncidentTrendChart, RiskByIndustryChart, ThreatCategoryChart } from '@/components/charts/Charts';
import { formatDateTime } from '@/lib/utils';

export default function DashboardPage() {
  const now = new Date().toISOString();
  return (
    <Sidebar>
      <div className="p-4 md:p-6 space-y-5 animate-fade-in">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[9px] font-bold tracking-[4px] uppercase text-amber-400/70 mb-1">Command Center</div>
            <h1 className="text-[22px] md:text-[26px] font-bold text-white leading-tight">Operations Dashboard</h1>
            <p className="text-[11px] text-white/35 mt-1">Veridian Risk & Resilience Group, LLC · {formatDateTime(now)}</p>
          </div>
          <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-green-400 bg-green-500/10 border border-green-500/25 px-2.5 py-1.5 rounded-[2px] flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            AI LIVE
          </div>
        </div>
        <KpiCards />
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="md:col-span-1 xl:col-span-2"><IncidentTrendChart /></div>
          <ThreatCategoryChart />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <RecentIncidents />
          <AlertFeed />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <RiskByIndustryChart />
          <AIAgentPanel />
        </div>
        <ClientTable />
      </div>
    </Sidebar>
  );
}
