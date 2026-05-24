'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, AlertTriangle, ShieldCheck, Radar,
  Brain, Zap, Truck, FileText, BarChart3, BookOpen,
  Activity, Bell, Users, Settings,
  ChevronLeft, ChevronRight, Menu, X,
} from 'lucide-react';
import { mockNotifications } from '@/lib/mock-data';

/* ── Logo ─────────────────────────────────────────────── */
function VLogo({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" width={size} height={size}>
      <circle cx="18" cy="18" r="16" stroke="#C9A84C" strokeWidth="0.7" opacity="0.28"/>
      <circle cx="18" cy="18" r="10" stroke="#C9A84C" strokeWidth="1.3" opacity="0.6"/>
      <circle cx="18" cy="18" r="2.8" fill="#C9A84C"/>
      <line x1="18" y1="2"  x2="18" y2="8"  stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="18" y1="28" x2="18" y2="34" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="2"  y1="18" x2="8"  y2="18" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="28" y1="18" x2="34" y2="18" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M11 11 L18 25 L25 11" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── Nav config ───────────────────────────────────────── */
const NAV_GROUPS = [
  {
    label: 'COMMAND',
    items: [
      { href:'/dashboard',        label:'Dashboard',        icon:LayoutDashboard, badge:null,  badgeCls:'' },
      { href:'/incidents',        label:'Incidents',        icon:AlertTriangle,   badge:'4',   badgeCls:'bg-red-500 text-white' },
      { href:'/risk-assessments', label:'Risk Assessments', icon:ShieldCheck,     badge:null,  badgeCls:'' },
      { href:'/threat-intel',     label:'Threat Intel',     icon:Radar,           badge:'6',   badgeCls:'bg-orange-500 text-white' },
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      { href:'/ai-operations',    label:'AI Workforce',     icon:Brain,           badge:'LIVE',badgeCls:'bg-emerald-600 text-white' },
      { href:'/workflows',        label:'Workflows',        icon:Zap,             badge:null,  badgeCls:'' },
      { href:'/fleet',            label:'Fleet',            icon:Truck,           badge:null,  badgeCls:'' },
      { href:'/reports',          label:'Reports',          icon:FileText,        badge:null,  badgeCls:'' },
    ],
  },
  {
    label: 'INTELLIGENCE',
    items: [
      { href:'/analytics',        label:'Analytics',        icon:BarChart3,       badge:null,  badgeCls:'' },
      { href:'/clients',          label:'Clients',          icon:BookOpen,        badge:null,  badgeCls:'' },
      { href:'/activity',         label:'Activity',         icon:Activity,        badge:null,  badgeCls:'' },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { href:'/notifications',    label:'Notifications',    icon:Bell,            badge:null,  badgeCls:'', dynamic:'notif' },
      { href:'/users',            label:'Users',            icon:Users,           badge:null,  badgeCls:'' },
      { href:'/settings',         label:'Settings',         icon:Settings,        badge:null,  badgeCls:'' },
    ],
  },
] as const;

/* ── NavItem ──────────────────────────────────────────── */
function NavItem({
  href, label, icon: Icon, badge, badgeCls, dynamic,
  active, collapsed, notifCount, onNavigate,
}: {
  href:string; label:string; icon:React.ElementType;
  badge:string|null; badgeCls:string; dynamic?:string;
  active:boolean; collapsed:boolean; notifCount:number;
  onNavigate:()=>void;
}) {
  const resolvedBadge = dynamic === 'notif' && notifCount ? String(notifCount) : badge;
  const resolvedCls   = dynamic === 'notif' ? 'bg-red-500 text-white' : badgeCls;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      title={collapsed ? label : undefined}
      className={cn(
        'group relative flex items-center gap-2.5 rounded-[3px] border border-transparent',
        'select-none transition-all duration-150 text-[11.5px] font-medium',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500/50',
        collapsed ? 'justify-center px-0 py-2.5 mx-1' : 'px-3 py-2 mx-1',
        active
          ? 'bg-amber-500/[0.11] text-amber-400 border-amber-500/28'
          : 'text-white/38 hover:text-white/75 hover:bg-white/[0.04] hover:border-white/[0.07]',
      )}
      aria-current={active ? 'page' : undefined}
    >
      {/* Active accent */}
      {active && (
        <span className="absolute left-0 inset-y-[4px] w-[2px] rounded-r-full bg-amber-500" />
      )}

      <Icon className={cn(
        'flex-shrink-0 transition-colors duration-150',
        collapsed ? 'w-[17px] h-[17px]' : 'w-[13.5px] h-[13.5px]',
        active ? 'text-amber-400' : 'text-white/28 group-hover:text-white/55',
      )} />

      {!collapsed && (
        <span className="flex-1 truncate leading-none">{label}</span>
      )}

      {/* Badge */}
      {!collapsed && resolvedBadge && (
        <span className={cn('flex-shrink-0 text-[8px] font-bold leading-none px-1.5 py-[3px] rounded-[2px]', resolvedCls)}>
          {resolvedBadge}
        </span>
      )}

      {/* Collapsed badge dot */}
      {collapsed && resolvedBadge && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-[14px] rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center px-0.5">
          {resolvedBadge}
        </span>
      )}

      {/* Collapsed tooltip */}
      {collapsed && (
        <span className={cn(
          'pointer-events-none absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2',
          'px-2.5 py-1.5 bg-[#14151F] border border-white/[0.1] text-white/80',
          'text-[10.5px] font-medium rounded-[3px] whitespace-nowrap z-[200] shadow-xl',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-150',
        )}>
          {label}
          {resolvedBadge && (
            <span className={cn('ml-1.5 text-[8px] font-bold px-1 py-0.5 rounded', resolvedCls)}>{resolvedBadge}</span>
          )}
        </span>
      )}
    </Link>
  );
}

