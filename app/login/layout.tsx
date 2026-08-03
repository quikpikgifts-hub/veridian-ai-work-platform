import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Login',
  description: 'Secure client portal access for Veridian Risk Group customers.',
  alternates: { canonical: '/login' },
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
