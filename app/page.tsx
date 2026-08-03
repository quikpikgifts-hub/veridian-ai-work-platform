import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SERVICES, INDUSTRIES, CREDENTIALS, PLATFORM_FEATURES } from '@/lib/site-content';

/* ─────────────────────────────────────────────────────────────
   VERIDIAN RISK GROUP
   Enterprise Operational Risk & Consulting Platform
   Redesigned: Tailwind-first · Responsive · Accessible
   ───────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Veridian Risk Group — Operational Risk & Resilience Consulting',
  alternates: { canonical: '/' },
};

// ══════════════════════════════════════════════════════════════════
//  PAGE
// ══════════════════════════════════════════════════════════════════
export default function HomePage() {
  return (
    <div className="bg-[#04050A] text-[#EEF0F6] antialiased overflow-x-hidden">

      <SiteHeader />

      <main id="main-content">

        {/* ───────────────────────────────────────────────────────
            SECTION 1 — HERO
            ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="hero-heading" className="relative overflow-hidden border-b border-white/[0.06]">

          {/* Subtle radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 70% 50% at 10% 65%, rgba(201,168,76,0.038), transparent)',
            }}
          />
          {/* Tactical grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
              backgroundSize: '96px 96px',
            }}
          />

          <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
            <div className="max-w-2xl lg:max-w-3xl">

              {/* Eyebrow */}
              <p className="inline-flex items-center gap-2.5 border border-[#C9A84C]/22 bg-[#C9A84C]/[0.06] px-3.5 py-1.5 mb-8 text-[9px] font-bold uppercase tracking-[0.26em] text-[#C9A84C]/70">
                <span aria-hidden="true" className="block w-1.5 h-1.5 rounded-full bg-[#C9A84C]/70 flex-shrink-0" />
                Central Florida &amp; Nationwide Consulting
              </p>

              {/* Headline */}
              <h1
                id="hero-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-[#EEF0F6] mb-5"
              >
                Operational Risk Management<br className="hidden sm:block" />
                <span
                  className="block sm:inline"
                  style={{
                    background: 'linear-gradient(135deg, #E8D5A3 0%, #C9A84C 50%, #9A7830 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {' '}for Modern Organizations.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-[#EEF0F6]/55 leading-relaxed mb-3 max-w-xl font-normal">
                Strategic consulting, incident intelligence, compliance support, and operational assessments designed for complex business environments.
              </p>

              {/* Credential line */}
              <p className="text-xs text-[#C9A84C]/55 font-semibold tracking-wide mb-10">
                30 Years Operational Experience &nbsp;&middot;&nbsp; 13 Formal Commendations &nbsp;&middot;&nbsp; OSHA Certified &nbsp;&middot;&nbsp; FEMA Certified
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+14074705992"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#C9A84C] hover:bg-[#D4B560] active:bg-[#B8963C] text-[#03040A] text-[11px] font-bold uppercase tracking-[0.13em] px-7 py-3.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04050A]"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  (407) 470-5992
                </a>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2.5 border border-white/18 hover:border-white/30 text-[#EEF0F6]/60 hover:text-[#EEF0F6]/85 text-[11px] font-semibold uppercase tracking-[0.12em] px-7 py-3.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04050A]"
                >
                  Access Platform
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────
            SECTION 2 — CORE SERVICES
            ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="services-heading" className="border-b border-white/[0.06]">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">

            {/* Section label + heading */}
            <div className="mb-12 lg:mb-14">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/65 mb-3.5">
                Core Services
              </p>
              <h2
                id="services-heading"
                className="text-2xl sm:text-3xl font-bold text-[#EEF0F6] tracking-tight leading-snug max-w-lg"
              >
                Structured consulting.<br />Measurable risk reduction.
              </h2>
            </div>

            {/* Services grid */}
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
                  <h3 className="mb-3 text-[13.5px] font-bold text-[#EEF0F6] leading-snug">
                    {title}
                  </h3>
                  <p className="text-[12px] text-[#EEF0F6]/42 leading-[1.8]">
                    {body}
                  </p>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* ───────────────────────────────────────────────────────
            SECTION 3 — INDUSTRIES SERVED
            ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="industries-heading" className="bg-[#07080E] border-b border-white/[0.06]">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-20">

            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 xl:gap-24">

              {/* Left: Industries */}
              <div className="flex-1 mb-12 lg:mb-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/65 mb-4">
                  Industries Served
                </p>
                <h2
                  id="industries-heading"
                  className="text-xl sm:text-2xl font-bold text-[#EEF0F6] tracking-tight leading-snug mb-8"
                >
                  Consulting engagements across<br className="hidden sm:block" /> complex operational environments.
                </h2>

                <ul
                  aria-label="Industries served"
                  className="flex flex-wrap gap-2"
                >
                  {INDUSTRIES.map(ind => (
                    <li key={ind}>
                      <span className="inline-block text-[11px] font-medium text-[#EEF0F6]/50 border border-white/[0.1] hover:border-[#C9A84C]/30 hover:text-[#EEF0F6]/70 px-3.5 py-1.5 transition-colors cursor-default leading-none">
                        {ind}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider — vertical on desktop, horizontal on mobile */}
              <div aria-hidden="true" className="hidden lg:block w-px bg-white/[0.07] self-stretch" />
              <div aria-hidden="true" className="lg:hidden h-px bg-white/[0.07] mb-12" />

              {/* Right: Credentials */}
              <div className="flex-1 lg:max-w-sm xl:max-w-md">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/65 mb-4">
                  Certifications &amp; Credentials
                </p>
                <ul aria-label="Certifications and credentials" className="space-y-3.5">
                  {CREDENTIALS.map(c => (
                    <li key={c} className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="mt-0.5 h-3.5 w-3.5 text-[#C9A84C]/50 flex-shrink-0"
                      />
                      <span className="text-[12px] text-[#EEF0F6]/50 leading-[1.6]">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────
            SECTION 4 — OPERATIONAL INTELLIGENCE PREVIEW
            ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="platform-heading" className="border-b border-white/[0.06]">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">

            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 lg:mb-14">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/65 mb-3.5">
                  Operational Intelligence Platform
                </p>
                <h2
                  id="platform-heading"
                  className="text-2xl sm:text-3xl font-bold text-[#EEF0F6] tracking-tight leading-snug max-w-md"
                >
                  A command center for<br className="hidden sm:block" /> operational risk management.
                </h2>
              </div>
              <Link
                href="/login"
                className="group inline-flex items-center gap-2 text-[11px] font-semibold text-[#C9A84C]/65 hover:text-[#C9A84C] transition-colors flex-shrink-0"
              >
                Client Portal Login
                <ArrowRight
                  aria-hidden="true"
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* Feature blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {PLATFORM_FEATURES.map(({ stat, label, body }) => (
                <div
                  key={stat}
                  className="flex gap-5 p-6 border border-white/[0.07] bg-[#07080E] hover:border-[#C9A84C]/18 transition-colors"
                >
                  <span
                    aria-hidden="true"
                    className="text-[11px] font-bold font-mono text-[#C9A84C]/30 flex-shrink-0 mt-0.5 tabular-nums"
                  >
                    {stat}
                  </span>
                  <div>
                    <h3 className="text-[13px] font-bold text-[#EEF0F6]/90 mb-2 leading-snug">
                      {label}
                    </h3>
                    <p className="text-[12px] text-[#EEF0F6]/40 leading-[1.78]">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats strip */}
            <div className="mt-10 grid grid-cols-3 divide-x divide-white/[0.07] border border-white/[0.07]">
              {([
                { n: '30',  l: 'Years Experience'   },
                { n: '13',  l: 'Commendations'       },
                { n: '10+', l: 'Industries Served'   },
              ] as const).map(({ n, l }) => (
                <div key={l} className="py-7 px-4 sm:px-8 text-center">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#C9A84C] tabular-nums leading-none mb-2">
                    {n}
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-[#EEF0F6]/30">
                    {l}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ───────────────────────────────────────────────────────
            SECTION 5 — EXECUTIVE CTA FOOTER
            ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="cta-heading" className="bg-[#07080E]">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="max-w-xl mx-auto text-center">

              {/* Gold divider */}
              <div
                aria-hidden="true"
                className="mx-auto mb-10 h-px w-32"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)' }}
              />

              <h2
                id="cta-heading"
                className="text-2xl sm:text-3xl font-bold text-[#EEF0F6] tracking-tight leading-snug mb-4"
              >
                Ready to reduce your operational risk?
              </h2>
              <p className="text-sm text-[#EEF0F6]/45 leading-relaxed mb-10 max-w-md mx-auto">
                Book a no-obligation discovery consultation. We assess your specific exposure, deliver a clear findings summary, and outline a practical path forward.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:+14074705992"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#C9A84C] hover:bg-[#D4B560] active:bg-[#B8963C] text-[#03040A] text-[11px] font-bold uppercase tracking-[0.13em] px-8 py-3.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080E]"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  Schedule a Call
                </a>
                <a
                  href="tel:+14074705992"
                  className="inline-flex items-center justify-center gap-2.5 border border-white/18 hover:border-white/28 text-[#EEF0F6]/55 hover:text-[#EEF0F6]/80 text-[11px] font-semibold uppercase tracking-[0.1em] px-7 py-3.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080E]"
                >
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                  (407) 470-5992
                </a>
              </div>

            </div>
          </div>
        </section>

      </main>

      <SiteFooter />

    </div>
  );
}
