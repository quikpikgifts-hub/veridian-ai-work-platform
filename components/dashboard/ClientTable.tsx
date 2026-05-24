import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockClients } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';

export function ClientTable() {
  return (
    <Card goldTop padding="none" className="p-4">
      <CardHeader title="Protected Clients" subtitle={`${mockClients.length} active engagements`} />
      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full min-w-[540px]">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {['Client', 'Industry', 'Risk Score', 'Next Review', 'Incidents', 'Status'].map(h => (
                <th key={h} className="text-left text-[9px] font-bold tracking-[2px] uppercase text-white/30 pb-2.5 pr-3 last:pr-0">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockClients.map((client, i) => (
              <tr
                key={client.id}
                className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <td className="py-2.5 pr-3">
                  <div className="text-[11.5px] font-semibold text-white/85">{client.name}</div>
                  <div className="text-[9.5px] text-white/30 font-mono">{client.id}</div>
                </td>
                <td className="py-2.5 pr-3">
                  <span className="text-[10.5px] text-white/50">{client.industry}</span>
                </td>
                <td className="py-2.5 pr-3">
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1 h-1 bg-white/10 rounded-full max-w-[50px]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(client.riskScore / 10) * 100}%`,
                          background: client.riskScore >= 8 ? '#E74C3C' : client.riskScore >= 6 ? '#E67E22' : '#2ECC71'
                        }}
                      />
                    </div>
                    <span className="text-[10.5px] font-mono font-bold" style={{
                      color: client.riskScore >= 8 ? '#E74C3C' : client.riskScore >= 6 ? '#E67E22' : '#2ECC71'
                    }}>
                      {client.riskScore}
                    </span>
                  </div>
                </td>
                <td className="py-2.5 pr-3">
                  <span className="text-[10.5px] text-white/45">{formatDate(client.nextReview)}</span>
                </td>
                <td className="py-2.5 pr-3">
                  <span className={`text-[11px] font-bold ${client.incidents > 0 ? 'text-orange-400' : 'text-white/30'}`}>
                    {client.incidents}
                  </span>
                </td>
                <td className="py-2.5">
                  <Badge
                    variant={client.status === 'active' ? 'active' : client.status === 'review' ? 'review' : 'grey'}
                    label={client.status}
                    dot={client.status === 'active'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
