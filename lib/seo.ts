/**
 * SEO module: page metadata with fallback to BRAND.
 * When Payload is used, replace static PAGES with a fetch from the Pages collection + SiteSettings global.
 */

import type { Metadata } from 'next';
import { BRAND } from '@/lib/brand';

export interface PageMeta {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: { title?: string; description?: string; images?: string[] };
  robots?: 'index, follow' | 'noindex, nofollow';
}

/** Static page config. Replace with Payload fetch when CMS is ready. */
export const PAGES: Record<string, PageMeta> = {
  about: {
    title: 'About',
    description: `Learn about ${BRAND.name} — ${BRAND.slogan}.`,
    robots: 'index, follow',
  },
  features: {
    title: 'Features',
    description: `Explore ${BRAND.name} features: AI extraction, verification workflows, and B2B reporting.`,
    robots: 'index, follow',
  },
  pricing: {
    title: 'Pricing',
    description: `Plans and pricing for ${BRAND.name}. Starter and Pro tiers for teams.`,
    robots: 'index, follow',
  },
  contact: {
    title: 'Contact',
    description: `Contact ${BRAND.name} for sales and support.`,
    robots: 'index, follow',
  },
};

const SITE_TITLE = BRAND.name;
const DEFAULT_DESCRIPTION = BRAND.slogan;

/**
 * Returns Next.js Metadata for a marketing page by slug.
 * Merges page overrides with site defaults and BRAND fallback.
 */
export function getPageMetadata(slug: string): Metadata {
  const page = PAGES[slug];
  const title = page?.title ?? slug.charAt(0).toUpperCase() + slug.slice(1);
  const description = page?.description ?? DEFAULT_DESCRIPTION;
  const fullTitle = title.includes(SITE_TITLE) ? title : `${title} | ${BRAND.name}`;

  return {
    title: fullTitle,
    description,
    metadataBase: process.env.NEXT_PUBLIC_APP_URL
      ? new URL(process.env.NEXT_PUBLIC_APP_URL)
      : undefined,
    openGraph: {
      title: page?.openGraph?.title ?? fullTitle,
      description: page?.openGraph?.description ?? description,
      images: page?.openGraph?.images?.length
        ? page.openGraph.images
        : [BRAND.logo].filter(Boolean),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    alternates: page?.canonical ? { canonical: page.canonical } : undefined,
    robots: page?.robots ?? 'index, follow',
  };
}

/** B2B Software JSON-LD for structured data (blueprint §5). */
export function getB2BSoftwareJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: BRAND.name,
    description: BRAND.slogan,
    applicationCategory: 'BusinessApplication',
  };
}
