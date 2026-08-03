import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';
import { validateEnv } from '@/lib/env';
import { PLATFORM } from '@/lib/constants';

// Surface configuration problems at startup — warns in dev, throws in prod
validateEnv();

const SITE_URL = `https://${PLATFORM.website}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Veridian Risk Group — Operational Risk & Resilience Consulting',
    template: '%s · Veridian Risk Group',
  },
  description: 'Strategic consulting, incident intelligence, OSHA compliance, fleet safety, and operational risk assessments for Central Florida businesses and beyond. 30+ years of field experience.',
  keywords: [
    'operational risk assessment', 'OSHA compliance consulting', 'fleet safety consulting',
    'incident documentation', 'workplace safety', 'Central Florida consulting',
    'risk management', 'DOT compliance', 'workplace violence prevention', 'emergency action plan',
  ],
  authors: [{ name: PLATFORM.company, url: SITE_URL }],
  creator: PLATFORM.company,
  publisher: PLATFORM.company,
  category: 'Business Consulting',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Veridian Risk Group',
    title: 'Veridian Risk Group — Operational Risk & Resilience Consulting',
    description: 'OSHA compliance, fleet safety, and operational risk assessments for complex business environments. 30+ years of field experience.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veridian Risk Group — Operational Risk Consulting',
    description: 'OSHA compliance, fleet safety, and operational risk assessments for Central Florida businesses.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: PLATFORM.company,
  alternateName: 'Veridian Risk Group',
  url: SITE_URL,
  telephone: PLATFORM.phone,
  email: PLATFORM.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sanford',
    addressRegion: 'FL',
    postalCode: '32773',
    addressCountry: 'US',
  },
  description: 'Operational risk assessments, OSHA compliance advisory, fleet & DOT safety consulting, incident documentation, and executive reporting.',
  areaServed: ['Central Florida', 'United States'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#06070E',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
