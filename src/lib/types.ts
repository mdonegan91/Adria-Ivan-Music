export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteSettings {
  artistName: string;
  tagline: string | null;
  instagramUrl: string | null;
  /** Extra links shown in the footer (Spotify, YouTube, etc.). Instagram has its own field. */
  socialLinks: SocialLink[];
  /** About text, already rendered to HTML from Portable Text. */
  aboutHtml: string | null;
}

export interface Release {
  title: string;
  releaseDate: string | null;
  description: string | null;
  bandcampUrl: string;
  ctaLabel: string;
  /** Audio file for the home-page player, and the song's name. No file → no player. */
  songUrl: string | null;
  songTitle: string | null;
  coverUrl: string | null;
  coverAlt: string;
}

export interface Show {
  _id: string;
  date: string; // YYYY-MM-DD
  venue: string;
  city: string;
  ticketUrl: string | null;
  note: string | null;
  soldOut: boolean;
}
