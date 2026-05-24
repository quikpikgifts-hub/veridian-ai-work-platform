'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockAIAgents } from '@/lib/mock-data';
import { User, Bell, Shield, Cpu, Lock, Building2, ChevronRight, Check } from 'lucide-react';

const tabs = ['Profile', 'Notifications', 'AI Agents', 'Security', 'Organization'] as const;
type Tab = typeof tabs[number];

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative w-9 h-5 rounded-full transition-colors ${on ? 'bg-amber-500' : 'bg-white/10'}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? 'left-4' : 'left-0.5'}`} />
    </button>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('Profile');
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Sidebar>
      <div className="p-4 md:p-6 animate-fade-in">
        <div className="mb-5">
          <div className="text-[9px] font-bold tracking-[4px] uppercase text-amber-400/70 mb-1">Configuration</div>
          <h1 className="text-[22px] md:text-[26px] font-bold text-white">Settings</h1>
          <p className="text-[11px] text-white/35 mt-1">Manage your platform preferences and configuration</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-white/[0.07] mb-5 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-semibold tracking-wide transition-all whitespace-nowrap border-b-2 ${
                tab === t
                  ? 'text-amber-400 border-amber-500'
                  : 'text-white/40 border-transparent hover:text-white/70 hover:border-white/20'
              }`}
            >
              {t === 'Profile' && <User className="w-3.5 h-3.5" />}
              {t === 'Notifications' && <Bell className="w-3.5 h-3.5" />}
              {t === 'AI Agents' && <Cpu className="w-3.5 h-3.5" />}
              {t === 'Security' && <Lock className="w-3.5 h-3.5" />}
              {t === 'Organization' && <Building2 className="w-3.5 h-3.5" />}
              {t}
            </button>
          ))}
        </div>

        {/* PROFILE */}
        {tab === 'Profile' && (
          <div className="space-y-4 max-w-2xl">
            <Card padding="md">
              <CardHeader title="Founder Profile" />
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-white">Steve Washington Smith</div>
                  <div className="text-[11px] text-white/40">Founder & Senior Risk Consultant</div>
                  <div className="text-[10px] text-amber-400/60 mt-0.5">Final Operational Authority</div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { label: 'Full Name', value: 'Steve Washington Smith' },
                  { label: 'Title', value: 'Founder & Senior Risk Consultant' },
                  { label: 'Email', value: 'steve@veridianriskgroup.com' },
                  { label: 'Phone', value: '+1 (321) 257-4492' },
                  { label: 'Service Area', value: 'Central Florida + Nationwide' },
                  { label: 'Experience', value: 'Nearly 30 Years' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-[9px] font-bold tracking-[2px] uppercase text-white/35 mb-1">{f.label}</label>
                    <input
                      defaultValue={f.value}
                      className="w-full bg-[#0D0D18] border border-white/[0.08] text-white text-[12px] px-3 py-2 rounded-[2px] focus:outline-none focus:border-amber-500/40 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </Card>
            <div className="flex justify-end">
              <Button variant="primary" onClick={save}>
                {saved ? <><Check className="w-3.5 h-3.5" />Saved!</> : 'Save Changes'}
              </Button>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS */}
        {tab === 'Notifications' && (
          <div className="space-y-3 max-w-2xl">
            <Card padding="md">
              <CardHeader title="Alert Preferences" />
              <div className="space-y-3">
                {[
                  { label: 'Critical Incident Alerts', desc: 'Immediate SMS + email for critical severity', on: true },
                  { label: 'New Threat Intelligence', desc: 'Daily intelligence briefing digest', on: true },
                  { label: 'AI Agent Completions', desc: 'Notify when AI drafts are ready for review', on: true },
                  { label: 'Client Review Reminders', desc: 'Quarterly review and reassessment alerts', on: true },
                  { label: 'New Lead Notifications', desc: 'When new prospects submit intake forms', on: true },
                  { label: 'Weekly Operations Summary', desc: 'Automated weekly performance digest', on: false },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-white/[0.05] last:border-0">
                    <div>
                      <div className="text-[12px] font-semibold text-white/80">{item.label}</div>
                      <div className="text-[10.5px] text-white/35 mt-0.5">{item.desc}</div>
                    </div>
                    <Toggle defaultOn={item.on} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* AI AGENTS */}
        {tab === 'AI Agents' && (
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-start gap-3 bg-amber-500/8 border border-amber-500/20 p-3 mb-4 rounded-[2px]">
              <Shield className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-[11px] text-amber-200/65 leading-relaxed">
                <strong className="text-amber-400">Authority Lock Active.</strong> All AI agents operate under Steve Smith's authority. No agent delivers client-facing content without explicit founder approval.
              </div>
            </div>
            {mockAIAgents.map(agent => (
              <Card key={agent.id} padding="md" hover>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/20 rounded-[2px] flex items-center justify-center">
                      <Cpu className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-white/85">{agent.name}</div>
                      <div className="text-[10px] text-white/35">{agent.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/30 font-mono hidden sm:block">{agent.tasksToday} tasks today</span>
                    <Badge
                      variant={agent.status as 'active' | 'standby' | 'processing'}
                      label={agent.status}
                      dot={agent.status === 'active'}
                    />
                    <Toggle defaultOn={agent.status !== 'standby'} />
                  </div>
                </div>
                {agent.lastAction && (
                  <div className="mt-2 pt-2 border-t border-white/[0.05] text-[10px] text-white/30">
                    Last: {agent.lastAction}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* SECURITY */}
        {tab === 'Security' && (
          <div className="space-y-4 max-w-2xl">
            <Card padding="md">
              <CardHeader title="Authentication" />
              <div className="space-y-3">
                {[
                  { label: 'Two-Factor Authentication', desc: 'Require 2FA on every login', on: true },
                  { label: 'Session Timeout', desc: 'Auto-logout after 30 minutes of inactivity', on: true },
                  { label: 'Login Notifications', desc: 'Email alert on new device logins', on: true },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-white/[0.05] last:border-0">
                    <div>
                      <div className="text-[12px] font-semibold text-white/80">{item.label}</div>
                      <div className="text-[10.5px] text-white/35 mt-0.5">{item.desc}</div>
                    </div>
                    <Toggle defaultOn={item.on} />
                  </div>
                ))}
              </div>
            </Card>
            <Card padding="md">
              <CardHeader title="Change Password" />
              <div className="space-y-3">
                {['Current Password', 'New Password', 'Confirm New Password'].map(f => (
                  <div key={f}>
                    <label className="block text-[9px] font-bold tracking-[2px] uppercase text-white/35 mb-1">{f}</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#0D0D18] border border-white/[0.08] text-white text-[12px] px-3 py-2 rounded-[2px] focus:outline-none focus:border-amber-500/40 transition-colors placeholder:text-white/20"
                    />
                  </div>
                ))}
                <Button variant="primary" size="md">Update Password</Button>
              </div>
            </Card>
          </div>
        )}

        {/* ORGANIZATION */}
        {tab === 'Organization' && (
          <div className="space-y-4 max-w-2xl">
            <Card padding="md">
              <CardHeader title="Veridian Risk Group" />
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { label: 'Company Name', value: 'Veridian Risk Group' },
                  { label: 'Website', value: 'veridianriskgroup.com' },
                  { label: 'Primary Email', value: 'apexriskadvisor@gmail.com' },
                  { label: 'Phone', value: '+1 (321) 257-4492' },
                  { label: 'Service Area', value: 'Central Florida + Nationwide' },
                  { label: 'Business Type', value: 'Operational Risk Consulting LLC' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-[9px] font-bold tracking-[2px] uppercase text-white/35 mb-1">{f.label}</label>
                    <input
                      defaultValue={f.value}
                      className="w-full bg-[#0D0D18] border border-white/[0.08] text-white text-[12px] px-3 py-2 rounded-[2px] focus:outline-none focus:border-amber-500/40 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </Card>
            <div className="flex justify-end">
              <Button variant="primary" onClick={save}>
                {saved ? <><Check className="w-3.5 h-3.5" />Saved!</> : 'Save Changes'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
}
