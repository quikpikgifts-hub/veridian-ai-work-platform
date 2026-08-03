export function VLogo({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-label="Veridian Risk Group"
      role="img"
      className={className}
    >
      <circle cx="18" cy="18" r="15.5" stroke="#C9A84C" strokeWidth="0.5" opacity="0.22" />
      <circle cx="18" cy="18" r="10"   stroke="#C9A84C" strokeWidth="1.2" opacity="0.55" />
      <circle cx="18" cy="18" r="2.8"  fill="#C9A84C" />
      <line x1="18" y1="2.5"  x2="18" y2="8"    stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="18" y1="28"   x2="18" y2="33.5"  stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="2.5" y1="18"  x2="8"  y2="18"    stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="28"  y1="18"  x2="33.5" y2="18"  stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M11.5 12 L18 24 L24.5 12" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
