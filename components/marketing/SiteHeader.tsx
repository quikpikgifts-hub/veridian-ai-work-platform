import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { VLogo } from './Logo';
import { PLATFORM } from '@/lib/constants';

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
] as const;

export function SiteHeader() {
  return (
    <header
      role="banner"
      className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#04050A]/95 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          <Link href="/" className="flex items-center gap-3 flex-shrink-0" aria-label="Veridian Risk Group — Home">
            <VLogo />
            <div>
              <span className="block text-[14px] font-bold text-[#EEF0F6] leading-tight tracking-tight">Veridian</span>
              <span className="block text-[7.5px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/60 mt-0.5">Risk Group</span>
            </div>
          </Link>

          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-medium text-[#EEF0F6]/45 hover:text-[#EEF0F6]/80 transition-colors px-4 py-2"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${PLATFORM.phone.replace(/[^+\d]/g, '')}`}
              className="flex items-center gap-2 text-[11px] text-[#EEF0F6]/38 hover:text-[#EEF0F6]/70 transition-colors px-3 py-2 rounded"
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
              <span>{PLATFORM.phone}</span>
            </a>
            <Link
              href="/login"
              className="text-[11px] font-medium text-[#EEF0F6]/45 hover:text-[#EEF0F6]/75 transition-colors px-4 py-2"
            >
              Client Login
            </Link>
            <Link
              href="/consultation"
              className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#D4B560] active:bg-[#B8963C] text-[#03040A] text-[10px] font-bold uppercase tracking-[0.12em] px-5 py-2.5 transition-colors"
            >
              Schedule Consultation
              <ArrowRight className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            </Link>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/login"
              className="text-[11px] font-medium text-[#EEF0F6]/45 hover:text-[#EEF0F6]/70 transition-colors px-3 py-2"
            >
              Login
            </Link>
            <Link
              href="/consultation"
              className="flex items-center gap-1.5 bg-[#C9A84C] hover:bg-[#D4B560] text-[#03040A] text-[10px] font-bold uppercase tracking-[0.1em] px-4 py-2.5 transition-colors"
            >
              Get Started
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>

        </div>

        {/* Mobile secondary nav */}
        <nav
          aria-label="Secondary navigation"
          className="md:hidden flex items-center gap-4 pb-3 -mt-1 text-[11px] font-medium text-[#EEF0F6]/40"
        >
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-[#EEF0F6]/70 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
