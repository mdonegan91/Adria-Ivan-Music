import type { Release, Show, SiteSettings } from './types';

// Used when Sanity isn't configured yet (or returns nothing), so the site always builds.
// Once Sanity is connected, edit content there instead.

export const fallbackSettings: SiteSettings = {
  artistName: 'Adria Ivan',
  tagline: 'New album',
  instagramUrl: 'https://www.instagram.com/closet_jock/',
  socialLinks: [],
  // TODO: real About text. Placeholder paragraphs, to show roughly how much fits.
  aboutHtml:
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore ' +
    'et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' +
    'aliquip ex ea commodo consequat.</p>' +
    '<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est ' +
    'laborum. Curabitur pretium tincidunt lacus, nec gravida nisi porta at.</p>',
};

export const fallbackRelease: Release = {
  title: 'Sometimes Say Never',
  releaseDate: null,
  description: null,
  bandcampUrl: 'https://adriaivan.bandcamp.com', // TODO: real pre-order URL
  ctaLabel: 'Pre-order',
  songUrl: '/audio/die-tryin.mp3', // MP3 (VBR V0) converted from the master WAV
  songTitle: 'Die Tryin',
  coverUrl: null, // null → uses /public/images/album-cover.*
  coverAlt:
    'Engraved illustration of two armored knights grappling over a flowering rose branch, framed by vines.',
};

export const fallbackShows: Show[] = [];
