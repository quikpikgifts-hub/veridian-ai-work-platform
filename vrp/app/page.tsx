import Link from 'next/link';
import { Shield, ArrowRight, CheckCircle2, Zap, Eye, FileText } from 'lucide-react';

const features = [
  { icon: Shield,    title: 'Operational Risk Assessment',       desc: 'On-site evaluation with AI-assisted reporting and executive-grade findings.' },
  { icon: Eye,       title: 'Threat Intelligence',               desc: 'Real-time situational awareness briefs powered by public safety data and local crime trends.' },
  { icon: Zap,       title: 'AI Agent Workforce',                desc: 'Seven specialized AI agents handle intake, proposals, analysis, and follow-ups autonomously.' },
  { icon: FileText,  title: 'Incident Documentation',            desc: 'Legal-grade incident reports, compliance audits, and emergency action plans on demand.' },
];

const industries = [
  'Apartment Complexes','Logistics & Fleet','Schools & Institutions',
  'Houses of Worship','Auto Dealerships','Retail & Gas Stations',
  'Construction Sites','Hotels & Hospitality','Healthcare Facilities',
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#07070E] text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#07070E]/95 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
              <circle cx="16" cy="16" r="14" stroke="#C9A84C" strokeWidth="1" opacity="0.4"/>
              <circle cx="16" cy="16" r="9" stroke="#C9A84C" strokeWidth="1.5" opacity="0.8"/>
              <circle cx="16" cy="16" r="2.5" fill="#C9A84C"/>
              <line x1="16" y1="2" x2="16" y2="7" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="16" y1="25" x2="16" y2="30" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="2" y1="16" x2="7" y2="16" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="25" y1="16" x2="30" y2="16" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M10 10 L16 22 L22 10" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <span className="text-[13px] font-bold text-white">Veridian</span>
              <span className="text-[10px] font-bold text-amber-400 tracking-[2px] uppercase ml-1">Risk Group</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden md:block text-[11px] font-medium text-white/50 hover:text-white transition-colors tracking-wide">
              Sign In
            </Link>
            <Link href="/dashboard" className="bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-bold tracking-[2px] uppercase px-4 py-2 transition-colors">
              Platform →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(201,168,76,0.05),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 mb-6 text-[10px] font-bold tracking-[2px] uppercase text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              AI-Enhanced Operational Risk Consulting
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] mb-6">
              <span className="text-white">Operational Risk.</span><br />
              <span className="text-gold-gradient">Elevated Standard.</span>
            </h1>
            <p className="text-[15px] md:text-[17px] text-white/50 leading-relaxed mb-4 max-w-xl font-light">
              Nearly 30 years of decorated law enforcement experience, amplified by intelligent operational systems.
            </p>
            <p className="text-[12px] text-amber-400/60 font-medium mb-8">13 Formal Commendations · Major Crime Investigation · Central Florida + Nationwide</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-[11px] font-bold tracking-[2px] uppercase px-6 py-3.5 transition-colors">
                Enter Platform <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 hover:border-amber-500/40 text-white/70 hover:text-white text-[11px] font-bold tracking-[2px] uppercase px-6 py-3.5 transition-all">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="border-b border-white/[0.06] bg-[#0D0D18]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { n: '30', l: 'Years Experience' },
              { n: '13', l: 'Commendations' },
              { n: '9+', l: 'Industries Served' },
              { n: '7',  l: 'AI Agents Active' },
            ].map(s => (
              <div key={s.l}>
                <div className="text-3xl md:text-4xl font-bold text-amber-400 font-mono">{s.n}</div>
                <div className="text-[10px] font-bold tracking-[2px] uppercase text-white/30 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <div className="text-[9px] font-bold tracking-[4px] uppercase text-amber-400 mb-3">Platform Capabilities</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Intelligence-Driven Consulting</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div key={i} className="p-5 bg-[#0D0D18] border border-white/[0.07] hover:border-amber-500/25 transition-colors">
              <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-[13px] font-bold text-white mb-2">{f.title}</h3>
              <p className="text-[12px] text-white/45 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="border-y border-white/[0.06] bg-[#0D0D18]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
          <div className="text-[9px] font-bold tracking-[4px] uppercase text-amber-400 mb-6 text-center">Industries We Protect</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {industries.map(ind => (
              <span key={ind} className="text-[10.5px] font-medium text-white/50 border border-white/10 px-3 py-1.5 hover:border-amber-500/35 hover:text-amber-400/80 transition-all cursor-default">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Protect Your Business?</h2>
          <p className="text-[13px] text-white/40 mb-8 leading-relaxed">Book a free 15-minute discovery consultation. No obligation. Just expertise from someone who has spent nearly 30 years protecting what matters.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-[11px] font-bold tracking-[2px] uppercase px-6 py-3 transition-colors">
              Enter Platform <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+13212574492" className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-amber-500/35 text-white/60 hover:text-white text-[11px] font-bold tracking-[2px] uppercase px-6 py-3 transition-all">
              +1 (321) 257-4492
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] bg-[#0D0D18]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-[11px] font-bold text-white/50">© 2025 Veridian Risk Group. All rights reserved.</div>
          <div className="text-[10px] text-amber-400/50 font-medium tracking-[2px] uppercase">Operational Risk. Elevated Standard.</div>
        </div>
      </footer>
    </div>
  );
}
