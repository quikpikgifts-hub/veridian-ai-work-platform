import Link from 'next/link';
import { VLogo } from './Logo';
import { PLATFORM } from '@/lib/constants';

export function SiteFooter() {
  return (
    <footer role="contentinfo" className="border-t border-white/[0.07] bg-[#04050A]">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div className="flex items-center gap-3">
            <VLogo className="w-5 h-5" />
            <span className="text-[11px] font-medium text-[#EEF0F6]/35">
              © {new Date().getFullYear()} {PLATFORM.company}. All rights reserved.
            </span>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/services" className="text-[11px] text-[#EEF0F6]/30 hover:text-[#EEF0F6]/60 transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-[11px] text-[#EEF0F6]/30 hover:text-[#EEF0F6]/60 transition-colors">
              About
            </Link>
            <Link href="/consultation" className="text-[11px] text-[#EEF0F6]/30 hover:text-[#EEF0F6]/60 transition-colors">
              Consultation
            </Link>
            <Link href="/login" className="text-[11px] text-[#EEF0F6]/30 hover:text-[#EEF0F6]/60 transition-colors">
              Client Login
            </Link>
            <a
              href={`mailto:${PLATFORM.email}`}
              className="text-[11px] text-[#EEF0F6]/30 hover:text-[#EEF0F6]/60 transition-colors"
            >
              {PLATFORM.email}
            </a>
            <span
              aria-label={`Tagline: ${PLATFORM.tagline}`}
              className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]/35"
            >
              {PLATFORM.tagline}
            </span>
          </nav>

        </div>
      </div>
    </footer>
  );
}
