'use client';

import { useEffect, useState } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string | null;
}

const inputCls =
  'w-full bg-white/[0.04] border border-white/[0.1] text-[#EEF0F6] text-[13px] px-3.5 py-2.5 ' +
  'outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20 transition-colors';

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else { setProfile(data.profile); setName(data.profile.name); }
      })
      .catch(() => setError('Could not load your profile.'));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Could not save your profile.'); return; }
      setProfile(data.profile);
      setSaved(true);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (!profile && !error) return <div className="flex justify-center py-16"><LoadingSpinner /></div>;

  return (
    <div className="max-w-lg mx-auto">
      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/65 mb-2">Client Profile</p>
      <h1 className="text-2xl font-bold text-[#EEF0F6] tracking-tight mb-8">Your account</h1>

      {error && <div className="border border-red-500/25 bg-red-500/[0.06] px-4 py-3 text-[12.5px] text-red-400 mb-6">{error}</div>}

      {profile && (
        <form onSubmit={handleSave} className="border border-white/[0.08] bg-[#07080E] p-7 space-y-5">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#EEF0F6]/50 mb-1.5">Full Name</label>
            <input className={inputCls} value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#EEF0F6]/50 mb-1.5">Email</label>
            <input className={inputCls + ' opacity-50 cursor-not-allowed'} value={profile.email} disabled readOnly />
            <p className="mt-1.5 text-[10.5px] text-[#EEF0F6]/25">Contact support to change your email address.</p>
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#EEF0F6]/50 mb-1.5">Account Type</label>
            <input className={inputCls + ' opacity-50 cursor-not-allowed capitalize'} value={profile.role} disabled readOnly />
          </div>

          {saved && (
            <div className="flex items-center gap-2 text-[12px] text-green-400">
              <CheckCircle className="w-3.5 h-3.5" /> Saved
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#D4B560] disabled:opacity-60 text-[#03040A] text-[11px] font-bold uppercase tracking-[0.12em] px-6 py-3 transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
          </button>
        </form>
      )}
    </div>
  );
}
