import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { CREDENTIALS, INDUSTRIES } from '@/lib/site-content';
import { PLATFORM, FOUNDERS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: `${PLATFORM.company} — operational risk consulting built on real field leadership experience, not generic checklists.`,
  alternates: { canonical: '/about' },
};

const LEADERSHIP = [FOUNDERS.steve, FOUNDERS.skeeter];

export default function AboutPage() {
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
              About Veridian
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#EEF0F6] tracking-tight leading-snug max-w-2xl mb-5">
              Practical, results-driven consulting built on real operational leadership.
            </h1>
            <p className="text-sm sm:text-base text-[#EEF0F6]/50 max-w-2xl leading-relaxed">
              {PLATFORM.company} was founded in {PLATFORM.founded} to bring field-tested
              operational risk expertise — not generic compliance templates — to organizations
              in Central Florida and beyond.
            </p>
          </div>
        </section>

        {/* Leadership */}
        <section className="border-b border-white/[0.06]">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="mb-12 lg:mb-14">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/65 mb-3.5">
                Leadership
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#EEF0F6] tracking-tight leading-snug max-w-lg">
                Led by practitioners, not consultants who&apos;ve only read about the field.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {LEADERSHIP.map(person => (
                <div
                  key={person.name}
                  className="border border-white/[0.07] bg-[#07080E] p-7 lg:p-8"
                >
                  <h3 className="text-[15px] font-bold text-[#EEF0F6] mb-1">
                    {person.name}
                  </h3>
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#C9A84C]/60 mb-4">
                    {person.title}
                  </p>
                  <p className="text-[12.5px] text-[#EEF0F6]/50 leading-[1.8] mb-5">
                    {person.experience}
                  </p>
                  <ul className="space-y-2">
                    {person.certs.map(cert => (
                      <li key={cert} className="flex items-start gap-2.5">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 text-[#C9A84C]/50 flex-shrink-0" aria-hidden="true" />
                        <span className="text-[11.5px] text-[#EEF0F6]/45 leading-snug">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Credentials + Industries */}
        <section className="bg-[#07080E] border-b border-white/[0.06]">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 xl:gap-24">

              <div className="flex-1 mb-12 lg:mb-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/65 mb-4">
                  Certifications &amp; Credentials
                </p>
                <ul aria-label="Certifications and credentials" className="space-y-3.5">
                  {CREDENTIALS.map(c => (
                    <li key={c} className="flex items-start gap-3">
                      <CheckCircle aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 text-[#C9A84C]/50 flex-shrink-0" />
                      <span className="text-[12px] text-[#EEF0F6]/50 leading-[1.6]">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div aria-hidden="true" className="hidden lg:block w-px bg-white/[0.07] self-stretch" />
              <div aria-hidden="true" className="lg:hidden h-px bg-white/[0.07] mb-12" />

              <div className="flex-1 lg:max-w-sm xl:max-w-md">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/65 mb-4">
                  Industries Served
                </p>
                <ul aria-label="Industries served" className="flex flex-wrap gap-2">
                  {INDUSTRIES.map(ind => (
                    <li key={ind}>
                      <span className="inline-block text-[11px] font-medium text-[#EEF0F6]/50 border border-white/[0.1] hover:border-[#C9A84C]/30 hover:text-[#EEF0F6]/70 px-3.5 py-1.5 transition-colors cursor-default leading-none">
                        {ind}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#EEF0F6] tracking-tight leading-snug mb-8 max-w-lg mx-auto">
              Ready to work with a team that&apos;s done the job in the field?
            </h2>
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center gap-2.5 bg-[#C9A84C] hover:bg-[#D4B560] text-[#03040A] text-[11px] font-bold uppercase tracking-[0.13em] px-8 py-3.5 transition-colors"
            >
              Schedule a Consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