/* ── Sidebar content ──────────────────────────────────── */
function SBContent({
  pathname, collapsed, notifCount, onNavigate, onToggle,
}: {
  pathname:string; collapsed:boolean; notifCount:number;
  onNavigate:()=>void; onToggle:()=>void;
}) {
  return (
    <>
      {/* Brand */}
      <div className={cn(
        'flex items-center border-b border-white/[0.06] flex-shrink-0',
        collapsed ? 'justify-center py-[15px] px-1' : 'gap-3 px-4 py-[14px]',
      )}>
        <VLogo size={collapsed ? 24 : 26} />
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold text-white leading-tight tracking-wide">Veridian</div>
              <div className="text-[8px] font-bold tracking-[3px] uppercase text-amber-400/65 mt-0.5">Risk Platform</div>
            </div>
            <button
              onClick={onToggle}
              className="p-1 rounded text-white/20 hover:text-white/55 hover:bg-white/5 transition-colors flex-shrink-0"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </>
        )}
        {collapsed && (
          <button
            onClick={onToggle}
            className="absolute -right-3 top-16 w-6 h-6 rounded-full bg-[#0F1019] border border-white/[0.1] flex items-center justify-center text-white/35 hover:text-amber-400 hover:border-amber-500/40 transition-all shadow-lg"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* System status */}
      {!collapsed && (
        <div className="mx-3 mt-3 mb-1 flex items-center gap-2 px-3 py-2 rounded-[3px] bg-emerald-500/[0.06] border border-emerald-500/[0.15]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 pulse-dot" />
          <span className="text-[9.5px] font-semibold text-emerald-400">All Systems Operational</span>
          <span className="ml-auto text-[8px] font-bold text-emerald-400/60">11 AI</span>
        </div>
      )}

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-2 space-y-0.5 scrollable" aria-label="Main navigation">
        {NAV_GROUPS.map(({ label: grpLabel, items }) => (
          <div key={grpLabel} className="mb-1">
            {!collapsed ? (
              <div className="px-4 pt-3 pb-1 text-[7.5px] font-bold tracking-[3.5px] text-white/20 select-none">
                {grpLabel}
              </div>
            ) : (
              <div className="h-px bg-white/[0.05] mx-3 my-1.5" />
            )}
            {items.map(item => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                badge={item.badge}
                badgeCls={item.badgeCls}
                dynamic={'dynamic' in item ? (item as {dynamic?:string}).dynamic : undefined}
                active={pathname === item.href || pathname.startsWith(item.href + '/')}
                collapsed={collapsed}
                notifCount={notifCount}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className={cn(
        'border-t border-white/[0.06] flex-shrink-0',
        collapsed ? 'py-3 flex justify-center' : 'px-3 py-3',
      )}>
        {collapsed ? (
          <div
            title="Steve Washington Smith — Managing Member"
            className="w-8 h-8 rounded-full bg-amber-500/12 border border-amber-500/25 flex items-center justify-center cursor-pointer hover:border-amber-500/50 transition-colors"
          >
            <span className="text-[10.5px] font-bold text-amber-400">SS</span>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-[3px] hover:bg-white/[0.035] transition-colors cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-amber-500/12 border border-amber-500/25 flex items-center justify-center flex-shrink-0">
              <span className="text-[11px] font-bold text-amber-400">SS</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11.5px] font-semibold text-white/82 truncate">Steve Smith</div>
              <div className="text-[9px] text-white/30 tracking-wide">Managing Member · 50%</div>
            </div>
            <span
              className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"
              style={{ boxShadow:'0 0 6px rgba(52,211,153,0.7)' }}
            />
          </div>
        )}
      </div>
    </>
  );
}

/* ── TopBar ───────────────────────────────────────────── */
function TopBar({
  pathname, onMobileOpen, notifCount,
}: {
  pathname:string; onMobileOpen:()=>void; notifCount:number;
}) {
  const crumbs    = pathname.split('/').filter(Boolean);
  const pageTitle = crumbs[crumbs.length - 1]?.replace(/-/g,' ') || 'dashboard';
  const now       = new Date();
  const timeStr   = now.toLocaleTimeString('en-US',{ hour:'2-digit', minute:'2-digit' });
  const dateStr   = now.toLocaleDateString('en-US',{ weekday:'short', month:'short', day:'numeric' });

  return (
    <div id="topbar">
      {/* Mobile menu btn */}
      <button
        onClick={onMobileOpen}
        className="md:hidden p-2 text-white/35 hover:text-white hover:bg-white/5 rounded-[3px] transition-colors flex-shrink-0"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile title */}
      <div className="md:hidden flex items-center gap-2 flex-1 min-w-0">
        <VLogo size={22} />
        <span className="text-[13px] font-semibold text-white capitalize truncate">{pageTitle}</span>
      </div>

      {/* Desktop breadcrumb */}
      <div className="hidden md:flex items-center gap-1.5 text-[10.5px] flex-1 min-w-0">
        <span className="text-amber-400/60 font-bold tracking-wide">VERIDIAN</span>
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1.5 text-white/25">
            <span className="text-white/15">/</span>
            <span className={cn(
              'capitalize font-medium',
              i === crumbs.length - 1 ? 'text-white/60' : 'text-white/25',
            )}>
              {c.replace(/-/g,' ')}
            </span>
          </span>
        ))}
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Clock */}
        <div className="hidden lg:flex flex-col items-end leading-tight">
          <span className="text-[11px] font-mono font-bold text-amber-400/80">{timeStr}</span>
          <span className="text-[9px] text-white/25">{dateStr}</span>
        </div>

        <div className="w-px h-6 bg-white/[0.07] hidden lg:block" />

        {/* Notifications */}
        <Link
          href="/notifications"
          className="relative p-2 text-white/35 hover:text-white/75 hover:bg-white/[0.04] rounded-[3px] transition-colors"
        >
          <Bell className="w-4 h-4" />
          {notifCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[15px] h-[15px] rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center px-0.5">
              {notifCount > 9 ? '9+' : notifCount}
            </span>
          )}
        </Link>

        {/* AI Center CTA */}
        <Link
          href="/ai-operations"
          className="hidden sm:flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-black text-[9.5px] font-bold uppercase tracking-[1.5px] px-3 py-2 rounded-[3px] transition-colors"
        >
          <Brain className="w-3 h-3" />
          <span>AI Center</span>
        </Link>
      </div>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────── */
