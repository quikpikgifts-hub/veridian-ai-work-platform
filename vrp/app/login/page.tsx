'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { PLATFORM, FOUNDERS } from '@/lib/constants';

function VLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <circle cx="20" cy="20" r="18" stroke="#C9A84C" strokeWidth="0.8" opacity="0.3"/>
      <circle cx="20" cy="20" r="12" stroke="#C9A84C" strokeWidth="1.4" opacity="0.65"/>
      <circle cx="20" cy="20" r="3"   fill="#C9A84C"/>
      <line x1="20" y1="2"  x2="20" y2="9"  stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="20" y1="31" x2="20" y2="38" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="2"  y1="20" x2="9"  y2="20" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="31" y1="20" x2="38" y2="20" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M12.5 12.5 L20 27.5 L27.5 12.5" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function LoginPage() {
  const [showPass, setShowPass]   = useState(false);
  const [loading,  setLoading]    = useState(false);
  const [email,    setEmail]      = useState('steve@veridianriskgroup.com');
  const [password, setPassword]   = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push('/dashboard'), 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'var(--bg-1)' }}>

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 hud-grid" />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.04), transparent 65%)' }} />
        <div className="absolute top-0 left-1/4 right-1/4 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)' }} />
      </div>

      <div className="relative w-full max-w-[360px] anim-fade-up">

        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <VLogo />
          <div className="mt-4 text-center">
            <div className="text-[18px] font-bold text-white tracking-wide">{PLATFORM.shortName}</div>
            <div className="text-[9.5px] font-bold text-amber-400/60 tracking-[3.5px] uppercase mt-1">
              Operations Platform
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="relative bg-[#08090F] border border-white/[0.08] rounded-[4px] overflow-hidden">
          {/* Gold top line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px]"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #C9A84C 50%, transparent 100%)' }} />

          <div className="p-6">
            <div className="mb-5">
              <h2 className="text-[14px] font-bold text-white">Welcome back</h2>
              <p className="text-[11px] text-white/35 mt-1">Sign in to your operations account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Email */}
              <div>
                <label className="block text-[9px] font-bold tracking-[2px] uppercase text-white/30 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/22 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full bg-black/30 border border-white/[0.08] text-white text-[12px] pl-9 pr-4 py-2.5 rounded-[2px] focus:outline-none focus:border-amber-500/45 transition-colors placeholder:text-white/18"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[9px] font-bold tracking-[2px] uppercase text-white/30 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/22 pointer-events-none" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-black/30 border border-white/[0.08] text-white text-[12px] pl-9 pr-10 py-2.5 rounded-[2px] focus:outline-none focus:border-amber-500/45 transition-colors placeholder:text-white/18"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/22 hover:text-white/55 transition-colors"
                  >
                    {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-black text-[10.5px] font-bold uppercase tracking-[2px] py-2.5 rounded-[2px] transition-colors mt-1"
              >
                {loading ? (
                  <div className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black anim-spin" />
                ) : (
                  <>Enter Platform <ArrowRight className="w-3.5 h-3.5" /></>
                )}
              </button>
            </form>

            {/* Demo hint */}
            <div className="mt-4 pt-4 border-t border-white/[0.05]">
              <p className="text-[10px] text-white/22 text-center">
                Demo: use any email/password to access the platform
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 text-center text-[9.5px] text-white/20">
          {PLATFORM.company} · {PLATFORM.tagline}
        </div>
      </div>
    </div>
  );
}
