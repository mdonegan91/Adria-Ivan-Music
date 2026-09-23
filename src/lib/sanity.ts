import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { toHTML } from '@portabletext/to-html';
import { fallbackRelease, fallbackSettings, fallbackShows } from './fallback';
import type { Release, Show, SiteSettings } from './types';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

export const sanity = projectId
  ? createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: false })
  : null;

const builder = sanity ? createImageUrlBuilder(sanity) : null;

/** Run a GROQ query; return null (never throw) if Sanity is missing or errors. */
async function query<T>(groq: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!sanity) return null;
  try {
    return await sanity.fetch<T>(groq, params);
  } catch (err) {
    console.warn('[sanity] query failed, using fallback content:', err);
    return null;
  }
}

// Memoize per build so every page shares a single request.
let settingsPromise: Promise<SiteSettings> | undefined;
let releasePromise: Promise<Release> | undefined;
let showsPromise: Promise<Show[]> | undefined;

export function getSiteSettings(): Promise<SiteSettings> {
  return (settingsPromise ??= (async () => {
    const d = await query<any>(`*[_type == "siteSettings"][0]{
      artistName, tagline, instagramUrl, about, contactIntro,
      socialLinks[]{ label, url },
      contactEmails[]{ label, email }
    }`);
    if (!d) return fallbackSettings;
    return {
      artistName: d.artistName || fallbackSettings.artistName,
      tagline: d.tagline ?? null,
      instagramUrl: d.instagramUrl ?? null,
      socialLinks: d.socialLinks ?? [],
      aboutHtml: d.about?.length ? toHTML(d.about) : null,
      contactIntro: d.contactIntro ?? null,
      contactEmails: d.contactEmails ?? [],
    };
  })());
}

export function getFeaturedRelease(): Promise<Release> {
  return (releasePromise ??= (async () => {
    const r = await query<any>(`*[_type == "siteSettings"][0].featuredRelease->{
      title, releaseDate, description, bandcampUrl, ctaLabel, cover, "coverAlt": cover.alt
    }`);
    if (!r) return fallbackRelease;
    return {
      title: r.title || fallbackRelease.title,
      releaseDate: r.releaseDate ?? null,
      description: r.description ?? null,
      bandcampUrl: r.bandcampUrl || fallbackRelease.bandcampUrl,
      ctaLabel: r.ctaLabel || fallbackRelease.ctaLabel,
      coverUrl: r.cover && builder ? builder.image(r.cover).width(1600).auto('format').url() : null,
      coverAlt: r.coverAlt || fallbackRelease.coverAlt,
    };
  })());
}

/** Shows dated today or later, soonest first. Evaluated at build time. */
export function getUpcomingShows(): Promise<Show[]> {
  return (showsPromise ??= (async () => {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' }); // YYYY-MM-DD
    const shows = await query<Show[]>(
      `*[_type == "show" && date >= $today] | order(date asc){
        _id, date, venue, city, ticketUrl, note, "soldOut": coalesce(soldOut, false)
      }`,
      { today },
    );
    return shows ?? fallbackShows;
  })());
}

/** "2026-11-14" → "Nov 14, 2026" etc. Dates are calendar dates, so format in UTC. */
export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { ...opts, timeZone: 'UTC' });
}
