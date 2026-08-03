import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SERVICES, PROCESS_STEPS } from '@/lib/site-content';
import { PLATFORM } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Operational risk assessments, OSHA compliance, fleet safety, incident documentation, threat monitoring, and executive reporting for complex business environments.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <div className="bg-[#04050A] text-[#EEF0F6] antialiased overflow-x-hidden">
      <SiteHeader />

      <main id="main-content">

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/[0.06]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
              backgroundSize: '96px 96px',
            }}
          />
          <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/65 mb-4">
              Services
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#EEF0F6] tracking-tight leading-snug max-w-2xl mb-4">
              Structured consulting. {SERVICES.length} practice areas. One integrated approach.
            </h1>
            <p className="text-sm sm:text-base text-[#EEF0F6]/50 max-w-xl leading-relaxed">
              Every engagement is scoped to your specific operational environment — delivered by
              consultants with direct field experience, not generic checklists.
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section className="border-b border-white/[0.06]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.055]">
            {SERVICES.map(({ Icon, title, body }) => (
              <article
                key={title}
                className="group bg-[#07080E] hover:bg-[#0A0B14] transition-colors p-7 lg:p-8"
              >
                <div
                  aria-hidden="true"
                  className="mb-5 inline-flex h-10 w-10 items-center justify-center border border-[#C9A84C]/20 bg-[#C9A84C]/[0.07]"
                >
                  <Icon className="h-[17px] w-[17px] text-[#C9A84C]" />
                </div>
                <h2 className="mb-3 text-[13.5px] font-bold text-[#EEF0F6] leading-snug">
                  {title}
                </h2>
                <p className="text-[12px] text-[#EEF0F6]/42 leading-[1.8]">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="bg-[#07080E] border-b border-white/[0.06]">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="mb-12 lg:mb-14">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/65 mb-3.5">
                How It Works
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#EEF0F6] tracking-tight leading-snug max-w-lg">
                From first call to final report — in four steps.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS_STEPS.map(({ step, title, body }) => (
                <div key={step} className="border border-white/[0.07] bg-[#0A0B14] p-6">
                  <span className="text-[11px] font-bold font-mono text-[#C9A84C]/40 tabular-nums">
                    {step}
                  </span>
                  <h3 className="mt-3 mb-2 text-[13px] font-bold text-[#EEF0F6]/90 leading-snug">
                    {title}
                  </h3>
                  <p className="text-[12px] text-[#EEF0F6]/40 leading-[1.7]">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-b border-white/[0.06]">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/65 mb-4">
              Not sure which service you need?
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#EEF0F6] tracking-tight leading-snug mb-8 max-w-lg mx-auto">
              Start with a no-obligation discovery call.
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center gap-2.5 bg-[#C9A84C] hover:bg-[#D4B560] text-[#03040A] text-[11px] font-bold uppercase tracking-[0.13em] px-8 py-3.5 transition-colors"
              >
                Schedule a Consultation
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={`tel:${PLATFORM.phone.replace(/[^+\d]/g, '')}`}
                className="inline-flex items-center justify-center gap-2.5 border border-white/18 hover:border-white/28 text-[#EEF0F6]/55 hover:text-[#EEF0F6]/80 text-[11px] font-semibold uppercase tracking-[0.1em] px-7 py-3.5 transition-all"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                {PLATFORM.phone}
              </a>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
