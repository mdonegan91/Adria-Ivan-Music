// @ts-check
import { defineConfig } from 'astro/config';

// Static build, deployed to Netlify. Content is pulled from Sanity at build time,
// and a Sanity webhook triggers a Netlify rebuild when content is published.
export default defineConfig({
  site: 'https://adriaivan.com', // TODO: update once the domain is set
});
