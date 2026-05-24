'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NotificationBell } from '@/components/ui/NotificationBell';
import {
  LayoutDashboard, AlertTriangle, Radar, Settings,
  Menu, X, Shield, ChevronRight, User, Activity
} from 'lucide-react';

const navItems = [
  { href: '/dashboard',    label: 'Dashboard',           icon: LayoutDashboard, section: 'Command' },
  { href: '/incidents',    label: 'Incidents',           icon: AlertTriangle,   section: 'Command', badge: '4' },
  { href: '/threat-intel', label: 'Threat Intelligence', icon: Radar,           section: 'Command' },
  { href: '/settings',     label: 'Settings',            icon: Settings,        section: 'System'  },
];

function NavLogo() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <circle cx="16" cy="16" r="14" stroke="#C9A84C" strokeWidth="1" opacity="0.4"/>
      <circle cx="16" cy="16" r="9"  stroke="#C9A84C" strokeWidth="1.5" opacity="0.8"/>
      <circle cx="16" cy="16" r="2.5" fill="#C9A84C"/>
      <line x1="16" y1="2"  x2="16" y2="7"  stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="25" x2="16" y2="30" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="2"  y1="16" x2="7"  y2="16" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="25" y1="16" x2="30" y2="16" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 10 L16 22 L22 10" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

interface NavContentProps {
  pathname: string;
  onClose: () => void;
}

function NavContent({ pathname, onClose }: NavContentProps) {
  return (
    <>
      {/* Brand */}
      <div className="px-4 py-5 border-b border-white/[0.07] flex items-center gap-3 flex-shrink-0">
        <div className="w-8 h-8 flex-shrink-0"><NavLogo /></div>
        <div>
          <div className="text-[13px] font-bold text-white tracking-wide leading-tight">Veridian</div>
          <div className="text-[10px] font-bold text-amber-400/80 tracking-[2px] uppercase">Risk Platform</div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {['Command', 'System'].map(section => {
          const items = navItems.filter(i => i.section === section);
          return (
            <div key={section} className="mb-3">
              <div className="px-3 py-1.5 text-[8.5px] font-bold tracking-[3px] uppercase text-white/25 select-none">
                {section}
              </div>
              {items.map(item => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 mb-0.5 text-[12px] font-medium',
                      'transition-all duration-150 rounded-[3px] border-l-2',
                      active
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500'
                        : 'text-white/50 hover:text-white/85 hover:bg-white/[0.04] border-transparent'
                    )}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm leading-none">
                        {item.badge}
                      </span>
                    )}
                    {active && <ChevronRight className="w-3 h-3 opacity-50" />}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="px-4 py-3 border-t border-white/[0.07] flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
            <User className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-semibold text-white truncate">Steve Smith</div>
            <div className="text-[9px] text-white/40 tracking-wide">Senior Risk Consultant</div>
          </div>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
        </div>
      </div>
    </>
  );
}

interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [mobileOpen]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const pageTitle = pathname.replace('/', '').replace(/-/g, ' ') || 'dashboard';

  return (
    <div className="flex h-screen bg-[#07070E] overflow-hidden">

      {/* ── DESKTOP SIDEBAR ─────────────────────────── */}
      <aside className="hidden md:flex flex-col w-56 bg-[#0D0D18] border-r border-white/[0.07] flex-shrink-0 z-10">
        <NavContent pathname={pathname} onClose={() => {}} />
      </aside>

      {/* ── MOBILE OVERLAY ──────────────────────────── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── MOBILE DRAWER ───────────────────────────── */}
      <aside
        className={cn(
          'md:hidden fixed left-0 top-0 bottom-0 w-[260px] z-50',
          'flex flex-col bg-[#0D0D18] border-r border-white/[0.09]',
          'transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          'shadow-[4px_0_32px_rgba(0,0,0,0.6)]',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Mobile navigation"
      >
        {/* Close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-3 z-10 p-1.5 text-white/40 hover:text-white/80 hover:bg-white/5 rounded transition-colors"
          aria-label="Close navigation"
        >
          <X className="w-4.5 h-4.5" />
        </button>
        <NavContent pathname={pathname} onClose={() => setMobileOpen(false)} />
      </aside>

      {/* ── MAIN AREA ───────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="flex-shrink-0 h-14 flex items-center justify-between px-4 md:px-6 bg-[#0D0D18]/95 border-b border-white/[0.07] backdrop-blur-sm z-20">

          {/* Left: hamburger + breadcrumb */}
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb — desktop only */}
            <div className="hidden md:flex items-center gap-2 text-[10px] text-white/30">
              <Shield className="w-3.5 h-3.5 text-amber-400/80" />
              <span className="text-amber-400/60 font-medium">Veridian Risk Platform</span>
              <span>/</span>
              <span className="text-white/50 capitalize font-medium">{pageTitle}</span>
            </div>

            {/* Mobile: show current page name */}
            <span className="md:hidden text-[13px] font-semibold text-white/80 capitalize">{pageTitle}</span>
          </div>

          {/* Right: status + bell */}
          <div className="flex items-center gap-1.5">
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-green-400 bg-green-500/10 border border-green-500/25 px-2.5 py-1 rounded-[2px] select-none">
              <Activity className="w-3 h-3" />
              <span className="font-semibold">AI Live</span>
            </div>
            <NotificationBell />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
