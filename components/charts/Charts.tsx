'use client';

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Card, CardHeader } from '@/components/ui/Card';
import { incidentTrendData, riskByIndustryData, threatCategoryData } from '@/lib/mock-data';

const chartColors = {
  gold: '#C9A84C',
  red: '#E74C3C',
  blue: '#3498DB',
  green: '#2ECC71',
  grid: 'rgba(255,255,255,0.04)',
  text: 'rgba(255,255,255,0.4)',
};

const tooltipStyle = {
  backgroundColor: '#131320',
  border: '1px solid rgba(201,168,76,0.25)',
  borderRadius: '3px',
  color: '#F4F4EE',
  fontSize: '11px',
};

export function IncidentTrendChart() {
  return (
    <Card goldTop padding="none" className="p-4">
      <CardHeader title="Incident Trend" subtitle="Last 7 months" />
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={incidentTrendData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
          <defs>
            <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E74C3C" stopOpacity={0.25}/>
              <stop offset="95%" stopColor="#E74C3C" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="resGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2ECC71" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#2ECC71" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid stroke={chartColors.grid} vertical={false} />
          <XAxis dataKey="month" tick={{ fill: chartColors.text, fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: chartColors.text, fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'rgba(201,168,76,0.2)' }} />
          <Area type="monotone" dataKey="incidents" stroke="#E74C3C" strokeWidth={2} fill="url(#incGrad)" name="Incidents" />
          <Area type="monotone" dataKey="resolved" stroke="#2ECC71" strokeWidth={2} fill="url(#resGrad)" name="Resolved" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function RiskByIndustryChart() {
  return (
    <Card goldTop padding="none" className="p-4">
      <CardHeader title="Risk Score by Industry" subtitle="Current portfolio" />
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={riskByIndustryData} margin={{ top: 5, right: 5, left: -25, bottom: 40 }} layout="vertical">
          <CartesianGrid stroke={chartColors.grid} horizontal={false} />
          <XAxis type="number" domain={[0, 10]} tick={{ fill: chartColors.text, fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis dataKey="name" type="category" tick={{ fill: chartColors.text, fontSize: 9 }} axisLine={false} tickLine={false} width={70} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="risk" name="Risk Score" radius={[0, 2, 2, 0]}>
            {riskByIndustryData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function ThreatCategoryChart() {
  return (
    <Card goldTop padding="none" className="p-4">
      <CardHeader title="Threat Categories" subtitle="Distribution" />
      <div className="flex items-center gap-4">
        <ResponsiveContainer width="50%" height={160}>
          <PieChart>
            <Pie data={threatCategoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
              {threatCategoryData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} opacity={0.85} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-1.5">
          {threatCategoryData.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: item.fill }} />
                <span className="text-white/55 truncate">{item.name}</span>
              </div>
              <span className="text-white/70 font-mono font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
