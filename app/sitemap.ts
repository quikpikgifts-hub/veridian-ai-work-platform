import type { MetadataRoute } from 'next';
import { PLATFORM } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = `https://${PLATFORM.website}`;
  const now = new Date();

  const routes = ['', '/services', '/about', '/consultation'];

  return routes.map(route => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
