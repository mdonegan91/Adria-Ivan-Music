import type { SiteContent } from './types';

// Used when Sanity isn't configured yet (or returns nothing), so the site always builds.
export const fallback: SiteContent = {
  artistName: 'Adria Ivan',
  tagline: 'New album — pre-order now',
  release: {
    title: 'Album Title', // TODO: real title
    releaseDate: null,
    description: null,
    bandcampUrl: 'https://adriaivan.bandcamp.com', // TODO: real pre-order URL
    ctaLabel: 'Pre-order on Bandcamp',
    coverUrl: null, // null → uses /public/images/album-cover.*
    coverAlt: 'Engraved illustration of two armored knights grappling over a flowering rose branch, framed by vines.',
  },
  socialLinks: [],
};
