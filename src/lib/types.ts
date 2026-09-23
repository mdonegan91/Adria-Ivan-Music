export interface SocialLink {
  label: string;
  url: string;
}

export interface Release {
  title: string;
  releaseDate: string | null;
  description: string | null;
  bandcampUrl: string;
  ctaLabel: string;
  coverUrl: string | null;
  coverAlt: string;
}

export interface SiteContent {
  artistName: string;
  tagline: string | null;
  release: Release;
  socialLinks: SocialLink[];
}