export function Sidebar({ children }: { children:React.ReactNode }) {
  const [collapsed,  setCollapsed]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const notifCount = mockNotifications.filter(n => !n.read).length;

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const h = (e:KeyboardEvent) => { if (e.key==='Escape') setMobileOpen(false); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const nav = useCallback(() => setMobileOpen(false), []);

  return (
    <div id="shell">

      {/* ── Desktop sidebar ─── */}
      <aside
        id="sb"
        className={cn('hidden md:flex flex-col relative', collapsed ? 'collapsed' : 'expanded')}
        aria-label="Primary navigation"
      >
        <SBContent
          pathname={pathname}
          collapsed={collapsed}
          notifCount={notifCount}
          onNavigate={nav}
          onToggle={() => setCollapsed(c => !c)}
        />
      </aside>

      {/* ── Mobile overlay ─── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-[180] bg-black/82 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer ─── */}
      <aside
        id="sb"
        className={cn(
          'md:hidden fixed top-0 left-0 bottom-0 z-[200] flex flex-col',
          'bg-[var(--bg1)] border-r border-white/[0.07]',
          'shadow-[6px_0_48px_rgba(0,0,0,.8)] transition-transform duration-300',
          'expanded',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-3.5 p-1.5 text-white/28 hover:text-white/70 hover:bg-white/5 rounded transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>
        <SBContent
          pathname={pathname}
          collapsed={false}
          notifCount={notifCount}
          onNavigate={nav}
          onToggle={() => {}}
        />
      </aside>

      {/* ── Main ─── */}
      <div id="main">
        <TopBar pathname={pathname} onMobileOpen={() => setMobileOpen(true)} notifCount={notifCount} />
        <div id="content">{children}</div>
      </div>

    </div>
  );
}
