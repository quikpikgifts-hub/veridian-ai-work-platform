'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Shield, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push('/dashboard'), 1000);
  };

  return (
    <div className="min-h-screen bg-[#07070E] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.04),transparent_70%)]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage:'linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)',backgroundSize:'80px 80px'}} />

      <div className="relative w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 mb-4">
            <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
              <circle cx="16" cy="16" r="14" stroke="#C9A84C" strokeWidth="1" opacity="0.4"/>
              <circle cx="16" cy="16" r="9" stroke="#C9A84C" strokeWidth="1.5" opacity="0.8"/>
              <circle cx="16" cy="16" r="2.5" fill="#C9A84C"/>
              <line x1="16" y1="2" x2="16" y2="7" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="16" y1="25" x2="16" y2="30" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="2" y1="16" x2="7" y2="16" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="25" y1="16" x2="30" y2="16" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M10 10 L16 22 L22 10" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-[18px] font-bold text-white tracking-wide">Veridian Risk Platform</div>
          <div className="text-[10px] text-amber-400/60 tracking-[3px] uppercase mt-1">Secure Access Portal</div>
        </div>

        <div className="relative bg-[#0D0D18] border border-white/[0.08] p-6 rounded-[3px]">
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <h2 className="text-[13px] font-bold text-white mb-1">Welcome back</h2>
          <p className="text-[11px] text-white/35 mb-6">Sign in to your operations account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[9.5px] font-bold tracking-[2px] uppercase text-white/40 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
                <input
                  type="email"
                  defaultValue="steve@veridianriskgroup.com"
                  className="w-full bg-[#131320] border border-white/[0.08] text-white text-[12px] pl-9 pr-4 py-2.5 rounded-[2px] focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-white/20"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-[9.5px] font-bold tracking-[2px] uppercase text-white/40 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
                <input
                  type={showPass ? 'text' : 'password'}
                  defaultValue="password"
                  className="w-full bg-[#131320] border border-white/[0.08] text-white text-[12px] pl-9 pr-10 py-2.5 rounded-[2px] focus:outline-none focus:border-amber-500/50 transition-colors"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black text-[11px] font-bold tracking-[2px] uppercase py-3 transition-colors flex items-center justify-center gap-2 rounded-[2px]"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />Authenticating...</>
              ) : (
                <><Shield className="w-4 h-4" />Access Platform</>
              )}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <Link href="/" className="text-[10px] text-white/30 hover:text-white/60 transition-colors">← Back to site</Link>
            <button className="text-[10px] text-amber-400/60 hover:text-amber-400 transition-colors">Forgot password?</button>
          </div>
        </div>
        <div className="mt-4 text-center text-[9.5px] text-white/20">Protected by Veridian Risk Platform · All access logged</div>
      </div>
    </div>
  );
}
