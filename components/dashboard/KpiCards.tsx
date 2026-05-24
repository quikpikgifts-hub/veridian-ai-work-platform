import { Card } from '@/components/ui/Card';
import { mockKpis } from '@/lib/mock-data';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function KpiCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {mockKpis.map((kpi, i) => (
        <Card key={i} hover goldTop padding="md" className="relative overflow-hidden">
          {/* Background glow */}
          <div className={cn(
            'absolute inset-0 opacity-[0.03]',
            kpi.positive ? 'bg-green-500' : 'bg-red-500'
          )} />

          <div className="relative">
            <div className="text-[9px] font-bold tracking-[2.5px] uppercase text-white/40 mb-2">
              {kpi.label}
            </div>
            <div className="text-3xl font-bold text-white font-mono leading-none mb-2">
              {kpi.value}
            </div>
            <div className={cn(
              'flex items-center gap-1 text-[10px] font-medium',
              kpi.positive ? 'text-green-400' : 'text-red-400',
              kpi.trend === 'flat' && 'text-white/40'
            )}>
              {kpi.trend === 'up' && <TrendingUp className="w-3 h-3" />}
              {kpi.trend === 'down' && <TrendingDown className="w-3 h-3" />}
              {kpi.trend === 'flat' && <Minus className="w-3 h-3" />}
              <span>{kpi.change}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
