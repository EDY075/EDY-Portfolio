import type { Metadata } from 'next';
import { site } from '@/data/site';

const configuredSiteUrl = process.env.SITE_URL?.trim();

function parseSiteUrl(value: string | undefined): URL | undefined {
  if (!value) return undefined;

  const parsed = new URL(value);
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    throw new Error('SITE_URL precisa usar http:// ou https://.');
  }

  return new URL(parsed.toString().replace(/\/$/, ''));
}

export const siteUrl = parseSiteUrl(configuredSiteUrl);

export function absoluteSiteUrl(pathname: string): string | undefined {
  return siteUrl ? new URL(pathname, siteUrl).toString() : undefined;
}

export function pageSocialMetadata(
  pathname: string,
  title: string,
  description: string,
  image?: { src: string; width: number; height: number; alt: string },
): Pick<Metadata, 'alternates' | 'openGraph' | 'twitter'> {
  const url = absoluteSiteUrl(pathname);
  const imageUrl = image ? absoluteSiteUrl(image.src) : undefined;
  const images = image && imageUrl ? [{ url: imageUrl, width: image.width, height: image.height, alt: image.alt }] : undefined;

  return {
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: site.title,
      locale: 'pt_BR',
      url,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
