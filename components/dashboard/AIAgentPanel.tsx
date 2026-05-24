'use client';

import { useState } from 'react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockAIAgents } from '@/lib/mock-data';
import { Cpu, Zap, Send, X, Loader2 } from 'lucide-react';

const agentMap: Record<string, string> = {
  '1': 'intake', '2': 'risk-analyst', '3': 'proposal-writer',
  '4': 'intelligence-analyst', '5': 'follow-up', '6': 'marketing',
};

export function AIAgentPanel() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const runAgent = async () => {
    if (!task.trim() || !activeAgent) return;
    setLoading(true); setOutput(''); setError('');
    try {
      const agent = mockAIAgents.find(a => a.id === activeAgent);
      const res = await fetch('/api/ai-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent: agentMap[activeAgent] || 'operations', task }),
      });
      const data = await res.json();
      if (data.success) setOutput(data.output);
      else setError(data.error || 'Agent task failed.');
    } catch {
      setError('Connection error. Check API key in Vercel settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card goldTop padding="none" className="p-4">
      <CardHeader
        title="AI Workforce"
        subtitle="7 agents operational"
        action={
          <div className="flex items-center gap-1.5 text-[9px] text-green-400 bg-green-500/10 border border-green-500/25 px-2 py-1 rounded-[2px]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />LIVE
          </div>
        }
      />

      {/* Agent list */}
      <div className="space-y-1.5 mb-3">
        {mockAIAgents.map(agent => (
          <button
            key={agent.id}
            onClick={() => { setActiveAgent(activeAgent === agent.id ? null : agent.id); setOutput(''); setError(''); setTask(''); }}
            className={`w-full flex items-center gap-3 p-2.5 rounded-[2px] border transition-all text-left ${
              activeAgent === agent.id
                ? 'bg-amber-500/10 border-amber-500/40'
                : 'bg-[#0D0D18] border-white/[0.05] hover:border-amber-500/20'
            }`}
          >
            <div className="w-7 h-7 rounded-[2px] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
              {agent.status === 'processing'
                ? <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                : <Cpu className="w-3.5 h-3.5 text-amber-400/70" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-semibold text-white/85 leading-tight">{agent.name}</div>
              <div className="text-[9.5px] text-white/35 truncate mt-0.5">{agent.lastAction}</div>
            </div>
            <Badge variant={agent.status as 'active'|'standby'|'processing'} label={agent.status} dot={agent.status==='active'} />
          </button>
        ))}
      </div>

      {/* Active agent task input */}
      {activeAgent && (
        <div className="border-t border-white/[0.06] pt-3 space-y-2">
          <div className="text-[9px] font-bold tracking-[2px] uppercase text-amber-400 mb-1">
            {mockAIAgents.find(a=>a.id===activeAgent)?.name} — Task Input
          </div>
          <textarea
            value={task}
            onChange={e => setTask(e.target.value)}
            placeholder="Describe the task for this agent..."
            rows={2}
            className="w-full bg-[#131320] border border-white/[0.08] text-white text-[11px] px-3 py-2 rounded-[2px] focus:outline-none focus:border-amber-500/40 resize-none placeholder:text-white/20"
          />
          <div className="flex gap-2">
            <button
              onClick={runAgent}
              disabled={loading || !task.trim()}
              className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black text-[10px] font-bold tracking-[1.5px] uppercase py-2 rounded-[2px] transition-all"
            >
              {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Processing...</> : <><Send className="w-3.5 h-3.5" />Run Agent</>}
            </button>
            <button onClick={() => { setActiveAgent(null); setOutput(''); setError(''); setTask(''); }}
              className="p-2 text-white/30 hover:text-white/60 border border-white/10 rounded-[2px]">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          {output && (
            <div className="bg-[#0D0D18] border border-amber-500/20 rounded-[2px] p-3 mt-2">
              <div className="text-[8.5px] font-bold tracking-[2px] uppercase text-amber-400 mb-2">AI Draft — Steve Review Required</div>
              <div className="text-[10.5px] text-white/70 leading-relaxed whitespace-pre-wrap">{output}</div>
            </div>
          )}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-[2px] p-2.5 text-[10px] text-red-400">{error}</div>
          )}
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-white/[0.05] flex items-center justify-between">
        <span className="text-[9.5px] text-white/30">All outputs require founder review before delivery</span>
        <span className="text-[9.5px] text-amber-400/60 font-medium">Steve Smith · Final Authority</span>
      </div>
    </Card>
  );
}
