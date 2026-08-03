'use client';

import { useEffect, useState, use as usePromise } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, Loader2, CheckCircle2 } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Badge } from '@/components/ui/Badge';
import type { Assessment } from '@/types';

const STATUS_VARIANT: Record<Assessment['status'], 'draft' | 'processing' | 'completed' | 'failed'> = {
  draft: 'draft',
  submitted: 'processing',
  completed: 'completed',
  failed: 'failed',
};

export default function AssessmentResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = usePromise(params);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);

  function load() {
    fetch(`/api/assessments/${id}`)
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) setError(data.error ?? 'Assessment not found.');
        else setAssessment(data.assessment);
      })
      .catch(() => setError('Could not load this assessment.'));
  }

  useEffect(() => { load(); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleRetry() {
    setRetrying(true);
    setError(null);
    try {
      const res = await fetch(`/api/assessments/${id}/submit`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Retry failed.'); return; }
      setAssessment(data.assessment);
    } catch {
      setError('Network error during retry.');
    } finally {
      setRetrying(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/portal/assessments" className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#EEF0F6]/40 hover:text-[#EEF0F6]/70 transition-colors mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> All Assessments
      </Link>

      {!assessment && !error && <div className="flex justify-center py-16"><LoadingSpinner /></div>}
      {error && <div className="border border-red-500/25 bg-red-500/[0.06] px-4 py-3 text-[12.5px] text-red-400">{error}</div>}

      {assessment && (
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/65 mb-2">{assessment.id}</p>
              <h1 className="text-2xl font-bold text-[#EEF0F6] tracking-tight">{assessment.companyName}</h1>
              <p className="text-[12.5px] text-[#EEF0F6]/40 mt-1">{assessment.industry}</p>
            </div>
            <Badge variant={STATUS_VARIANT[assessment.status]} label={assessment.status} />
          </div>

          {assessment.status === 'submitted' && (
            <div className="border border-white/[0.08] bg-[#07080E] p-8 text-center">
              <Loader2 className="w-6 h-6 text-[#C9A84C] animate-spin mx-auto mb-4" />
              <p className="text-[13px] text-[#EEF0F6]/55">Generating your AI summary — this usually takes a few seconds. Refresh to check.</p>
            </div>
          )}

          {assessment.status === 'failed' && (
            <div className="border border-red-500/25 bg-red-500/[0.05] p-8 text-center">
              <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-4" />
              <p className="text-[13px] text-[#EEF0F6]/60 mb-5">We couldn&apos;t generate your summary. Your answers were saved.</p>
              <button
                onClick={handleRetry}
                disabled={retrying}
                className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#D4B560] disabled:opacity-60 text-[#03040A] text-[11px] font-bold uppercase tracking-[0.12em] px-6 py-3 transition-colors"
              >
                {retrying ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Try Again'}
              </button>
            </div>
          )}

          {assessment.status === 'completed' && (
            <>
              <div className="border border-white/[0.08] bg-[#07080E] p-7">
                <div className="flex items-center gap-3 mb-5">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#EEF0F6]/70">Risk Score</h2>
                  <span className="ml-auto text-2xl font-bold font-mono text-[#C9A84C]">{assessment.riskScore}/10</span>
                </div>
                <div className="h-2 bg-white/[0.07] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500"
                    style={{ width: `${((assessment.riskScore ?? 0) / 10) * 100}%` }}
                  />
                </div>
              </div>

              <div className="border border-white/[0.08] bg-[#07080E] p-7">
                <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#EEF0F6]/70 mb-4">AI-Generated Summary</h2>
                <div className="text-[13px] text-[#EEF0F6]/65 leading-[1.8] whitespace-pre-wrap">{assessment.aiSummary}</div>
              </div>

              {assessment.recommendations && assessment.recommendations.length > 0 && (
                <div className="border border-white/[0.08] bg-[#07080E] p-7">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#EEF0F6]/70 mb-4">Recommendations</h2>
                  <ul className="space-y-3">
                    {assessment.recommendations.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-[12.5px] text-[#EEF0F6]/60 leading-relaxed">
                        <span className="text-[#C9A84C] font-mono text-[11px] mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
