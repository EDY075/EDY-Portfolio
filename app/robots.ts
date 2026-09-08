import type { MetadataRoute } from 'next';
import { absoluteSiteUrl, siteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  if (!siteUrl) return { rules: { userAgent: '*', disallow: '/' } };

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: absoluteSiteUrl('/sitemap.xml'),
  };
}
