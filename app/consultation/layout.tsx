import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule a Consultation',
  description: 'Schedule a no-obligation consultation with Veridian Risk Group to discuss operational risk assessments, OSHA compliance, fleet safety, and executive reporting.',
  alternates: { canonical: '/consultation' },
  openGraph: {
    title: 'Schedule a Consultation · Veridian Risk Group',
    description: 'Schedule a no-obligation consultation to discuss your operational risk and consulting needs.',
    url: '/consultation',
  },
};

export default function ConsultationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
