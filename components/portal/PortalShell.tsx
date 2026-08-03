'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, FileText, User as UserIcon, Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { VLogo } from '@/components/marketing/Logo';

const NAV = [
  { href: '/portal', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/portal/assessments', label: 'Assessments', icon: FileText, exact: false },
  { href: '/portal/profile', label: 'Profile', icon: UserIcon, exact: true },
] as const;

export function PortalShell({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const demoName = supabase ? null : 'Demo Client';

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data: { user } }) => {
      setName((user?.user_metadata?.name as string) ?? user?.email ?? 'Client');
    });
  }, [supabase]);

  const displayName = name ?? demoName;

  async function handleLogout() {
    if (supabase) await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#04050A] text-[#EEF0F6]">
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#04050A]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 flex h-16 items-center justify-between gap-4">
          <Link href="/portal" className="flex items-center gap-3">
            <VLogo className="w-7 h-7" />
            <div>
              <span className="block text-[13px] font-bold text-[#EEF0F6] leading-tight">Veridian</span>
              <span className="block text-[7px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]/60">Client Portal</span>
            </div>
          </Link>

          <nav aria-label="Portal navigation" className="hidden sm:flex items-center gap-1">
            {NAV.map(item => {
              const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'flex items-center gap-1.5 px-3.5 py-2 text-[11.5px] font-medium transition-colors rounded',
                    active ? 'text-[#C9A84C] bg-[#C9A84C]/[0.08]' : 'text-[#EEF0F6]/50 hover:text-[#EEF0F6]/80',
                  ].join(' ')}
                >
                  <item.icon className="w-3.5 h-3.5" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {displayName && <span className="hidden sm:inline text-[11px] text-[#EEF0F6]/40">{displayName}</span>}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-[11px] font-medium text-[#EEF0F6]/40 hover:text-[#EEF0F6]/75 transition-colors px-2.5 py-2"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <nav aria-label="Portal navigation (mobile)" className="sm:hidden flex items-center gap-1 px-5 pb-3 -mt-1">
          {NAV.map(item => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium transition-colors rounded',
                  active ? 'text-[#C9A84C] bg-[#C9A84C]/[0.08]' : 'text-[#EEF0F6]/50',
                ].join(' ')}
              >
                <item.icon className="w-3 h-3" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-5 sm:px-6 py-10">{children}</main>
    </div>
  );
}

export function NewAssessmentButton({ className }: { className?: string }) {
  return (
    <Link
      href="/portal/assessments/new"
      className={
        className ??
        'inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#D4B560] text-[#03040A] text-[11px] font-bold uppercase tracking-[0.1em] px-4 py-2.5 transition-colors'
      }
    >
      <Plus className="w-3.5 h-3.5" aria-hidden />
      New Assessment
    </Link>
  );
}
