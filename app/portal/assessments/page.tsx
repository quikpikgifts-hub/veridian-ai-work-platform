'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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

export default function AssessmentHistoryPage() {
  const [assessments, setAssessments] = useState<Assessment[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/assessments')
      .then(res => res.json())
      .then(data => (data.error ? setError(data.error) : setAssessments(data.assessments)))
      .catch(() => setError('Could not load your assessments right now.'));
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/65 mb-2">Assessment History</p>
          <h1 className="text-2xl font-bold text-[#EEF0F6] tracking-tight">Your assessments</h1>
        </div>
        <NewAssessmentButton />
      </div>

      {assessments === null && !error && <div className="flex justify-center py-16"><LoadingSpinner /></div>}
      {error && <div className="border border-red-500/25 bg-red-500/[0.06] px-4 py-3 text-[12.5px] text-red-400">{error}</div>}

      {assessments && assessments.length === 0 && (
        <div className="border border-white/[0.08] bg-[#07080E] p-10 text-center">
          <p className="text-[13px] text-[#EEF0F6]/50 mb-6">No assessments yet.</p>
          <NewAssessmentButton />
        </div>
      )}

      {assessments && assessments.length > 0 && (
        <div className="border border-white/[0.08] divide-y divide-white/[0.07]">
          {assessments.map(a => (
            <Link
              key={a.id}
              href={a.status === 'draft' ? `/portal/assessments/new?id=${a.id}` : `/portal/assessments/${a.id}`}
              className="flex items-center justify-between gap-4 p-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="min-w-0">
                <div className="text-[12.5px] font-medium text-[#EEF0F6]/85 truncate">{a.companyName}</div>
                <div className="text-[10.5px] text-[#EEF0F6]/35">
                  {a.industry} &middot; {a.id} &middot; {new Date(a.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {a.riskScore !== undefined && (
                  <span className="text-[12px] font-mono font-bold text-[#C9A84C]">{a.riskScore}/10</span>
                )}
                <Badge variant={STATUS_VARIANT[a.status]} label={a.status} />
                <ArrowRight className="w-3.5 h-3.5 text-[#EEF0F6]/25" aria-hidden />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
