import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { absoluteSiteUrl, siteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];

  const routes = ['/', '/about', '/work', '/capabilities', '/contact', ...projects.map((project) => `/work/${project.slug}`)];
  return routes.map((route) => ({
    url: absoluteSiteUrl(route)!,
    changeFrequency: route === '/' ? 'monthly' : 'yearly',
    priority: route === '/' ? 1 : route === '/work' ? 0.9 : 0.7,
  }));
}
