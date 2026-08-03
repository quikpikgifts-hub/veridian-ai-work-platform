'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, Clock, CheckCircle2 } from 'lucide-react';
import { NewAssessmentButton } from '@/components/portal/PortalShell';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Badge } from '@/components/ui/Badge';
import type { Assessment } from '@/types';

const STATUS_VARIANT: Record<Assessment['status'], 'draft' | 'processing' | 'completed' | 'failed'> = {
  draft: 'draft',
  submitted: 'processing',
  completed: 'completed',
  failed: 'failed',
};

export default function PortalDashboardPage() {
  const [assessments, setAssessments] = useState<Assessment[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/assessments')
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setAssessments(data.assessments);
      })
      .catch(() => setError('Could not load your assessments right now.'));
  }, []);

  const completed = assessments?.filter(a => a.status === 'completed') ?? [];
  const inProgress = assessments?.filter(a => a.status === 'draft' || a.status === 'submitted') ?? [];
  const latestScore = completed[0]?.riskScore;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/65 mb-2">Client Dashboard</p>
          <h1 className="text-2xl font-bold text-[#EEF0F6] tracking-tight">Welcome back</h1>
        </div>
        <NewAssessmentButton />
      </div>

      {assessments === null && !error && (
        <div className="flex justify-center py-16"><LoadingSpinner /></div>
      )}

      {error && (
        <div className="border border-red-500/25 bg-red-500/[0.06] px-4 py-3 text-[12.5px] text-red-400 mb-6">{error}</div>
      )}

      {assessments && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="border border-white/[0.08] bg-[#07080E] p-5">
              <div className="text-[10px] uppercase tracking-[0.14em] text-[#EEF0F6]/40 mb-2">Total Assessments</div>
              <div className="text-2xl font-bold font-mono">{assessments.length}</div>
            </div>
            <div className="border border-white/[0.08] bg-[#07080E] p-5">
              <div className="text-[10px] uppercase tracking-[0.14em] text-[#EEF0F6]/40 mb-2">In Progress</div>
              <div className="text-2xl font-bold font-mono">{inProgress.length}</div>
            </div>
            <div className="border border-white/[0.08] bg-[#07080E] p-5">
              <div className="text-[10px] uppercase tracking-[0.14em] text-[#EEF0F6]/40 mb-2">Latest Risk Score</div>
              <div className="text-2xl font-bold font-mono text-[#C9A84C]">{latestScore !== undefined ? `${latestScore}/10` : '—'}</div>
            </div>
          </div>

          <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#EEF0F6]/60 mb-4">Recent Assessments</h2>

          {assessments.length === 0 ? (
            <div className="border border-white/[0.08] bg-[#07080E] p-10 text-center">
              <FileText className="w-8 h-8 text-[#C9A84C]/40 mx-auto mb-4" aria-hidden />
              <p className="text-[13px] text-[#EEF0F6]/50 mb-6">You haven&apos;t started an assessment yet.</p>
              <NewAssessmentButton />
            </div>
          ) : (
            <div className="border border-white/[0.08] divide-y divide-white/[0.07]">
              {assessments.slice(0, 5).map(a => (
                <Link
                  key={a.id}
                  href={a.status === 'draft' ? `/portal/assessments/new?id=${a.id}` : `/portal/assessments/${a.id}`}
                  className="flex items-center justify-between gap-4 p-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {a.status === 'completed' ? <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" /> : <Clock className="w-4 h-4 text-[#EEF0F6]/30 flex-shrink-0" />}
                    <div className="min-w-0">
                      <div className="text-[12.5px] font-medium text-[#EEF0F6]/85 truncate">{a.companyName}</div>
                      <div className="text-[10.5px] text-[#EEF0F6]/35">{a.industry} &middot; {a.id}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Badge variant={STATUS_VARIANT[a.status]} label={a.status} />
                    <ArrowRight className="w-3.5 h-3.5 text-[#EEF0F6]/25" aria-hidden />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
