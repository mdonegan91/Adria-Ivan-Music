import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { fallback } from './fallback';
import type { SiteContent } from './types';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

export const sanity = projectId
  ? createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: false })
  : null;

const builder = sanity ? createImageUrlBuilder(sanity) : null;

const query = /* groq */ `*[_type == "siteSettings"][0]{
  artistName,
  tagline,
  socialLinks[]{ label, url },
  "release": featuredRelease->{
    title,
    releaseDate,
    description,
    bandcampUrl,
    ctaLabel,
    cover,
    "coverAlt": cover.alt
  }
}`;

/** Fetch landing-page content at build time, falling back to local defaults. */
export async function getSiteContent(): Promise<SiteContent> {
  if (!sanity) return fallback;
  try {
    const data = await sanity.fetch(query);
    if (!data) return fallback;
    const r = data.release ?? {};
    return {
      artistName: data.artistName || fallback.artistName,
      tagline: data.tagline ?? fallback.tagline,
      socialLinks: data.socialLinks ?? [],
      release: {
        title: r.title || fallback.release.title,
        releaseDate: r.releaseDate ?? null,
        description: r.description ?? null,
        bandcampUrl: r.bandcampUrl || fallback.release.bandcampUrl,
        ctaLabel: r.ctaLabel || fallback.release.ctaLabel,
        coverUrl: r.cover && builder ? builder.image(r.cover).width(1600).auto('format').url() : null,
        coverAlt: r.coverAlt || fallback.release.coverAlt,
      },
    };
  } catch (err) {
    console.warn('[sanity] fetch failed, using fallback content:', err);
    return fallback;
  }
}
