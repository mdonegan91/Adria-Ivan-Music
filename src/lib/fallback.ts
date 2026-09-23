import type { Release, Show, SiteSettings } from './types';

// Used when Sanity isn't configured yet (or returns nothing), so the site always builds.
// Once Sanity is connected, edit content there instead.

export const fallbackSettings: SiteSettings = {
  artistName: 'Adria Ivan',
  tagline: 'New album — pre-order now',
  instagramUrl: 'https://www.instagram.com/adriaivanmusic', // TODO: confirm handle
  socialLinks: [],
  aboutHtml:
    '<p>About text goes here: a short bio, how the album came together, who played on it. ' +
    'Two or three short paragraphs work best.</p>',
  contactIntro: 'For booking, press, or just to say hello.',
  contactEmails: [],
};

export const fallbackRelease: Release = {
  title: 'Album Title', // TODO: real title
  releaseDate: null,
  description: null,
  bandcampUrl: 'https://adriaivan.bandcamp.com', // TODO: real pre-order URL
  ctaLabel: 'Pre-order on Bandcamp',
  coverUrl: null, // null → uses /public/images/album-cover.*
  coverAlt:
    'Engraved illustration of two armored knights grappling over a flowering rose branch, framed by vines.',
};

export const fallbackShows: Show[] = [];
