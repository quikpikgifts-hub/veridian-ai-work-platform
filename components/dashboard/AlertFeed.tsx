import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockThreatFeed } from '@/lib/mock-data';
import { timeAgo } from '@/lib/utils';
import type { SeverityLevel } from '@/types';
import { ExternalLink } from 'lucide-react';

export function AlertFeed() {
  const alerts = mockThreatFeed.slice(0, 4);

  return (
    <Card goldTop padding="none" className="p-4">
      <CardHeader title="Live Alert Feed" subtitle="Intelligence updates" />
      <div className="space-y-2">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className="p-3 bg-[#0D0D18] border border-white/[0.05] rounded-[2px] hover:border-amber-500/20 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Badge
                  variant={alert.severity as SeverityLevel}
                  label={alert.severity}
                  dot
                />
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-[9.5px] text-white/30">{timeAgo(alert.timestamp)}</span>
                <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-amber-400/50 transition-colors" />
              </div>
            </div>
            <div className="text-[11.5px] font-semibold text-white/80 mb-1 leading-tight group-hover:text-white transition-colors">
              {alert.title}
            </div>
            <div className="text-[10px] text-white/35 leading-relaxed line-clamp-2">
              {alert.summary}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[9px] text-amber-400/50 font-medium">{alert.source}</span>
              <span className="text-white/20">·</span>
              <span className="text-[9px] text-white/30">{alert.location}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
