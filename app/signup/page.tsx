'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { VLogo } from '@/components/marketing/Logo';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [needsEmailConfirmation, setNeedsEmailConfirmation] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);

    if (!supabase) {
      // Demo mode — Supabase not configured
      setTimeout(() => {
        setLoading(false);
        router.push('/portal');
      }, 600);
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: { data: { name: name.trim(), role: 'client' } },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message || 'Could not create your account. Please try again.');
      return;
    }

    if (data.session) {
      router.push('/portal');
      router.refresh();
    } else {
      // Email confirmation required before a session is issued
      setNeedsEmailConfirmation(true);
    }
  }

  if (needsEmailConfirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#04050A]">
        <div className="relative w-full max-w-[380px] text-center">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-[#C9A84C]/[0.08] border border-[#C9A84C]/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#C9A84C]" />
            </div>
          </div>
          <h1 className="text-[20px] font-bold text-[#EEF0F6] tracking-tight mb-3">Check your email</h1>
          <p className="text-[13px] text-[#EEF0F6]/55 leading-relaxed mb-8">
            We sent a confirmation link to <strong className="text-[#EEF0F6]/80">{email}</strong>.
            Confirm your address, then sign in to access your portal.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#D4B560] text-[#03040A] text-[10.5px] font-bold uppercase tracking-[0.13em] px-6 py-3 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#04050A]">
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04), transparent)' }} />
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)', backgroundSize: '88px 88px' }} />
      </div>

      <div className="relative w-full max-w-[380px]">
        <div className="flex flex-col items-center mb-8">
          <VLogo className="w-10 h-10" />
          <div className="mt-4 text-center">
            <div className="text-[17px] font-bold text-[#EEF0F6] tracking-tight">Veridian Risk Group</div>
            <div className="text-[8.5px] font-bold tracking-[0.28em] uppercase text-[#C9A84C]/60 mt-1">Client Portal</div>
          </div>
        </div>

        <div className="relative bg-[#07080E] border border-white/[0.08] rounded-[4px] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
          <div className="p-7">
            <h1 className="text-[15px] font-bold text-[#EEF0F6] mb-1">Create your account</h1>
            <p className="text-[11.5px] text-white/35 mb-6">Start your operational risk self-assessment</p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {!supabase && (
                <div className="flex items-start gap-2.5 p-3 bg-amber-500/[0.08] border border-amber-500/20 rounded-[3px]">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[10.5px] text-amber-300/70 leading-relaxed">
                    Demo mode — Supabase not configured. Account creation is simulated.
                  </p>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Full Name</label>
                <input
                  id="name" type="text" required autoComplete="name" value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full bg-black/30 border border-white/[0.09] text-[#EEF0F6] text-[12.5px] px-3.5 py-2.5 rounded-[3px] outline-none transition-all focus:border-[#C9A84C]/40 focus:shadow-[0_0_0_2px_rgba(201,168,76,0.08)] placeholder:text-white/18"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Email Address</label>
                <input
                  id="email" type="email" required autoComplete="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="w-full bg-black/30 border border-white/[0.09] text-[#EEF0F6] text-[12.5px] px-3.5 py-2.5 rounded-[3px] outline-none transition-all focus:border-[#C9A84C]/40 focus:shadow-[0_0_0_2px_rgba(201,168,76,0.08)] placeholder:text-white/18"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Password</label>
                <input
                  id="password" type="password" required autoComplete="new-password" value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full bg-black/30 border border-white/[0.09] text-[#EEF0F6] text-[12.5px] px-3.5 py-2.5 rounded-[3px] outline-none transition-all focus:border-[#C9A84C]/40 focus:shadow-[0_0_0_2px_rgba(201,168,76,0.08)] placeholder:text-white/18"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-[11px] text-red-400 bg-red-500/[0.08] border border-red-500/20 px-3 py-2.5 rounded-[3px]">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#D4B560] disabled:opacity-50 disabled:cursor-not-allowed text-[#03040A] text-[10.5px] font-bold uppercase tracking-[0.14em] py-3 rounded-[3px] transition-colors mt-2"
              >
                {loading
                  ? <div className="w-4 h-4 rounded-full border-2 border-[#03040A]/20 border-t-[#03040A] animate-spin" />
                  : <><span>Create Account</span><ArrowRight className="w-3.5 h-3.5" /></>
                }
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-white/[0.06] text-center">
              <p className="text-[10.5px] text-white/30">
                Already have an account? <Link href="/login" className="text-[#C9A84C]/70 hover:text-[#C9A84C]">Sign in</Link>
              </p>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-[9.5px] text-white/18">
          © {new Date().getFullYear()} Veridian Risk &amp; Resilience Group, LLC
        </p>
      </div>
    </div>
  );
}
