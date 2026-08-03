'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Loader2, Send } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ASSESSMENT_SECTIONS } from '@/lib/assessment-content';
import { INDUSTRIES } from '@/lib/site-content';
import type { Assessment } from '@/types';

const inputCls =
  'w-full bg-white/[0.04] border border-white/[0.1] text-[#EEF0F6] text-[13px] px-3.5 py-2.5 ' +
  'outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20 placeholder:text-white/20 transition-colors';

// Step 0 = intake (company/industry), steps 1..N = one per assessment section
const TOTAL_STEPS = ASSESSMENT_SECTIONS.length + 1;

function Wizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const existingId = searchParams.get('id');

  const [loading, setLoading] = useState(Boolean(existingId));
  const [assessmentId, setAssessmentId] = useState<string | null>(existingId);
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [step, setStep] = useState(existingId ? 1 : 0);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!existingId) return;
    fetch(`/api/assessments/${existingId}`)
      .then(res => res.json())
      .then((data: { assessment?: Assessment; error?: string }) => {
        if (data.error || !data.assessment) {
          setError(data.error ?? 'Assessment not found.');
        } else {
          setCompanyName(data.assessment.companyName);
          setIndustry(data.assessment.industry);
          setResponses(data.assessment.responses);
        }
        setLoading(false);
      })
      .catch(() => { setError('Could not load this assessment.'); setLoading(false); });
  }, [existingId]);

  async function handleStartIntake() {
    if (!companyName.trim() || !industry) {
      setError('Company name and industry are required.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, industry }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Could not start assessment.'); return; }
      setAssessmentId(data.assessment.id);
      setStep(1);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function saveCurrentSection(): Promise<boolean> {
    if (!assessmentId) return true;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/assessments/${assessmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Could not save your answers.'); return false; }
      return true;
    } catch {
      setError('Network error while saving. Please try again.');
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function handleNext() {
    const ok = await saveCurrentSection();
    if (ok) setStep(s => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function handleBack() {
    setError(null);
    setStep(s => Math.max(s - 1, 0));
  }

  async function handleSubmitFinal() {
    if (!assessmentId) return;
    const savedOk = await saveCurrentSection();
    if (!savedOk) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/assessments/${assessmentId}/submit`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Could not generate your summary.'); setSubmitting(false); return; }
      router.push(`/portal/assessments/${assessmentId}`);
    } catch {
      setError('Network error. Your answers are saved — try submitting again.');
      setSubmitting(false);
    }
  }

  if (loading) return <div className="flex justify-center py-16"><LoadingSpinner /></div>;

  const sectionIndex = step - 1;
  const section = sectionIndex >= 0 ? ASSESSMENT_SECTIONS[sectionIndex] : null;
  const isReviewStep = step === TOTAL_STEPS - 1 && section === ASSESSMENT_SECTIONS[ASSESSMENT_SECTIONS.length - 1];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/65 mb-2">
          Assessment Wizard &middot; Step {step + 1} of {TOTAL_STEPS}
        </p>
        <div className="h-1 bg-white/[0.07] rounded-full overflow-hidden">
          <div className="h-full bg-[#C9A84C] transition-all" style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }} />
        </div>
      </div>

      {step === 0 && (
        <div className="border border-white/[0.08] bg-[#07080E] p-7 space-y-5">
          <h1 className="text-xl font-bold text-[#EEF0F6]">Tell us about your organization</h1>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#EEF0F6]/50 mb-1.5">Company Name</label>
            <input className={inputCls} value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Acme Logistics, LLC" />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#EEF0F6]/50 mb-1.5">Industry</label>
            <select className={inputCls + ' bg-[#06070E]'} value={industry} onChange={e => setIndustry(e.target.value)}>
              <option value="" disabled>Select industry…</option>
              {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          {error && <div className="border border-red-500/25 bg-red-500/[0.06] px-4 py-3 text-[12px] text-red-400">{error}</div>}
          <button
            onClick={handleStartIntake}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#D4B560] disabled:opacity-60 text-[#03040A] text-[11px] font-bold uppercase tracking-[0.12em] px-6 py-3 transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Start Assessment <ArrowRight className="w-3.5 h-3.5" /></>}
          </button>
        </div>
      )}

      {section && (
        <div className="border border-white/[0.08] bg-[#07080E] p-7 space-y-6">
          <div>
            <h1 className="text-xl font-bold text-[#EEF0F6] mb-1">{section.title}</h1>
            <p className="text-[12.5px] text-[#EEF0F6]/45">{section.description}</p>
          </div>

          <div className="space-y-6">
            {section.questions.map(q => (
              <div key={q.id}>
                <label className="block text-[12.5px] font-medium text-[#EEF0F6]/85 mb-1.5">
                  {q.prompt}
                  {q.citation && <span className="ml-2 text-[10px] font-mono text-[#C9A84C]/50">{q.citation}</span>}
                </label>
                {q.helpText && <p className="text-[10.5px] text-[#EEF0F6]/30 mb-2">{q.helpText}</p>}

                {q.type === 'yesno' && (
                  <div className="flex gap-2">
                    {(['Yes', 'No', 'N/A'] as const).map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setResponses(r => ({ ...r, [q.id]: opt }))}
                        className={[
                          'px-4 py-2 border text-[11.5px] font-semibold transition-all',
                          responses[q.id] === opt
                            ? 'border-[#C9A84C]/40 bg-[#C9A84C]/[0.08] text-[#C9A84C]'
                            : 'border-white/[0.1] text-[#EEF0F6]/45 hover:border-white/25',
                        ].join(' ')}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {q.type === 'scale' && (
                  <div className="flex gap-1.5">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setResponses(r => ({ ...r, [q.id]: String(n) }))}
                        className={[
                          'w-8 h-8 border text-[11px] font-bold transition-all',
                          responses[q.id] === String(n)
                            ? 'border-[#C9A84C]/40 bg-[#C9A84C]/[0.08] text-[#C9A84C]'
                            : 'border-white/[0.1] text-[#EEF0F6]/40 hover:border-white/25',
                        ].join(' ')}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                )}

                {q.type === 'text' && (
                  <textarea
                    rows={3}
                    className={inputCls + ' resize-none'}
                    value={responses[q.id] ?? ''}
                    onChange={e => setResponses(r => ({ ...r, [q.id]: e.target.value }))}
                    placeholder="Your answer…"
                  />
                )}
              </div>
            ))}
          </div>

          {error && <div className="border border-red-500/25 bg-red-500/[0.06] px-4 py-3 text-[12px] text-red-400">{error}</div>}

          <div className="flex items-center justify-between pt-2">
            <button onClick={handleBack} className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#EEF0F6]/40 hover:text-[#EEF0F6]/70 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            {isReviewStep ? (
              <button
                onClick={handleSubmitFinal}
                disabled={submitting || saving}
                className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#D4B560] disabled:opacity-60 text-[#03040A] text-[11px] font-bold uppercase tracking-[0.12em] px-6 py-3 transition-colors"
              >
                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating summary…</> : <><Send className="w-3.5 h-3.5" /> Submit for AI Summary</>}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#D4B560] disabled:opacity-60 text-[#03040A] text-[11px] font-bold uppercase tracking-[0.12em] px-6 py-3 transition-colors"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Next <ArrowRight className="w-3.5 h-3.5" /></>}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function NewAssessmentPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-16"><LoadingSpinner /></div>}>
      <Wizard />
    </Suspense>
  );
}
