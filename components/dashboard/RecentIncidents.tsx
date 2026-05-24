import Link from 'next/link';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockIncidents } from '@/lib/mock-data';
import { timeAgo } from '@/lib/utils';
import type { SeverityLevel, IncidentStatus } from '@/types';
import { ArrowRight, MapPin } from 'lucide-react';

export function RecentIncidents() {
  const recent = mockIncidents.slice(0, 5);

  return (
    <Card goldTop padding="none" className="p-4">
      <CardHeader
        title="Recent Incidents"
        action={
          <Link href="/incidents">
            <Button variant="ghost" size="sm">View All <ArrowRight className="w-3 h-3" /></Button>
          </Link>
        }
      />
      <div className="space-y-1">
        {recent.map(inc => (
          <div
            key={inc.id}
            className="flex items-center gap-3 p-2.5 rounded-[2px] hover:bg-white/[0.025] transition-colors cursor-pointer group"
          >
            {/* Severity indicator */}
            <div className={`w-1 h-10 rounded-full flex-shrink-0 ${
              inc.severity === 'critical' ? 'bg-red-500' :
              inc.severity === 'high' ? 'bg-orange-500' :
              inc.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-500'
            }`} />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-semibold text-white/85 truncate group-hover:text-white transition-colors">
                  {inc.title}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-white/35">
                <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                <span className="truncate">{inc.location}</span>
                <span className="flex-shrink-0">·</span>
                <span className="flex-shrink-0">{timeAgo(inc.reportedAt)}</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Badge variant={inc.severity as SeverityLevel} label={inc.severity} />
              <Badge variant={inc.status as IncidentStatus} label={inc.status} className="hidden sm:inline-flex" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
