import type { MetadataRoute } from 'next';
import { PLATFORM } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = `https://${PLATFORM.website}`;

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/dashboard', '/api/'] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
